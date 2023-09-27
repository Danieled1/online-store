const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/User/controller_users');
const adminController = require('../../../controllers/Admin/controller_admin')
const roleMiddleware = require('../../../middlewares/auth_roles');
const managerController = require('../../../controllers/Manager/controllerManager')

/* ------------------------------- User Routes ------------------------------ */
router.post('/user/register', userController.register)
router.post('/user/login', userController.login); 
router.post('/user/logout', userController.logout); 
router.get('/user/auth', roleMiddleware(['manager','admin','user']), userController.authToken);
router.get('/user/all', roleMiddleware(['manager','admin','user']), userController.getAllUsers);
router.put('/user/:user_id', roleMiddleware(['manager','admin','user']), userController.updateUserById);
router.get('/user/:model_id', roleMiddleware(['manager','admin','user']), userController.getUserById);
router.delete('/user/:model_id', roleMiddleware(['manager','admin','user']), userController.deleteUserById);

/* ----------------------------- Manager Routes ----------------------------- */
router.post('/manager/login', managerController.login);
router.post('/manager/logout', managerController.logout);
router.get('/manager/all', roleMiddleware(['manager']), managerController.getAll);
router.get('/manager/:model_id', roleMiddleware(['manager']), managerController.getById);
router.put('/manager/:manager_id', roleMiddleware(['manager','admin']),managerController.updateById);
router.delete('/manager/:model_id', roleMiddleware(['manager','admin']), managerController.deleteById);
router.post('/manager/add', roleMiddleware(['admin']), adminController.addManager);

/* ------------------------------ Admin Routes ------------------------------ */
router.get('/admin/all', roleMiddleware(['admin']), adminController.getAll);
router.get('/admin/:model_id', roleMiddleware(['admin']), adminController.getById);
router.put('/admin/:admin_id', roleMiddleware(['admin']),adminController.updateById);
router.delete('/admin/:model_id', roleMiddleware(['admin']), adminController.deleteById);
router.post('/admin/add', roleMiddleware(['admin']),adminController.addAdmin);   //delete 
router.post('/admin/login', adminController.login);
router.post('/admin/logout', adminController.logout);
/* ------------------------------------ x ----------------------------------- */
module.exports = router;
