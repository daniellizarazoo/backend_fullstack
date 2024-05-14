const { default: mongoose } = require('mongoose');
const moongose = require('mongoose')

if(process.argv.length<3){
    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2]

const url = 
`mongodb+srv://daniellizarazo015:${password}@cluster0.pqpaq2a.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
moongose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number:String,
})

phoneSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id= returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Phone = mongoose.model('Phone',phoneSchema)

Phone.find({}).then(result=>{
    for(const results in result){
        console.log('results :>> ', result[results]);
    }
    moongose.connection.close()
})

// const phone = new Phone({
//     name: process.argv[3],
//     number: process.argv[4],
// })

// phone.save(0).then(result=>{
//     console.log(`name: ${process.argv[3]} with number:${process.argv[4]} saved`);
//     mongoose.connection.close()
// })