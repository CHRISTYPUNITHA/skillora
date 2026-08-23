import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  Zap,
  Check,
  Lock,
  CreditCard,
  Star,
  BookOpen,
  Award,
  Loader2
} from "lucide-react"
import { Button } from "../component/ui/Button"
import { Badge } from "../component/ui/Badge"
import { Card, CardContent } from "../component/ui/Card"
import { Divider } from "../component/ui/Divider"
import { getCourseById } from "../services/courses.services"
import { createOrder, verifyPayment } from "../services/payment.services"
import {useAuth} from '../context/AuthContext'
import { LightNavbar as TopNav } from "./CoursesPage"

/* ─── Static data ─────────────────────────────────────── */
const SECURITY_FEATURES = [
  { icon: ShieldCheck, text: "Secure payment powered by Razorpay" },
  { icon: Zap,         text: "One-time payment. No hidden charges." },
  { icon: Clock,       text: "Instant access after successful payment." },
]

const COURSE_INCLUDES = [
  { icon: Clock,    text: "Lifetime access" },
  { icon: BookOpen, text: "Self-paced learning" },
  { icon: Zap,      text: "High-quality content" },
  { icon: Award,    text: "Certificate of completion" },
  { icon: CreditCard, text: "Access on mobile & TV" },
]

/* ─── Sub-components ──────────────────────────────────── */

/** Decorative course thumbnail card */
function CourseThumbnail({ gradient }) {
  return (
    <div
      className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center ${gradient || "bg-gradient-to-br from-[#100D2E] to-[#6C4CF0]"} shadow-lg`}
    >
      <BookOpen className="w-7 h-7 text-white/90" />
    </div>
  )
}

/** A single price-breakdown row */
function PriceRow({ label, value, isTotal = false, className = "" }) {
  return (
    <div
      className={`flex items-center justify-between ${isTotal ? "pt-4" : ""} ${className}`}
    >
      <span
        className={
          isTotal
            ? "text-base font-bold text-gray-800"
            : "text-sm text-gray-500"
        }
      >
        {label}
      </span>
      <span
        className={
          isTotal
            ? "text-base font-bold text-gray-900"
            : value.startsWith("-")
            ? "text-sm font-medium text-green-600"
            : "text-sm font-semibold text-gray-800"
        }
      >
        {value}
      </span>
    </div>
  )
}

/** Payment logo pill */
function PaymentBadge({ label, accent = "bg-gray-50 border-gray-200" }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wide ${accent}`}
    >
      {label}
    </span>
  )
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

