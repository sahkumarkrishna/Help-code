import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.cookies.token;

    // If not in cookie, try Authorization header
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId; // or req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);
    return res.status(500).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;
