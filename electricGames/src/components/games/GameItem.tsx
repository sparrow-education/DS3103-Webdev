import IGame from "../../interfaces/IGame";

const GameItem = ({ id, title, platform, releaseYear, gameImageURL }: IGame) => {
    return (
        <article className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center" >
            <div className="card border-light text-bg-light mb-5 " style={{ width: '18rem' }}>
                <img className="card-img-top rounded" src={`https://localhost:7215/images/${gameImageURL}`} alt={`Electric Game's Promotional Games - ${gameImageURL}`} />
                <div className="card-body">
                    <h3 className="card-title"> {'\{'}{id}{'\}'} - {title}</h3>
                    <p className="card-text">ID: {id}</p>
                    <p className="card-text">Platform: {platform}</p>
                    <p className="-card-text">Release: {releaseYear}</p>
                </div>
            </div>

        </article>
    )
}
export default GameItem;