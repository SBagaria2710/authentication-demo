import { verifyAuthToken } from '../services/auth.js'
import { USERS } from '../model/user.js'
import { COOKIE_NAME } from '../constants/cookie.js'

export default (req, res, next) => {
  try {
    let token = req.cookies[COOKIE_NAME];
    console.log(token);
    // Enable Bearer Token authentication
    if (!token) {
      token = req.headers.authorization.split(" ")[1];
    }
    const { userId } = verifyAuthToken(token);
    const user = USERS[userId]
    req.userData = user
    next()

  } catch (err) {
    console.log('JWT ERROR', err)
    if (err.name === "TokenExpiredError") {
      // Can refresh token here
      return res.boom.unauthorized("Token expired, login again");
    } else {
      return res.boom.unauthorized("Unauthenticated User");
    }
  }
};
