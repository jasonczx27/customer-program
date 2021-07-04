const requestVM=require("../model/general/requestVM")
const database=require("../model/general/dbFunc")
const db=require("../model/general/sql")
const dbT="userdetail"


const loginUser=async (data) => {
    let reqResult=new requestVM()
    try {
        let query=`Select userid, username, companyid,usertype from ${dbT} where userid=? and password=? and companyid = ? and status=1`
        query=db.mysql.format(query, [data.userid, data.password, data.companyid]);
        let result=await database.Get(query, true)
        return result
    } catch (e) {
        return reqResult.req_Fail("api/user/loginUser", e)
    }
}


module.exports={
    loginUser
}