const bcrypt = require('bcryptjs');
const { supabase } = require('../../config/db');
const { createToken } = require('../../helpers/createToken');

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    const { data: existingUser } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser)
      return res.status(400).json({
        status: 'Bad request',
        message: 'User already exists',
        statusCode: 400,
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: newUser, error: postError } = await supabase
      .from('user')
      .insert({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      })
      .select();

    if (postError)
      return res.status(400).json({
        status: 'Bad request',
        message: 'Registration unsuccessful',
        statusCode: 400,
      });

    const { data: newOrg } = await supabase
      .from('organisation')
      .insert({
        name: `${firstName}'s Organisation`,
      })
      .select();

    await supabase.from('user_organisation').insert({
      userId: newUser[0].userId,
      orgId: newOrg[0].orgId,
    });

    const accessToken = createToken({ userId: newUser[0].userId });

    return res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken,
        user: {
          userId: newUser[0].userId,
          firstName: newUser[0].firstName,
          lastName: newUser[0].lastName,
          email: newUser[0].email,
          phone: newUser[0].phone,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Server error',
      message: error.message,
      statusCode: 500,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { data: existingUser, error: credentialsError } =
      await supabase
        .from('user')
        .select('*')
        .eq('email', email)
        .single();

    if (!existingUser || credentialsError)
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Invalid email or password',
        statusCode: 401,
      });

    const isPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPassword)
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Invalid email or password',
        statusCode: 401,
      });

    const accessToken = createToken({ userId: existingUser.userId });

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken,
        user: {
          userId: existingUser.userId,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          phone: existingUser.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
