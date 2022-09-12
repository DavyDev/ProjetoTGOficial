import React, { useState } from "react";
import "./style.css";
//teste15
import LoginBackground from "../../assets/images/LoginBackground/cenarioLogin.jpg";
import { useEffect } from "react";

import { useContext } from "react";
import { ContextoLogin } from "../../contexts/ContextoLogin/context"
import { useHistory } from "react-router-dom";
import api from "../../services/api"

import InputMask from 'react-input-mask'

const CreateCountForLogin = () => {

  const [newUser, setNewUser] = useState({newNameUser: '', newCelularUser: '', newEmailUser: '', newPasswordUser: ''})

  const navigatesBackToLogin = useHistory()

  function onChange(event) {
    const {name, value} = event.target
    console.log(name, value)
    
    setNewUser({...newUser, [name]: value})
    
    
  }

  const handleSubmitCadastrar = async (event) => {
    event.preventDefault()
    const dadosDoNovoUser = {
      newNameUser: event.target.newNameUser.value,
      newCelularUser: event.target.newCelularUser.value,
      newEmailUser: event.target.newEmailUser.value,
      newPasswordUser: event.target.newPasswordUser.value,
    }
    // const password = user.password
    // console.log("submit", { email, password } )
    console.log("{}{}{}{}{}{}{}{}{")
    console.log(dadosDoNovoUser)
    // login(email, password)

    await api.post('/registerNewAcount', dadosDoNovoUser, {
      headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log("Usuário cadastrado com sucesso")
        navigatesBackToLogin.push('/login')
      })
    
  }

  const voltarParaLogin = () => {
    navigatesBackToLogin.push('/login')
  }

  // const handleChangeNumero = (event) => {
  //   setNumeroCliente('55' + event.replace(/[^0-9]/g, ''))
  //  } 
  
  //Teste

  /*useEffect(() => {
  },[user])*/
  
  //console.log(newUser)
 

  return (
    <div className="ContainerCreateLogin">
      <div className="VidroBackgroundEffect">
        <div className="Boxformulario">
          <div className="ContainerEspacamento">
            <div className="diviLogoCreateLogin">
              <div className="LogoCreateLogin">Cadastre-se!</div> 
              <div className="fecharCreateLogin" onClick={() => voltarParaLogin()}>Voltar</div>
            </div>
            <div className="form">
              <form className="form" onSubmit={handleSubmitCadastrar}>
                <div className="nomeAndTelefone">
                  <div>
                    <label className="LabelEmail" htmlFor="newNameUser">Nome</label>
                    <input id="email" type="text" name="newNameUser" onChange={event => onChange(event)} placeholder="Informe seu nome"/>
                  </div>
                  <div>
                    <label className="LabelEmail" htmlFor="newCelularUser">Celular</label>
                    {/* <input id="email" type="email" name="newTelefoneUser" onChange={event => onChange(event)} placeholder=""/> */}
                    <InputMask id="celular" name="newCelularUser" mask="(99) 99999-9999" placeholder='Digite o número'  />
                  </div>
                </div>
                <label className="LabelEmail" htmlFor="email">E-mail</label>
                <div className="">
                  <input id="email" type="email" name="newEmailUser" onChange={event => onChange(event)} placeholder="Informe o seu e-mail"/>
                </div>

                <label className="LabelSenha" htmlFor="newPasswordUser">Nova senha</label>
                <div className="">
                  <input id="senha" type="password" name="newPasswordUser" onChange={event => onChange(event)} placeholder="Informe a senha"/>
                </div>
                <div className="BotaoEntrar">
                  <button type="submit" >Cadastre-se</button>
                </div>
              </form>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCountForLogin;
