const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


    let persons= [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      }
    ]
    app.get('/', (request, response) => {
      response.send('<h1>Hello World!</h1>')
    })
    app.get('/api/persons', (req, res) => {
      res.json(persons)
    })
    app.get('/api/persons/:id', (req, res)=> {
      const id= Number(req.params.id)
      const person = persons.find(person=> person.id===id)
      

      if ( person ) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    app.delete('/api/persons/:id', (request, response) => {
      const id = Number(request.params.id)
      persons = persons.filter(person => person.id !== id)
    
      response.status(204).end()
    })

    const generateId = () => {
      const maxId = persons.length > 0 ? persons.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
      return maxId + 1
    }
    app.post('/api/persons', (request, response) => {
      const body = request.body
      if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
      }
      if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
      }
    
      const person = {
        name: body.name,
        number: body.number,
        id: generateId()
      }

      persons=persons.concat(person)
    
      response.json(person)
    }) 

    const PORT = 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })