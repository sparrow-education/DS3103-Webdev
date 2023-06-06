import { useRef, useState, useContext, ChangeEvent, EventHandler, useEffect } from 'react';
import IGame from '../../interfaces/IGame';
import IGameContext from '../../interfaces/IGameContext';
import { GameContext } from '../../contexts/GameContext';
import GameItem from './GameItem';
import GameServiceModule from '../../services/GameServiceModule';

const GetById = () => {

    // Some are included for demonstration purposes
    // const { games } = useContext( GameContext ) as IGameContext;
    // const [id, setId] = useState<number>(0);

    const [chosenGame, setChosenGame] = useState<IGame | null>(null);
    const [message, setMessage] = useState<string>('Enter Field');
    const userInput = useRef<HTMLInputElement>(null);

    
    // Dispatch from button on click
    const onClickHandler = async ( ) => {
        if ( userInput.current != null ) {
            const gameWithId = await GameServiceModule.getGameById( parseInt(userInput.current.value) )
            if( gameWithId != null ) {
                setMessage( `Found` )
            } else if ( gameWithId == null ) {
                setMessage( `Not Found` ) 
            } else 
            setMessage(` `)
            setChosenGame( gameWithId );
        } 
    }
    
    // For demonstration purpose I did not remove this where I address the difference between onChange & onClick
    // const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
    //     setId( parseInt( e.currentTarget.value ) );
    // }
    // const getByIdOnChange = () => {
    //     if (id !== 0) {
    //         return games.filter( game => game.id === id )
    //         .map( ((game, key) => (
    //             <GameItem 
    //                 key={`game-${key}`}
    //                 id={game.id}
    //                 title={game.title}
    //                 platform={game.platform}
    //                 releaseYear={game.releaseYear}
    //                 gameImageURL={game.gameImageURL}
    //             />
    //         )))
    //     } else {
    //         return <p>Not set yet</p>
    //     }
    // }
    
    return (
        <section>
            <form>
                <div className='form__wrapper'>
                    <article className='form__control'>
                        <label>Enter ID</label>
                        {/* <input ref={userInput} onChange={ onChangeHandler } type="number" min={0} max={20} placeholder="Enter Id" /> */}
                        <input ref={userInput} type="number" min={0} max={20} placeholder="Enter Id" />

                    </article>
                    <article className='form__control'>
                        <label>Search ID</label>
                        <input onClick={ onClickHandler } type="button" className='btn btn-primary' value="Search" />
                    </article>
                </div>
            </form>
            
            <article className='row d-flex justify-content-center align-items-center flex-column gap-3'>
                {message}
                {
                    chosenGame != null ?
                        <GameItem
                            id={chosenGame?.id}
                            title={chosenGame?.title}
                            platform={chosenGame?.platform}
                            releaseYear={chosenGame?.releaseYear}
                            gameImageURL={chosenGame?.gameImageURL}
                        />
                        : <p>Enter ID</p>
                }
            </article>

            {/* For demonstration purpose in my reflection report - this will depend on onChange */}
            {/* <article className='row d-flex justify-content-center align-items-center flex-column gap-3'>
                { getByIdOnChange() }
            </article> */}
        </section>
        
    )
}
export default GetById;