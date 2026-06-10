const express = require('express');
const Expenses = require('./view/expenses');
const sequelize = require('./model/db');

const app = express();

app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create database & tables:', err);
  });

app.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

app.get('/expenses', Expenses.getAll);
app.post('/expenses', Expenses.create);
app.get('/expenses/summary', Expenses.summary);
app.get('/expenses/:id', Expenses.getById);
app.put('/expenses/:id', Expenses.update);
app.delete('/expenses/:id', Expenses.delete);
app.get('/expenses/summary/total', Expenses.summaryTotal);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
