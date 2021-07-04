import React, {useRef, useState} from "react"
import {Form, Input, Button, Row, Col, message, Typography} from "antd"
import loginUser from "./controller/Login_C"
import {useDispatch} from 'react-redux';

const {Title}=Typography
export default function Login() {
    const loginUserref=useRef(null)
    const loginPassref=useRef(null)
    const [loading, setLoading]=useState(false)
    const dispatch=useDispatch();
    const LoginFinish=async (data) => {
        setLoading(true)
        const result=await loginUser(data)
        if (result&&result.issuccess&&result.data) {
            message.success("welcome, "+result.data.username)
            dispatch({type: "sign_in", payload: result.data});
        }
        else {
            message.warning("login failed")
        }
        setLoading(false)
    }

    return (<div>
        <Row style={{marginTop: "40vh"}} justify="center" align="middle">
            <Col
                xl={{span: 4}}
                lg={{span: 6}}
                md={{span: 7}}
                xs={{span: 10}}
            >
                <Title level={1}>Login</Title>
                <Form name="loginForm" onFinish={LoginFinish}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                rules={[{required: true, message: "This field is needed: Company ID"}]}
                                preserve={false} required name="companyid">
                                <Input
                                    disabled={loading}
                                    ref={loginUserref}
                                    onPressEnter={() => {loginPassref.current.focus({cursor: "end"})}}
                                    placeholder="Company ID" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                rules={[{required: true, message: "This field is needed: userid"}]}
                                preserve={false} required name="userid">
                                <Input
                                    disabled={loading}
                                    ref={loginUserref}
                                    onPressEnter={() => {loginPassref.current.focus({cursor: "end"})}}
                                    placeholder="User ID" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item noStyle
                        shouldUpdate={(pre, cur) => cur["userid"]||!cur["userid"]||cur["companyid"]||!cur["companyid"]}>
                        {({getFieldValue}) =>

                            getFieldValue()["userid"]&&getFieldValue()["companyid"]?

                                <div>
                                    <Row>
                                        <Col span={24}>


                                            <Form.Item
                                                rules={[{required: true, message: "Password is needed"}]}
                                                preserve={false} required name="password">
                                                <Input
                                                    disabled={loading}
                                                    ref={loginPassref} type="password" placeholder="Password" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row justify="center">
                                        <Col>
                                            <Button
                                                disabled={loading}
                                                loading={loading}

                                                type="link" htmlType="submit" >
                                                {loading? "":"Log in"}
                                            </Button>
                                        </Col>


                                    </Row>
                                </div>:null

                        }


                    </Form.Item>
                </Form>

            </Col>

        </Row>

    </div>)
}