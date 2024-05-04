const {model,Schema, default: mongoose}=require('mongoose')
const Joi=require('joi')
const userSchema=new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
        minLength: [3, 'too short firstName'],
        maxLength: [20, 'too long firstName'],
    },
    lastName: {
        type: String,
        required: true,    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "User",
        emum: ["User", "Admin"]
    },
    image: {
        type: String
    },
    confirmEmail: {
        type: String,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false
    },
    wishList: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
}, {
    timestamps: true
})
function validRegister(obj){
    const schema=Joi.object({
        firstName:Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        age: Joi.number().required(),
        email:Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
        rePassword:Joi.ref('password')

    })
    return schema.validate(obj)
    
    }
    function loginValidation(obj){
        const schema=Joi.object({
            email:Joi.string().email(),
            password:Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
        return schema.validate(obj)
        }
        function validforgotPassword(obj){
            const schema=Joi.object({
                email:Joi.string().required(),
                answer:Joi.string().required(),
                newPassword:Joi.string().required()
            })
            return schema.validate(obj)
        }
const userModel=model('user',userSchema)

module.exports={userModel,validRegister,loginValidation,validforgotPassword}
