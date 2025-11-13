const InputBox = ({ onChange, value, onKeyDown, text }) => {
    return (
        <input
            type='text'
            placeholder={text}
            onChange={onChange}
            value={value}
            onKeyDown={onKeyDown}
        />
    )
}

export default InputBox