const app = require('express')();
// var http = require('http').Server(express);
const port = process.env.PORT || 8000;
const path = require('path');

const cors = require('cors');

const server = require('http').createServer(app);
server.listen(port, () => {
    console.log("listening at PPPPORRT", port)
})
app.use(cors())

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const initiateMe = require("./controller/initScript")
const gateway = require("./controller/general/gateway")
const AUTH = require("./controller/auth")
const requestVM = require("./model/general/requestVM")
const init = async () => {
    let result = await initiateMe.initUser()
    if (result && result.issuccess) {
        console.log("database initiating successful")
    }
    else {
        console.log("database initiating failed")
    }
}
init()

app.post("/controls", (req, res, next) => {
    if (req.body.auth) {
        next()
    }
    let reqResult = new requestVM().http_Disauthorize("Not Authorized")
    res.status(reqResult.statuscode).json(reqResult)

}, gateway.gateway)

app.post("/login", (req, res) => {
    let reqResult = new requestVM()
    try {
        const data = req.body.data ?? null;
        if (!data) {
            let result = reqResult.http_Fail(400, "invalid payload")
            res.status(result.statuscode).json(result)
            return
        }
    }
    catch (e) {
        let result = reqResult.http_Fail(500, e)
        res.status(result.statuscode).json(result)
    }
})



