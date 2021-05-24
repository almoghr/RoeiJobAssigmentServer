const mongoose = require ('mongoose')
const validator = require ('validator')


const employeeSchema = new mongoose.Schema({

    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    status: {
        type: String,
        required : true,
        default: 'Working'
}
}, 
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
})



const Employee = mongoose.model('Employee', employeeSchema) 


module.exports = Employee