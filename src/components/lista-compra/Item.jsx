
function Item({ name, isChecked, handleToggle }) {
    return (
        <div
            style={{
                backgroundColor: 'grey',
                padding: 10,
                margin: 16,
                borderRadius: 5,
            }}
        >
            <article>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleToggle}
                ></input>
                <label> {name}</label>
            </article>
        </div>
    )
}

export default Item