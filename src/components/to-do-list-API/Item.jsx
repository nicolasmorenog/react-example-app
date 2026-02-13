import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconTrash, IconPencil, IconEye, IconEyeClosed } from '@tabler/icons-react';

function Item({
  handleAddItem, // Required for creation mode
  item, // Undefined --> MODO CREAR | Objeto --> MODO LISTA
  handleToggle,
  handleEdit,
  handleDelete,
  selectedItemId,
  setSelectedItemId,
  isEditing,
}) {
  // Hooks
  const navigate = useNavigate();
  const { id: itemIdFromURL } = useParams();

  // Estado del input
  const [newItem, setNewItem] = useState(item ? item.name : '');

  // Comprobar si el item está en modo edición
  const isEditingThisItem = isEditing && item && item.id === itemIdFromURL;

  useEffect(() => {
    if (isEditingThisItem) {
      if (setSelectedItemId) {
        setSelectedItemId(item.id);
      }
    }
  }, [itemIdFromURL, isEditingThisItem, item, setSelectedItemId]);

  // Handlers
  const onChange = (e) => {
    setNewItem(e.target.value);
  };

  const onClick = () => {
    if (!item) {
      // Modo creación
      if (!newItem.trim()) return;
      handleAddItem(newItem);
      setNewItem('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  // Visualización
  const handleShowDetails = () => {
    if (selectedItemId === item.id) {
      setSelectedItemId(null);
      navigate('/to-do-list-API');
    } else {
      setSelectedItemId(item.id);
      navigate(`/to-do-list-API/${item.id}`);
    }
  };

  // Edición
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
      navigate('/to-do-list-API');
    }
  };

  const onClickSave = () => {
    handleEdit(item.id, newItem);
    navigate('/to-do-list-API');
  };

  // UI - Modo Creación
  if (!item) {
    return (
      <div className="input-content">
        <label htmlFor="new-item-input-api" className="visually-hidden">
          Add a new task
        </label>
        <input
          id="new-item-input-api"
          type="text"
          placeholder="Add a new item"
          onChange={onChange}
          value={newItem}
          onKeyDown={handleKeyDown}
          aria-required="false"
        />
        <button type="button" className="add-button" onClick={onClick} aria-label="Add new task to list">
          + Add
        </button>
      </div>
    );
  }

  // UI - Modo Lista
  return (
    <div className="item">
      <article>
        <input
          type="checkbox"
          onChange={() => handleToggle(item.id)}
          checked={item.completedAt !== null}
          id={`item-checkbox-api-${item.id}`}
          aria-label={`Mark "${item.name}" as ${item.completedAt !== null ? 'pending' : 'completed'}`}
        />

        <div className="item-content">
          {isEditingThisItem ? (
            <div className="item-input-container">
              <label htmlFor={`edit-item-api-${item.id}`} className="visually-hidden">
                Edit task name
              </label>
              <input
                id={`edit-item-api-${item.id}`}
                type="text"
                placeholder={item.name}
                onChange={onChange}
                value={newItem}
                onKeyDown={handleEditKeyDown}
                autoFocus
                aria-label={`Edit task name: ${item.name}`}
              />
              <button type="button" className="add-button" onClick={onClickSave} aria-label="Save edited task">
                Save
              </button>
            </div>
          ) : (
            <label htmlFor={`item-checkbox-api-${item.id}`} className="item-label">
              {item.name}
            </label>
          )}
        </div>

        <div className="item-buttons-group" role="group" aria-label={`Actions for ${item.name}`}>
          <button
            type="button"
            className="item-button"
            onClick={handleShowDetails}
            aria-label={selectedItemId === item.id ? `Hide details for ${item.name}` : `Show details for ${item.name}`}
            aria-expanded={selectedItemId === item.id}
          >
            {selectedItemId === item.id ? (
              <IconEyeClosed stroke={2} aria-hidden="true" />
            ) : (
              <IconEye stroke={2} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="item-button"
            onClick={handleShowEdit}
            aria-label={`Edit ${item.name}`}
          >
            <IconPencil stroke={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="item-button"
            onClick={() => handleDelete(item.id)}
            aria-label={`Delete ${item.name}`}
          >
            <IconTrash color="#cc3b3b" stroke={2} aria-hidden="true" />
          </button>
        </div>
      </article>

      {/* Detalles del item */}
      {selectedItemId === item.id && (
        <section className="item-details" aria-label={`Details for ${item.name}`} role="region">
          <hr aria-hidden="true" />
          {item.createdAt && (
            <p>
              <strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}
            </p>
          )}
          {item.updatedAt && (
            <p>
              <strong>Updated:</strong> {new Date(item.updatedAt).toLocaleString()}
            </p>
          )}
          <p>
            <strong>Status:</strong> {item.completedAt === null ? 'Pending' : 'Completed'}
          </p>
        </section>
      )}
    </div>
  );
}

export default Item;
