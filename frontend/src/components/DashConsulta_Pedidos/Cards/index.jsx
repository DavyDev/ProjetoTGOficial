import React, { useRef } from "react";
import './style.css';
import { Draggable } from "react-beautiful-dnd";

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

   //console.log('Terere')
   //console.log(props)

    return(
        <Draggable draggableId={`${props.task.id}`} index={props.index}>
            {(provided) => {
                return(
                    <div className="containerTasksContent"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="taskNomeCliente">
                           <b>Cliente:</b> <p>{props.task.nomeCliente}</p>
                        </div>

                        <div className="taskTituloProduto">
                           <b>Produto:</b> <p>{props.task.titulo}</p>
                        </div>

                        <div className="taskDescricaoProduto">
                           <b>Descrição:</b> <p>{props.task.descricao}</p>
                        </div>
                        
                        <div className="taskQntPrecoProduto">
                           <div className="taskQntProduto">
                           <b>Qnt Produto:</b> <p> {props.task.quantidade}x </p>
                           </div>

                           <div className="taskPrecoProduto">
                                <b>Total:</b> <p> R${(props.task.preco).toFixed(2)}</p>   
                           </div>                    
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}