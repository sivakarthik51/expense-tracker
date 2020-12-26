const router = require('express').Router();

const Expense = require('../model/Expense');
const {expenseValidation} = require('../validation');
const verifyToken = require('./verifyToken');

router.get('/',verifyToken,async(request,response) => {
    if(!request.user){
        return response.status(401).send('Unauthorized');
    }
    try {
        const { email } = request.user;
        const expenses = await Expense.find({ email });
        response.send(expenses);
    }
    catch(err)
    {
        response.status(400).send(err);
    }

})

router.delete('/:id',verifyToken, async (request,response) => {
    const id = request.params.id;
    try {
        const { email } = await Expense.findOne({'_id': id});
        if(email !== request.user.email){
            return response.status(401).send('Unauthorized');
        }
        const { deletedCount } = await Expense.deleteOne({'_id': id});

        const expenses = await Expense.find({ email });
        return response.send(expenses);
    }
    catch (err) {
        response.status(400).send(err);
    }

})

router.post('/',verifyToken, async (request,response) => {
    const { error } = expenseValidation(request.body);
    if(error) return response.status(400).send(error.details[0].message);
    const {email } = request.user;
    const {amount,category,type,date} = request.body;

    const expense = new Expense({
        amount,
        category,
        type,
        email,
        date
    });
    try {
        const savedExpense = await expense.save();
        response.send(savedExpense);
    }
    catch(err){
        console.error(err);
        response.status(400).send(err);
    }
    response.send(error);
})

module.exports = router;