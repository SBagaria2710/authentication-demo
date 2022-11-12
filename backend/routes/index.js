import express from 'express'
import sessionLogin from './session-login.js'
import tokenLogin from './token-login.js'

const app = express();

app.use("/session", sessionLogin);
app.use("/token", tokenLogin);

export default app;
