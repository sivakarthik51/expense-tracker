import React, { useState } from 'react';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { Form, Input, Button, Card, Col, Row, Steps, Image } from 'antd';
import authenticationService from '../services/authentication.service';
import openNotification from '../Notifications/Notifications';
import QRCode from 'qrcode'
import './Register.css';

const { Step } = Steps;


const Register = () => {
  const [qrcode, setQrcode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [disableStep, setDisableStep] = useState(false);

  const onFinish = values => {
    setLoading(true);
    authenticationService.register(values.name, values.email, values.password, values.confirmPassword)
      .then(
        data => {
          console.log(data);
          QRCode.toDataURL(data.qrcode, (err, data_url) => {
            setQrcode(data_url);
          });
          setLoading(true);
          setCurrent(1);
          setDisableStep(!disableStep);
        },
        error => {
          console.log(error.message);
          setLoading(false);
          openNotification('error', 'Error', error || error.message);
        }
      )
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onStepChange = currentStep => {
    setCurrent(currentStep);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>

      <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ padding: '40px' }}>
        <Card className="register-card" hoverable title="Create New User" >
          <Steps
            type="navigation"
            size="small"
            current={current}
            onChange={onStepChange}
            className="site-navigation-steps"
          >
            <Step
              title="Register"
              status={current!==0 ? "finish":"process"}
              description="Enter Basic Details"
              disabled={disableStep}
            />
            <Step
              title="2FA"
              status="process"
              description="QR Code for 2FA"
              disabled={!disableStep}
            />

          </Steps>
          <br />
          {current === 0 ? <Form

            className="register-form"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item

              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter your name!'
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
            </Form.Item>

            <Form.Item

              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                  type: 'email'
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>

            <Form.Item

              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please choose a password!',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </Form.Item>
            <Form.Item

              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Confirm Password',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
            </Form.Item>


            <Form.Item >
              <Button type="primary" htmlType="submit" loading={loading} icon={<LoginOutlined />} className="register-form-button">
                Sign Up
              </Button>
            </Form.Item>
          </Form> :
            <Row justify="center" align="middle" style={{ minHeight: '30vh' }}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ padding: '20px' }}>
                <Image src={qrcode} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ padding: '20px' }}>

                <p>Scan this QR code using your preferred Authenticator App and proceed to Login</p>
                <Button type="primary" href="/login">Login</Button>

              </Col>


            </Row>}

        </Card>
      </Col>
    </Row>
  )
}
export default Register;
