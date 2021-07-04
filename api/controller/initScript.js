const requestVM=require("../model/general/requestVM")
const md5=require("md5")
const database=require("../model/general/dbFunc")
const db=require("../model/general/sql")
const dbT="userdetail"


const initUser=async () => {
    let reqResult=new requestVM()
    try {
        let query=`Select COUNT(*) as COUNT from ${dbT} where usertype = "ROOT"`
        let result=await database.Get(query, true)
        if (result.issuccess) {
            return result;
        }
        else if (!result.issuccess&&result.errortype&&result.errortype=="No data") {
            console.log("no data, creating root user")
            let rootuser=await createRootuser()
            return rootuser;
        }
    }
    catch (e) {
        return reqResult.req_Fail("api/user/initUser", e)
    }
}



module.exports={
    initUser
}

//#region  Hidden
const createRootuser=async () => {
    let reqResult=new requestVM()
    try {
        let rootobj={
            "userid": "root",
            "username": "Master",
            "password": md5("root"),
            "usertype": "ROOT",
            "companyid": "AHC"
        }
        let result=await database.Create({table: dbT, object: rootobj});
        return reqResult.req_Success(result)

    }
    catch (e) {
        return reqResult.req_Fail("api/controller/user", e)

    }
}

//#endregion