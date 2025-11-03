import { useState } from "react"

export function ItemList(props) {
    console.log(props)
    return (
        <>
            <ul>
                {props.lista.map((item, index) => (
                    <Item
                        name={item}
                        id={index}
                    />
                )
                )}
            </ul>
        </>
    )
}


export function Item(props) {
    return (
        <div
        // style={{
        //     backgroundColor: 'grey',
        //     padding: 10,
        //     margin: 16,
        //     borderRadius: 5,
        // }}
        >
            <article>
                <input type='checkbox'></input><label> {props.name}</label>
            </article>
        </div>
    )
}




export function InputItem(props) {

    const [newItem, setNewItem] = useState('')


    const handleChange = (event) => {
        setNewItem(event.target.value)
    }

    const handleClick = (event) => {
        console.log('click', newItem)
        props.setLista(prev => [...prev, newItem])
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
                placeholder='Add a new item to the list'
                onChange={handleChange}
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
                onClick={handleClick}
            >+</button>


        </>
    )
}


function ListaCompra() {
    const [lista, setLista] = useState([])

    console.log('rendering App')
    return (
        <div
            // style={{
            //     backgroundColor: "green",
            //     fontFamily: "Sans-Serif"
            // }}
        >
            <h4>Shopping List</h4>
            <div>
                <InputItem setLista={setLista} />
                <ItemList
                    nombre='Compra del mes'
                    lista={lista}
                />
            </div>
            <button onClick={() => setLista([])}>Reset</button>
        </div>
    )
}

export default ListaCompra