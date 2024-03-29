var jwt = require ('jsonwebtoken');
const crypto = require ('crypto');
const getUserIdByLoginTypeFromDB = require('../utils').getUserIdByLoginType;
const stage = require('../CONFIG');
const JWT_SECRET_KEY = stage.jwt_secret;

const options = {
  expiresIn: '2d',
  // issuer: 'ilovescotchyscotch'
};

const hashHmacSha256 = string => crypto
  .createHmac('sha256', JWT_SECRET_KEY)
  .update(string)
  .digest('hex');

function genKey (id, password) {
  const rawKey = id + password;
  const key = hashHmacSha256(rawKey, JWT_SECRET_KEY);
  return key;
};

function getAccessTokenFromHeader(req) {
  return req.headers['x-access-token'];
};

module.exports = {
  
  genAccessToken(user) {
    const userId = user._id;
    const userType = user.user_type;
    const password = user.password;
    const key = genKey(userId, password);
    // const tokenPayLoad = { userId, userType, key };
    const tokenPayLoad = { userId, userType};
    const accessToken = jwt.sign(tokenPayLoad, JWT_SECRET_KEY);    
    return accessToken;
  },

  async authorizationMiddleware(req, res, next) {
    const accessToken = getAccessTokenFromHeader(req);
    let tokenPayLoad;

    try {
        tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
        const { userId, userType } = tokenPayload;
        let userInDB = await getUserIdByLoginTypeFromDB(userType, userId);
        const passwordInDB = userInDB.password;
        const keyToCompare = genKey(userId, passwordInDB);
        if (keyToCompare !== tokenPayload.key) {
            throw new Error("Password changed");
        }
        req.decoded  = tokenPayload;
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
  },
};


// https://dev.to/mtovmassian/how-to-optimize-module-encapsulation-in-nodejs-cp2