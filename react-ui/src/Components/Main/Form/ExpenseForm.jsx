import React from 'react';
import { Form, Input, Button, Row, Col, Select, InputNumber ,DatePicker} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

const ExpenseForm = () => {

    const onFinish = values => {
        console.log(values);
    }
    return (
        <Form
            name="expense_form"
            
            onFinish={onFinish}
        >
            <Row justify="center">
                <Col xl={11} lg={11} md={24} sm={24} xs={24} >
                    <Form.Item
                        name="type"
                        rules={[{ required: true, message: 'Please select a type!' }]}
                    >
                        <Select placeholder="Type" >
                            <Option value="Income">Income</Option>
                            <Option value="Expense">Expense</Option>
                        </Select>
                    </Form.Item>
                </Col>
                &nbsp;
                <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                    <Form.Item
                        name="category"
                        rules={[{ required: true, message: 'Please select a Category!' }]}
                    >
                       <Select placeholder="Category" >
                            <Option value="Business">Business</Option>
                            <Option value="Salary">Salary</Option>
                        </Select>
                    </Form.Item>
                    
                </Col>
            </Row>
            <Row justify="center">
                <Col xl={11} lg={11} md={24} sm={24} xs={24} >
                    <Form.Item
                        name="amount"
                        rules={[{ required: true, message: 'Please enter the Amount!' }]}
                    >
                        <InputNumber 
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={{width:'100%'}} placeholder="Amount" />
                    </Form.Item>
                </Col>
                &nbsp;
                <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                    <Form.Item
                        name="date"
                        rules={[{ required: true, message: 'Please select a date!' }]}
                    >
                        <DatePicker style={{width:'100%'}} />
                    </Form.Item>
                    
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Create
                    </Button>
                </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default ExpenseForm;
