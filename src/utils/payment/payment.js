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
}