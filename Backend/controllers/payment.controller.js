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
    

   const session = await stripe.checkout.sessions.create({
     success_url: "http://localhost:5173/payment/success",
     cancel_url:"http://localhost:5173/payment/cancel",
     line_items: lineItems,
     mode: "payment",
     payment_method_types:['card']
   });
    
    
    res.status(200).json({ url:session.url });
  } catch (error) {
    res.status(499).json({ message: error?.message || "something went wrong"});
  console.log(error);
  
 }
};
