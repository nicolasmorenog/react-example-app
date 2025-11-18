import Item from "./Item"

function ItemList({ lista, handleToggle, handleEdit, handleDelete, selectedItemId, setSelectedItemId }) {
    return (
        <>
            <ul>
                {lista.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        handleToggle={() => handleToggle(item.id)}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                    />
                )
                )}
            </ul>
        </>
    )
}

export default ItemList