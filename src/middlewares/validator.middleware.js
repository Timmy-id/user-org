const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const err = res.status(422).json({
        errors: error.details.map((err) => ({
          field: err.context.label,
          message: err.message,
        })),
      });
      return err;
    }
    return next();
  };
};

module.exports = validator;
