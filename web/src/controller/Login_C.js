import {FetchLogin} from "../model/request";
import requestVM from "../model/requestVM"
const md5=require("md5")
export default async function loginUser(data) {
    const reqResult=new requestVM()
    try {

        const {password=null, userid=null, companyid=null}=data
        if (!password||!userid||!companyid) {
            return reqResult.req_Fail("loginUser", "incomplete information, try again")
        }
        let logindata={
            userid: userid,
            password: md5(password),
            companyid: companyid
        }

        const req=await FetchLogin({data: logindata})
        const result=req!==undefined? await req.json():{
            message: "We encountered an internal problem.",
            issuccess: false
        };
        return result
    } catch (e) {
        return reqResult.req_Fail("Exception in login user", e)
    }

}