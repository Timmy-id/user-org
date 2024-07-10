const { Router } = require('express');
const { auth } = require('../../middlewares/auth.middleware');
const {
  getUserOrganisations,
  getSingleOrganisation,
  createOrganisation,
  addUserToOrganisation,
} = require('./organisation.controller');

const router = Router();

router.get('/', auth, getUserOrganisations);
router.get('/:orgId', auth, getSingleOrganisation);
router.post('/', auth, createOrganisation);
router.post('/:orgId/users', addUserToOrganisation);

module.exports = router;
