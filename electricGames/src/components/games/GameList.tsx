// A List taking use of Context being HOOKED as children
// To use the Context from parent node we import all contexts

import { useContext } from "react";
import IGameContext from "../../interfaces/IGameContext"; // Contract to this Context
import { GameContext } from "../../contexts/GameContext"; // An explicit import GameContext with { }
import GameItem from "./GameItem";

const GameList = () => {
    // We destructure in form of object from useContext
    // We may consume the state variable
    const { games } = useContext(GameContext) as IGameContext;

    // Making a list for display, using map to iterate through game objects
    // for each game of games assign a key to help React to identify.
    const getGameItems = () => {
        
        if (games.length > 0) {

            return games.map((game, key) => (
                <GameItem
                    key={`game-${key}`}
                    id={game.id}
                    title={game.title}
                    platform={game.platform}
                    releaseYear={game.releaseYear}
                    gameImageURL={game.gameImageURL}
                />
            ));
        }
    };

    // GameList is used as a "passive active" component using depdency injection from context.
    // We can pass by reference in TSX and return as expression. 
    return (
        <>
            <section className="row" >
                    { getGameItems() }
            </section>
        </>
    );
};
export default GameList;
