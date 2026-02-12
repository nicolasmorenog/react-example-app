import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { IconTrash, IconPencil, IconEye, IconEyeClosed } from '@tabler/icons-react';

function Item({
  setLista,
  item, //Undefined --> MODO CREAR | Objeto --> MODO LISTA
  handleToggle,
  handleDelete,
  handleEdit,
  selectedItemId,
  setSelectedItemId,
  isEditing,
}) {
  //Hooks
  const navigate = useNavigate();
  const { id: itemIdFromURL } = useParams();

  //Estado del input
  const [newItem, setNewItem] = useState(item ? item.name : '');

  //Comprobar si el item está en modo edición
  const isEditingThisItem = isEditing && item && item.id === itemIdFromURL;

  useEffect(() => {
    if (isEditingThisItem) {
      if (setSelectedItemId) {
        setSelectedItemId(item.id);
      }
    }
  }, [itemIdFromURL, isEditingThisItem, item, setSelectedItemId]);

  //Handlers
  const onChange = (e) => {
    setNewItem(e.target.value);
  };

  const onClick = () => {
    if (!item) {
      //LÓGICA DEL ANTIGUO INPUTITEM.JSX
      if (!newItem.trim()) return;

      const now = new Date().toISOString();
      const newItemObject = {
        name: newItem,
        createdAt: now,
        updatedAt: now,
        completedAt: null,
        id: crypto.randomUUID(),
      };

      console.log('New added item: ', newItemObject);

      setLista((prev) => [...prev, newItemObject]);
      setNewItem('');
    } else {
      //LÓGICA DEL ANTIGUO ITEM.JSX
      handleEdit(item.id, newItem);
      toast.success(`Item "${newItem}" was saved!`);
      navigate('/lista-compra/');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  //Visualización
  const handleShowDetails = () => {
    if (selectedItemId === item.id) {
      //Si está abierto se cierra
      setSelectedItemId(null);
      navigate('/lista-compra');
    } else {
      //Si está cerrado se abre
      setSelectedItemId(item.id);
      navigate(`/lista-compra/${item.id}`);
    }
  };

  //Edición
  const handleShowEdit = () => {
    if (isEditingThisItem) {
      navigate(`/lista-compra/`);
    } else {
      setSelectedItemId(null);
      navigate(`/lista-compra/${item.id}/edit`);
    }
  };

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEdit(item.id, newItem);
      toast.success(`Item "${newItem}" was saved!`);
      navigate('/lista-compra/');
    }
  };

  const onClickSave = () => {
    handleEdit(item.id, newItem);
    toast.success(`Item "${newItem}" was saved!`);
    navigate('/lista-compra');
  };

  //UI - Modo Creación
  if (!item) {
    return (
      <div className="input-content">
        <label htmlFor="new-item-input" className="visually-hidden">
          Add a new item
        </label>
        <input
          id="new-item-input"
          type="text"
          placeholder="Add a new item"
          onChange={onChange}
          value={newItem}
          onKeyDown={handleKeyDown}
          aria-required="false"
        />
        <button type="button" className="add-button" onClick={onClick} aria-label="Add new item to list">
          + Add
        </button>
      </div>
    );
  }

  //UI - Modo Lista
  return (
    <div className="item">
      <article>
        <input
          type="checkbox"
          onChange={() => handleToggle(item.id)}
          checked={item.completedAt !== null}
          id={`item-checkbox-${item.id}`}
          aria-label={`Mark "${item.name}" as ${item.completedAt !== null ? 'pending' : 'completed'}`}
        />

        <div className="item-content">
          {isEditingThisItem ? (
            <div className="item-input-container">
              <label htmlFor={`edit-item-${item.id}`} className="visually-hidden">
                Edit item name
              </label>
              <input
                id={`edit-item-${item.id}`}
                type="text"
                placeholder={item.name}
                onChange={onChange}
                value={newItem}
                onKeyDown={handleEditKeyDown}
                autoFocus
                aria-label={`Edit item name: ${item.name}`}
              />
              <button type="button" className="add-button" onClick={onClickSave} aria-label="Save edited item">
                Save
              </button>
            </div>
          ) : (
            <label htmlFor={`item-checkbox-${item.id}`} className="item-label">
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
