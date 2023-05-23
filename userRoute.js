const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/search', userController.getResultSearch);
router.get('/getUser/:id', userController.getUser);
router.put('/edit/:id', userController.editUser);
router.put('/editpassword/:id',userController.editPassword);


module.exports = router;