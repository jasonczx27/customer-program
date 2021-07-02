const requestVM = require("../model/general/requestVM")
const database = require("../model/general/dbFunc")
const db = require("../model/general/sql")
const dbT = "customers"


const deactivateuser = async (data, auth) => {
    const { userid = null } = data
    try {
        if (!userid) {

        }
        let result = await database.Update({
            set: [{ "status": 1 }],
            where: [{}]

        })

    }
    catch (e) {

    }


}

const getAllUsers = async (data, auth) => {
    let reqResult = new requestVM()
    try {
        const { usertype = null, userid = null } = data
        if (!usertype || !userid || usertype !== "ROOT") {
            return reqResult.http_Disauthorize("invalid user access")
        }
        let query = `Select userid,username,usertype,status from ${dbT}`
        let result = await database.Get(query)
        return result
    }
    catch (e) {

    }
}

const createUser = async (user, auth) => {
    let reqResult = new requestVM()
    try {
        let result = await database.Create({ table: dbT, object: user });
        return reqResult.req_Success(result)
    }
    catch (e) {
        return reqResult.req_Fail("createUser", e)
    }
}

const deleteUser = async (data, auth) => {


}



module.exports = function () {
    createUser,
        getAllUsers,
        deactivateuser,
        deleteUser

}

