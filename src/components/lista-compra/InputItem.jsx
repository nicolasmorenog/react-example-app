import { useState } from "react"

function InputItem({ setLista }) {

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

    const handleKeyDown= (event) => {
        if (event.key === 'Enter'){
            onClick()
        }
    }

    return (
        <>
            <input
                type='text'
                placeholder='Add a new item'
                onChange={onChange}
                value={newItem}
                onKeyDown={handleKeyDown}
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

export default InputItem