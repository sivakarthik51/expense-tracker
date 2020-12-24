const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    type: {
        type:String,
        required:true,
    },
    category: {
        type:String,
        required:true,
    },
    amount: {
       type: Number,
       required:true,
       min: 0,
       default:0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    email: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Expense',expenseSchema);