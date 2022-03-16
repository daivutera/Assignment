const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const usersRouter = require('./routes/usersRouter');
// const loginRouter = require('./routes/loginRouter');
// const registerRouter = require('./routes/registerRouter');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', usersRouter);
// app.use('/', loginRouter);
// app.use('/', registerRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
