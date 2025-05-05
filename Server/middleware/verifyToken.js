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
        if (err) return res
            .status(403)
            .json({
                msg: "Token is invalid"
            });
        req.userId = decoded.userId;
        next();
    });
};
