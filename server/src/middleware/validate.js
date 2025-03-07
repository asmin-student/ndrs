const { AppError } = require('../utils/errorHandler');

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new AppError(error.details[0].message, 400);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;