var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

var userController = require('../controllers/user');
var pacientController = require('../controllers/pacients');
var therapistController = require('../controllers/therapists');
var medicalCenterController = require('../controllers/medicalCenters');
var kinematicsAnalysisController = require('../controllers/kinematicsAnalysis');
var authenticationController = require('../controllers/authentication');
var contactController = require('../controllers/contact.js');


// used to create, sign, and verify tokens
// sample =>https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// var validateToken = require('../utils.js').validateToken;
 var authorizationMiddleware = require ('../routes/simple_jwt').authorizationMiddleware;

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Create endpoint handlers for /authenticate
router.route('/authenticate')
  .post(authenticationController.postAuthenticate);

// Create endpoint handlers for /contacts/:contact_id
router.route('/contacts/:contact_id')
  .get(contactController.getContact)

router.route('/contacts')
  .post(contactController.postContact)
  .get(contactController.getContacts);

// Routes porotected by JWT verification
// Create endpoint handlers for /users/:user_id
router.route('/users/:user_id')
  .get( userController.getUser)
  .put( userController.putUser)
  .delete( userController.deleteUser);
//Create endpoint handlers for /users
router.route('/users')
  .post( userController.postUsers)
  .get( userController.getUsers);


// Create endpoint handlers for /pacients/:pacient_id
router.route('/pacients/:pacient_id')
  .get( pacientController.getPacient)
  .put( pacientController.putPacient)
  .delete( pacientController.deletePacient);
// Create endpoint handlers for /pacients
router.route('/pacients')
  .post( pacientController.postPacients)
  .get( pacientController.getPacients);



// Create endpoint handlers for /therapists/:therapist_id
router.route('/therapists/:therapist_id')
  .get( therapistController.getTherapist)
  .put( therapistController.putTherapist)
  .delete( therapistController.deleteTherapist);
// Create endpoint handlers for /therapists
router.route('/therapists')
  .post( therapistController.postTherapists)
  .get( therapistController.getTherapists);



  // Create endpoint handlers for /medical_centers/:medical_center_id
router.route('/medical_centers/:medical_center_id')
  .get( medicalCenterController.getMedicalCenter)
  .put( medicalCenterController.putMedicalCenter)
  .delete( medicalCenterController.deleteMedicalCenter);
// Create endpoint handlers for /medical_centers
router.route('/medical_centers')
  .post( medicalCenterController.postMedicalCenters)
  .get( medicalCenterController.getMedicalCenters);



// Create endpoint handlers for /kinematics_analysis/:kinematics_analysis_id
router.route('/kinematics_analysis/:kinematics_analysis_id')
  .get( kinematicsAnalysisController.getKinematicsAnalysis)
  .put( kinematicsAnalysisController.putKinematicsAnalysis)
  .delete( kinematicsAnalysisController.deleteKinematicsAnalysis);

// Create endpoint handlers for /kinematics_analysis/
router.route('/kinematics_analysis')
  .post( kinematicsAnalysisController.postKinematicsAnalysiss)
  .get( kinematicsAnalysisController.getKinematicsAnalysiss);


// Create endpoint handlers for /kinematics_analysis_matlab/:kinematics_analysis_id
router.route('/kinematics_analysis_matlab/:kinematics_analysis_id')
  .put( kinematicsAnalysisController.putKinematicsAnalysisMatlabRawPositions)
  .post( kinematicsAnalysisController.postKinematicsAnalysisMatlabGaitAngles);


module.exports = router;
