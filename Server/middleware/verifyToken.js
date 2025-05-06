import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) return res
        .status(401)
        .json({
            msg: "No token provided"
        });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ msg: 'Token expired' });
            }
            return res.status(403).json({ msg: 'Invalid token' });
          }
        req.userId = decoded.userId;
        next();
    });
};
