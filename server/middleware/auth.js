import jwt from "jsonwebtoken";

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;
        const jwt_secret = process.env.JWT_SECRET | "test";
        if(token && isCustomAuth) {
            decodedData = jwt.verify( token, jwt_secret);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch(err) {

    }
}

export default auth;