import React, { useRef } from "react";
import './style.css';
import { Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

/*
export function Cards({ data, index}) {

    console.log("Oba obra")
    console.log("Oba obra")
    const ref = useRef()
    
    const [{ isDragging }, dragRef] = useDrag({
        type: 'CARD',
        id: data.id,
        index: index,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            console.log(item, monitor)
            console.log(index)
            
        }
    })

    dragRef(dropRef(ref))
    
    ref={ref} style={{border: isDragging ? "2px dashed pink": "", paddingTop: isDragging ? "31px" : "", borderRadius: isDragging ? "0px" : "0px", background: isDragging ? "transparent" : "", boxShadow: isDragging ? "none" : "", cursor: isDragging ? "grabbing" : ""}}
    style={{opacity: isDragging ? "0": ""}}
    style={{opacity: isDragging ? "0": ""}}
    style={{opacity: isDragging ? "0": ""}}
    style={{opacity: isDragging ? "0": ""}}
    

    return(
        <div className="ContainerCards" >
            <header >
                <label />
            </header>

            <p >{data.titulo} -- {data.titulo}</p> <span >{`Quantidade solicitada: ${data.quantidade}`}</span>
            <img src="https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy" alt="" /> <span></span>
        </div>
    )
}

*/
 


export function Task(props) {
    const [produtosDoPedido, setProdutosDoPedido] = useState([])
    
   console.log('Terere aqui em baixo vv')
    
    
    console.log("oi")
    console.log(Number(props.task.id))

    const teste = (idTask) => {
       console.log(idTask)
        axios.post("http://localhost:3002/listaProdutosDoPedido/cliente", {numProduto: idTask})
            .then(resposta => setProdutosDoPedido(resposta.data))
            .catch(e => console.log(e))
    
            //console.log(produtosDoPedido)

    }  

    useEffect(() => {

        console.log(produtosDoPedido)
    },[produtosDoPedido])

    return(
        <Draggable draggableId={`${props.task.id}`} index={props.index}>
            {(provided) => {
                return (
                  <div
                    
                    className="containerTasksContent"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <>
                      <div className="taskNomeCliente">
                        <b>Cliente:</b> <p>{props.task.nomeClienteFezPedido}</p>
                      </div>

                      <div className="taskTituloProduto">
                        <b>Froma de pagamento:</b> <p>{props.task.titulo}</p>
                      </div>

                      {/*<div className="taskDescricaoProduto">
                        <b>Descrição:</b> <p>{props.task.descricao}</p>
                        </div>
                      */}

                      <div className="taskQntPrecoProduto">
                        <div className="taskQntProduto">
                          <b>Qnt Produtos:</b> <p> {props.task.qntItems}x </p>
                        </div>

                        <div className="taskPrecoProduto">
                          <b>Total:</b> <p> R${props.task.preco.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="taskDetalhesDoPedido">
                        <div className="pedidoNum">
                            <b>Pedido N°: {props.task.id}</b>
                        </div>

                        <button className="pedidoDetalhes" onClick={() => teste(props.task.id)}>
                            Ver detalhes
                        </button>
                      </div>
                    </>

                    {produtosDoPedido.map((produto, i) => {
                      return <h1>oi</h1>;
                    })}
                  </div>
                );
            }}
        </Draggable>
    )
}