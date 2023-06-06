import GetById from "../components/games/GetById";
import GameList from "../components/games/GameList";

const GetByIdPage = () => {
    return (
        <section className="text-uppercase fw-bold">
            <h1 className="display-1 fw-bold text-uppercase" style={{paddingTop:'2rem'}}>Get Game By ID</h1>
            <GetById />
            {/* <GameList /> */}
        </section>
    )
}
export default GetByIdPage;