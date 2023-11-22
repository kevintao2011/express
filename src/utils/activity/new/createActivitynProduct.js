import product from "../../../models/product.js";
import stock from "../../../models/stock.js";
import activity from "../../../models/activity.js";
import { getoidandsessionbycode } from "../../serverFunction/getoidbycode.js";
import { getCatgoryoid, getLatestSKU } from "../../serverFunction/dbFunction.js";
import { IntToProdIndex, wrapResponse } from "../../serverFunction/basicfunction.js";
import getUserOID from "../../serverFunction/getuseroid.js";
import moment from "moment";
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
    const creator = await getUserOID(req.body.tokeninfo.uid)
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
            created_by:creator,
            is_limited:false,
            sku:sku,
            published:req.body.data.published,
            session:session,
            options:[option],
            product_list:req.body.data.product_list.map((subprod,i)=>{
                subprod.sku= `${sku}-${IntToProdIndex(i)}`
                return subprod
            })
    }).then(async doc=>{
        if(doc){
            //2. Create Stocks for the ticket
            const stocks = doc.product_list
            const listOfDocs = []
            for (const stk of stocks) {
                
                for (let index = 0; index < stk.quantity; index++) {
                    listOfDocs.push(new stock(
                        {
                            sku:`${stk.sku}-${IntToProdIndex(index)}`,
                            ref_society:socoid,
                            ref_product:stk._id,
                            created_at:moment().utcOffset(8),
                            created_by:creator,
                            create_method:"create-activity",
                            status:"for-sale"
                        }
                    ))   
                }
            }
            return await stock.insertMany(listOfDocs).then(async docs=>{
                console.log("created stocks",docs)
                return await activity.create({...req.body.data,ref_ticket_sku:doc.sku}).then(doc=>{
                    return wrapResponse(true,"Created all Product(Ticket), Stocks and Activity")
                })
            })
        }else{
            return wrapResponse(false,"Created Failed")
        }
    })
}

export default createActivitynProduct

