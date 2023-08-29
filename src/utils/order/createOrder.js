
import mongoose, { connect } from "mongoose";
import connectDB from "../connectDB.js";
import user from "../../models/user.js";
import {transaction} from "../../models/transaction.js";

const createOrder = async (req)=>{
    var connect;
    var data;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        data = req.body;
        console.log(data);

        const newTransaction = new transaction({       
            payment_proof:req.body.data.payment_proof,
            payment_method:req.body.data.payment_method,
            productIds:req.body.data.productIds,
            products:req.body.data.products,
            sid:req.body.data.sid,
            chi_name:req.body.data.chi_name,
            eng_name:req.body.data.eng_name,
            email:req.body.data.email,
            contact:req.body.data.contact,
            code:req.body.data.code,
            status:"To be confirmed",
            conversation:[],
            create_at:Date.now(),
            log:[]
        })
        
        return await transaction.create(newTransaction).then(async Tdoc=>{
            return await user.findOne(
                {uid:req.body.tokeninfo.uid},
            ).then(async Udoc=>{
                req.body.data.products.forEach(product=>{
                    if(product.type==="membership"){
                        const s = Object.keys(Udoc.societies)
                        if (s.includes(req.body.data.code)){

                        }else{
                            Udoc.societies.push({[req.body.data.code]:"pending"})
                        }
                    }
                })
                console.log("Udoc",Udoc)
                const Mdoc = Udoc
                const newCart = Mdoc.cart.filter(o=>
                    o.code===req.body.data.code
                )
                Mdoc.cart = newCart
                Mdoc.order.push(Tdoc._id)
                
                return await user.updateOne(
                    {_id:Udoc._id},
                    Mdoc
                ).then(m=>{
                    console.log("m",m)
                    return {code:"success",_id:Tdoc._id}
                })
            })
        })

        
        
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        return {code:"error"}
        // await connect.disconnect();

    }
    

}

export default createOrder;