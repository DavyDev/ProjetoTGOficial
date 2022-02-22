import './style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Home() {
  return (
    /* <Footer />*/

    <div className="DivHome">
      <header className="header">
        <Header />
      </header>

      <main>Conteudo</main>

      <footer className="DivFooter">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
