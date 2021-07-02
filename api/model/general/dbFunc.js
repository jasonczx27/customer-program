const db = require("./sql")
const requestVM = require("./requestVM")


const Get = async (query, count = false) => {
    const reqResult = new requestVM()
    return new Promise((resolve, reject) => {
        try {
            db.con.query(query, (err, res, fields) => {
                if (err) {

                    reject(reqResult.req_Fail("dbGet", err))
                    return
                }
                if (res) {
                    const datacount = count ? res[0]["COUNT"] : res.length
                    if (datacount < 1) {
                        resolve(reqResult.req_noData())
                        return
                    }
                    resolve(reqResult.req_Success(res))
                    return
                }
            })

        }
        catch (e) {
            reject(reqResult.req_Fail("exception in Get", e))
            return
        }

    })
}

const Create = async (data) => {
    const reqResult = new requestVM()
    return new Promise((resolve, reject) => {
        try {
            const { table = null, object = null } = data
            if (!data || !table || !object || table === "") {
                resolve(reqResult.req_Fail("dbCreate", "Invalid parameter"))
                return;
            }
            let strQ;
            if (object.constructor.name === "Array") {

            }
            else if (object.constructor.name === "Object") {
                let replacer = []
                Object.keys(object).forEach(elem => {
                    replacer.push("?")
                })
                strQ =
                    `INSERT into ${table} (${Object.keys(object)})
                    values (${replacer})`
                console.log(strQ)
            }
            var sql = db.mysql.format(strQ, [...Object.values(object)])
            console.log(sql)
            db.con.query(sql, (err, res, fields) => {
                if (err) {
                    console.log("create customer failed")
                    reject(reqResult.req_Fail("dbCreate", err))
                    return
                }
                if (res) {
                    resolve(reqResult.req_Success(res))
                    return
                }
            })

        }
        catch (e) {
            reject(reqResult.req_Fail("dbGet", e))
            return;
        }

    })

}

const Update = async (data) => {
    const reqResult = new requestVM()
    return new Promise((resolve, reject) => {
        try {
            const { table = null, object = null } = data;
            if (!data || !table || !table == "" || !object) {
                resolve(reqResult.req_Fail("dbUpdate", "Invalid parameter"))
                return;
            }
            let strQ;




        }
        catch (e) {
            reject(reqResult.req_Fail("dbUpdate", e))
            return;
        }
    })
}


module.exports = {
    Get,
    Create,
    Update
}