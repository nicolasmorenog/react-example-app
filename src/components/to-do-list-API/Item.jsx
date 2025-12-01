import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { IconTrash, IconPencil, IconEye, IconEyeClosed } from '@tabler/icons-react';

function Item({
  item, //Undefined --> MODO CREAR | Objeto --> MODO LISTA
  handleAddItem,
  handleToggle,
  handleDelete,
  handleEdit,
  selectedItemId,
  setSelectedItemId,
  isEditing,
}) {
  // Hooks.
  const navigate = useNavigate();
  const { id: itemIdFromURL } = useParams();

  // Estado del input.
  const [newItem, setNewItem] = useState(item ? item.name : '');

  // Comprobar si el item está en modo edición.
  const isEditingThisItem = isEditing && item && item.id === itemIdFromURL;

  useEffect(() => {
    if (isEditingThisItem) {
      if (setSelectedItemId) {
        setSelectedItemId(item.id);
      }
    }
  }, [itemIdFromURL, isEditingThisItem, item, setSelectedItemId]);

  // Handlers.
  const onChange = (e) => {
    setNewItem(e.target.value);
  };

  const onClick = () => {
    // Modo creación: llama a handleAddItem y limpia el input.
    if (!newItem.trim()) return;
    handleAddItem(newItem);
    setNewItem('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  // Visualización.
  const handleShowDetails = () => {
    if (selectedItemId === item.id) {
      // Si está abierto se cierra.
      setSelectedItemId(null);
      navigate('/to-do-list-API');
    } else {
      // Si está cerrado se abre.
      setSelectedItemId(item.id);
      navigate(`/to-do-list-API/${item.id}`);
    }
  };

  // Edición.
  const handleShowEdit = () => {
    if (isEditingThisItem) {
      navigate(`/to-do-list-API`);
    } else {
      setSelectedItemId(null);
      navigate(`/to-do-list-API/${item.id}/edit`);
    }
  };

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEdit(item.id, newItem);
      toast.success(`Item "${item.name}" was saved!`);
      navigate('/to-do-list-API');
    }
  };

  const onClickSave = () => {
    handleEdit(item.id, newItem);
    toast.success(`Item "${item.name}" was saved!`);
    navigate('/to-do-list-API');
  };

  // UI - Modo Creación.
  if (!item) {
    return (
      <div className="input-content">
        <input type="text" placeholder="Add a new item" onChange={onChange} value={newItem} onKeyDown={handleKeyDown} />
        <button className="add-button" onClick={onClick}>
          + Add
        </button>
      </div>
    );
  }

  // UI - Modo Lista.
  return (
    <div className="item">
      <article>
        <input type="checkbox" onChange={() => handleToggle(item.id)} checked={item.completedAt !== null} />

        <div className="item-content">
          {isEditingThisItem ? (
            <div className="item-input-container">
              <input
                type="text"
                placeholder={item.name}
                onChange={onChange}
                value={newItem}
                onKeyDown={handleEditKeyDown}
                autoFocus
              />
              <button className="add-button" onClick={onClickSave}>
                Save
              </button>
            </div>
          ) : (
            <label className="item-label"> {item.name}</label>
          )}
        </div>

        <div className="item-buttons-group">
          <button className="item-button" onClick={handleShowDetails}>
            {selectedItemId === item.id ? <IconEyeClosed stroke={2} /> : <IconEye stroke={2} />}
          </button>
          <button className="item-button" onClick={handleShowEdit}>
            <IconPencil stroke={2} />
          </button>
          <button className="item-button" onClick={() => handleDelete(item.id)}>
            <IconTrash color="#cc3b3b" stroke={2} />
          </button>
        </div>
      </article>

      {/* Detalles del item */}
      {selectedItemId === item.id && (
        <div className="item-details">
          <hr />
          {item.createdAt && <p>Created: {new Date(item.createdAt).toLocaleString()}</p>}
          {item.updatedAt && <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>}
          <p>Status: {item.completedAt === null ? 'Pending' : 'Completed'}</p>
        </div>
      )}
    </div>
  );
}

export default Item;
