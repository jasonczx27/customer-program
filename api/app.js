const app=require('express')();
// var http = require('http').Server(express);
const port=process.env.PORT||8000;
const path=require('path');

const cors=require('cors');

const server=require('http').createServer(app);
server.listen(port, () => {
    console.log("listening at PPPPORRT", port)
})
app.use(cors())
const express=require("express")
app.use(express.urlencoded())
app.use(express.json())

const initiateMe=require("./controller/initScript")
const gateway=require("./controller/general/gateway")
const AUTH=require("./controller/auth")
const requestVM=require("./model/general/requestVM");
const {Router}=require('express');
const init=async () => {
    let result=await initiateMe.initUser()
    if (result&&result.issuccess) {
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
    else {

        let reqResult=new requestVM().http_Disauthorize("Not Authorized")
        res.status(reqResult.statuscode).json(reqResult)
    }

}, gateway.gateway)

app.post("/login", async (req, res) => {
    let reqResult=new requestVM()
    try {
        const data=req.body.data??null;
        if (!data) {
            let result=reqResult.http_Fail(400, "invalid payload")
            res.status(result.statuscode).json(result)
            return
        }

        let result=await AUTH.loginUser(data);
        if (result&&result.issuccess) {
            res.status(200).json(reqResult.req_Success(result.data))
        }
        else {

            res.status(404).json(result)
        }
    }
    catch (e) {
        console.log(e)
        let result=reqResult.http_Fail(500, e)
        res.status(result.statuscode).json(result)
    }
})



