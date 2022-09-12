import { ContextoSacolaProvider } from '../../contexts/ContextoSacola';
import Footer from '../Footer';
import Header from '../Header';
import Main from '../Main';
import './style.css';

function componentTesteDoMain() {
    return(
        <>
            <div className="DivHome">
        
                <ContextoSacolaProvider>
                <header className="headerHome">
                    <Header/>
                </header>

                <main className="DivMain">
                    <Main />
                    
                </main>
                </ContextoSacolaProvider>

                <footer className="DivFooter">
                <Footer />
                </footer>
            </div>    
        </>
    )
}

export default componentTesteDoMain;