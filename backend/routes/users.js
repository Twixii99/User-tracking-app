let express = require('express');
let router = express.Router();
let userController = require('../controllers/userController');

/* GET list of all users */
router.get('/', userController.all_users);

/* POST logged in user */
router.post('/login', userController.check_user);

/* DELETE existing user by ID */
router.delete('/remove/:userId', userController.remove_user);

/* PUT new user data to the database */
router.put('/add', userController.add_user);

/* POST new info about an existing user */
router.post('/update/:userId', userController.update_user);

router.get('*', userController.handleOther);

module.exports = router;
