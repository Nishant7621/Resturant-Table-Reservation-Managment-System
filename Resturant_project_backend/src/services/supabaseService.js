import supabase from "../config/supabase.js";
import bcrypt from "bcryptjs";

// Helper to normalize Supabase records with `_id` so frontend React components work seamlessly
const formatRestaurant = (r) => {
  if (!r) return null;
  return {
    ...r,
    _id: r.id,
    approvalStatus: r.approval_status || "approved",
    availableSlots: r.available_slots || ["12:00 PM", "2:00 PM", "7:00 PM", "9:00 PM"],
    gstNumber: r.gst_number,
    fssaiNumber: r.fssai_number,
    ownerName: r.owner_name,
  };
};

const formatReservation = (res) => {
  if (!res) return null;
  return {
    ...res,
    _id: res.id,
    bookingFee: res.booking_fee,
    paymentStatus: res.payment_status,
    razorpayOrderId: res.razorpay_order_id,
    razorpayPaymentId: res.razorpay_payment_id,
    paidAt: res.paid_at,
    user: res.customer ? { ...res.customer, _id: res.customer.id } : res.customer_id,
    restaurant: res.restaurant_details ? formatRestaurant(res.restaurant_details) : res.restaurant_id,
  };
};

export const supabaseService = {
  // RESTAURANTS
  async getRestaurants({ city, area, guests } = {}) {
    if (!supabase) throw new Error("Supabase client is not configured");
    let query = supabase.from("restaurant_details").select("*").eq("approval_status", "approved");

    if (city) {
      query = query.ilike("city", city.trim());
    }
    if (area) {
      query = query.ilike("area", area.trim());
    }
    if (guests) {
      const minTables = Math.ceil(Number(guests) / 4);
      query = query.gte("tables", minTables);
    }

    const { data, error } = await query.order("rating", { ascending: false }).order("name", { ascending: true });
    if (error) throw error;
    return (data || []).map(formatRestaurant);
  },

  async getRestaurantById(id) {
    const { data, error } = await supabase
      .from("restaurant_details")
      .select("*")
      .eq("id", id)
      .eq("approval_status", "approved")
      .maybeSingle();

    if (error) throw error;
    return formatRestaurant(data);
  },

  async getPendingRestaurants() {
    const { data, error } = await supabase
      .from("restaurant_details")
      .select("*")
      .eq("approval_status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map(formatRestaurant);
  },

  async updateRestaurantApproval(id, approvalStatus) {
    const { data, error } = await supabase
      .from("restaurant_details")
      .update({ approval_status: approvalStatus, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return formatRestaurant(data);
  },

  async getOwnerDashboard(userId) {
    const { data: restaurant, error: rError } = await supabase
      .from("restaurant_details")
      .select("*")
      .eq("owner_id", userId)
      .maybeSingle();

    if (rError) throw rError;
    if (!restaurant) return null;

    const { data: reservations, error: resError } = await supabase
      .from("reservations")
      .select("*, customer:customer_id (id, name, email, phone)")
      .eq("restaurant_id", restaurant.id)
      .order("created_at", { ascending: false });

    if (resError) throw resError;

    const formattedList = (reservations || []).map(formatReservation);
    const confirmed = formattedList.filter((r) => r.status === "confirmed");
    const pending = formattedList.filter((r) => r.status === "pending");

    return {
      restaurant: formatRestaurant(restaurant),
      reservations: formattedList,
      metrics: {
        totalBookings: formattedList.length,
        pendingRequests: pending.length,
        confirmedBookings: confirmed.length,
        estimatedRevenue: confirmed.reduce((total, r) => total + (r.bookingFee || 50), 0),
      },
    };
  },

  // CUSTOMERS / USERS
  async findUserByEmail(email) {
    const { data, error } = await supabase
      .from("customer")
      .select("*")
      .ilike("email", email.trim())
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return { ...data, _id: data.id };
  },

  async findUserById(id) {
    const { data, error } = await supabase
      .from("customer")
      .select("id, name, email, phone, role, created_at")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return { ...data, _id: data.id };
  },

  async createUser({ name, email, password, phone, role = "customer" }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("customer")
      .insert({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return { ...data, _id: data.id };
  },

  async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const { data, error } = await supabase
      .from("customer")
      .update({ password: hashedPassword, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // RESERVATIONS
  async createReservation({ customerId, restaurantId, date, time, guests, bookingFee = 50 }) {
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        customer_id: customerId,
        restaurant_id: restaurantId,
        date,
        time,
        guests: Number(guests),
        booking_fee: Number(bookingFee),
        status: "pending",
        payment_status: "not_started",
      })
      .select("*, customer:customer_id (id, name, email, phone), restaurant_details:restaurant_id (*)")
      .single();

    if (error) throw error;
    return formatReservation(data);
  },

  async getCustomerReservations(customerId) {
    const { data, error } = await supabase
      .from("reservations")
      .select("*, customer:customer_id (id, name, email, phone), restaurant_details:restaurant_id (*)")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map(formatReservation);
  },

  async updateReservationStatus(reservationId, status) {
    const { data, error } = await supabase
      .from("reservations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", reservationId)
      .select("*, customer:customer_id (id, name, email, phone)")
      .maybeSingle();

    if (error) throw error;
    return formatReservation(data);
  },

  // REVIEWS
  async getRestaurantReviews(restaurantId) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*, customer:customer_id (id, name)")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map((rev) => ({
      ...rev,
      _id: rev.id,
      user: rev.customer ? { ...rev.customer, _id: rev.customer.id } : rev.customer_id,
    }));
  },

  async createReview({ customerId, restaurantId, rating, comment }) {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        customer_id: customerId,
        restaurant_id: restaurantId,
        rating: Number(rating),
        comment: comment.trim(),
      })
      .select("*, customer:customer_id (id, name)")
      .single();

    if (error) throw error;
    return {
      ...data,
      _id: data.id,
      user: data.customer ? { ...data.customer, _id: data.customer.id } : data.customer_id,
    };
  },
};

export default supabaseService;
