import Item from "./Item"

function ItemList({ lista, handleToggle }) {
    return (
        <>
            <ul>
                {lista.map((item) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        isChecked={item.isChecked}
                        handleToggle={() => handleToggle(item.id)}
                        lista={lista}
                    />
                )
                )}
            </ul>
        </>
    )
}

export default ItemList