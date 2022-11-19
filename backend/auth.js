const jwt = require("jsonwebtoken");

const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBAJzaCL34ak/qMQEOd9tpeFL1f+oChscw/07Guj3KRxaywS/K+qKN
o5Kw+ruNukiRCXFqEplwWT3wG37bSqdA3JkCAwEAAQJAW+ALBtufyjevhKLo6giZ
hl5vEq9wKvU0Vvxo0xDNGymm5lUDE/2rI8Br2oGyhCFUVIAQ7DFLm2VRmW3V8GNG
UQIhAMkOLBsDHZxG0Koeckfo7kasUmBLYFpUgsuFrVwosw2rAiEAx7df6T7sJzCy
hDyqr0l/HrTYR9EMcwYENMzE8WntEssCIG42E51XDuM8umOWvwSGPh+FlL5uc0nw
66XPCGHteYFzAiEAqP4a00QiEZtcQxcOmtpHDZWbOVHEBgR+RKtMrraiG3cCIQCV
O1aZFx6NYwlOsyUFkKMYULOk7pPKiUw8FSR4RIZsEw==
-----END RSA PRIVATE KEY-----
`

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJzaCL34ak/qMQEOd9tpeFL1f+oChscw
/07Guj3KRxaywS/K+qKNo5Kw+ruNukiRCXFqEplwWT3wG37bSqdA3JkCAwEAAQ==
-----END PUBLIC KEY-----
`
// NOTE: KEYS should come from environments 

const generateAuthToken = (payload) => {
  return jwt.sign(payload, PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '2m', // expressed in seconds or a string describing a time span zeit/ms -> https://github.com/zeit/ms. 
  });
};

const verifyAuthToken = (token) => {
  return jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
};

// Middleware
const authenticate = (req, res, next) => {
    try {
        let token = req.cookies["teamShikshaToken"];
        const { name } = verifyAuthToken(token);
        req.userData = name
        next()

    } catch (err) {
        return res.status(500).send("Unauthenticated User");
    }
};

module.exports = {
    generateAuthToken,
    authenticate
};
