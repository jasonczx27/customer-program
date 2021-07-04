
import React, {useEffect, useState} from "react"
import {List, Card, Form, Divider, Select, Input, Modal, Row, Button, Col, Drawer, Typography, message} from "antd"
import {getCustomers, createCustomer, updateCustomer, deleteCustomer} from "../controller/Customer_C"
import {
    SettingOutlined,
    DeleteOutlined,
    WarningOutlined
} from '@ant-design/icons';

const {Title}=Typography
const {Meta}=Card
const {confirm}=Modal;

const {Option}=Select
export default function Panel(props) {
    const [loading, setLoading]=useState(false)
    const [customers, setCustomers]=useState([])
    const [drawervisible, setDrawerVisible]=useState(false)
    const [formCust, setFormCust]=useState(null)
    //#region functions
    const getAllCustomer=async () => {
        setLoading(true)
        let result=await getCustomers(props.identity);
        if (result&&result.issuccess) {
            if (result.data.length) {
                setCustomers(result.data)
            }
            else {
                let newarr=[]
                newarr.push(result.data)
                setCustomers(newarr)
            }
        }
        else {
            message.warning("No data or could not get data")
            setCustomers([])
        }
        setLoading(false)
    }
    const confirmDelete=(customer) => {
        confirm({
            icon: <WarningOutlined />,
            content: `Are you sure to delete customer ${customer.username}?`,
            onOk: async () => {
                setLoading(true)
                message.info("Deleting customer "+customer.username)
                const result=await deleteCustomer(customer, props.identity)

                if (result&&result.issuccess) {
                    getAllCustomer()
                }
                else {
                    message.warning("Operation failed, customer is not deleted")
                    setLoading(false)
                }
                Modal.destroyAll()

            }
        })
    }
    const addCustomer=() => {
        setDrawerVisible(true)
        setFormCust(null)
    }
    const eDitCustomer=(customer) => {
        setDrawerVisible(true)
        setFormCust(customer)
    }
    const formFinished=async (data) => {
        setLoading(true)
        if (formCust) {
            let newData={};
            newData.object=data;
            newData.query={
                companyid: props.identity.companyid,
                userid: formCust.userid

            }
            let result=await updateCustomer(newData, props.identity)
            if (result&&result.issuccess) {
                message.success("Operation successful")
                setDrawerVisible(false)
                getAllCustomer()
            }
            else {
                message.error("Could not finish the operation")
                setLoading(false)

            }

        }
        else {
            let result=await createCustomer(data, props.identity)
            if (result&&result.issuccess) {
                message.success("Operation successful")
                setDrawerVisible(false)
                getAllCustomer()
            }
            else {
                message.error(result.errortype==="ER_DUP_ENTRY"? "You might have created this user before!":"Could not finish the operation")
                setLoading(false)
            }
        }
    }
    //#endregion functions
    //#region useEffect
    useEffect(() => {
        getAllCustomer()


    }, [])

    //#endregion useEffect
    //#region Form
    const Custform=() => {
        const [custForm]=Form.useForm()
        useEffect(() => {
            if (formCust) {
                custForm.setFieldsValue(formCust)
            }
            return () => {
                custForm.resetFields()
            }
        }, [])


        return (
            <Form
                labelCol={6}
                onFinish={formFinished}
                form={custForm}
                name="customerForm"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}>
                {formCust?

                    <Title>{formCust.userid}</Title>

                    :
                    <Form.Item
                        rules={[{required: true, message: "This field is required: User ID"}]}
                        name="userid" label="UserID">
                        <Input />
                    </Form.Item>
                }

                <Form.Item
                    rules={[{required: true, message: "This field is required: User Name"}]}
                    name="username" label="User Name">
                    <Input />
                </Form.Item>

                <Form.Item
                    rules={[{required: true, message: "This field is required: User Type"}]}
                    name="usertype" label="User Type"
                    initialValue="user"
                >
                    <Select>

                        <Option value="user">User</Option>
                        <Option value="vip">VIP</Option>
                        <Option value="subuser">Sub-user</Option>
                    </Select>
                </Form.Item>


                {
                    formCust? null:

                        <Form.Item
                            rules={[{required: true, message: "This field is required: Password"}]}
                            name="password" label="Set a Password">
                            <Input type="password" />
                        </Form.Item>

                }

                <Form.Item>
                    <Button disabled={loading} type="default" htmlType="reset">Reset</Button>
                    <Divider type="vertical" />
                    <Button disabled={loading} type="primary" htmlType="submit">{loading? "Wait":formCust? "Submit Changes":"Create"}</Button>
                </Form.Item>
            </Form>)
    }
    //#endregion Form
    return (
        <React.Fragment>
            <Row style={{marginBottom: "15px"}}>
                <Title level={1}>Customer Panel</Title>
                <Button disabled={loading} block onClick={() => {addCustomer()}}>Add customer</Button>
            </Row>
            <Row justify="center">
                <List
                    loading={loading}
                    style={{minWidth: "85vw"}}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 6,
                    }}
                    dataSource={customers}
                    renderItem={customer => (
                        <List.Item>
                            <Card

                                hoverable
                                actions={[<SettingOutlined title="edit" onClick={() => {eDitCustomer(customer)}} />,
                                <DeleteOutlined onClick={() => {confirmDelete(customer)}} title="Disactive customer" />
                                ]}
                            >
                                <Meta
                                    description={(<React.Fragment>
                                        <Row justify="center">
                                            <Col>
                                                <b>{customer.username}</b>
                                            </Col>
                                        </Row>
                                    </React.Fragment>)}
                                />

                            </Card>
                        </List.Item>)}

                />
            </Row>

            <Drawer
                maskClosable={!loading}
                closable={!loading}
                placement="bottom"
                height="50vh"
                visible={drawervisible}
                destroyOnClose
                onClose={() => {
                    setDrawerVisible(false)
                    setFormCust(null)
                }}
                title={"Add/Edit customer"}
            >
                <Custform />
            </Drawer>
        </React.Fragment>
    )

}