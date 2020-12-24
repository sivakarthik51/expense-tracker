const router = require('express').Router();

const Expense = require('../model/Expense');
const {expenseValidation} = require('../validation');
const verifyToken = require('./verifyToken');

router.get('/',verifyToken,async(request,response) => {
    if(!request.user){
        return response.status(401).send('Unauthorized');
    }
    const { email } = request.user;
    const expenses = await Expense.find({ email });
    response.send(expenses);

})

router.post('/',verifyToken, async (request,response) => {
    const { error } = expenseValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message);
    const {email } = request.user;
    const {amount,category,type} = request.body;

    const expense = new Expense({
        amount,
        category,
        type,
        email
    });
    try {
        const savedExpense = await expense.save();
        response.send({
            "status":"success"
        })
    }
    catch(err){
        response.status(400).send(err);
    }
    response.send(error);
})

module.exports = router;