const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const ManagerSchema = new mongoose.Schema({
    name: { type: String,
    required: [
        true,
        "Project name is required"
    ], unique: true
    },
    dueDate: { type: Date,
    required: [true, "Due date is required"],
    min: [new Date(), "Date must be in the future!!!"]
    },
    state: {type: String,
    default: "Backlog"
    }
}, { timestamps: true });
ManagerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Manager', ManagerSchema);

