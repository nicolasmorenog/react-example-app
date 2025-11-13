import Item from "./Item"

function ItemList({ lista, handleToggle, handleEdit, handleDelete }) {
    return (
        <>
            <ul>
                {lista.map((item) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        handleToggle={() => handleToggle(item.id)}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        lista={lista}
                    />
                )
                )}
            </ul>
        </>
    )
}

export default ItemList