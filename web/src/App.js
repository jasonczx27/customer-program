import './App.css';
import "antd/dist/antd.css"
import React, {useEffect, useState} from "react"
import {isMobile} from "react-device-detect"
import {useSelector, useDispatch} from "react-redux"
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Panel from './view/customerPanel';
import Login from './Login';
import {Layout, Radio, Space, Row, Col, message, Button} from "antd"
import {
  LinkedinFilled,
  EyeFilled,
  EyeOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const {Header, Content, Footer}=Layout
message.config({maxCount: 3})
function App() {
  const [theme, setTheme]=useState("dark");
  const state=useSelector(state => state)
  const dispatch=useDispatch();
  const radioTheme=[
    {
      label: <Space>
        <EyeOutlined />{(() => {return (isMobile? null:"Light On")})()}
      </Space>
      , value: "light"
    },
    {
      label: <Space>
        <EyeFilled />{(() => {return (isMobile? null:"Light Off")})()}
      </Space>, value: "dark"
    }
  ]

  function changeTheme(e) {
    let tmp=e.target.value
    setTheme(tmp);
    localStorage.setItem("myTheme", tmp)
  }

  const logout=() => {
    dispatch({
      type: "sign_out"
    })
  }

  useEffect(() => {
    let myTheme=localStorage.getItem("myTheme");
    if (!myTheme||!["dark", "light"].includes(myTheme)) {
      localStorage.setItem("myTheme", theme)
    }
    else {
      setTheme(myTheme)
    }
    window.addEventListener("storage", async () => {
      var localstorage_theme=localStorage.getItem("myTheme")
      if (["dark", "light"].includes(localstorage_theme)) {
        setTheme(localstorage_theme)
      }
    })


  }, [])
  return (
    <Layout className={`${theme} App`} style={{minHeight: "100vh"}}>
      <Header>
        <Row align="middle" justify="start">
          <Col span={18}>
            <Row>

              <Radio.Group
                size="small"
                options={radioTheme}
                onChange={changeTheme}
                value={theme}
                optionType="button"
              />
            </Row>
          </Col>
          <Col span={2} push={2}>
            {
              state.signIn?

                <Row>
                  <Button icon={<LogoutOutlined />} onClick={logout} title={`Logout ${state.username}`} >Logout</Button>
                </Row>:null
            }
          </Col>

        </Row>
      </Header>
      <Content style={{minHeight: "87vh"}}>
        <BrowserRouter>
          {(() => {
            if (state.signIn) {
              return (
                <React.Fragment>
                  <Route path="/panel">
                    <Panel identity={state} />
                  </Route>
                  <Route sensitive path="/">
                    <Redirect to="/panel" />
                  </Route>
                </React.Fragment>
              )
            }
            else {
              return (
                <div>
                  <Route path="/Login">
                    <Login />
                  </Route>
                  <Route sensitive path="/">
                    <Redirect to="Login">
                    </Redirect>
                  </Route>
                </div>

              )
            }

          })()}
        </BrowserRouter>

      </Content>
      <Footer>
        <Row>
          <Col>
            <a href="https://www.linkedin.com/in/zhe-xuan-chong/" target="_blank">
              <LinkedinFilled />
              {" "} Follow my Linkedin
            </a>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default App;
