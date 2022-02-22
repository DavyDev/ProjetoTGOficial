
import axios from 'axios';
import './style.css';




function Cadastros() {

  
  const cadastrandoDadosProduto = (event) => {

    
    
    event.preventDefault()

    const prepadaDadosCadastro = {
      titulo: event.target.titulo.value,
      descricao: event.target.descricao.value,
      imagem: event.target.imagem.value,
      preco: Number(event.target.preco.value),
      quantidade: Number(event.target.quantidade.value),
      cardapio: event.target.cardapio.value,

    }

    //axios.post("http://localhost:3002/produtos", `titulo=${prepadaDadosCadastro.titulo}&descricao=${prepadaDadosCadastro.descricao}&imagem=${prepadaDadosCadastro.imagem}&preco=${prepadaDadosCadastro.preco}&quantidade=${prepadaDadosCadastro.quantidade}&cardapio=${prepadaDadosCadastro.cardapio}`)
    axios.post("http://localhost:3002/produtos", {
      titulo: event.target.titulo.value,
      descricao: event.target.descricao.value,
      imagem: event.target.imagem.value,
      preco: Number(event.target.preco.value),
      quantidade: Number(event.target.quantidade.value),
      cardapio: event.target.cardapio.value
    })
    //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"))
    
    console.log(prepadaDadosCadastro)

  }

  return(
    <div className>
      <div>
        <form onSubmit={(event) => cadastrandoDadosProduto(event)}>
          

          <div className="edicaoInputsoForm">
            <label  htmlFor="titulo">Titulo</label><br />
            <input name="titulo"/>
          </div>

          <div className="edicaoInputsoForm">
            <label htmlFor="descricao">Descrição</label>
            <input name="descricao" />
          </div>

          <div className="edicaoInputsoForm">
            <label htmlFor="imagem">Imagem</label>
            <input name="imagem" />
          </div>
          
          <div className="edicaoInputsoForm">
            <label htmlFor="cardapio">Menu do Cardapio</label>
            <select name="cardapio">
              <option value="">Selecione uma opção</option>
              <option value="tapiocacrepioca">Tapioca/Crepioca</option>
              <option value="lanches">Lanches</option>
              <option value="saladas">Saladas</option>
              <option value="bebidas">Bebidas</option>
              <option value="sobremesas">Sobremesas</option>
              <option value="doces">Doces</option>
            </select>
          </div>

          <div className="edicaoInputsoForm">
            <label htmlFor="preco">Preço</label>
            <input name="preco" />
          </div>

          <div className="edicaoInputsoForm">
            <label htmlFor="Quantidade">Quantidade no estoque</label>
            <input name="quantidade" />
          </div>
          <div className="edicaoInputsoForm">
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
      
  )
}

export default Cadastros;
