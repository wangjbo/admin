import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Spin, Button, Icon, message, Input } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../static/css/Login.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import servcePath from '../config/apiUrl';
import axios from 'axios'
import { Route } from 'react-router-dom';


function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    function checkLogin() {
        setIsLoading(true)
        // 发送axios请求来判断
        if (!username || !password) {
            message.error('用户名或密码为空，请重新输入')
            setIsLoading(false)
            return false;// return 干啥啊
        }
        let dataProps = {
            username,
            password
        }

        setTimeout(() => {
            setIsLoading(false)
            message.error('连接错误')
        }, 10000);


        axios({
            method: 'post',
            url: servcePath.checkLogin,
            data: dataProps,
            withCredentials: true,
            // 'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Credentials": true,
            // "Access-Control-Allow-Headers": "Authorization,Origin, X-Requested-With, Content-Type, Accept",
            // "Access-Control-Allow-Methods": "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
        }).then(
            (res) => {
                setIsLoading(false)
                if (res.data.data == '登录成功') {
                    props.history.push('/index')
                } else {
                    message.error('用户名或密码错误')
                }
            }
        )


    }

    return (
        <div className='login-div'  >
            <Spin size='large' tip='正在加载中' spinning={isLoading}>
                <Card style={{ width: 400 }} title='博客登录系统' bordered={true}>
                    <Input
                        id='username'
                        size='large'
                        placeholder='请输入用户名'
                        prefix={<UserOutlined />}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <br /><br />
                    <Input.Password
                        id='password'
                        size='large'
                        placeholder='请输入密码'
                        prefix={<KeyOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <br /><br />
                    <Button type='primary' size="large" block onClick={checkLogin}>登录</Button>
                </Card>
            </Spin>
        </div>
    )

}

export default Login