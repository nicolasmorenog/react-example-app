import { useState } from "react"

import InputItem from "../components/lista-compra/InputItem"
import ItemList from "../components/lista-compra/ItemList"

function ListaCompra() {
    const [lista, setLista] = useState([])
    const [filtro, setFiltro] = useState("all")
    
    const handleToggle = (id) => {
        const nuevaLista = lista.map(item => {
            if (item.id === id) {
                return { ...item, isChecked: !item.isChecked }
            }
            else {return item}
        })
        
        setLista(nuevaLista)
        console.table(nuevaLista)
    }
    
    

        let filteredList

        if (filtro === "pending") {
            filteredList = lista.filter(item => !item.isChecked)
        } else if (filtro === "completed") {
            filteredList = lista.filter(item => item.isChecked)
        } else {
            filteredList = lista
        }


    return (
        <div>
            <h2>Shopping List</h2>
            <div>
                <InputItem
                    setLista={setLista}
                />
                <ItemList
                    lista={filteredList}
                    handleToggle={handleToggle}
                />
            </div>
            <button onClick={() => setFiltro("pending") }>Show Pending</button>
            <button onClick={() => setFiltro("completed") }>Show Completed</button>
            <button onClick={() => setFiltro("all") }>Show All</button>
            <button onClick={() => setLista([])}>Reset</button>
        </div>
    )
}

export default ListaCompra