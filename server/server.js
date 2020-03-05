const express = require('express')
const session = require('express-session')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/database')

let USERS = require('./models/Users')

mongoose.connect(config.database)
let db = mongoose.connection

db.once('open', ()=>{
    console.log('db connected ....')
})

db.on('err',(err)=>{
    console.log(err)
})

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(session({
    secret:'itcanbeanything'
}))
app.use(express.static(path.join(__dirname,'public')))


//authentications
var auth = (req,res,next)=>{
    console.log(req.session)
    if(req.session.isLogin){
        next();
    }
    else{
        res.json({status:"not logged"})
    }
}


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.redirect('/home')
})



//users registeration and login
app.post('/api/addUser', (req, res)=>{
    USERS.findOne({email:req.body.EMAIL}, (err,email)=>{
        if(email)
        {
            res.json({status:"Email Exists"})
        }
        else
        {
            USERS.findOne({phone:req.body.PHONE}, (err, phone)=>{
                if(phone)
                {
                    res.json({status:"Phone Number Exists"})
                }
                else
                {
                    USERS.findOne({username:req.body.USERAME}, (err,username)=>{
                        if(username)
                        {
                            res.json({status:"Username Already Exists"})
                        }
                        else
                        {
                            let USER = new USERS({
                                username: req.body.USERNAME,
                                name: req.body.NAME,
                                email: req.body.EMAIL,
                                phone: req.body.PHONE,
                                password: req.body.PASSWORD
                            })

                            USER.save((err)=>{
                                if(err)
                                {
                                    console.log(err)
                                }
                                else
                                {
                                    res.json({status:"Email Exists"})
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

app.post('/login', (req, res)=>{
    USERS.findOne({username:req.body.USERNAME,password:req.body.PASSWORD}, (err, user)=>{
        if(user!=null)
        {
            res.json({status:"success",userid:user._id})
        }
        else
        {
            res.json({status:"Wrong Email Or Password"})       
        }
    })
})

app.listen(5000, (err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log('server started on port 5000 ....')
    }
})