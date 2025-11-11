import { useState, useEffect } from "react"

import InputItem from "../components/lista-compra/InputItem"
import ItemList from "../components/lista-compra/ItemList"

const LOCAL_STORAGE_KEY = 'miApp.listaCompra'

function ListaCompra() {

    //Leer localStorage
    const [lista, setLista] = useState(() => {
        const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY)

        if (savedValue === null) {
            return []
        }

        try {
            return JSON.parse(savedValue)
        }
        catch (error) {
            console.error("Error: ", error)
            return []
        }
    })

    //Guardar localStorage
    useEffect(() => {
        const valueToSave = JSON.stringify(lista)
        localStorage.setItem(LOCAL_STORAGE_KEY, valueToSave)
        console.log("LISTA GUARDADA: ")
        console.table(lista)

    }, [lista])


    const [filtro, setFiltro] = useState("all")

    const handleToggle = (id) => {
        const now = new Date().toLocaleString()

        const nuevaLista = lista.map(item => {
            if (item.id === id) {
                if (item.completedAt === null) {
                    return { ...item, isChecked: !item.isChecked, updatedAt: now, completedAt: now }
                }
                else { return { ...item, isChecked: !item.isChecked, updatedAt: now, completedAt: null } }
            }
            else { return item }
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
            <button onClick={() => setFiltro("pending")}>Show Pending</button>
            <button onClick={() => setFiltro("completed")}>Show Completed</button>
            <button onClick={() => setFiltro("all")}>Show All</button>
            <button onClick={() => setLista([])}>Reset</button>
            <div>
                <InputItem
                    setLista={setLista}
                />
                <ItemList
                    lista={filteredList}
                    handleToggle={handleToggle}
                />
            </div>

        </div>
    )
}

export default ListaCompra