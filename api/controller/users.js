const requestVM=require("../model/general/requestVM")
const database=require("../model/general/dbFunc")
const db=require("../model/general/sql")
const dbT="customersdetails"
const md5=require("md5")

module.exports=function () {


    this.deactivateuser=async (data, auth) => {
        const {userid=null}=data
        try {
            if (!userid) {
            }
            let result=await database.Update({
                set: [{"status": 1}],
                where: [{}]

            })

        }
        catch (e) {

        }


    },

        this.getAllUsers=async (data, auth) => {
            let reqResult=new requestVM()
            try {

                if (!auth||!auth.userid||!auth.usertype||auth.usertype!=="ROOT") {
                    return reqResult.http_Disauthorize("invalid user access")
                }
                let query=`Select userid,username,usertype,status from ${dbT} where companyid='${auth.companyid}'`
                let result=await database.Get(query)
                return result
            }
            catch (e) {
                console.log(e)
                return reqResult.req_Fail("Exception while getting Customers", e)

            }
        },

        this.createUser=async (user, auth) => {
            let reqResult=new requestVM()
            try {

                if (!auth||!auth.userid||!auth.usertype||auth.usertype!=="ROOT") {
                    return reqResult.http_Disauthorize("invalid user access")
                }
                let datauser=user;
                datauser.companyid=auth.companyid
                // datauser.password=md5(user.password)
                let result=await database.Create({table: dbT, object: datauser});
                return reqResult.req_Success(result)
            }
            catch (e) {
                console.log("exception on create user")
                return reqResult.req_Fail(e.errortype??"createUser", e)
            }
        },

        this.deleteUser=async (data, auth) => {
            let reqResult=new requestVM()
            try {

                if (!auth||!auth.userid||!auth.usertype||auth.usertype!=="ROOT") {
                    return reqResult.http_Disauthorize("invalid user access")
                }
                // datauser.password=md5(user.password)
                let result=await database.Delete({table: dbT, object: data});
                return reqResult.req_Success(result)
            }
            catch (e) {
                console.log("exception on delete user")
                return reqResult.req_Fail(e.errortype??"createUser", e)
            }

        },
        this.updateUser=async (user, auth) => {
            let reqResult=new requestVM()
            try {

                if (!auth||!auth.userid||!auth.usertype||auth.usertype!=="ROOT") {
                    return reqResult.http_Disauthorize("invalid user access")
                }
                // datauser.password=md5(user.password)
                let result=await database.Update({table: dbT, object: user});
                return reqResult.req_Success(result)
            }
            catch (e) {
                console.log("exception on update user")
                return reqResult.req_Fail(e.errortype??"createUser", e)
            }
        }
}

