import { useState } from "react"

function InputItem({ setLista }) {

    const [newItem, setNewItem] = useState('')

    const onChange = (event) => {
        setNewItem(event.target.value)
    }

    const onClick = (event) => {
        console.log(newItem, "was added to the list")

        const now = new Date().toISOString()

        const newItemObject = {
            name: newItem,
            createdAt: now,
            updatedAt: now,
            completedAt: null,
            id: crypto.randomUUID()
        }

        console.log("New added item: ", newItemObject)

        setLista(prev => [...prev, newItemObject])
        setNewItem('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
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
                className="add-button"
                onClick={onClick}
            >+ Add</button>



        </>
    )
}

export default InputItem