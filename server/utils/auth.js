const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '20h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // split the token string into an array and return actual token
    // bearer <token> -> [<bearer>, <token>]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data: { email, birdname, _id } } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = { email, birdname, _id };
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ email, birdname, _id }) {
    const payload = { email, birdname, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
