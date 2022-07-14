import express, { json, response } from 'express'
import statusCode from 'http-status-codes'

const app = express();

const PORT = process.env.PORT || 3000;

let users = [
    {id: 1, name: "Arthur", age: 27},
    {id: 2, name: "Rafael", age: 35},
    {id: 3, name: "Sivaldo", age: 35}
]
app.use(express.json())
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})

app.get('/', (req, resp) =>{
    return resp.send(`<h1>Api usando express<h1>`)
})

app.get('/users', (req, resp) =>{
    return resp.send(users)
})

app.get('/users/:userId', (req, resp) =>{
    const userId = req.params.userId
    const usuario = users.find((user) =>{
       return user.id === Number(userId)
    })

    return resp.send(usuario)
})

app.post('/users', (req, resp) =>{
    const newUser = req.body;
    users.push(newUser)

    return resp.status(statusCode.CREATED).send(newUser)
})

app.put('/users/:userId', (req, resp) =>{
    const userId = req.params.userId;
    const attUser = req.body;

    users = users.map((user) =>{
        if(Number(userId) === user.id){
            return attUser;
        }
        return user
    })

    return resp.send(attUser);
})

app.delete('/users/:userId', (req, resp) =>{
    const userId = req.params.userId;

    users = users.filter((user) => user.id !== Number(userId))

   return resp.status(statusCode.NO_CONTENT).send()
})