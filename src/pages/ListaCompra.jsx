import { useState } from "react"


export function Item({ name, isChecked, handleToggle }) {
    return (
        <div
            style={{
                backgroundColor: 'grey',
                padding: 10,
                margin: 16,
                borderRadius: 5,
            }}
        >
            <article>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleToggle}
                ></input>
                <label> {name}</label>
            </article>
        </div>
    )
}


export function ItemList({ lista, handleToggle }) {
    return (
        <>
            <ul>
                {lista.map((item) => (
                    <Item
                        key={item.id}
                        name={item.name}
                        isChecked={item.isChecked}
                        handleToggle={() => handleToggle(item.id)}
                    />
                )
                )}
            </ul>
        </>
    )
}



export function InputItem({ setLista }) {

    const [newItem, setNewItem] = useState('')

    const onChange = (event) => {
        setNewItem(event.target.value)
    }

    const onClick = (event) => {
        console.log(newItem, "was added to the list")

        const newItemObject = {
            name: newItem,
            isChecked: false,
            id: crypto.randomUUID()
        }

        console.log("New added item: ", newItemObject)

        setLista(prev => [...prev, newItemObject])
        setNewItem('')
    }

    return (
        <>
            <input
                type='text'
                placeholder='Add a new item'
                onChange={onChange}
                value={newItem}
            />
            <button
                style={{
                    height: 40,
                    width: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
                onClick={onClick}
            >+</button>


        </>
    )
}


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