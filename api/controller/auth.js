const requestVM = require("../model/general/requestVM")
const database = require("../model/general/dbFunc")
const db = require("../model/general/sql")
const dbT = "customers"


const loginUser = async (data, auth) => {
    let reqResult = new requestVM()
    try {
        let query = `Select COUNT(*) as COUNT from ${dbT} where userid=? and password=? and status=1`
        query = db.mysql.format(query, [data.userid, data.password]);
        let result = await database.Get(query, true)
        return result
    }
    catch (e) {
        return reqResult.req_Fail("api/user/loginUser", e)
    }
}



module.exports = function () {
    loginUser
}

