import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req){

    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const {products} = await req.json();
    console.log(products);

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.dish,
            },
            unit_amount:product.price * 100,
        },
        quantity:product.qnty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
    });

    return NextResponse.json({id: session.id})
}
