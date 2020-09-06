const express = require("express"),
    body = require("body-parser"),
    fs = require("fs"),
    ejs = require('ejs'),
    path = require('path'),
    // user = require('controlers/user');
    bodyParser = require("body-parser");


let err = ''
let errmassage = ''
//users class
const user = [{
    username: 'master',
    useremail: 'web.harshit@gmail.com',
    password: 'hhhhhh'
}]
class users {
    constructor(email, username, password) {
        this.email = email
        this.username = username
        this.password = password
    }
    saveuser() {
        user.push(this)
    }
}
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))
app.set(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")
app.set('views', 'views')
app.get('/', (req, res, next) => {
    res.render('index', {
        path: '/home'
    })
})
app.get('/admin', (req, res, next) => {
    res.render('admin/loginPage', {
        path: '/admin',
        loginerr: err,
        loginerrmassage: errmassage,


    })
    err = ''
    errmassage = ''
})
app.post('/registered', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const createuser = new users(username, email, password)
    createuser.saveuser()
    res.redirect('/admin')
})
app.get('/users',(req,res,next)=>{
    res.send(user)

})
app.post('/admin/home', (req, res, next) => {
    if (user.length > 0) {
        user.forEach(userdetail => {
            if (userdetail.username == req.body.loginusername || userdetail.useremail == req.body.loginusername) {
                if (userdetail.password != req.body.loginpassword) {
                    err = 'Invalid Password'
                    errmassage = 'Password Not Match'
                    res.redirect('/admin')
                } else {
                    res.render('admin/home', {
                        path: '/admin/home'
                    })
                }
                
            } else{
                err = 'Invalid Username!'
                errmassage = 'Username is match'
                res.redirect('/admin')
                
            
            
        }
        })
    } else {
        res.send(err)
    }
})

app.get('/product', (req, res, next) => {
    res.render('products/product', {
        path: '/products'
    })
})


app.listen(200);