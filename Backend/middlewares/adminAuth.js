import jwt from 'jsonwebtoken'


export const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Get the token from cookies

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "You are not authenticated"
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains the admin role
        if (!decoded || decoded.role !== 'admin') { // Assuming 'role' is part of the token payload
            return res.status(403).json({
                success: false,
                msg: "You are not authorized"
            });
        }

        console.log("Token:", token);
        console.log("Decoded:", decoded);

        // Store the decoded user info in the request object for further use
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in Admin auth middleware: " + error.message);
        return res.status(500).json({
            success: false,
            msg: "Error in Admin auth middleware"
        });
    }
};
