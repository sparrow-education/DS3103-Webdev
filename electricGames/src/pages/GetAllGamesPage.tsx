import GameList from "../components/games/GameList";

const GetAllGamesPage = () => {
    return (
        <section>
            <h1 className="display-1 fw-bold text-uppercase" style={{paddingTop:'2rem'}}>Get All Games</h1>
            <GameList />
        </section> 
    );
};

export default GetAllGamesPage;
