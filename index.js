require('dotenv').config ()
const Phone = require('./models/phone')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(express.static('dist'))
morgan.token('req-body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
app.use(cors())

app.get('/',(request,response)=>{
    response.send('<h1>Hello Worlddddd</h1>')
})

app.get('/api/persons/',(request,response)=>{
    Phone.find({}).then(phones=>{
      response.json(phones)
    })
})

app.get('/api/persons/:id',(request,response,next)=>{
  const id = request.params.id
  Phone.findById (id).then(phone=>{
    if(phone){
      response.json(phone)
    } else {
      response.status(404).end()
    }
  }).
  catch(error=>{
    next(error)
  })
})

app.post('/api/persons',(request,response)=>{
  const body = request.body

  if (!body.name || !body.number){
    return response.status(500).json({error:'Name or number missing missing'})
  }
  
  Phone.find({}).then(phones=>{
    const data = phones.find(p=>p.name.toLowerCase()===body.name.toLowerCase())
    if(data){
    return response.status(409).send('The name is already in the db, you must change name')
    }
    const newPhone = new Phone({
      'name':body.name,
      'number':body.number
    })
    console.log('newPhone :>> ', newPhone);
    
    newPhone.save().
    then(()=>{
      console.log('phone saved')
      return response.status(200).send('Phone saved')
    })
    .catch(error=>{
      console.log('error', error)
      return response.status(500).send('Error saving phone')
    })

  })
  // response.json(body)
})

app.delete('/api/persons/:id',(request,response,next)=>{
  Phone.findByIdAndDelete (request.params.id)
    .then(result=>{
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response,next) => {
  const body = request.body
  const id = request.params.id
  const phone = {
    'name':body.name,
    'number':body.number
  }
  Phone.findByIdAndUpdate(id,phone,{new:true})
    .then(updatedPhone =>{
      response.json(updatedPhone)
    })
    .catch(error=>next(error))
  console.log('body :>> ', body);
});

app.get('/info',(request,response)=>{
  const timeZone = new Date().toLocaleString();
  response.send(`<br>Timezone: ${timeZone}</br></p>`)
})


const unknownEndpoint = (request, response)=>{
  response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler =(error,request,response,next)=>{
  console.log('error.message',error.message)

  if (error.name==='CastError'){
    return response.status(400).send({error:'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})