import { validationResult } from "express-validator";
// this checks if validation failed or not 
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

export default validate;
