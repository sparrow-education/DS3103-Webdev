// Given the contract IGame we are dependent to this interface
import { createContext, useEffect, useState, useRef } from "react";
import IGameContext from "../interfaces/IGameContext";
import IGame from "../interfaces/IGame";
import GameServiceModule from "../services/GameServiceModule";

// Explicit export for context of contract GameContext, initialized as null to begin with.
export const GameContext = createContext<IGameContext | null>(null);

// Declare Props as type of ReactNode , interface would also work
type Props = {
    children: React.ReactNode;
};

// The context provider accepting Props, children as keyword
const GameProvider = ( { children }: Props ) => {
    // Context providing the possibility for children node to gain access to information
    // The useState will set the state to ALL children, using analogy the Master of Puppets or parent if you will.
    const [games, setGames] = useState<IGame[]>([]);
    const [gamesArray, setGamesArray] = useState<IGame[]>([]);
    const previousGameState = useRef<IGame[] | null>(null);

    // useEffect is a hook that cause side effect (mounting) in essence, it will run
    // when something happens, the 'something' means a state change or a render, a passive active function.
    // The application on start will mount getAllGames to execute, it will fetch from API that cause
    // a side effect without user action, this is a valid state change. 
    // side effects ? => execute , to control this infinite loop we pass [] to execute only the first time.
    // We can use depedency injection to cause side effect again whenever state of the 'thing' we pass in ACTUALLY changes.
    useEffect( () => {
        getAllGames();
    }, [])

    // useEffect(() => {
    //     previousGameState.current = games;
    // }, [games, previousGameState]);

    // Context providing functions to children
    // Following the contract all functions has to be the same name
    // Get all games from service function
    const getAllGames = async () => {
        // When invoked - this will be called inside GameServiceModule a request to API
        const gamesFromService = await GameServiceModule.getAllGames();
        const forStorage = await GameServiceModule.getAllGames();
        // returns result.data as an Array
        if ( gamesFromService != null ) {
            setGames( gamesFromService );
            setGamesArray( forStorage );
        }
    };
    
    const getGameById = async ( id: number ) => {
        const result = await GameServiceModule.getGameById( id );
        if ( result != null ) {
            const filteredGame = games.find( g => g.id === id );
            // If using .filter no cast need, assuming it's typed as an array🤷‍♂️
            // since method .find returns the first element, we must cast to IGame[].
            // With operator `as`
            // https://stackoverflow.com/questions/33503077/any-difference-between-type-assertions-and-the-newer-as-operator-in-typescript
            setGames( [filteredGame] as IGame[] );
        }
    } 

    const getGameByTitle = async ( title: string ) => {
        const result = await GameServiceModule.getGameByTitle( title );
        // returns result.data as IGame object in form of an empty array ? 🤔🤨
        if ( result != null ) {
            const filteredGame = games.filter( g => 
                g.title?.toLowerCase().includes( title.trim().toLowerCase() ) );
            setGames( filteredGame );
        }
    }

    const postGame = async ( game: IGame ) => {
        const result = await GameServiceModule.postGame( game );
        // returns result.data as object we can null check
        if ( result != null) {
            setGames( result )
        }
    }

    const putGame = async ( game: IGame ) => {
        const result = await GameServiceModule.putGame( game );
        // returns result.data as empty string
        if ( result !== '' ) {
            setGames( result )
        }
    }

    const deleteGameById = async ( id: number) => {
        const result = await GameServiceModule.deleteGameById( id );
        // returns result.status as number
        if ( result === 204 ) {
            const filteredGames = games.filter( (game) => game.id !== id );
            setGames( filteredGames );
        }
    };

    return (
        // GameContext component provides all props passed inside value
        // children components may consume it from "outside"
        // Sending outside in form of object and destructure it object wise.
        <GameContext.Provider value={{ gamesArray, games, getAllGames, getGameById, getGameByTitle, postGame, putGame, deleteGameById }}>
            {/* Wrapping children */}
            {children}
        </GameContext.Provider>
    );
};
export default GameProvider;
