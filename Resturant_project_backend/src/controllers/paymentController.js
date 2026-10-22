import crypto from "crypto";
import Razorpay from "razorpay";
import Reservation from "../models/Reservation.js";
import Restaurant from "../models/Restaurant.js";

const PRICE_PER_GUEST = 50;

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay Test Mode credentials are not configured");
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

const signaturesMatch = (expected, received) => {
  if (!expected || !received || expected.length !== received.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));
};

export const createPaymentOrder = async (req, res) => {
  try {
    const { restaurantId, date, time, guests } = req.body;
    const guestCount = Number(guests);
    if (!restaurantId || !date || !time || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
      return res.status(400).json({ success: false, message: "Restaurant, date, time, and 1–20 guests are required" });
    }
    if (date < new Date().toISOString().slice(0, 10)) {
      return res.status(400).json({ success: false, message: "Reservation date cannot be in the past" });
    }

    const restaurant = await Restaurant.findOne({ _id: restaurantId, approvalStatus: "approved" });
    if (!restaurant) return res.status(404).json({ success: false, message: "Approved restaurant not found" });
    if (!restaurant.availableSlots.includes(time)) {
      return res.status(400).json({ success: false, message: "Please select an available time" });
    }

    const bookingFee = guestCount * PRICE_PER_GUEST;
    const order = await getRazorpay().orders.create({
      amount: bookingFee * 100,
      currency: "INR",
      receipt: `tr_${Date.now()}_${req.user.id.slice(-6)}`,
      notes: { restaurantId: String(restaurant._id), userId: req.user.id },
    });

    const reservation = await Reservation.create({
      user: req.user.id,
      restaurant: restaurant._id,
      date,
      time,
      guests: guestCount,
      bookingFee,
      paymentStatus: "created",
      razorpayOrderId: order.id,
    });

    res.status(201).json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      reservationId: reservation._id,
      restaurantName: restaurant.name,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reservationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!reservationId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Complete payment verification details are required" });
    }

    const reservation = await Reservation.findOne({ _id: reservationId, user: req.user.id });
    if (!reservation) return res.status(404).json({ success: false, message: "Reservation not found" });
    if (reservation.paymentStatus === "paid") {
      return res.json({ success: true, message: "Payment was already verified", reservation });
    }
    if (reservation.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ success: false, message: "Payment order does not match this reservation" });
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${reservation.razorpayOrderId}|${razorpay_payment_id}`)
      .digest("hex");
    if (!signaturesMatch(expected, razorpay_signature)) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    reservation.paymentStatus = "paid";
    reservation.razorpayPaymentId = razorpay_payment_id;
    reservation.paidAt = new Date();
    await reservation.save();

    res.json({ success: true, message: "Payment verified. Your booking request was sent to the restaurant", reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleRazorpayWebhook = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
      return res.status(503).json({ success: false, message: "Webhook is not configured" });
    }
    const signature = req.headers["x-razorpay-signature"];
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");
    if (!signaturesMatch(expected, signature)) {
      return res.status(400).json({ success: false, message: "Invalid webhook signature" });
    }

    const event = JSON.parse(req.body.toString("utf8"));
    const payment = event.payload?.payment?.entity;
    const orderId = payment?.order_id || event.payload?.order?.entity?.id;
    if (orderId && ["payment.captured", "order.paid"].includes(event.event)) {
      await Reservation.findOneAndUpdate(
        { razorpayOrderId: orderId, paymentStatus: { $ne: "paid" } },
        { paymentStatus: "paid", razorpayPaymentId: payment?.id, paidAt: new Date() },
      );
    } else if (orderId && event.event === "payment.failed") {
      await Reservation.findOneAndUpdate(
        { razorpayOrderId: orderId, paymentStatus: { $ne: "paid" } },
        { paymentStatus: "failed", razorpayPaymentId: payment?.id },
      );
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
