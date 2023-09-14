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
      const { data: { email, username, _id, likes, likedBy } } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = { email, username, _id, likes, likedBy };
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ email, username, _id, likes, likedBy }) {
    const payload = { email, username, _id, likes, likedBy };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
