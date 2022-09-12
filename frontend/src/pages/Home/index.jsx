import './style.css';
import { Route, Switch } from 'react-router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from "../../components/Main";
import { ContextoSacolaProvider } from '../../contexts/ContextoSacola';
import { useState } from 'react';

import axios from 'axios'
import Home_Cliente from '../../components/Home_Cliente';
import Home_ClientePedidos from '../../components/Home_ClientePedidos';
import Home_ClienteMeusDados from '../../components/Home_ClienteMeusDados';
import Home_InfoPessoais from '../../components/Home_InfoPessoais';
import Home_InfoDeAcesso from '../../components/Home_InfoDeAcesso';
import DashConsultaPedidos from '../../components/DashConsulta_Pedidos';
import Home_DetalhesDoPedido from '../../components/Home_DetalhesDoPedido';


  //0 - Verifica se é a primeira vez da pesoa ao verificar se o LocalStorage tem inserido qualquer Cliente_Anonimo base ou Cliente_Anonimo de verdade
  //console.log(localStorage.getItem("Cliente_Anonimo"))
  //let verificaSeTemUsuarioAnonimo = (localStorage.getItem("Cliente_Anonimo"))
  

  //let codOficialClienteAnonimo = ''

 /*async function PreparaParaClienteAnonimo () {
    let clienteAnonimoRecebeRandon = (1 + Math.random())

    if(verificaSeTemUsuarioAnonimo == null) {
      console.log("Não foi feito nada")
      localStorage.setItem("Cliente_Anonimo", 0)
    }
    //Verifica se o cliente ja ganhou uma identificação
    else if(verificaSeTemUsuarioAnonimo == 0) {
      
      console.log(clienteAnonimoRecebeRandon)
      console.log("Verifica se o cliente ja ganhou uma identificação")
      //Aqui nesse trecho de código temos que verificar se existe no banco esse cliente
      //se existe no banco
      await axios.get(`http://localhost:3002/pedidosFeitos/cliente/anonimousCliente/${clienteAnonimoRecebeRandon}`)
        .then((response) => {
          if(response.data.length == 1) {
            console.log("Encontramos algo")
            clienteAnonimoRecebeRandon = clienteAnonimoRecebeRandon + 1
            PreparaParaClienteAnonimo()
          }
          else if(response.data.length == 0) {
            console.log("Não Encontramos algo")
            axios.post(`http://localhost:3002/pedidosFeitos/cliente/anonimousCliente/true/${clienteAnonimoRecebeRandon}`)
          }
        })

      await console.log(codOficialClienteAnonimo.length)
      
    }
      //------------------Continuar daqui25/01/2022
  
       /* 
        -Caso não exista, cadastramos no banco e no LocalStorage e a variavel(verificaSeTemUsuarioAnonimo) pega o valor novo
        -Caso já exista, ele passa por essa verificação a variavel (verificaSeTemUsuarioAnonimo) permanece com o valor
  
        Preparar o banco para receber esses valores
      
      //localStorage.setItem("Cliente_Anonimo", clie)
    
  }*/

  //console.log(verificaSeTemUsuarioAnonimo)
  


  
  //console.log(localStorage.getItem("Cliente_Anonimo"))
  //PreparaParaClienteAnonimo()
  console.log("----------")
  //1 - Verifica se o usuário é anonimo, pergunta Pro LocalStorage se o valor é 0 ou diferente de 0

  
  
  
  
  
  //const [identificacaoClienteAnonimo, stIdentificacaoClienteAnonimo] = useState(`Cliente_Anonimo-${clienteAnonimoRandonInicial}`)

  //2 - Após dar uma identificação inicial, pergunta pro banco se ja tem cliente(anônimo) com essa identificação
    //Aqui dev fazer uma solicitação "GET" pro banco
    //-Caso retorne "Não", adicionamos reg 

  //if(identificacaoClienteAnonimo != ''){
    //localStorage.setItem("Cliente_Anonimo", 0)

    
  //  console.log(identificacaoClienteAnonimo)
  //  console.log("Usuário é anônimo possui identificação")
    
  //}
  const Home = () => { 

  return (
    /* <Footer />*/
    <>
      <div className="DivHome">
        
        {/* <ContextoSacolaProvider>
          <header className="headerHome">
            <Header/>
          </header>

          <main className="DivMain">
              <Main />
              
          </main>
        </ContextoSacolaProvider>

        <footer className="DivFooter">
          <Footer />
        </footer> */}

        <Switch>
          <Route path='/home' exact component={Home_Cliente} />
          <Route path='/home/clientePedidos' exact component={Home_ClientePedidos} />
          <Route path='/home/clienteMeusDados' exact component={Home_ClienteMeusDados} />
          <Route path='/home/clientePedidos/pedido/:detalhesDoPedido' exact component={Home_DetalhesDoPedido} />
          <Route path='/home/clienteMeusDados/infoPessoais' exact component={Home_InfoPessoais} />
          <Route path='/home/clienteMeusDados/infoDeAcesso' exact component={Home_InfoDeAcesso} />
        </Switch>
      </div>
    </>
    
    
  );
}

export default Home;

