const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try {
    const accessToken = (req.headers.authorization ?? '').replace(
      /^Bearer\s/,
      '',
    );

    if (accessToken === null) {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Invalid token',
        statusCode: 401,
      });
    }

    const { userId } = jwt.verify(
      accessToken,
      process.env.SECRET_KEY,
    );

    if (!userId)
      return res.status(403).json({
        status: 'Forbidden',
        message: 'Not accessible',
        statusCode: 403,
      });

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'Unauthorized',
      message: error.message,
      statusCode: 401,
    });
  }
};
