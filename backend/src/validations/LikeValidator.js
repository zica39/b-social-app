// validators/LikeValidator.js
const Joi = require('joi');

module.exports = {
    validateLikeRequest(req, res, next) {
        const schema = Joi.object({
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        next();
    },
};
