// middleware/auth.js
import jwt from "jsonwebtoken";
// JWT secret
const JWT_SECRET = 'Cognitextualize@123';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export default auth;
