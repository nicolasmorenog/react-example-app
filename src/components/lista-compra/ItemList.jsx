import Item from "./Item"

function ItemList({ lista, handleToggle, handleEdit, handleDelete }) {
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
                    />
                )
                )}
            </ul>
        </>
    )
}

export default ItemList