const { supabase } = require('../../config/db');

exports.getUserOrganisations = async (req, res, next) => {
  const userId = req.userId;
  try {
    const { data: allOrgIds, error: err } = await supabase
      .from('user_organisation')
      .select('orgId')
      .eq('userId', userId);

    if (err)
      return res.status(404).json({
        status: 'Not found',
        message: `User's organisations not found`,
        statusCode: 404,
      });

    const organisations = await Promise.all(
      allOrgIds.map(async (id) => {
        const { data: org } = await supabase
          .from('organisation')
          .select('*')
          .eq('orgId', id.orgId);

        return org[0];
      }),
    );

    return res.status(200).json({
      status: 'success',
      message: `User's organisations found successfully`,
      organisations,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSingleOrganisation = async (req, res, next) => {
  const userId = req.userId;
  const { orgId } = req.params;
  try {
    const { data: org, error: err } = await supabase
      .from('user_organisation')
      .select('*')
      .eq('userId', userId)
      .eq('orgId', orgId)
      .single();

    if (err)
      return res.status(404).json({
        status: 'Not found',
        message: `User's organisation not found`,
        statusCode: 404,
      });

    const { data: organisation, error: orgNotFound } = await supabase
      .from('organisation')
      .select('*')
      .eq('orgId', org.orgId)
      .single();

    if (orgNotFound)
      return res.status(404).json({
        status: 'Not found',
        message: 'Organisation not found',
        statusCode: 404,
      });

    return res.status(200).json({
      status: 'success',
      message: 'Organisation found successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Server error',
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};

exports.createOrganisation = async (req, res, next) => {
  const userId = req.userId;
  const { name, description } = req.body;

  try {
    const { data: organisation, error: postError } = await supabase
      .from('organisation')
      .insert({
        name,
        description,
      })
      .select();

    if (postError)
      return res.status(400).json({
        status: 'Bad request',
        message: 'Client error',
        statusCode: 400,
      });
    await supabase.from('user_organisation').insert({
      userId: userId,
      orgId: organisation[0].orgId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation[0].orgId,
        name: organisation[0].name,
        description: organisation[0].description,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Server error',
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};

exports.addUserToOrganisation = async (req, res, next) => {
  const { orgId } = req.params;
  const { userId } = req.body;
  try {
    await supabase.from('user_organisation').insert({
      userId: userId,
      orgId: orgId,
    });

    return res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Server error',
      message: 'Internal server error',
      statusCode: 500,
    });
  }
};
