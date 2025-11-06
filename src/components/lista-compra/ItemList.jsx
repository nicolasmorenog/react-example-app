import Item from "./Item"

function ItemList({ lista, handleToggle }) {
    return (
        <>
            <ul>
                {lista.map((item) => (
                    <Item
                        key={item.id}
                        name={item.name}
                        isChecked={item.isChecked}
                        handleToggle={() => handleToggle(item.id)}
                    />
                )
                )}
            </ul>
        </>
    )
}

export default ItemList