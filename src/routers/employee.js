const express = require('express')

const Employee = require('../models/employee')

const router = new express.Router()


router.post('/register', async (req, res) => {
    console.log(req.body)
    const user = new Employee(req.body)
    try{
        await user.save()
        res.status(201).send({user})
    } catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    try{
        console.log(req.body)
        const user = await Employee.findOne({email: req.body.email}).exec()
        res.send({user})
    } catch(err){
        console.log(err.message)
        res.status(400).send()
    }
})

router.post('/employees/searchByName', async (req, res) => {
    console.log(req)
    try {
        const filteredUsers = await Employee.find({fullname: req.body.fullname})
        console.log(filteredUsers)
        res.send({filteredUsers})
    }
    catch(err){
        console.log(err.message)

        res.status(400).send()
    }
})

router.post('/employees/searchByStatus', async (req, res) => {
    try {
        const filteredUsers = await Employee.find({status: req.body.status}).exec()
        res.send({filteredUsers})
    }
    catch(e){
        res.status(400).send()
    }
})

router.post('/employees', async (req, res) => {
    try{
        const employees = await Employee.find({}).exec();
        res.send({employees})
    } catch(err){
        res.status(400).send()
    }

})

router.put('/me', async (req, res) =>{
    const email = req.body.email
    const status = req.body.status
    const updatedEmployee = await Employee.findOneAndUpdate({email}, {status})
    updatedEmployee.save()
    res.send({updatedEmployee})
})




module.exports = router