const express = require('express')

const Employee = require('../models/employee')

const router = new express.Router()


router.post('/register', async (req, res) => {

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

router.get('/employees/searchByName', async (req, res) => {
    try {
        const filteredUsers = await Employee.find({fullname: req.body.fullname})
        res.send({filteredUsers})
    }
    catch(err){
        console.log(err.message)

        res.status(400).send()
    }
})

router.get('/employees/searchByStatus', async (req, res) => {
    try {
        const filteredUsers = await Employee.find({status: req.body.status}).exec()
        res.send({filteredUsers})
    }
    catch(e){
        res.status(400).send()
    }
})

router.get('/me', async (req, res) => {
    try{
        const me = await Employee.findOne({email: req.body.email}).exec();
        res.send({me})
    } catch(err){
        res.status(400).send()
    }

})

router.patch('/me', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try{
        const me = await Employee.findOne({email: req.body.email}).exec();
        updates.forEach((update) => me[update] = req.body[update])
        await me.save()
        res.send(me)
    } catch(err) {
        res.status(400).send(err)  
    }
})




module.exports = router