/* ─── Page ────────────────────────────────────────────── */
export default function CheckoutPage() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [error, setError] = useState("")
  const {user} = useAuth()

  useEffect(() => {
    if (!courseId) {
      setError("No course selected for checkout.")
      setLoading(false)
      return
    }

    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId)
        // Handle response format: { success: true, course: {...} }
        const courseData = data.course || data
        setCourse({
          ...courseData,
          price: Number(courseData.price) || 0,
          originalPrice: courseData.originalPrice ? Number(courseData.originalPrice) : null,
          duration: courseData.duration || 0,
        })
      } catch (err) {
        console.error(err)
        setError("Failed to load course details.")
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [courseId])

  const handlePayment = async () => {
    setPaymentProcessing(true)
    setError("")

    try {
      // 1. Load Razorpay script
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
      if (!res) {
        setError("Razorpay SDK failed to load. Are you online?")
        setPaymentProcessing(false)
        return
      }

      // 2. Create order on backend
      const orderData = await createOrder(courseId)

      // 3. Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "dummy_key", // Frontend uses VITE_ prefix if loaded from env, or pass key from backend
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Skillora",
        description: `Enrollment for ${course.title}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // 4. Verify payment on backend
            await verifyPayment({
              razorpay_order_id: response?.razorpay_order_id,
              razorpay_payment_id: response?.razorpay_payment_id,
              razorpay_signature: response?.razorpay_signature,
            })
            // 5. Navigate to success page
            navigate("/payment-success", {
              state: {
                course: course.title,
                level: course.level || "Beginner to Intermediate",
                amountPaid: course.price,
                orderId: response?.razorpay_order_id,
                paymentId: response?.razorpay_payment_id,
                date: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                thumbnail: "bg-gradient-to-br from-[#100D2E] to-[#6C4CF0]"
              }
            })
          } catch (verifyError) {
            console.error(verifyError)
            setError("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#6C4CF0",
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      paymentObject.on('payment.failed', function (response) {
        setError("Payment failed: " + response.error.description)
      })
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || "Failed to initiate payment. Please try again.")
    } finally {
      setPaymentProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-500 font-semibold mb-4">{error}</p>
        <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
      </div>
    )
  }

  const discount = 0
  const total = course.price - discount

  return (
    <>
    
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* ── Top navigation bar ── */}
      <TopNav/>
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
        <Link
          to={`/courses/${course.slug}`}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>
      </nav>

      {/* ── Page body ── */}
      <main className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Complete your purchase and start learning.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* ── LEFT — Your Order ── */}
          <Card className="shadow-sm border-gray-100 overflow-hidden">
            <CardContent className="p-6 space-y-6">

              {/* Section heading */}
              <h2 className="text-base font-semibold text-gray-800">
                Your Order
              </h2>

              {/* Course item row */}
              <div className="flex items-start gap-4">
                <CourseThumbnail gradient={course.accent} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{course.level}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.duration} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Self-paced
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">
                    ₹{course.price}
                  </p>
                  {course.originalPrice && (
                    <p className="text-xs line-through text-gray-300 mt-0.5">
                      ₹{course.originalPrice}
                    </p>
                  )}
                </div>
              </div>

              <Divider />

              {/* Price breakdown */}
              <div className="space-y-3">
                <PriceRow label="Subtotal"  value={`₹${course.price}`} />
                <PriceRow label="Discount"  value={discount ? `-₹${discount}` : "-₹0"} />
                <Divider />
                <PriceRow label="Total" value={`₹${total}`} isTotal />
              </div>

              {/* What's included */}
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-3">
                  This course includes
                </p>
                <ul className="space-y-2">
                  {COURSE_INCLUDES.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-2 text-xs text-gray-600"
                    >
                      <Icon className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* ── RIGHT — Payment Details ── */}
          <div className="space-y-4">
            <Card className="shadow-sm border-gray-100">
              <CardContent className="p-6 space-y-5">

                {/* Section heading */}
                <h2 className="text-base font-semibold text-gray-800">
                  Payment Details
                </h2>

                {/* Security trust bullets */}
                <ul className="space-y-2.5">
                  {SECURITY_FEATURES.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-green-600" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>

                <Divider />

                {/* Pay button */}
                <Button
                  id="pay-now-btn"
                  size="lg"
                  onClick={handlePayment}
                  disabled={paymentProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-200 transition-all duration-200 hover:scale-[1.02] active:scale-100 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {paymentProcessing ? "Processing..." : `Pay ₹${total} Securely`}
                </Button>

                {/* Payment method logos */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <PaymentBadge label="VISA"       accent="bg-blue-50 border-blue-100 text-blue-700" />
                  <PaymentBadge label="Mastercard" accent="bg-red-50 border-red-100 text-red-600" />
                  <PaymentBadge label="Razorpay"   accent="bg-indigo-50 border-indigo-100 text-indigo-700" />
                  <PaymentBadge label="UPI"        accent="bg-green-50 border-green-100 text-green-700" />
                </div>

                {/* Security note */}
                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <Lock className="w-3 h-3" />
                  Your payment information is 100% secure
                </p>
              </CardContent>
            </Card>

            {/* Money-back guarantee */}
            <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Not satisfied? Get a full refund, no questions asked.
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 px-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                4.9 · Trusted by 500+ students
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
