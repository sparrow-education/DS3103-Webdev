import DeleteGame from "../components/games/DeleteGame";

const DeleteGamePage = () => {
    return (
        <section className="text-uppercase fw-bold">
            <h1 className="display-1 fw-bold text-uppercase" style={{paddingTop:'2rem'}}>Delete Game</h1>
            <DeleteGame />
        </section>
    )
}
export default DeleteGamePage;