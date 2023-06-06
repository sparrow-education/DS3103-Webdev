

const TimeItem = () => {
    const date = new Date().toLocaleString('en-US', { day: '2-digit' });
    const month = new Date().toLocaleString(`en-us`, { month: `numeric` })
    const year = new Date().getFullYear()

    return (
        <>
            <div className="card border-light mb-3 bg-dark" style={{maxWidth:'18rem'}}>
                <i className="fa-solid fa-calendar mb-3 mt-3 px-5">
                    <div className="card-header bg-transparent border-dark">{`${date}/${month}/${year}`}</div>
                </i>
            </div>
        </>
    )
}
export default TimeItem;