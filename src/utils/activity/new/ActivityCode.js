import e from "express";
import activity from "../../../models/activity";
import { IntToProdIndex } from "../../serverFunction/basicfunction";
import { getoidandsessionbycode } from "../../serverFunction/getoidbycode";



async function getNextActivityCode(code){
    const [socoid,session] = await getoidandsessionbycode(code)
    activity.findOne({ref_society:socoid,session:session},{_id:0,activity_code:1},{sort:{activity_code:-1},limit:1}).then(doc=>{
        if(doc!==null){
            return `Activity-${code}-${session}-${IntToProdIndex(parseInt(doc.activity_code.split("-").pop()))}`
        }else{
            return `Activity-${code}-${session}-${IntToProdIndex(0)}`
        }
    })
}