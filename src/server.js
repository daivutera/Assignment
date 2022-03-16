const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const accountsRouter = require('./routes/accountsRouter');
const billsRouter = require('./routes/billsRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', authRouter);
app.use('/', accountsRouter);
app.use('/', billsRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
