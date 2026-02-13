import Item from './Item';

function ItemList({ lista, handleToggle, handleEdit, handleDelete, selectedItemId, setSelectedItemId, isEditing }) {
  if (lista.length === 0) {
    return (
      <p role="status" aria-live="polite">
        No tasks to display. Add your first task above.
      </p>
    );
  }

  return (
    <ul aria-label="Tasks list">
      {lista.map((item) => (
        <li key={item.id}>
          <Item
            item={item}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            isEditing={isEditing}
          />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
