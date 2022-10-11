const CartItem = ({ handleRemovetoBasket, item2 }) => {
    return (
        <div
            className="elem2"
            onClick={() => {
                handleRemovetoBasket(item2);
            }}
        >
            <div className="label">{item2.label}</div>
            <div className="weight2">{item2.weight}g</div>
            <div className="remove">{"<= Remove"}</div>
        </div>
    );
};

export default CartItem;
