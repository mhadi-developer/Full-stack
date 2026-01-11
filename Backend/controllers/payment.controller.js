import Stripe from "stripe";
import orderModal from "../Modals/OrderModal/order.modal.js";
import { transformCheckoutSessionToOrder } from "../utilities/orderTranformer.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);




// controllers----------------------------------------------------------

export const stripePayment = async (req,res,next) => {
  try {
    const { items } = req.body;
    
    console.log("frontend sended item to purchse******", items);
    

    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          unit_amount: item.unitPrice,
          product_data: {
            name: item.title,
          },
        },
        quantity:item.quantity
      };
    })

    console.log('&&&&&&&&&&&&&&&&&&&&lineitems',lineItems);
    

    console.log("****************", req?.user?.id);
    

   const session = await stripe.checkout.sessions.create({
     success_url:
       "http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}",
     cancel_url: "http://localhost:5173/payment/cancel",
     line_items: lineItems,
     mode: "payment",
     payment_method_types: ["card"],
     client_reference_id: req?.user?.id,
   });
    
    
    res.status(200).json({ url:session.url });
  } catch (error) {
    res.status(499).json({ message: error?.message || "something went wrong"});
  console.log(error);
  
 }
};


//-----------------------------------------------------------------------------

export const confirmOrder = async (req, res, next) => {
  try {
    const { sessionId, userId } = req.body;

    if (!sessionId || !userId) {
      return res.status(400).json({
        message: "sessionId and userId are required",
      });
    }

    // 1️⃣ Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    // 2️⃣ Transform Stripe session → Order object
    const orderObject = transformCheckoutSessionToOrder(session, userId);

    // 3️⃣ Idempotent DB write (CRITICAL)
    const orderSavedDB = await orderModal.findOneAndUpdate(
      { stripeSessionId: session.id }, // unique key
      { $setOnInsert: orderObject },
      {
        new: true,
        upsert: true,
      }
    );

    // 4️⃣ Return order
    res.status(200).json({
      success: true,
      order: orderSavedDB,
    });
  } catch (error) {
    console.error("Confirm order error:", error);

    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};




//------------------------------------------------------------------------------

export const getOrderById = async (req, res, next) => {
  try {
    const { order_id } = req.body;

    console.log(
      "finding order by tracking id()))))))))))))))))))))=>",
      order_id
    );

    const trackingId = order_id;

    const trackedOrder = await orderModal.findById(trackingId);

    console.log(
      "***************************************tracked order=>",
      trackedOrder
    );


    res.status(200).json(trackedOrder);
  }
  catch (err) {
    res.json({ message: err?.message || " something went wronng" });
  }
  
  
}




