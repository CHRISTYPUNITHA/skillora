/**
 * PaymentSuccessPage.jsx
 * Route: /payment-success
 *
 * Shown after a successful course purchase.
 * Layout matches the SMITIV_Layout.png reference:
 *   - Animated green success checkmark
 *   - Headline + subtext
 *   - Course receipt card (thumbnail · title · amount paid)
 *   - Order meta row (Order ID · Payment ID · Date)
 *   - Two CTAs: "Go to Dashboard" and "View My Courses"
 *
 * Styling: 100% Tailwind CSS v4 — no raw CSS / .css imports
 * Components: Button, Card, CardContent, Badge, Divider
 */

import { Link } from "react-router-dom"
import {
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Receipt,
  CalendarDays,
  Hash,
  Sparkles,
} from "lucide-react"
import { Button } from "../component/ui/Button"
import { Badge }  from "../component/ui/Badge"
import { Card, CardContent } from "../component/ui/Card"
import { Divider } from "../component/ui/Divider"

/* ─── Static / demo data ─────────────────────────────── */
const PURCHASE = {
  course:     "Full-Stack Foundations",
  level:      "Beginner to Intermediate",
  amountPaid: 799,
  orderId:    "order_KJHB6T8Y2",
  paymentId:  "pay_KJHB6T8Y2",
  date:       "20 May 2025, 10:30 AM",
  thumbnail:  "bg-gradient-to-br from-[#100D2E] to-[#6C4CF0]",
}

/* ─── Sub-components ──────────────────────────────────── */

/** Animated green success ring + checkmark */
function SuccessIcon() {
  return (
    <div className="flex items-center justify-center mb-6">
      {/* Outer glow ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full bg-green-100 animate-ping opacity-30" />
        <div className="absolute w-20 h-20 rounded-full bg-green-100 opacity-60" />
        <div className="relative w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
          <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}

/** Course receipt row inside the card */
function CourseReceiptRow({ thumbnail, title, level, amountPaid }) {
  return (
    <div className="flex items-center gap-4">
      {/* Thumbnail */}
      <div
        className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${thumbnail} shadow-md`}
      >
        <BookOpen className="w-6 h-6 text-white/90" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{level}</p>
      </div>

      {/* Amount */}
      <div className="flex-shrink-0 text-right">
        <p className="text-xs text-gray-400 mb-0.5">Amount Paid</p>
        <p className="text-base font-bold text-gray-900">₹{amountPaid}</p>
      </div>
    </div>
  )
}

/** Single meta detail pill (Order ID / Payment ID / Date) */
function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-0">
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Icon className="w-3 h-3 flex-shrink-0" />
        <span className="uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xs font-semibold text-gray-700 truncate max-w-[120px] text-center">
        {value}
      </p>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────── */
export default function PaymentSuccessPage() {
  const { course, level, amountPaid, orderId, paymentId, date, thumbnail } =
    PURCHASE

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center justify-center px-4 py-12">

      {/* ── Brand mark ── */}
      <Link
        to="/"
        className="flex items-center gap-2 mb-10 hover:opacity-80 transition-opacity"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-gray-900 text-sm tracking-tight">
          Skillora
        </span>
      </Link>

      {/* ── Main card ── */}
      <Card className="w-full max-w-md shadow-xl border-gray-100 overflow-hidden">
        <CardContent className="p-8 space-y-6">

          {/* Success icon */}
          <SuccessIcon />

          {/* Headline */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Payment Successful!
              </h1>
              <span className="text-2xl" role="img" aria-label="party">🎉</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              You have successfully enrolled in the course.
              <br />
              Your learning journey begins now.
            </p>
          </div>

          <Divider />

          {/* Course receipt */}
          <CourseReceiptRow
            thumbnail={thumbnail}
            title={course}
            level={level}
            amountPaid={amountPaid}
          />

          {/* Order meta */}
          <div className="bg-gray-50 rounded-xl px-4 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <MetaItem icon={Hash}        label="Order ID"   value={orderId}   />
              <MetaItem icon={Receipt}     label="Payment ID" value={paymentId} />
              <MetaItem icon={CalendarDays} label="Date"      value={date}      />
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Link to="/courses" className="block">
              <Button
                id="go-to-courses-btn"
                variant="outline"
                className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-purple-200 hover:text-purple-700 transition-all font-medium text-sm"
              >
                <BookOpen className="w-4 h-4 mr-1.5" />
                Go to Courses
              </Button>
            </Link>
            <Link to="/my-learning" className="block">
              <Button
                id="view-my-courses-btn"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-md shadow-purple-100 hover:scale-[1.02] transition-all text-sm"
              >
                <GraduationCap className="w-4 h-4 mr-1.5" />
                View My Courses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* ── Sparkle note ── */}
      <p className="mt-6 flex items-center gap-1.5 text-xs text-gray-400">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        A confirmation email has been sent to your inbox.
      </p>
    </div>
  )
}
