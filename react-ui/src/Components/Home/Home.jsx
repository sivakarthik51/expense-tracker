import React from 'react';
import { Layout, Menu, Row,Col } from 'antd';


import {LogoutOutlined,DownCircleOutlined ,UpCircleOutlined} from '@ant-design/icons';
import authenticationService from '../services/authentication.service';
import Details from '../Details/Details';
import Main from '../Main/Main';
import './Home.css';

const { Header, Content, Footer } = Layout;


const Home = () => {
  const user = authenticationService.currentUserValue;
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Expenses</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">{user.name}</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '40px 50px' }}>
     
      <div className="site-layout-content">
        <Row gutter={16} justify="center">
        <Col xxl={8} xl={8} lg={8} sm={16} xs={24} >
          <Details title="Income" />
        </Col>
        <Col xxl={8} xl={8} lg={8} sm={16} xs={24}>
          <Main />
        </Col>
        <Col xxl={8} xl={8} lg={8} sm={16} xs={24}>
          <Details title="Expense" />
        </Col>
      </Row>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center',backgroundColor:'#001529',color:'white' }}>Expense Tracker ©2020 Created by Siva Karthik</Footer>
  </Layout>
  )
}
export default Home;
