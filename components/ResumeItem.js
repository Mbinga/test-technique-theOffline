const ResumeItem = ({ item }) => {
    return (
        <div className="elem">
            <div className="label">{Object.keys(item)}</div>
            <div className="weight">{Object.values(item)}g</div>
        </div>
    );
};

export default ResumeItem;
