import React, { useEffect, useState } from "react";
import axios from 'axios'
import { DragDropContext } from 'react-beautiful-dnd'
import './style.css';


import { Column, List } from '../List'

/*
export function Board(params) {

    const [boardDeList, setBoardDeList] = useState(["Pedidos Solicitados", "Pedidos Sendo Preparados", "Pedidos Prontos"])

    useEffect(() => {
        console.log("O componente foi montado")
         fetch('http://localhost:3002/produtos')
        .then(response => response.json())
        .then(resposta => setBoardDeList(resposta))

    }, [])

    

    return(
        <div className="ContainerBoard">
           {boardDeList.map((list, i) => <List key={i} data={list}/>)}
        </div>
    )
}
*/

export function BoardTeste(params) {
    const [pedidis, setpedidis] = useState([])

    useEffect(() => {
        console.log("O componente foi montado")
         fetch('http://localhost:3002/listaPedidosFeitos/cliente')
        .then(response => response.json())
        .then(resposta => setpedidis(resposta))

    }, [])

    {/*[
            {pertenceColumn: 'toDo', id: 'task-1', content: 'Take out the garbage' },
            {pertenceColumn: 'toDo', id: 'task-2', content: 'Warch my favorite show' },
            
           ]*/}

    let initialData = [
        { tasks: pedidis
       },
       {
          columns: [
              {id:'fazer', title:'Fazer', column: 'column-1'},
              {id:'preparando', title:'Preparando', column: 'column-2'},
              {id:'pronto', title:'Pronto', column: 'column-3'},
              
          ]
       }
    ]
    
    

    const [tarefas, updateTarefas] = useState(initialData)
    const [cliente, setCliente] = useState('')
    //console.log("----------------")
    //console.log(pedidis)
    //console.log(initialData)
    tarefas[0].tasks = pedidis
    //console.log(tarefas)
    //console.log("----------------")


    

    //console.log(tarefas[0].tasks[1])
    //const items = Array.from(tarefas)

    function onDragEnd (result) {
        console.log(result)
        
        
        const { destination } = result
        

        if(!destination){
            return
        }
        
        const startDestination =  result.source.droppableId
        const finishDestination =  result.destination.droppableId
        
        const items = Array.from(tarefas)
        
        
        
        if(startDestination === finishDestination) {

            //console.log(result)
            
            
            
            
            //console.log({ startDestination, finishDestination })
            const [reorderItem] = items[0].tasks.splice(result.source.index, 1)
    
            //console.log(reorderItem)
            items[0].tasks.splice(result.destination.index, 0, reorderItem)
            //console.log(items)
    
            return updateTarefas(items)
            
        }

        
        
        
        //console.log(items)
        
        console.log({ startDestination, finishDestination })
        
        let [reorderItem] = items[0].tasks.splice(result.source.index, 1)
        //console.log(items)
        //console.log(reorderItem)
        
        reorderItem = {...reorderItem, pertenceColumn: finishDestination}
        

        console.log(reorderItem)

        //A partir daqui da para fazer a alteração com o Axios
        console.log(reorderItem)

        axios.put(`http://localhost:3002/pedidosFeitos/cliente`,{
            IdCliente: Number(reorderItem.IdCliente),
            id: Number(reorderItem.id),
            nomeClienteFezPedido: reorderItem.nomeClienteFezPedido,
            pertenceColumn: reorderItem.pertenceColumn,
            preco: Number(reorderItem.preco),
            qntItems: Number(reorderItem.qntItems),

        })
            //.then((resposta) => resposta.json())
              .then((resposta) => console.log(resposta.data))
              .catch(() => console.log("Deu Errado"))

          console.log("TUTUTUTUTUTUTUTUTU") 
          console.log(reorderItem)
          console.log("------------------------")  
          console.log(finishDestination)  


        // Vai fazer a requisição solicitando o nome do cliente que fez o pedido (parei aqui)
        console.log("cliente")
        console.log(result)
        axios.get(`http://localhost:3002/pedidosFeitos/cliente/${reorderItem.IdCliente}`)
            .then((resposta) => (resposta.data))
            .then(([resposta]) => setCliente(resposta))
            .catch(() => console.log("Deu Errado"))
        
        switch (finishDestination) {

            case "preparando":
                console.log("Foi pra preparando")
                console.log(reorderItem)
                //console.log(cliente.emailCliente)
                axios.post(
                    'https://api.z-api.io/instances/3B2607DFAE3010CCBD35A2CB4232B497/token/CD1181DC5BA2BF1411BD2F6A/send-messages',
                    {
                    "phone": `${reorderItem.passwordCliente}`,
                    "message": `Prontinho seu pedido ${reorderItem.emailCliente} já esta sendo preparado`
                    }
                )
                .then(() => {
                    console.log("Prontinho seu pedido já esta sendo preparado")
                })
                .catch((error) => {
                    console.log(error)
                })
                
                break;
            case "pronto":
                console.log("Esta pronto")
                axios.post(
                    'https://api.z-api.io/instances/3B2607DFAE3010CCBD35A2CB4232B497/token/CD1181DC5BA2BF1411BD2F6A/send-messages',
                    {
                    "phone": `${reorderItem.passwordCliente}`,
                    "message": `Obaaaaa! 😋 ${reorderItem.emailCliente} seu pedido ja esta pronto basta retirar no estabelecimento Deck Café.`
                    }
                )
                .then(() => {
                    console.log("Mensagem de Whatsapp enviada com sucesso")
                })
                .catch((error) => {
                    console.log(error)
                })
                
                break;
        
            default:
                break;
        }
        
        items[0].tasks.splice(result.destination.index, 0, reorderItem)
        

        console.log(items)
        //console.log(items)
        

        

        updateTarefas(items)


        

         
    }
    
    console.log("----=>")
    console.log(pedidis)

    //console.log(items)

    /*const onDragStart = (result) => {
        console.log(result)
        const { destination, source, draggableId } = result
        console.log(destination)
       

        const column = initialData.columns[source.droppableId]
        console.log("Aqui")
        console.log(column)
        const newTaskIds = Array.from(column.tasksIds)
        newTaskIds.splice(source.index, 1)
        console.log("Aqui2")
       
        
        newTaskIds.splice(source.index, 0, draggableId)

        const newColumn = {
            ...column,
            tasksIds: newTaskIds,
        }

        const newState ={
            tasks: {
                'task-1': { id: 'task-1', content: 'Take out the garbage' },
                'task-2': { id: 'task-2', content: 'Warch my favorite show' },
                
                
            },
            columns: {
                ...initialData.columns,
                [newColumn.id]: newColumn,
                tasksIds: ['task-1', 'task-2']
            },

            columnOrder: ['column-1']
            
        }


        console.log(newState)
        initialData = newState

    }*/
    
         //console.log('Aqui')
         //console.log(initialData[0].tasks)

         
         
    

    return(
        <DragDropContext onDragEnd={onDragEnd} >

            <div className="ContainerBoard">
                {tarefas[1].columns.map((columnId, position) => {
                    //console.log(columnId)
                    const column = tarefas[1].columns[position]
                    //console.log(column)
                    const tasks = tarefas[0].tasks.map((tasksIds, positionId) => tarefas[0].tasks[positionId])
                    console.log(tarefas[0].tasks)
                    console.log("-----")
                    return <Column key={column} column={column} tasks={tasks}/>         
                })}
            </div>
            
        </DragDropContext>
        
    )
}