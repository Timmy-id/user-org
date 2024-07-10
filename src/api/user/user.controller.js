const { supabase } = require('../../config/db');

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { data: user, error: err } = await supabase
      .from('user')
      .select('*')
      .eq('userId', userId)
      .single();

    if (err)
      return res.status(404).json({
        status: 'Not found',
        message: 'User not found',
        statusCode: 404,
      });

    return res.status(200).json({
      status: 'success',
      message: 'User found successfully',
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};
