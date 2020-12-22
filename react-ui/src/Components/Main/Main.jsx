import React from 'react';
import { Card, Divider, Statistic } from 'antd';
import { Typography } from 'antd';
import ExpenseForm from './Form/ExpenseForm';
import ExpenseList from './ExpenseList/ExpenseList';


const { Paragraph } = Typography;

const Main = () => {
    return (
       <Card hoverable title="Expense Tracker" extra={<a rel="noreferrer" target="_blank" href="http://speechly.com/">Powered by Speechly</a>} bordered={false}>
            <Statistic title="Total Balance (INR)" value={112893} precision={2} />
            <Divider />
            <Paragraph>
                Try Saying: Add income for 100 rupees in Category Salary for Monday
            </Paragraph>
            <ExpenseForm />
            <ExpenseList />
            
       </Card>
    )
}

export default Main;
