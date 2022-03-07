const auth = require("../src/config/token/auth") 
const Clientes = require('../models/Clientes')
const bcrypt = require("bcryptjs")
const jwt =  require('jsonwebtoken')



class SessionControllerLogin {
    
    
    async CreateUser(req, res) {
        console.log("teste-------")
        console.log(req.body.email)
        console.log("teste-------")
        const user ={
            nomeUsuario: req.body.nomeusuário,
            email: req.body.email,
            password: req.body.password,
            token: jwt.sign( {id: "123"}, auth.secret, { expiresIn: auth.expiresIn } )
        }


        
        bcrypt.hash(user.password, 10, (erro, hash) => {
            if(erro){
                res.send("Houve um erro durante o salvamento do usuário")
            }

            user.password = hash

            Clientes.create(user)
                .then(() => {
                    return res.json({
                        erro: false,
                        mensagem: "Usuário foi cadastrado",
                        user
                    })
                })
                .catch(() => {
                    return res.json({
                        erro: true,
                        mensagem: "Usuário não foi cadastrado"
                    })
                })

            
        })
        

        console.log("-------->>")
        await console.log(user)
        console.log("-------->>")
        
        
       /* await Clientes.create(user)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Usuário foi cadastrado",
                    user
                })
            })
            .catch(() => {
                return res.json({
                    erro: true,
                    mensagem: "Usuário não foi cadastrado"
                })
            })*/

    }

    async ValidTheUser(req, res) {
        const userLogando = {
            email: req.body.email,
            password: req.body.password
        }
        
        const verifyUserExists = await Clientes.findAll({
            where: {
              email: userLogando.email
            }
        })

        /*console.log("---^^")
        console.log(userLogando)
        console.log(verifyUserExists)

        console.log(verifyUserExists[0].password)*/
        /*bcrypt.compare(userLogando.password, verifyUserExists[0].password, (error, result) => {
            if (error){
                return console.log("Deu errado")
            }
            if (result){
                return console.log("oieeeeee")
            }
        })*/

        
        console.log("---^^")
        
        console.log("Encontrou o usuário no banco")
        if(verifyUserExists.length != 0) {

            //console.log(true)
            bcrypt.compare(userLogando.password, verifyUserExists[0].password, (error, result) => {
                //Caso haja um erro no bcrypt
                if (error){
                    return res.status(401).json({message: "Falha na autenticação"})
                }
                //Caso a senha esteja correta
                else if (result){
                    return res.json({
                        verificado: true,
                        password: true,
                        usuarioFounded: {
                            id: verifyUserExists[0].id, 
                            email: verifyUserExists[0].email,
                            token: verifyUserExists[0].token,
                            nomeUsuario: verifyUserExists[0].nomeUsuario,
                            
                        }
                    })
                }
                //Caso a senha esteja incorreta
                else {
                    return res.status(401).json({message: "Falha na autenticação"})
                }
                })

            /*return res.json({
                verificado: true,
                password: true,
                usuarioFounded: {
                    id: verifyUserExists[0].id, 
                    email: verifyUserExists[0].email,
                    token: verifyUserExists[0].token,
                    
                }
            })*/
        }
        else {

            console.log(false)
            return res.json({
                verificado: "False",
                mensagem: "Usuario não encontrado",

            })
        }

        
    }
}

module.exports =  new SessionControllerLogin();
