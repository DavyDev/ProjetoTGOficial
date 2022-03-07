import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useHistory } from "react-router-dom"
import api from "../../services/api";


export const ContextoLogin = createContext()

export const ContextoLoginProvider = ({ children }) => {
    const navigate = useHistory()

    const [userAuthenticated, setUserAuthenticated] = useState(false)
    const [loggedUser, setLoggedUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")
        console.log(Boolean(recoveredUser))

        if(recoveredUser){
            setUserAuthenticated(JSON.parse(recoveredUser))
        }

        setLoading(false)
        
    },[])

    //Aqui ele setará no localStorage os dados do usuário que foiencontrado
    //e validado
    useEffect(() => {
        if(loggedUser != null){
            localStorage.setItem("user", JSON.stringify(loggedUser))
            setUserAuthenticated(loggedUser)
            navigate.push('/')
        }
        else if (loggedUser == null){
            
            console.log("Aguardando a validação")
        }
    },[loggedUser]) 

    const login = async (email, password) => {
      console.log("Login auth: ", { email, password })
      
      //Recebe os dados de login do usuário que esta tentando logar
      const teste = {
        "email": email,
        "password": password
      }

      //Dados do usuário que esta tentando logar, que serão buscados no banco. 
      await api.post('/login', teste, {
        headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
            console.log("Encontrou ousuário")
            console.log(res.data)
            if(res.data.verificado == true && res.data.password == true) {

                console.log("¬¬¬¬¬¬¬¬¬¬¬¬")
                console.log(res.data.usuarioFounded.id)
                console.log("¬¬¬¬¬¬¬¬¬¬¬¬")
                setLoggedUser(res.data.usuarioFounded)
                
                
            }
            else{
                console.log("O usuário não foi encontrado, não foi validado")
            }
        })
        .catch((e) => {
            console.log("Nõe ncontrou o usuário")
        })
        
      console.log()
        
      console.log(teste)

        //api create session
        //await api.post('/login')

        // await api.put(`/materials/${id}`, data, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   });




        

        /*const loggedUser ={
            id: "123",
            email
        }*/
        
        

      /*if(password === "secret") {
          
          setUserAuthenticated(loggedUser)
          console.log("uiiiiiiiiiiiiiiiiiiii")
          navigate.push('/')
        }*/
    }
    
    const logout = () => {
        console.log("logout")
        setUserAuthenticated(null)
        localStorage.removeItem("user")
        navigate.push("/login")

    }
  

    return (

        <ContextoLogin.Provider value={{ authenticated: Boolean(userAuthenticated), userAuthenticated, loading, loggedUser, login, logout }}>
            { children }
        </ContextoLogin.Provider>
    )
}