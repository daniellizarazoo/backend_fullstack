const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
morgan.token('req-body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
app.use(cors())
let phones=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/',(request,response)=>{
    response.send('<h1>Hello Worlddddd</h1>')
})

app.get('/api/persons/',(request,response)=>{
    response.json(phones)
})

app.get('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id)
  const phoneFound = phones.find(p=>p.id===id)
  console.log('phoneFound', phoneFound)
  if (phoneFound){
    response.json(phoneFound)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id)
  phones = phones.filter(p=> p.id!==id)
  response.json(204).end()
})

app.post('/api/persons',(request,response)=>{
  const body = request.body
  if (!body.name || !body.phone){
    return response.status(500).json({error:'Name or number missing missing'})
  }
  const data = phones.find(p=>p.name.toLowerCase()===body.name.toLowerCase())
  if(data){
    return response.status(409).send('The name is already in the db, you must change name')
  }
  const randomValue = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
  const newPhone = {
    'id': randomValue,
    'name':body.name,
    'phone':body.phone
  }
  phones = phones.concat(newPhone)
  return response.status(209).send('Created')
  
  // response.json(body)
})

app.get('/info',(request,response)=>{
  const numberOfPhones = phones.length
  const timeZone = new Date().toLocaleString();
  response.send(`<p>Phonebook has info for ${numberOfPhones} <br>Timezone: ${timeZone}</br></p>`)
})

const unknownEndpoint = (request, response)=>{
  response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})