const requestVM = require("../../model/general/requestVM")
require("../users")();

module.exports = {
    gateway: async function(req, res, next) {
        var act = req.body.action || ''; //Gateway had to
        var data = req.body.data || null;
        var auth = req.body.auth || null;

        try {
            if (!act) {
                const reqResult = new requestVM().http_Disauthorize("unauthorized acces")
                return res.status(reqResult.statuscode).json(reqResult)
            }
            var fn = eval(`var f = function(){ return ${act}; }; f();`);
            var result = await controller(data, auth, fn);
            return res.status(result.statuscode ?? 200).json(result);
        } catch (e) {
            const reqResult = new requestVM().http_Fail(500, e)
            console.log(`
            Encountered exceptions in gateway. Error as below:
            ${e}`);

            return res.status(reqResult.statuscode).json(reqResult);
        }
    }
}

//------ Internal Function ------//
async function controller(data, auth, callback) {
    let reqResult = new requestVM()
    if (callback && typeof callback === "function") {
        //AUTH to be used in controllers
        var result = await callback(data, auth);
        return result;
    } else {
        return reqResult.req_Fail("api/controller/gateway", "invalid request");
    }
}