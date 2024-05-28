const { default: mongoose } = require('mongoose');

const phoneSchema = new mongoose.Schema({
    name: {type:String,
            minLength:5,
            required:true,
            unique:true},
    number:{type:String,required:true},
})

phoneSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports= mongoose.model('Phone',phoneSchema)