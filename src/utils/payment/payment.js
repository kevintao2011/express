import { paymentMethod } from "../../models/paymentMethod.js";
import society from "../../models/society.js";
import { wrapResponse } from "../serverFunction/basicfunction.js";
import { getoidandsessionbycode } from "../serverFunction/getoidbycode.js";
export default class Payment{
    async getPaymentMethods(code){
        return await getoidandsessionbycode(code).then(async oidnsession=>{
            const oid=oidnsession[0]
            const session=oidnsession[1]
            console.log("oid",oidnsession)
            return await paymentMethod.findOne({ref_society:oid}).then(async method=>{
                console.log("method",method)
                if(method!=null){
                    return wrapResponse(true,method)
                }else{
                    return await paymentMethod.create({ref_society:oid}).then(doc=>{
                        return wrapResponse(true,doc)
                    })
                }
            })
        })
    }
    /**
     * Get Payment Details of the society, create payment info if false
     * @param {string} oid  
     * @returns {object} 
     */
    async editPaymentMethods(oid){
        return await getoidandsessionbycode(oid).then(async (oid,session)=>{
            return await paymentMethod.findOne({ref_soc:oid}).then(async method=>{
                if(method!=undefined){
                    return wrapResponse(true,method)
                }else{
                    return await paymentMethod.create({ref_society:oid}).then(doc=>{
                        return wrapResponse(true,doc)
                    })
                }
            })
        })
    }

    /**
     * Get Payment Details of the society
     * @param {string} oid  of the society
     * @param {object} info update Info 
     * @returns {object} {success:bool,data:obj||string}
     */
    async updatePaymentDetials(oid,info){
        console.log("data",oid,info)
        return await getoidandsessionbycode(oid).then(async ([oid,session])=>{
            console.log(oid,session)
            return await paymentMethod.updateOne({ref_society:oid},info).then(async result=>{
                console.log(result)
                if(result.modifiedCount>=1){
                    return wrapResponse(true,"updated")
                }else{
                    return wrapResponse(true,"did not update")
                }
            })
        })
    }

}