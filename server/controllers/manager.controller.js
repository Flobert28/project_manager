const Manager = require('../models/manager.model');   

module.exports.createManager = 
(request, response) => {
    Manager.create(request.body)
        .then(manager => response.json(manager))
        .catch(err => response.status(400).json(err));
};

module.exports.getAllManagers = (request, response) => {
    Manager.find()
        .then(managers => response.json(managers))
        .catch(err => response.json(err));
};

module.exports.getManagerById = (request, response) => {
    Manager.findById(request.params.id)
        .then(manager => response.json(manager))
        .catch(err => response.json(err));
};

module.exports.changeManagerState = (request, response) => {
    Manager.findByIdAndUpdate(
        request.params.id,
        { state: request.body.state },
        { new: true } // To return the updated document
    )
    .then(manager => response.json(manager))
    .catch(err => response.status(400).json(err));
};

module.exports.removeManager = (request, response) => {
    Manager.findByIdAndDelete(request.params.id)
        .then(manager => response.json(manager))
        .catch(err => response.status(400).json(err));
};