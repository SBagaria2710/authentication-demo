import { generateAuthToken } from '../services/auth.js'
import { USERS } from '../model/user.js'
import { COOKIE_NAME, COOKIE_EXPIRES } from '../constants/cookie.js'
const SAITAMA = USERS.capedbaldy



export const tokenLogin = (req, res) => {
  try {
    // TODO: uncomment this
    // const { email, password } = req.body
    // if (email !== SAITAMA.email && password !== SAITAMA.password) {
    //   return res.boom.unauthorized('invalid email or password');
    // }

    console.log(`Saitama's login successful`)

    // Generate token
    const token = generateAuthToken({ userId: SAITAMA.userId });
    // respond with a cookie

    res.cookie(COOKIE_NAME, token, {
      // domain: COOKIE_DOMAIN, Defaults to localhost
      expires: COOKIE_EXPIRES,
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({ "message": "Login successful" })

  } catch (err) {
    console.log(err)
    res.boom.badImplementation('Some thing went wrong')
  }
};

export const tokenLogout = (req, res) => {
  try {
    // Clear cookie
    res.clearCookie(COOKIE_NAME)

    res.status(200).json({ "message": "Logout successful, cookie cleared" })
  } catch (err) {
    console.log(err)
    res.boom.badImplementation('Some thing went wrong')
  }
};

export const tokenHealth = (req, res) => {
  try {
    const { password, ...user } = req.userData
    res.status(200).json({ "message": "Authenticated", uptime: process.uptime(), ...user, })
  } catch (err) {
    console.log(err)
    res.boom.badImplementation('Some thing went wrong')
  }
};