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
                // style={{
                //     height: 20,
                //     margin: 12,
                //     borderWidth: 1,
                //     padding: 10,
                // }}
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

    const handleToggle = (id) => {
        const nuevaLista = lista.map(item => {
            if (item.id === id) {
                return { ...item, isChecked: !item.isChecked }
            }
            else return item
        })

        setLista(nuevaLista)
        console.log(nuevaLista) //cada objeto se muestra como {...}
    }
    return (
        <div>
            <h4>Shopping List</h4>
            <div>
                <InputItem
                    setLista={setLista}
                />
                <ItemList
                    lista={lista}
                    handleToggle={handleToggle}
                />
            </div>
            <button>Show Pending</button>
            <button>Show Completed</button>
            <button>Show All</button>
            <button onClick={() => setLista([])}>Reset</button>
        </div>
    )
}

export default ListaCompra