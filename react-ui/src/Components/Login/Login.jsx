import React, { useState } from 'react';
import { UserOutlined, LockOutlined, LoginOutlined , ClockCircleOutlined } from '@ant-design/icons';
import { authenticationService } from '../services'
import './Login.css';
import { Form, Input, Button, Card, Col, Row, Steps } from 'antd';
import openNotification from '../Notifications/Notifications';
import {
  useLocation,
} from "react-router-dom";


const useConstructor = (callBack = () => { }) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

const Login = ({ history }) => {

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useConstructor(() => {
    if (authenticationService.currentUserValue) {
      history.push('/');
    }
  });


  const onFinish = values => {
    setLoading(true);
    authenticationService.login(values.username, values.password, values.token)
      .then(
        user => {
          const { from } = location.state || { from: { pathname: "/" } };
          history.push(from);
          setLoading(false);
        },
        error => {
          console.log(error.message);
          setLoading(false);
          openNotification('error', 'Error', error || error.message);
        }
      );
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ padding: '40px' }}>
        <Card className="login-card" hoverable title="Login" >
          <Form

            className="login-form"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item

              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                  type: 'email'
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item

              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </Form.Item>

            <Form.Item

              name="token"
              rules={[
                {
                  required: true,
                  message: 'Please enter token!'
                },
              ]}
            >
              <Input prefix={<ClockCircleOutlined className="site-form-item-icon" />} placeholder="Token" />
            </Form.Item>


            <Form.Item >
              <Button type="primary" htmlType="submit" loading={loading} icon={<LoginOutlined />} className="login-form-button">
                Login
              </Button>
              Or <a href="/register">Register Now!</a>
            </Form.Item>
          </Form> 
        </Card>
      </Col>
    </Row>

  )
}

export default Login;