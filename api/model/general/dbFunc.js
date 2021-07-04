const db=require("./sql")
const requestVM=require("./requestVM")


const Get=async (query, count=false) => {
    const reqResult=new requestVM()
    return new Promise((resolve, reject) => {
        try {
            db.con.query(query, (err, res, fields) => {
                if (err) {

                    reject(reqResult.req_Fail("dbGet", err))
                    return
                }
                if (res) {
                    const datacount=count? res[0]["COUNT"]:res.length
                    if (datacount<1) {
                        resolve(reqResult.req_noData())
                        return
                    }

                    resolve(reqResult.req_Success(res.length&&res.length===1? res[0]:res))
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

const Create=async (data) => {
    const reqResult=new requestVM()
    return new Promise((resolve, reject) => {
        try {
            const {table=null, object=null}=data
            if (!data||!table||!object||table==="") {
                resolve(reqResult.req_Fail("dbCreate", "Invalid parameter"))
                return;
            }
            let strQ;
            if (object.constructor.name==="Array") {

            }
            else if (object.constructor.name==="Object") {
                let replacer=[]
                Object.keys(object).forEach(elem => {
                    replacer.push("?")
                })
                strQ=
                    `INSERT into ${table} (${Object.keys(object)})
                    values (${replacer})`
            }
            const sql=db.mysql.format(strQ, [...Object.values(object)])
            db.con.query(sql, (err, res, fields) => {
                if (err) {
                    reject(reqResult.req_Fail(err.code, err))
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

const Update=async (data) => {
    const reqResult=new requestVM()
    return new Promise((resolve, reject) => {
        try {
            const {table=null, object=null}=data;
            if (!data||!table||table==""||!object) {
                reject(reqResult.req_Fail("dbUpdate", "Invalid parameter"))
                return;
            }
            let strQ;
            var SETstr="";
            var Querystr="";
            var replacer=[]
            Object.keys(object.object).forEach((elem, i) => {
                SETstr+=`${elem}=? ${(i+1)<Object.keys(object.object).length? ",":""}`;
                replacer.push(object.object[elem])
            })
            if (object.query) {
                Object.keys(object.query).forEach((query, i) => {
                    Querystr+=`${query}=? ${(i+1)<Object.keys(object.query).length? " AND ":""}`
                    replacer.push(object.query[query])
                })
            }
            strQ=
                `UPDATE ${table} SET ${SETstr} WHERE ${Querystr}`
            const sql=db.mysql.format(strQ, replacer)
            db.con.query(sql, (err, res, fields) => {
                if (err) {
                    reject(reqResult.req_Fail(err.code, err))
                    return
                }
                if (res) {
                    resolve(reqResult.req_Success(res))
                    return
                }
            })
        }
        catch (e) {
            console.log(e)
            reject(reqResult.req_Fail("dbUpdate", e))
            return;
        }
    })
}
const Delete=async (data) => {
    const reqResult=new requestVM()
    return new Promise((resolve, reject) => {
        try {
            const {table=null, object=null}=data;
            if (!data||!table||table==""||!object) {
                reject(reqResult.req_Fail("dbDelete", "Invalid parameter"))
                return;
            }
            let strQ;
            var Querystr="";
            var replacer=[]
            Object.keys(object).forEach((elem, i) => {
                Querystr+=`${elem}=? ${(i+1)<Object.keys(object).length? " AND ":""}`;
                replacer.push(object[elem])
            })

            strQ=
                `DELETE FROM ${table} WHERE ${Querystr}`
            const sql=db.mysql.format(strQ, replacer)
            db.con.query(sql, (err, res, fields) => {
                if (err) {
                    reject(reqResult.req_Fail(err.code, err))
                    return
                }
                if (res) {
                    resolve(reqResult.req_Success(res))
                    return
                }
            })
        }
        catch (e) {
            console.log(e)
            reject(reqResult.req_Fail("dbUpdate", e))
            return;
        }
    })

}

module.exports={
    Get,
    Create,
    Update,
    Delete
}