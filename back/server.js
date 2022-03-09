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
    const posibleUsuario = {
        nombre,
        apellido,
        correo,
        perfil,
        contrasena,
    } = req.body;
    
    const userInDb = await Usuarios.findOne({
        attributes: ["correo"],
        $or: [{correo: posibleUsuario.correo}]
    })
    if(userInDb){
        if(userInDb.correo == posibleUsuario.correo){
            res.status(401);
            res.json({error: "El correo electronico ingresado no se encuentra disponible"})
        }else{
            next()
        }
    }else{
        next()
    }
    
}

const adminValidation = async (req, res, next)=>{
    try {
        const comprobation = await Usuarios.findOne({
            where: {id: req.user.id, esAdmin: true}
        });
    
        if(comprobation){
            next();
        }else{
            res.status(401);
            res.json({error: "Acceso denegado"});
        }
        
    } catch (error) {
        res.status(500).json({error: "Error, intentelo de nuevo más tarde"});
    }
}

const limiter = rateLimit({
    windowMs: 120 * 1000, //60 segundos
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

////ENDPOINTS

//SIGN IN
server.post("/signIn",signInValidation, adminValidation, async (req, res)=>{
    const newUser = {nombre, apellido, correo, perfil, contrasena, esAdmin} = req.body;

    try {
        if(nombre == "" || apellido == "" || correo == ""|| perfil == "" || contrasena == ""){
            throw new Error("Algun campo está vacio")
        }else{
            Usuarios.create(newUser)
            .then(()=>{
                res.status(200);
                res.json("Usuario creado con éxito")
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
    const {posibleCorreo, posibleContrasena} = req.body;

    const posibleUsuario = await Usuarios.findOne({
        where: {correo: posibleCorreo, contrasena: posibleContrasena}
    });

    if(posibleUsuario){
        const token = jwt.sign(
            {
                id: posibleUsuario.id,
                esAdmin: posibleUsuario.esAdmin
            },
            JWT_SECRET,
            {expiresIn: "24h"}
        );
        res.status(200).json(token);
    }else{
        res.status(401).json("Correo o contraseña invalidos. Intente nuevamente")
    }
})

//SERVER PORT LISTENER
server.listen(PORT, () => {
    console.log(`Server initialized on port ${PORT} `);
});