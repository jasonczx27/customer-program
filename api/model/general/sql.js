const mysql = require("mysql")
const requestVM = require("./requestVM")

const con = mysql.createConnection({
    host: "db4free.net",
    user: "jasonczx27",
    port: "3306",
    password: "pwdforDB123",
    database: "general_database"
})

con.connect(function (err) {
    if (err) {
        console.log(err)
        throw err
    }
    console.log("database connected")

})


module.exports = {
    con,
    mysql
}