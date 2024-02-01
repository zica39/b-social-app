// validators/CommentValidator.js
const Joi = require('joi');

module.exports = {
    validateCommentRequest(req, res, next) {
        const schema = Joi.object({
            postId: Joi.number().required(),
            content: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        next();
    },
};
