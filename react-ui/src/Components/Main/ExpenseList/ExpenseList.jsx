import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Button, Avatar, Spin } from 'antd';
import {DeleteOutlined, MoneyCollectOutlined, TransactionOutlined} from '@ant-design/icons';

import './ExpenseList.css';


const ExpenseList = () => {
    const transactions = [
        {id:1,type:'Income', category:'Salary',amount:100,date:new Date()},
        {id:2,type:'Expense', category:'Salary',amount:100,date:new Date()},
        {id:3,type:'Income', category:'Salary',amount:100,date:new Date()},
        {id:4,type:'Income', category:'Salary',amount:100,date:new Date()},
        {id:5,type:'Income', category:'Salary',amount:100,date:new Date()},
        {id:6,type:'Income', category:'Salary',amount:100,date:new Date()}

    ];
    return (
        <div className="infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          useWindow={false}
        >
          <List
            dataSource={transactions}
            renderItem={item => (
              <List.Item key={item.id}
              actions={[<Button type="danger" shape="circle" key="delete" icon={<DeleteOutlined />} />]}>
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ backgroundColor: item.type === 'Income'?'#87d068': '#f56a00'}} icon={item.type === 'Income'?<MoneyCollectOutlined />:<TransactionOutlined />} />
                  }
                  title={item.category}
                  description={`$${item.amount} - ${item.date}`}
                />
                
              </List.Item>
            )}
          >
          </List>
        </InfiniteScroll>
      </div>
    )
}

export default ExpenseList;
