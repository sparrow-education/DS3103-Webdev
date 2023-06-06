// Making Contract for Context
// The Context need data and functions
import IGame from "./IGame";

interface IGameContext {

    // Common way of containing information in form of an array
    // Apparently a very common way of declaring array of objects in TS
    // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/
    games: IGame[];
    gamesArray: IGame[];

    // Common way of defining functions
    getAllGames: () => void;

    getGameById: (id: number) => void;

    getGameByTitle: (title: string) => void;

    postGame: (game: IGame) => void;

    putGame: (game: IGame) => void;

    deleteGameById: (id: number) => void;

}
export default IGameContext;