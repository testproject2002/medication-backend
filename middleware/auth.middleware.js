import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key_here';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;  // Store user data in request object
    next();
  });
};

// No need for module.exports when using ES modules
