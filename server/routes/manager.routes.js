const ManagerController = require('../controllers/manager.controller');

module.exports = (app) => {
    app.post('/api/projects', ManagerController.createManager);
    app.get('/api/projects', ManagerController.getAllManagers);
    app.get('/api/projects/:id', ManagerController.getManagerById);
    app.patch('/api/projects/:id', ManagerController.changeManagerState);
    app.delete('/api/projects/:id', ManagerController.removeManager);
};
