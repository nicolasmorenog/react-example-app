import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { IconTrash, IconPencil, IconEye, IconEyeClosed } from '@tabler/icons-react'

function Item({ item, handleToggle, handleDelete, handleEdit, selectedItemId, setSelectedItemId }) {
    //const { id: itemId } = useParams();
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
            toast.success(`Item "${item.name}" guardado correctamente!`)

        }
    }

    const onChange = (event) => {
        setEditText(event.target.value)
    }

    const onClick = () => {
        handleEdit(item.id, editText)
        setShowEditItem(false)
        toast.success(`Item "${item.name}" guardado correctamente!`)

    }

    return (
        <div className='item'>
            <article>
                <input
                    type='checkbox'
                    onChange={handleToggle}
                    checked={item.completedAt !== null}
                ></input>
                <div className='item-content'>
                    {showEditItem && item ? (
                        <div className='item-input-container'>
                            <input
                                type='text'
                                placeholder={item.name}
                                onChange={onChange}
                                value={editText}
                                onKeyDown={handleEditKeyDown}
                            />
                            <button
                                className="add-button"
                                onClick={onClick}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        item && <label> {item.name}</label>
                    )}
                </div>
                <div className='item-buttons-group'>
                    <button
                        className="item-button"
                        onClick={handleShow}>
                        {selectedItemId === item.id ? <IconEyeClosed stroke={2} /> : <IconEye stroke={2} />}
                    </button>
                    <button
                        className="item-button"
                        onClick={handleShowEdit}>
                        <IconPencil stroke={2} />
                    </button>
                    <button
                        className="item-button"
                        onClick={() => handleDelete(item.id)}>
                        <IconTrash color='#cc3b3b' stroke={2} />
                    </button>
                </div>
            </article>
            {selectedItemId === item.id && (
                <div className="item-details">
                    <hr />
                    {item.createdAt && <p>Created: {new Date(item.createdAt).toLocaleString()}</p>}
                    {item.updatedAt && <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>}
                    <p>Status: {item.completedAt === null ? 'Pending' : 'Completed'}</p>
                </div>
            )}
        </div>
    )
}

export default Item