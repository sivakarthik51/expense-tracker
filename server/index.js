const express = require('express');



const mongoose = require('mongoose');

const dotenv = require('dotenv');

//Authentication Routes
const authRoute = require('./routes/auth');

//Expenses Routes
const expensesRoute = require('./routes/expenses');

const verifyToken = require('./routes/verifyToken');

const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';

const PORT = process.env.PORT || 8000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
  
} else {

    const app = express();

    //Connect to DB
    mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true }, ()=> {
        console.log("Connected to DB");
    })

    

    // Use Middlewares
    app.use(express.json());


    //Route Middlewares
    app.use('/api/user',authRoute);
    app.use('/api/expenses',expensesRoute);

    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


    app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });



    app.listen(PORT, function () {
      console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });
}