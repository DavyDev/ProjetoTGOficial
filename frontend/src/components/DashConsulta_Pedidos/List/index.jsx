import React, { useEffect, useState } from "react";
import './style.css';

import { MdAdd } from 'react-icons/md'

import { Cards, Task} from '../Cards'

import { Droppable } from "react-beautiful-dnd";

/*
export function List({ data }) {

    const [boardDeCards, setBoardDeCards] = useState([1, 2])

    useEffect(() => {
        console.log("O componente foi montado")
         fetch('http://localhost:3002/pedidosSolicitados')
        .then(response => response.json())
        .then(resposta => setBoardDeCards(resposta))

    }, [])

    console.log("----------------------")
    console.log(boardDeCards)
    console.log("----------------------")

    console.log(data)
    return(
        <div className="ContainerList">
            <header id="ConfiguraHeader">
                <h2>{data}</h2>
                <button type="button">
                    <MdAdd size={20} color="#fff"/>
                </button>
            </header>

            <ul>
                {boardDeCards.map((cards, index) => <Cards key={index} index={index} data={cards}/>)}
            </ul>
        </div>
    )
}
*/

export function Column(props) {
    
    console.log('Segue abaixo as props:')
    console.log(props.tasks)

    
    
    return(
        
            <div className="containerColumn">
                <div className="containerTitulo">
                    <h1>{props.column.title}</h1>
                    <div className={`corEstagio${props.column.id}`}></div>
                </div>
                
                <Droppable droppableId={`${props.column.id}`}>
                    {(provided) => {
                        return(

                            <div className="containerTaks"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {props.tasks.map((task, index) => (task.pertenceColumn == props.column.id ? (<Task key={task.id} task={task} index={index}/>) : ""))}
                                {/*props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)*/}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </div>
        
    )
}