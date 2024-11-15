import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   return res.status(401).json({ message: 'Authorization header missing' });
    // }
    const token = authHeader.split(' ')[1];
    // if (!token) {
    //   return res.status(401).json({ message: 'Token missing in Authorization header' });
    // }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded;
        return next();
    });
};
