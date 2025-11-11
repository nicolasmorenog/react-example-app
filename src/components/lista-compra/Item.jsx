
import { useState } from 'react'

function Item({ id, name, isChecked, handleToggle, lista }) {
    const [showDetails, setShowDetails] = useState(false)

    const handleShow = (id) => {
        setShowDetails(!showDetails)
    }

    const item = lista.find(item => item.id === id)


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
                <button onClick={handleShow}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-eye">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
            </button>
            <button 
            // onClick={handleEdit}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                    <path d="M13.5 6.5l4 4" />
                </svg>
            </button>
            </article>
            {showDetails && item && (
                <div>
                    <p>Name: {item.name}</p>
                    <p>Completed: {item.isChecked ? 'Yes' : 'No'}</p>
                    {item.createdAt && <p>Created: {new Date(item.createdAt).toLocaleString()}</p>}
                    {item.updatedAt && <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>}
                </div>
            )}
        </div>
    )
}

export default Item