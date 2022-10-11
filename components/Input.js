const Input = ({ item }) => {
    return (
        <>
            <option value={item.limit}>{item.label}</option>
        </>
    );
};

export default Input;
