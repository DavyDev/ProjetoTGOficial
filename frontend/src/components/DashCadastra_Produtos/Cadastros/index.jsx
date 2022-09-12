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
      qntItem: Number(qntItemDeMontagemProduto.current.value),
    };
    console.log(itemDeMontagemProduto.current.value);
    console.log(qntItemDeMontagemProduto.current.value);
    setArmazenaItemsEcolhidos([...armazenaItemsEcolhidos, armazenaDadosItem]);
  };

  const cadastrandoDadosProduto = (event) => {
    event.preventDefault();

    // const prepadaDadosCadastro = {
    //   titulo: event.target.titulo.value,
    //   descricao: event.target.descricao.value,
    //   imagem: event.target.imagem.value,
    //   cardapio: event.target.cardapio.value,
    //   preco: Number(event.target.preco.value),
    //   itemsEquantidades: JSON.stringify(armazenaItemsEcolhidos)
    // };

    //axios.post("http://localhost:3002/produtos", `titulo=${prepadaDadosCadastro.titulo}&descricao=${prepadaDadosCadastro.descricao}&imagem=${prepadaDadosCadastro.imagem}&preco=${prepadaDadosCadastro.preco}&quantidade=${prepadaDadosCadastro.quantidade}&cardapio=${prepadaDadosCadastro.cardapio}`)
    axios
      .post("http://localhost:3002/produtos", {
        titulo: event.target.titulo.value,
        // descricao: event.target.descricao.value,
        imagem: event.target.imagem.value,
        cardapio: event.target.cardapio.value,
        preco: Number(event.target.preco.value),
        itemsEquantidades: armazenaItemsEcolhidos
      })
      //.then((resposta) => resposta.json())
      .then((resposta) => console.log(resposta.data))
      .catch(() => console.log("Deu Errado"));

    //console.log(prepadaDadosCadastro);
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
    <div className>
      <div>
        <form onSubmit={(event) => cadastrandoDadosProduto(event)}>
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
            <label htmlFor="imagem">Imagem</label> <br />
            <input name="imagem" />
          </div>

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
            <input name="preco" />
          </div>

          <div className="edicaoInputsoFormTeste">
            <div>
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
            <div>
              <label htmlFor="itens">Quantidade do item no pedido </label>{" "}
              <br />
              <input
                ref={qntItemDeMontagemProduto}
                type="number"
                name=""
                style={{ margin: "0px 10px 0px 10px" }}
              />
              <button type="button" onClick={(event) => testezinhobb(event)}>
                Adicionar item
              </button>
            </div>
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
          <div className="edicaoInputsoForm">
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastros;
