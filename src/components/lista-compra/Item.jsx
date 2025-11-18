import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Item({ item, handleToggle, handleDelete, handleEdit, selectedItemId, setSelectedItemId }) {
    const { id: itemId } = useParams();
    const [showEditItem, setShowEditItem] = useState(false)

    const [editText, setEditText] = useState(item.name ?? '')

    const navigate = useNavigate();


    const handleShow = () => {
        if (selectedItemId === item.id) {
            //Si está abierto se cierra
            setSelectedItemId(null)
            navigate('/lista-compra')
        } else {
            //Si está cerrado se abre
            setSelectedItemId(item.id)
            navigate(`/lista-compra/${item.id}`)
        }
    }

    const handleShowEdit = () => {
        setShowEditItem(!showEditItem)
    }

    const handleEditKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleEdit(item.id, editText)
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
                    checked={item.completedAt !== null}
                ></input>
                {showEditItem && item && (
                    <div>
                        <input
                            type='text'
                            placeholder={item.name}
                            onChange={onChange}
                            value={editText}
                            onKeyDown={handleEditKeyDown}
                        />
                    </div>
                )}
                {!showEditItem && item && <label> {item.name}</label>}
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
                <button onClick={() => handleDelete(item.id)}>
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
            {selectedItemId === item.id && (
                <div>
                    {item.createdAt && <p>Created: {new Date(item.createdAt).toLocaleString()}</p>}
                    {item.updatedAt && <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>}
                    <p>Status: {item.completedAt === null ? 'Pending' : 'Completed'}</p>
                </div>
            )}
        </div>
    )
}

export default Item