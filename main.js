const express = require('express')
const hbs = require('express-handlebars')

const app = express()
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000


app.engine("hbs", hbs({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

app.get('/' ,(req,res) => {
    const cart = []
    res.status(200)
    res.type('text/html')
    //initializing initial cartState at point blank
    res.render('form', {cartState: JSON.stringify(cart)})
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.post('/submit', (req,res)=> {
    const cart = JSON.parse(req.body.cartState)
    cart.push({
        item:req.body.item,
        qty:req.body.qty,
        unit:req.body.unit
    })
    res.status(201)
    res.type('text/html')
    res.render('form', {
        cart: cart,
        cartState: JSON.stringify(cart)
    })
})


app.use(express.static(__dirname + '/static'))

app.listen(PORT, ()=> {
    console.log(`PORT ${PORT} started`)
})