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

    return(
        <>
            <div className="DivHome">
        
                <ContextoSacolaProvider>
                <header className="headerHome">
                    <Header/>
                </header>

                <main className="DivMain">
                    <div className="visualizarDadosEmail">
                        <div className="MeusDados_Email">
                            <h1>Meus dados</h1>

                            <div className="instrucoDeManterDadosAtualizados">
                               Não necessário atualização de dados como (E-mail), pois serve somente como dado de acesso para esta conta.
                            </div>

                            <div className='divApresentaEmail'>
                                <div>E-mail atual do usuário:</div>
                                <div className='apresentaEmail'>{nomeDoUserLogado.email}</div>
                            </div>

                            <div className='Salvar_Voltar'>
                                <button className='voltarParaMeusDados' onClick={() => voltaParaMeusDados.push('/home/clienteMeusDados')}>Voltar</button>
                                {/* <button className='salvarNovoNomeCelular'>Atualidar dados</button> */}
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