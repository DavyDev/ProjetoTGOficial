import { useHistory } from 'react-router-dom';
import { ContextoSacolaProvider } from '../../contexts/ContextoSacola';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import './style.css';

function ComponentTesteDoMain() {

    // const identficaIdCliente = (localStorage.getItem('user'))

    // console.log("identficaIdCliente")
    // console.log(identficaIdCliente)

    // axios.get(`http://localhost:3002/listagemDosMeusPedidosFeitos/${identficaIdCliente}`, {
        
    //   })
    // .then(response => console.log(response.data))

    const direcionaParaEscolhaDosDados = useHistory()

    const handleDirecionamento = (escolhaFeita) => {

        console.log(escolhaFeita)
        
        switch (escolhaFeita) {
            case "Nome-Completo-e-Telefone":
                direcionaParaEscolhaDosDados.push('/home/clienteMeusDados/infoPessoais')
                break;
                
            case "Email-e-Senha":
                direcionaParaEscolhaDosDados.push('/home/clienteMeusDados/infoDeAcesso')
                
            break;
        
            default:
                break;
        }
    }

    return(
        <>
            <div className="DivHome">
        
                <ContextoSacolaProvider>
                <header className="headerHome">
                    <Header/>
                </header>

                <main className="DivMain">
                    <div className="acessoAosMeusDados">
                        <div className="BoxMeusDados">
                            <h1>Meus dados</h1>
                            <div className="informacoesPessoais" onClick={() => handleDirecionamento("Nome-Completo-e-Telefone")}>
                                <p>Informações Pessoais</p>
                                <div className="informacoesPessoaisComponentes" >
                                    <div>Nome completo e telefone</div>
                                    <div className="setaLateralInformacoesPessoais">{">"}</div>
                                </div>
                            </div>

                            <div className="informacoesDeAcesso" onClick={() => handleDirecionamento("Email-e-Senha")}>
                                <p>Informações de acesso</p>
                                <div className="informacoesDeAcessoComponentes">
                                    <div>E-mail</div>
                                    <div className="setaLateralInformacoesDeAcesso">{">"}</div>
                                </div>
                            </div>
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

export default ComponentTesteDoMain;