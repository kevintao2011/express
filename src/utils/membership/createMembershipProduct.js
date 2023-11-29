import product from "../../models/product.js";
import { wrapResponse } from "../serverFunction/basicfunction.js";
import { getCatgoryoid, getLatestSKU } from "../serverFunction/dbFunction.js";
import { getoidandsessionbycode } from "../serverFunction/getoidbycode.js";
import getUserOID from "../serverFunction/getuseroid.js";

const createMembershipProduct = async(req)=>{
    const productcatic="membership"
    const code = req.body.data.code
    const [socoid,session]=await getoidandsessionbycode(code)
    return await getLatestSKU(code).then(async SKUString=>{

        
        return await getCatgoryoid(productcatic).then(async catoid=>{
            try {
                return await product.findOne({code:code,session:session,ref_category:catoid}).then(async doc=>{
                    if(doc){
                        return wrapResponse(false,"Memembership Product has existed")
                    }else{
                        return await product.create({
                            code:code,
                            ref_society:socoid,
                            ref_category:catoid,
                            product_type:productcatic,
                            product_img_url:[],
                            product_link:[],
                            product_name_chi:"會籍 Membership",
                            product_description_chi:"會籍 Membership",
                            created_by:await getUserOID(req.body.tokeninfo.uid),
                            is_limited:false,
                            sku:SKUString,
                            published:false,
                            session:session,
                            options:[{text:"會籍 Membership",option:["基本會員 Basic Member"]}],
                            product_list:[{name:"基本會員 Basic Member",sku:SKUString+"-000",is_limited:false}],
                            major_only: RegExp("1..","gm").test(code)?true:false
                          
                        }).then((doc)=>{
                            return wrapResponse(true,doc)
                        })
                    }
                })
                
            } catch (error) {
                console.log(error)
                return wrapResponse(false,error.name)
            }
            
        })
        
    })
}
export default createMembershipProduct