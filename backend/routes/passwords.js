    const express = require('express')
    const router = express.Router();
    const Passwords = require('../models/passwords')
    const { query, matchedData, validationResult, body } = require('express-validator');




    //Add Password  using POST requset api/addPassword 
    router.post('/addPassword', [
        body('site').isLength({ min: 2 }).withMessage('Enter a valid sitename'),
        body('username').isLength({ min: 3 }).withMessage('username should be at least 3 characters long'),
        body('password').isLength({ min: 4 }).withMessage('Password should be more than 4 character')
    ], async (req, res) => {
        try {
            //geeting data form body it is sure (app.use(express.json()) )middlewire must be use in server.js
            const { site, username, password } = req.body

            
            //validation
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }


            //Add password in database
            const data = new Passwords({
                site, username, password
            })

            //saved the data in database
            const savedPassword = await data.save();


            res.json(savedPassword)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    })  




    //Update Password  using PUT requset api/updatePassword 
    router.put('/updatepassword/:id', [
        body('site').isLength({ min: 2 }).withMessage('Enter a valid sitename'),
        body('username').isLength({ min: 3 }).withMessage('username should be at least 3 characters long'),
        body('password').isLength({ min: 4 }).withMessage('Password should be more than 4 character')
    ], async (req, res) => {
        try {
            //geeting data form body it is sure (app.use(express.json()) )middlewire must be use in server.js
            const { site, username, password } = req.body

            
            //validation
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }


            //create a new Object
            let newPassword = {};
            if(site){newPassword.site = site}
            if(username){newPassword.username = username}
            if(password){newPassword.password =password}

            

            // find the password which want to edit them
            let findPassword = await Passwords.findById(req.params.id);

            if(!findPassword){ return res.status(404).send('Opps Not Found')}

            findPassword = await Passwords.findByIdAndUpdate(req.params.id , {$set : newPassword},{new:true})

            res.json({findPassword})



        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    })  






    //Delete Password  using DELETE requset api/updatePassword 
    router.delete('/deletepassword/:id', async (req, res) => {
        try {
            // find the password which want to delete them
            let findPassword = await Passwords.findById(req.params.id);

            // if passsword is not found
            if(!findPassword){ return res.status(404).send('Opps Not Found')}

            //delete the password
            findPassword = await Passwords.findByIdAndDelete(req.params.id)

            res.json({Success: "Password delete successfully"})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    })  
    




    //Fetch All Passwords  using get requset api/addPassword 
    router.get('/fetchPasswords', async (req, res) => {
        try {

            //fetch all password
            let password = await Passwords.find({})
            
            res.json(password)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    })  






module.exports = router;