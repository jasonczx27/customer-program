class requestVM {
    constructor() {
        this.status="ok";
        this.issuccess=true;
        this.data=null;
        this.datatype=undefined
        this.errortype="ok"
        this.message="the request was successful"
    }



    http_Fail(code, message) {
        this.status="error";
        this.issuccess=false;
        this.statuscode=code;
        this.errortype="http"
        this.message=message? message:"the request failed";
        this.errortype=!code? "Unknown":parseInt(code, 10)===404? "Resource":parseInt(code, 10)>=500&&parseInt(code, 10)<600? "Server":"InvalidReq"
        return this;
    }

    http_Disauthorize(message) {
        this.status="error";
        this.issuccess=false;
        this.statuscode=401;
        this.errortype="Unauthorized"
        this.message=message? message:"Could not authorize you to access this request"
        return this;
    }
    http_Success(data) {
        this.data=data;
        this.statuscode=200;
        this.datatype=data? data.constructor.name:undefined
        return this;
    }
    req_Success(data) {
        this.data=data;
        this.datatype=data? data.constructor.name:undefined
        return this;
    }
    req_Fail(reason, message) {
        this.status="error";
        this.issuccess=false;
        this.errortype=reason? reason:"not defined";
        this.message=message? message:"the request failed";
        return this;
    }
    req_noData() {
        this.status="error";
        this.issuccess=false;
        this.errortype="No data";
        this.message="No data";
        return this;
    }
}
module.exports=requestVM;