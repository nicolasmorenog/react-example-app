import { useState, useEffect } from "react"
//import { useParams } from 'react-router-dom'
import { Toaster, toast } from "sonner"

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
    const [selectedItemId, setSelectedItemId] = useState(null)

    const handleToggle = (id) => {
        const now = new Date().toISOString()

        const nuevaLista = lista.map(item => {
            if (item.id === id) {
                if (item.completedAt === null) {
                    return { ...item, updatedAt: now, completedAt: now }
                }
                else { return { ...item, updatedAt: now, completedAt: null } }
            }
            else { return item }
        })

        setLista(nuevaLista)
        console.table(nuevaLista)
    }

    let filteredList

    if (filtro === "pending") {
        filteredList = lista.filter(item => item.completedAt === null)
    } else if (filtro === "completed") {
        filteredList = lista.filter(item => item.completedAt !== null)
    } else {
        filteredList = lista
    }

    const handleEdit = (id, newName) => {
        const now = new Date()

        const nuevaLista = lista.map(item => {
            if (item.id === id) {
                console.log('Item:', item.name, '-->', newName)
                return { ...item, name: newName, updateAt: now }
            } else { return item }
        })

        setLista(nuevaLista)

    }

    const handleDelete = (id) => {
        const nuevaLista = lista.filter((item) => item.id !== id)
        const anteriorLista = [...lista]
        setLista(nuevaLista)

        const itemToDelete = lista.find((item) => item.id === id)

        toast.success(`Item "${itemToDelete.name}" has been deleted`, {
            action: {
                label: 'Undo',
                onClick: () => setLista(anteriorLista)
            }
        })
    }

    const handleReset = () => {
        const anteriorLista = [...lista]
        setLista([])

        toast.success('All your items were cleared', {
            action: {
                label: 'Undo',
                onClick: () => setLista(anteriorLista)
            }
        })
    }

    return (
        <div>
            <Toaster 
            position="bottom-right" 
            richColors
            />
            <h2>Shopping List</h2>
            <div>
                <InputItem
                    setLista={setLista}
                />
            </div>
            <div>
                <button
                    className={`filter-button${filtro === "all" ? "" : "active-button"}`}
                    onClick={() => setFiltro("all")}>
                    All
                </button>
                <button
                    className={`filter-button${filtro === "pending" ? "" : "active-button"}`}
                    onClick={() => setFiltro("pending")}>
                    Pending
                </button>
                <button
                    className={`filter-button${filtro === "completed" ? "" : "active-button"}`}
                    onClick={() => setFiltro("completed")}>
                    Completed
                </button>
                <button
                    className="reset-button"
                    onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div>
                <ItemList
                    lista={filteredList}
                    handleToggle={handleToggle}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                />
            </div>

        </div >
    )
}

export default ListaCompra