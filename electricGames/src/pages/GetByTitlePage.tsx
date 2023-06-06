import GameList from "../components/games/GameList";
import GetByTitle from "../components/games/GetByTitle";

const GetByTitlePage = () => {
    return (
        <section className="text-uppercase fw-bold">
            <h1 className="display-1 fw-bold text-uppercase" style={{paddingTop:'2rem'}}>Get Game By Title</h1>
            <GetByTitle />
            <GameList />
        </section>
    );
};
export default GetByTitlePage;
