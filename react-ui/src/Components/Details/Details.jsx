import React from 'react';
import { Card, Statistic } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import './Details.css';

const Details = ({ title }) => {
    return (
        <Card bordered={true} hoverable title={title} >
            <Statistic title="Income (INR)" value={112893} precision={2} />
            
        </Card>
    );
}

export default Details;
