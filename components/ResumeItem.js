const ResumeItem = ({ item }) => {
    console.log("item =>", item);
    return (
        <div className="elem">
            <div className="label">{Object.keys(item)}</div>
            <div className="weight">{Object.values(item)}g</div>
        </div>
    );
};

export default ResumeItem;
