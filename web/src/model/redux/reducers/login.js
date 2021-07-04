const InitialState={
    signIn: false,
    username: "",
    userid: "",
    usertype: "",
    companyid: ""
};

const login=(state=InitialState, {type, payload}) => {
    let newState={};
    switch (type) {
        case "sign_in":
            newState={
                // ...state,
                signIn: true,
                companyid: payload.companyid,
                username: payload.username,
                userid: payload.userid,
                usertype: payload.usertype,
            };
            break;
        case "sign_out":
            newState=InitialState
            break;
        default:
            newState=state
    }
    return newState;
};

export default login;