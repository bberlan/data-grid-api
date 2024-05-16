import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.js'
import carRoutes from './routes/cars.js'
import columndefRoutes from './routes/columndefs.js'
import toolbardefRoutes from './routes/toolbardefs.js'

const app = express()
const PORT = 5001

app.use(bodyParser.json())
app.use('/users', userRoutes)
app.use('/cars', carRoutes)
app.use('/columndefs', columndefRoutes)
app.use('/toolbardefs', toolbardefRoutes)

app.get('/', (req, res) => {
    //   console.log('[GET ROUTE]')
    res.send('HELLO FROM HOMEPAGE')
})

app.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT}`)
)
