import React, { useState } from "react";
import "./style.css";
//teste15
import LoginBackground from "../../assets/images/LoginBackground/cenarioLogin.jpg";
import { useEffect } from "react";

import { useContext } from "react";
import { ContextoLogin } from "../../contexts/ContextoLogin/context"
import { useHistory } from "react-router-dom";

const Login = () => {
  const { authenticated, login } = useContext(ContextoLogin)
  
  const teste = useContext(ContextoLogin)

  const [user, setUser] = useState({user: '', password: ''})

  const navigatesToCreateLogin = useHistory()

  function onChange(event) {
    const {name, value} = event.target
    console.log(name, value)
    
    setUser({...user, [name]: value})
    
    
  }
  console.log("--------------------------")
  console.log(teste)

  


  const handleSubmit = (event) => {
    event.preventDefault()
    const email = user.user
    const password = user.password
    console.log("submit", { email, password } )
    login(email, password)
    
  }

  const handleToCreateLogin = () => {
    navigatesToCreateLogin.push('/register')
  }
  //Teste

  /*useEffect(() => {
    console.log(user)
  },[user])*/

 

  return (
    <div className="ContainerLogin">
      <div className="VidroBackgroundEffect">
        <div className="Boxformulario">
          <div className="ContainerEspacamento">
            <div className="LogoLogin">Deck Café</div>
            <p> {String(authenticated)}</p>
            <div className="form">

              <form className="form" onSubmit={handleSubmit}>

                <label className="LabelEmail" htmlFor="email">E-mail</label>
                <div className="">
                  <input id="email" type="email" name="user" onChange={event => onChange(event)} placeholder="Informe o seu e-mail"/>
                </div>

                <label className="LabelSenha" htmlFor="senha">Senha</label>
                <div className="">
                  <input id="senha" type="password" name="password" onChange={event => onChange(event)} placeholder="Informe a senha"/>
                </div>

                <div className="Lembrar_Recuperar">
                    <div className="lembrar">
                        <input id="Lembrarse" type="checkbox" /> <span>Lembre-se de min</span>
                    </div>

                    <div className="EsqueceuSenha">
                        <a href="#">Esqueceu a senha?</a>
                    </div>

                </div>

                <div className="BotaoEntrar">
                    <button type="submit" >Entrar</button>
                </div>

                <div className="CriarConta">
                        <a onClick={() => handleToCreateLogin()}>Criar nova conta</a>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
