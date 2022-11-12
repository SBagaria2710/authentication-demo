import express from 'express'
import indexRouter from './routes/index.js'
import boom from 'express-boom-v2';
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser())
app.use(boom());


app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})