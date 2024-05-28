const phonesRouter = require('express').Router()
const Phone = require('../models/phone')

phonesRouter.get('/',(request,response,next)=>{
    Phone.find({})
        .then(phones=>
            response.json(phones)
        )
        .catch(
            error=>next(error)
        )
})

phonesRouter.get('/:id',(request,response,next)=>{
    const id = request.params.id
    Phone.findById (id)
        .then(phone=>{
            response.json(phone)
                        })
        .catch(error=>next(error))
})

phonesRouter.post('/',(request,response,next)=>{
    const body = request.body
    
    const Phone = new Phone ({
        'name':body.name,
        'number':body.number
    })

    Phone.save()
        .then(savedPhone =>{
            response.json(savedPhone)
        })
        .catch(error=>next(error))
})

phonesRouter.delete('/:id',(request,response,next)=>{
    Phone.findByIdAndDelete (request.params.id)
        .then(()=>{
            response.status(204).send('Phone deleted')
        })
        .catch(error=>next(error))
})

phonesRouter.put('/:id',(request,response,next)=>{
    const body = request.body

    const phone = {
        'name':body.name,
        'number':body.number
    }

    Phone.findByIdAndUpdate(request.params.id, phone, {new:true,runValidators:true,context:'query'})
        .then(updatedPhone =>{
            response.json(updatedPhone)
        })
        .catch(error=>next(error))
})

module.exports = phonesRouter




