import api from "../utils/api";

export const createOrder = async (courseId) => {
  try {
    const response = await api.post("/payments/create-order", { courseId });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentDetails) => {
  try {
    const response = await api.post("/payments/verify", paymentDetails);
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};
