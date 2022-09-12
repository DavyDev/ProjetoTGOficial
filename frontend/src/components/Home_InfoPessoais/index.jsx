import { ContextoSacolaProvider } from '../../contexts/ContextoSacola';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import './style.css';
import InputMask from 'react-input-mask'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Home_InfoPessoais() {
    const voltaParaMeusDados = useHistory()
    const nomeDoUserLogado = JSON.parse(localStorage.getItem('user'))

    const [armazenaDadosNovosDoLocalStorage, setArmazenaDadosNovosDoLocalStorage] = useState('')

    const [dadosNomeCelularAtuaisDoUser, setDadosNomeCelularAtuaisDoUser] = useState({
        nomeEscolhidoDoUser: nomeDoUserLogado.nomeUsuario,
        celularEscolhidoDoUser: nomeDoUserLogado.celularUsuario
    })

    const handleOnChange =  (nome, event) => {
        if(nome == "celularEscolhidoDoUser" && event.target.value == ''){
            setDadosNomeCelularAtuaisDoUser({...dadosNomeCelularAtuaisDoUser, [nome]: event.target.value})
            // setDadosNomeCelularAtuaisDoUser({...dadosNomeCelularAtuaisDoUser, [nome]: event.target.value})
            console.log("atendeu a essa condição")
            console.log(nomeDoUserLogado.celularUsuario)
            setDadosNomeCelularAtuaisDoUser({...dadosNomeCelularAtuaisDoUser, celularEscolhidoDoUser: nomeDoUserLogado.celularUsuario})
            console.log("chegou aqui vvvvvvv")
            
        }
        else if(nome == "nomeEscolhidoDoUser" && event.target.value == ''){
            setDadosNomeCelularAtuaisDoUser({...dadosNomeCelularAtuaisDoUser, [nome]: event.target.value})
            // setDadosNomeCelularAtuaisDoUser({...dadosNomeCelularAtuaisDoUser, [nome]: event.target.value})
            console.log("atendeu a essa condição")
            console.log(nomeDoUserLogado.celularUsuario)
            setDadosNomeCelularAtuaisDoUser({...dadosNomeCelularAtuaisDoUser, nomeEscolhidoDoUser: nomeDoUserLogado.nomeUsuario})
            console.log("chegou aqui vvvvvvv")
            
        }
        else{
            console.log(event.target.value)
            setDadosNomeCelularAtuaisDoUser({...dadosNomeCelularAtuaisDoUser, [nome]: event.target.value})
        }
        }

        // const responsavelPorAtualizarLocalSotare = async () => {
        //     // const armazenaDados = armazenaDadosNovosDoLocalStorage

        //     // localStorage.setItem('user', JSON.stringify(armazenaDados))
        //     console.log(armazenaDadosNovosDoLocalStorage)
        //     await 
        //     await localStorage.setItem('user', JSON.stringify(armazenaDadosNovosDoLocalStorage))
            
        // }

    const salvaDadosNovoNomeCelular = async () => {
        console.log(dadosNomeCelularAtuaisDoUser)
        await axios.put(`http://localhost:3002/atualizandoNomeCelularDoUser`, {...dadosNomeCelularAtuaisDoUser, idDoUsuário: nomeDoUserLogado.id})
            //.then((resposta) => resposta.json())
              .then((resposta) => localStorage.setItem('user', JSON.stringify(resposta.data)))
              .then((resposta) => voltaParaMeusDados.push('/home/clienteMeusDados'))
              //   .then((resposta => responsavelPorAtualizarLocalSotare()))
            //   .then(console.log("Deu tudo certo"))
            //   .then((resposta) => setArmazenaDadosNovosDoLocalStorage(resposta.data))
            //   .then(() => localStorage.removeItem('user'))
            //   .then((resposta) => localStorage.setItem('user', JSON.stringify(resposta.data)))
              .catch(() => console.log("Deu Errado"))

        
    }

    // useEffect(() => {
    //     console.log("foi mudado")
    //     // localStorage.setItem('user', JSON.stringify(armazenaDadosNovosDoLocalStorage))
    //     console.log(JSON.stringify(armazenaDadosNovosDoLocalStorage))
        
        
    // }, [armazenaDadosNovosDoLocalStorage])

    return(
        <>
            <div className="DivHome">
        
                <ContextoSacolaProvider>
                <header className="headerHome">
                    <Header/>
                </header>

                <main className="DivMain">
                    <div className="visualizarDadosNomeCelular">
                        <div className="MeusDados_NomeCelular">
                            <h1>Meus dados</h1>

                            <div className="instrucoDeManterDadosAtualizados">
                                Mantenha os dados do (Celular) sempre atualizados para receber o acompanhamento do seu pedido via WhatsApp.
                            </div>

                            <div className='mostrandoNomeCelularCadastrados'>
                                <div className="divApresentaNome">
                                    <div>Nome atual do usuário:</div>
                                    <div className='apresentaNomeCelular'>{nomeDoUserLogado.nomeUsuario}</div>
                                </div>

                                <div className="divApresentaCelular">
                                    <div>Celular atual do usuário:</div>
                                    <div className='apresentaNomeCelular'>{nomeDoUserLogado.celularUsuario}</div>
                                </div>

                            </div>

                            <div className='inputsDeNomeCelular'>
                                <div className='divNome_MeusDados'>
                                    <label htmlFor="Nome_MeusDados" >Nome</label>
                                    <input maxLength={40} id='Nome_MeusDados'  type="text" placeholder={dadosNomeCelularAtuaisDoUser.nomeEscolhidoDoUser} onChange={(event) => handleOnChange("nomeEscolhidoDoUser", event)}/>
                                </div>
                                
                                <div className='divCelular_MeusDados'>
                                    <label htmlFor="Nome_MeusDados">Celular</label>
                                    <InputMask id='Celular_MeusDados' mask="(99) 99999-9999" placeholder={dadosNomeCelularAtuaisDoUser.celularEscolhidoDoUser} onChange={(event) => handleOnChange("celularEscolhidoDoUser", event)}/>
                                </div>
                            </div>

                            <div className='Salvar_Voltar'>
                                <button className='voltarParaMeusDados' onClick={() => voltaParaMeusDados.push('/home/clienteMeusDados')}>Voltar</button>
                                <button className='salvarNovoNomeCelular' onClick={() => salvaDadosNovoNomeCelular()}>Atualidar dados</button>
                            </div>

                            {/* <div className="nomeAndTelefone">
                                <div>
                                    <label className="LabelEmail" htmlFor="newNameUser">Nome</label>
                                    <input id="email" type="text" name="newNameUser"  placeholder="Informe seu nome"/>
                                </div>
                                <div>
                                    <label className="LabelEmail" htmlFor="newCelularUser">Celular</label>
                                    <input id="email" type="email" name="newTelefoneUser" onChange={event => onChange(event)} placeholder=""/>
                                    <input id="celular" name="newCelularUser" mask="(99) 99999-9999" placeholder='Digite o número'  />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    
                </main>
                </ContextoSacolaProvider>

                <footer className="DivFooter">
                <Footer />
                </footer>
                
            </div>    
        </>
    )
}

export default Home_InfoPessoais;