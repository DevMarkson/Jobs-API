const dotenv = require('dotenv')

// load config
dotenv.config({ path: './config/config.env' });

authRouter = require('./routes/auth');
jobsRouter = require('./routes/jobs');

// connect to database
const connectDB = require('./db/connect');



require('express-async-errors');
const express = require('express');
const app = express();

// public static folder
app.use(express.static('./public'));


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
 
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
