import {Fetch} from "../model/request";
import requestVM from "../model/requestVM"
const md5=require("md5")
export const getCustomers=async (auth) => {
    const reqResult=new requestVM()
    try {
        const req=await Fetch({data: {}, auth: auth, action: "getAllUsers"})
        const result=req!==undefined? await req.json():{
            message: "We encountered an internal problem.",
            issuccess: false
        };
        return result
    } catch (e) {
        return reqResult.req_Fail("Exception while getting Customers", e)
    }

}

export const createCustomer=async (data, auth) => {
    const reqResult=new requestVM()
    try {
        let newData=data;
        newData.password=md5(data.password)
        const req=await Fetch({data: newData, auth: auth, action: "createUser"})
        const result=req!==undefined? await req.json():{
            message: "We encountered an internal problem.",
            issuccess: false
        };
        return result
    } catch (e) {
        return reqResult.req_Fail("Exception while creating customer", e)
    }

}

export const updateCustomer=async (data, auth) => {
    const reqResult=new requestVM()
    try {

        const req=await Fetch({data: data, auth: auth, action: "updateUser"})
        const result=req!==undefined? await req.json():{
            message: "We encountered an internal problem.",
            issuccess: false
        };
        return result
    } catch (e) {
        return reqResult.req_Fail("Exception while creating customer", e)
    }
}
export const deleteCustomer=async (data, auth) => {
    const reqResult=new requestVM()
    try {
        const newData={userid: data.userid, companyid: auth.companyid}
        const req=await Fetch({data: newData, auth: auth, action: "deleteUser"})
        const result=req!==undefined? await req.json():{
            message: "We encountered an internal problem.",
            issuccess: false
        };
        return result
    } catch (e) {
        return reqResult.req_Fail("Exception while creating customer", e)
    }
}
