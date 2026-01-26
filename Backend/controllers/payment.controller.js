/**
 * Order & Stripe Payment Controller
 * ---------------------------------
 * Handles Stripe checkout, order confirmation,
 * and order retrieval.
 */

import Stripe from "stripe";
import orderModal from "../Modals/OrderModal/order.modal.js";
import { transformCheckoutSessionToOrder } from "../utilities/orderTranformer.js";


// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =========================================================
   STRIPE PAYMENT
   Create Stripe checkout session
========================================================= */
export const stripePayment = async (req, res, next) => {
  try {
    const { items } = req.body;

    console.log("frontend sended item to purchse******", items);
    logger.info("Stripe payment initiated", { items });

    // Transform frontend items into Stripe line items
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          unit_amount: item.unitPrice,
          product_data: {
            name: item.title,
          },
        },
        quantity: item.quantity,
      };
    });

    console.log("&&&&&&&&&&&&&&&&&&&& lineitems", lineItems);
    logger.debug("Stripe line items prepared", { lineItems });

    console.log("**************** user id", req?.user?.id);
    logger.info("Creating Stripe session for user", {
      userId: req?.user?.id,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      success_url:
        "http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/payment/cancel",
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      client_reference_id: req?.user?.id,
    });

    logger.info("Stripe checkout session created", {
      sessionId: session.id,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    logger.error("Stripe payment error", { error });

    res.status(499).json({
      message: error?.message || "something went wrong",
    });
  }
};

/* =========================================================
   CONFIRM ORDER
   Verify payment and persist order
========================================================= */
export const confirmOrder = async (req, res, next) => {
  try {
    const { sessionId, userId } = req.body;

    logger.info("Order confirmation started", { sessionId, userId });

    if (!sessionId || !userId) {
      logger.warn("Missing sessionId or userId", { sessionId, userId });

      return res.status(400).json({
        message: "sessionId and userId are required",
      });
    }

    // 1️⃣ Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (!session || session.payment_status !== "paid") {
      logger.warn("Payment not completed", {
        sessionId,
        status: session?.payment_status,
      });

      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    // 2️⃣ Transform Stripe session to order object
    const orderObject = transformCheckoutSessionToOrder(session, userId);

    logger.debug("Order object transformed", { orderObject });

    // 3️⃣ Idempotent DB write
    const orderSavedDB = await orderModal.findOneAndUpdate(
      { stripeSessionId: session.id },
      { $setOnInsert: orderObject },
      {
        new: true,
        upsert: true,
      },
    );

    logger.info("Order saved successfully", {
      orderId: orderSavedDB?._id,
    });

    // 4️⃣ Return order
    res.status(200).json({
      success: true,
      order: orderSavedDB,
    });
  } catch (error) {
    console.error("Confirm order error:", error);
    logger.error("Confirm order failed", { error });

    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

/* =========================================================
   GET ORDER BY ID
   Fetch order using tracking ID
========================================================= */
export const getOrderById = async (req, res, next) => {
  try {
    const { order_id } = req.body;

    console.log(
      "finding order by tracking id))))))))))))))))))))))=>",
      order_id,
    );
    logger.info("Fetching order by ID", { orderId: order_id });

    const trackingId = order_id;

    const trackedOrder = await orderModal.findById(trackingId);

    console.log(
      "*************************************** tracked order =>",
      trackedOrder,
    );
    logger.debug("Tracked order fetched", { trackedOrder });

    res.status(200).json(trackedOrder);
  } catch (err) {
    logger.error("Get order by ID failed", { error: err });

    res.json({
      message: err?.message || "something went wronng",
    });
  }
};

/**
 * ---------------------------------------------------------
 * LOGGING NOTES
 * - console.log preserved (dev visibility)
 * - logger used for structured logs (prod readiness)
 * ---------------------------------------------------------
 */
