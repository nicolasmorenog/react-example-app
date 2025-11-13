
import { useState } from 'react'
import InputBox from './InputBox'

function Item({ id, name, handleToggle, lista, handleDelete, handleEdit }) {
    const [showDetails, setShowDetails] = useState(false)
    const [showEditItem, setShowEditItem] = useState(false)
    const [editText, setEditText] = useState('')

    const item = lista.find(item => item.id === id)

    const handleShow = () => {
        setShowDetails(!showDetails)
    }

    const handleShowEdit = () => {
        setShowEditItem(!showEditItem)
    }

    const handleEditKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleEdit (id, editText)
            setShowEditItem(false)
        }
    }

    const onChange = (event) => {
        setEditText(event.target.value)
    }

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
                    onChange={handleToggle}
                ></input>
                {showEditItem && item && (
                <div>
                    <InputBox
                        text={item.name}
                        onChange={onChange}
                        value={editText}
                        onKeyDown={handleEditKeyDown}
                    />
                </div>
            )}
                {!showEditItem && item && <label> {name}</label>}
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
                    onClick={handleShowEdit}
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
                <button onClick={() => handleDelete(id)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24} height={24}
                        viewBox="0 0 24 24"
                        fill="none" stroke="currentColor"
                        strokeWidth={2} strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
            </article>
            {showDetails && item && (
                <div>
                    <p>Name: {item.name}</p>
                    <p>Completed: {item.completedAt === null ? 'No' : 'Yes'}</p>
                    {item.createdAt && <p>Created: {new Date(item.createdAt).toLocaleString()}</p>}
                    {item.updatedAt && <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>}
                </div>
            )}
        </div>
    )
}

export default Item