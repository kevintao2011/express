import product from "../../../models/product.js";
import stock from "../../../models/stock.js";
import activity from "../../../models/activity.js";
import { getoidandsessionbycode } from "../../serverFunction/getoidbycode.js";
import { getCatgoryoid, getLatestSKU } from "../../serverFunction/dbFunction.js";
import { wrapResponse } from "../../serverFunction/basicfunction.js";
import getUserOID from "../../serverFunction/getuseroid.js";
//1. Create Product e.g ticket for the Event
//2. Create Stocks for the ticket
//3. Create Activity for the Event

async function createActivitynProduct(req){
    console.log("createActivitynProduct",req.body.data)
    const code = req.body.data.code
    const [socoid,session] = await getoidandsessionbycode(code)
    const sku = await getLatestSKU(code)
    const option = {text:"門票 Ticket",option:[]}
    option.option= req.body.data.product_list.map(p=>{
        return p.name
    })
    
    return await product.create(
        {
            code:code,
            ref_society:socoid,
            ref_category:await getCatgoryoid("ticket"),
            product_type:"ticket",
            product_img_url:[],
            product_link:req.body.data.links,
            product_name_chi:req.body.data.activity_name,
            product_description_chi:req.body.data.activity_description,
            created_by:await getUserOID(req.body.tokeninfo.uid),
            is_limited:false,
            sku:sku,
            published:req.body.data.published,
            session:session,
            options:[option],
            product_list:req.body.data.product_list
    }).then(doc=>{
        if(doc){
            console.log("creating stocks")
            return wrapResponse(true,"Created Successfully")
        }else{
            return wrapResponse(false,"Created Failed")
        }
    })
}

export default createActivitynProduct

