import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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


export const confirmOrder = async(req, res, next) => {
  try {
  
    const { sessionId } = req.body;

    console.log("session id from ****front end ****", sessionId);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // list of products user order
    const lineItems = await stripe.checkout.sessions.listLineItems(
      sessionId,
      {
        limit: 100,
      });

    console.log("sesionnnnnnnnnnnnnnnn onbjjjjjjjj", session);


    res.status(200).json({
   lineItems
    });
    
    // create order and save to DB





} catch (error) {
  
    
    console.log("session retireve error", error);
    
    
    
}
  
} 
