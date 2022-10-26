const express = require('express')
const LOCATIONS = require('./locations.js')

const LOGIN = 'lulu'
const PASSWORD = 1234
const TOKEN = require('crypto').randomBytes(32).toString('hex')

const app = express()

app.use(express.json())

app.post('/login', (req, res) => {
    let contentType = req.headers['content-type']
    
    
    contentType = contentType.split(';')[0]

    if(contentType !== 'application/json') {
        return res.status(400).json({
            message: "corpo da requisição deve ser tipo json"
        })
    }
    

    if (req.body.login !== LOGIN || req.body.password !== PASSWORD) {
        return res.sendStatus(401)
    }

    res.status(200).json({token: TOKEN})
})

const auth = (req, res, next) => {
    if(!req.headers['authorization']) return res.sendStatus(401)

    const token = req.headers['authorization'].split(' ')[1]

    if(token !== TOKEN) return res.sendStatus(401)

    next()
}

app.get('/locations', auth, (req, res) => {
    let result = LOCATIONS
    
    if(req.query.orderBy) {
        switch (req.query.orderBy) {
            case 'city':
                result.sort((a, b) => {
                    if(a.city > b.city) return 1
                    if(a.city < b.city) return -1
                    return 0
                }) 
                break;
            case 'country':
                result.sort((a, b) => {
                    if(a.country > b.country) return 1
                    if(a.country < b.country) return -1
                    return 0
                }) 
                break;
        
            default:
                break;
        }
    }

    if(req.query.limit) {
        if(req.query.page) {
            const start = (req.query.page - 1) * req.query.limit
            const end = req.query.page * req.query.limit
            result = result.slice(start, end)
        } else {
            const start = 0
            const end = req.query.limit
            result = result.slice(start, end)
        }

    }
    
    return res.status(200).json({
        data: result,
        total: LOCATIONS.length
    })
})

app.get('/locations/:id', auth, (req, res) => {
    const result = LOCATIONS.find(location => location.id == req.params.id)

    if(!result) return res.sendStatus(404)

    res.status(200).json(result)
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
