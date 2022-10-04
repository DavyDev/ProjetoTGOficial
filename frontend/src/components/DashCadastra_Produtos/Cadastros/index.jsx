import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./style.css";

function Cadastros() {
  const [observaExclusaoDeItens, setObservaExclusaoDeItens] = useState([]);
  const [itensParaSelecao, setItensParaSelecao] = useState([]);
  const [armazenaItemsEcolhidos, setArmazenaItemsEcolhidos] = useState([]);
  const itemDeMontagemProduto = useRef(null);
  const qntItemDeMontagemProduto = useRef(null);

  const testezinhobb = (event) => {
    event.preventDefault();
    const armazenaDadosItem = {
      nomeItem: itemDeMontagemProduto.current.value,
      qntItem: Number((qntItemDeMontagemProduto.current.value).replace(",", ".")),
    };
    console.log(itemDeMontagemProduto.current.value);
    console.log(qntItemDeMontagemProduto.current.value);
    console.log(armazenaDadosItem);
    console.log(armazenaItemsEcolhidos);
    setArmazenaItemsEcolhidos([...armazenaItemsEcolhidos, armazenaDadosItem]);
  };

  const cadastrandoDadosProduto = (event) => {
    event.preventDefault();

    
    axios
      .post("http://localhost:3002/produtos", {
        titulo: event.target.titulo.value,
        // descricao: event.target.descricao.value,
        imagem: event.target.imagem.value,
        cardapio: event.target.cardapio.value,
        preco: Number((event.target.preco.value).replace(",", ".")).toFixed(2),
        itemsEquantidades: armazenaItemsEcolhidos
      })
      //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"));

    console.log({
        titulo: event.target.titulo.value,
        // descricao: event.target.descricao.value,
        imagem: event.target.imagem.value,
        cardapio: event.target.cardapio.value,
        preco: Number((event.target.preco.value).replace(",", ".")).toFixed(2),
        itemsEquantidades: armazenaItemsEcolhidos
      }
    )
    
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/listaItensDosProdutos`)
      .then((response) => response.data)
      .then((resposta) => setItensParaSelecao(resposta));
  }, []);

  const excluiItemDoProduto = (i) => {
    const nomeItemExcluido = (armazenaItemsEcolhidos[i].nomeItem)
    
    const deixaSoItemsEscolhidos = armazenaItemsEcolhidos.filter((item, i) => item.nomeItem != nomeItemExcluido)

    setArmazenaItemsEcolhidos(deixaSoItemsEscolhidos)
  }

  

  useEffect(() => {
    console.log("Observa  exclusão mudou");
  }, [armazenaItemsEcolhidos]);

  return (
    <div className="divCadastraProduto">
      <div>
        <form  onSubmit={(event) => cadastrandoDadosProduto(event)}>
          <div className="tituloCadastraProdutos">Cadastre seu produto</div>
          <div className="cadastraProdutos">
            <div className="edicaoInputsoForm">
              <label htmlFor="titulo">Titulo</label>
              <br />
              <input name="titulo" />
            </div>

            {/* <div className="edicaoInputsoForm">
              <label htmlFor="descricao">Descrição</label> <br />
              <input name="descricao" />
            </div> */}

            <div className="edicaoInputsoForm">
              <label htmlFor="cardapio">Menu do Cardapio</label> <br />
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
              <label htmlFor="preco">Preço </label> <br />
              <input name="preco" placeholder="R$"/>
            </div>

            <div className="edicaoInputsoForm">
              <label htmlFor="imagem">Imagem</label> <br />
              <input type="file" accept="image/jpeg" name="imagem" />
            </div>
          </div>

          <div className="ingredientesEQuantidades">
            <div className="tituloCadastraProdutos">Ingredientes e Quantidades</div>
            <div className="edicaoInputsoFormTeste">
              <div className="selecionaOsItems">
                <label htmlFor="itens">Selecione os itens </label> <br />
                <select name="itens" ref={itemDeMontagemProduto}>
                  <option value="">Selecione uma opção</option>
                  {itensParaSelecao.map((item, i) => {
                    return <option value={item.nomeItem}>{item.nomeItem}</option>;
                  })}
                  {/* <option value="lanches">Lanches</option>
                    <option value="saladas">Saladas</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="sobremesas">Sobremesas</option>
                    <option value="doces">Doces</option> */}
                </select>
              </div>
              <div className="selecionaQntItems">
                
                <label htmlFor="itens">Quantidade do item </label>{" "} <br />
                <input ref={qntItemDeMontagemProduto} type="" name="" />
                 
              </div>
              <div className="adicionaItemsEQuant">
                <button type="button" onClick={(event) => testezinhobb(event)}>Adicionar item</button>
              </div>
              
              <div className="tabelaItensEscolhidos">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Itens do Produto</th>
                      <th>Quanti.</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {armazenaItemsEcolhidos.map((itemSelecionado, i) => {
                      return (
                        <tr>
                          <th>{i + 1}</th>
                          <td>{itemSelecionado.nomeItem}</td>
                          <td>{itemSelecionado.qntItem}</td>
                          <td>
                            <button
                              type="button"
                              className="inputDaQntPorItem"
                              onClick={() => excluiItemDoProduto(i)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="edicaoInputSalvar">
              <button type="submit" /*onClick={() => console.log()}*/>Criar produto</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Cadastros;
