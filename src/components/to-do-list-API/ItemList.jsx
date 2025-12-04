import Item from './Item';

function ItemList({ lista, handleToggle, handleEdit, selectedItemId, setSelectedItemId, isEditing }) {
  return (
    <>
      <ul>
        {lista.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleToggle={handleToggle}
            handleEdit={handleEdit}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            isEditing={isEditing}
          />
        ))}
      </ul>
    </>
  );
}

export default ItemList;
