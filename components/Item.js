const Item = ({ item, handleAddtoBasket }) => {
    return (
        <div className="elem" onClick={() => handleAddtoBasket(item)}>
            <div className="label">{item.label}</div>
            <div className="weight">{item.weight}g</div>
            <div className="add">{"Add =>"}</div>
        </div>
    );
};

export default Item;
