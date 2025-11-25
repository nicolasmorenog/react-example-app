import Item from "./Item"

function ItemList({ lista, handleToggle, handleEdit, handleDelete, selectedItemId, setSelectedItemId, isEditing }) {
    return (
        <>
            <ul>
                {lista.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        handleToggle={handleToggle}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                        isEditing={isEditing}
                    />
                )
                )}
            </ul>
        </>
    )
}

export default ItemList