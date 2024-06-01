import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    try {
        console.log("Authenticate middleware");
        const cookieHeader = req.headers.cookie;
        if (!cookieHeader) {
            return res.status(401).json({status : false, error: "Unauthorized"});
        }
        const tokenCookie = cookieHeader.split('; ').find(cookie => cookie.startsWith('jwtoken='));
        // console.log(tokenCookie)
        if (!tokenCookie) {
            return res.status(401).json({status : false, error: "Unauthorized"});
        }
        const token = tokenCookie.split('=')[1];
        if (!token) {
            return res.status(401).json({status : false, error: "Unauthorized"});
        }

        // Decode URI components
        const decodedToken = decodeURIComponent(token);

        // Remove 'Bearer ' prefix if it exists
        // const actualToken = decodedToken.startsWith('Bearer ') ? decodedToken.slice(7) : (return res.status(401).json({status : false, error: "Unauthorized"}));
        if(!decodedToken.startsWith('Bearer ')) {
            return res.status(401).json({status : false, error: "Unauthorized"});
        }
        const actualToken = decodedToken.slice(7);
        // console.log("actualToken", actualToken);
        const verifiedToken = jwt.verify(actualToken, process.env.SECRET_KEY);
        // console.log(verifiedToken);
        req.userId = verifiedToken._id;
        next();
    } catch (error) {
        
    }
}

export default authenticate;