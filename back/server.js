//LIBRARIES
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

//MODELS
const {
    Users,
    Budget,
} = require("./models/index");

////CONSTANTS
const PORT = process.env.SERVER_PORT;
const JWT_SECRET = process.env.JWT_SECRET;

//INSTANCES
const server = express();

////MIDDLEWARES DEFINITIONS
const logger = (req, res, next) => {
    const path = req.path;
    const method = req.method;
    const body = req.body;
    const params = req.params;
    console.log(req);
    console.log(` 
    ${method} -
    ${path} -
    ${JSON.stringify(body)} -
    ${JSON.stringify(params)}`); 
    next();
}; 

const signInValidation = async (req, res, next) => {
    const User = {
        email,
        password
    } = req.body;
    
    const userInDb = await Users.findOne({
        attributes: ["email"],
        $or: [{email: User.email}]
    })
    if(userInDb){
        if(userInDb.email == User.email){
            res.status(401);
            res.json({error: "Email is not available. Please, try again."})
        }else{
            next()
        }
    }else{
        next()
    }
    
}

const adminValidation = async (req, res, next)=>{
    try {
        const comprobation = await Users.findOne({
            where: {id: req.user.id, isAdmin: true}
        });
    
        if(comprobation){
            next();
        }else{
            res.status(401);
            res.json({error: "Denied access"});
        }
        
    } catch (error) {
        res.status(500).json({error: "Error, try again later."});
    }
}

const newMovementValidation = async (req, res, next)=>{
    const {type, value, concept} = req.body

    if(
        (type !== "ENTRY" && type !== "EGRESS") ||
        (!value || value == "") || 
        (!concept || concept == "")
        ){
            res.status(401).json("Any field is null. Check and try again")
    }else{
        next()
    }
    

}

const limiter = rateLimit({
    windowMs: 120 * 1000, //60 seconds
    max: 5,
    message: "Many requests, please try again later",
});

////GlOBAL MIDDLEWARES
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(compression());

server.use(
    expressJwt({
        secret: JWT_SECRET,
        algorithms: ["HS256"],
    }).unless({
        path: ["/logIn", "/signIn"],
    })
);  

////USER ENDPOINTS

//SIGN UP
server.post("/signUp",signInValidation, async (req, res)=>{
    const newUser = {email, password} = req.body;

    try {
        if(email == ""|| password == ""){
            throw new Error("Any input is empty. Please, try again")
        }else{
            Users.create(newUser)
            .then(()=>{
                res.status(200);
                res.json("User sucesfully created")
            })
            .catch((error=>{
                res.status(400);
                res.json(error.message);
            }));
        }
    } catch (error) {
        res.status(400);
        res.json(error.message);
    }
    
});

//LOGIN
server.post("/logIn",limiter, async(req, res) =>{
    const {email, password} = req.body;

    const User = await Users.findOne({
        where: {email, password}
    });

    if(User){
        const token = jwt.sign(
            {
                id: User.id,
                isAdmin: User.isAdmin
            },
            JWT_SECRET,
            {expiresIn: "24h"}
        );
        res.status(200).json(token);
    }else{
        res.status(401).json("Invalid email or password. Please, try again.")
    }
})

//GET ALL USERS
server.get("/users", adminValidation, async (req, res) => {
    const usersArray = await Users.findAll()
    res.json(usersArray);
    res.status(200);
});

//GET USER WITH ID
server.get("/users/:id",adminValidation, async (req, res) => {
    try {
        const userId = req.params.id
        const user = await Users.findOne({
        where:{id: userId}
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//EDIT USER
server.put("/users/:id", adminValidation, async(req,res)=>{
    idUser = req.params.id;
    const {email, password, isAdmin} = req.body;
    try {
        await Users.update({email, password, isAdmin}, {where:{id: idUser}});
        const User = await Users.findOne({where: {id: idUser}});

        if(User !== null){
            res.status(200).json(`User was successfully modified`)
        }else{
            throw new Error(`don't exist an user with id ${idUser}`)
        }

    }catch (error) {
        res.status(400).json({error: error.message})
    }
})

//DELETE USER
server.delete("/users/:id", adminValidation, async (req,res) =>{
    const idUser = req.params.id;

    try {
        await Budget.destroy({
            where:{
                users_id: idUser
            }
        })

        await Users.destroy({
            where: {
                id: idUser
            }
        });
    
        res.status(200).json("User was deleted successfully");
    } catch (error) {
        res.status(400).json(error.message);
    }

});

////MOVEMENTS ENDPOINTS

//GET MOVEMENTS
server.get("/budget", async(req,res)=>{
    try {
        const movements = await Budget.findAll({
            where:{users_id: req.user.id}
        })
        res.status(200).json(movements)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//NEW MOVEMENT
server.post("/budget", newMovementValidation, async(req,res) =>{
    req.body.users_id = req.user.id
    const newMovement = {type, value, concept} = req.body
    
    try {
        await Budget.create(newMovement)
        res.status(200).json("Movement sucessfully saved")
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//EDIT MOVEMENT
server.put("/budget/:id", async(req,res) =>{
    const movementId = req.params.id
    const {value, concept} = req.body
    try {
        if(value !== "" && concept !== ""){
            await Budget.update({value: value, concept: concept}, {where: {id: movementId}})
            res.status(200).json("Movement sucessfully edited")
        }else{
            throw new Error("Any field is null. Check and try again.")
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//DELETE MOVEMENT
server.delete("/budget/:id", async(req,res) =>{
    const movementId = req.params.id
    try {
        await Budget.destroy({where: {id:movementId}})
        res.status(200).json("Movement sucessfully deleted")
        
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//SERVER PORT LISTENER
server.listen(PORT, () => {
    console.log(`Server initialized on port ${PORT} `);
});