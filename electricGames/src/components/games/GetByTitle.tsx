import { useState, useContext, ChangeEvent, useEffect } from 'react';
import IGameContext from '../../interfaces/IGameContext';
import { GameContext } from '../../contexts/GameContext';

const GetByTitle = () => {

    // Destructure function from getGameByTitle from GameContext with contract of IGameContext
    const { games, getAllGames, getGameByTitle } = useContext( GameContext ) as IGameContext;

    const [title, setTitle] = useState<string>('');

    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
        // Retrieving the input value from eventlistener and setting the state to title
        setTitle( e.currentTarget.value );
        if ( games.length === 1 || games.length === 0 ) {
            getAllGames();
        }
    }

    const getByTitle = () => {
        // On click - calling the function from GameContext sending current state of title as argument,
        // This will then invoke GameServiceModule direct call to API and fetch back the data result.
        // The return of data is then provided by GameContext's variable game, which we destructured.
        if ( title.trim() !== '' ) {
            getGameByTitle( title );
            setTitle( '' );
        } else {
            getAllGames();
        }
    }
    
    return (
        <section>
            <form>
                <div className='form__wrapper'>
                
                    <article className='form__control'>
                        <label className='form-label'>Enter Title</label>
                        <input className='form-control' onChange={ onChangeHandler } type="text" placeholder='Enter title'/>
                    </article>

                    <article className='form__control'>
                        <label>Search Title</label>
                        <input onClick={ getByTitle } type="button" className='btn btn-primary' value="Search" />
                    </article>
                    
                </div>
            </form>
        </section>
    )
}
export default GetByTitle;