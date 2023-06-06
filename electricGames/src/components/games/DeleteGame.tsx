import { useState, useContext, ChangeEvent } from "react";
import IGameContext from "../../interfaces/IGameContext";
import { GameContext } from "../../contexts/GameContext";

const DeleteGame = () => {

    const { games, deleteGameById } = useContext( GameContext ) as IGameContext;

    const [id, setId] = useState<number>(0);
    const [message, setMessage] = useState<string>("");


    const onChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => {
        setId( parseInt(event.target.value) );
    };

    const deleteGame = () => {
        console.clear();

        const exist = games.find( game => game.id === id ? true : false );
        if ( exist != null && (id != null) ) {
            const save = prompt(`Do you want to save? Y/N`)?.trim().toLowerCase();
            setMessage( ' ' );

            if ( save?.slice( 0, 1 ).includes( 'y' ) ) {
                deleteGameById( id );
                setMessage( `Game with id "${ id }" deleted.`);
                timeRefresh(2000);
            };

        } else {
            setMessage( `Game id "${ id }" does not exist.` );
        }
    };

    // 😂
    const timeRefresh = (time: number) => {
        setTimeout(() => {
            window.location.reload()
        }, time);
    }

    return (
        <section>
            <form>
                <div className="form__wrapper">

                    
                    <article className="form__control">
                        <label>Enter ID</label>
                        <input onChange={onChangeHandler} value={id} type="number" min={0} max={20} placeholder="Enter Id" required/>
                    </article>

                    <article className="form__control">
                        <label>Delete Game</label>
                        <input onClick={ deleteGame } type="button" value="Delete" className="btn btn-danger btn-lg"/>
                    </article>

                    <article>
                        <p> Number of game{games.length > 1 ? 's' : ''} in database: {games.length}</p>
                        <p>{message}</p>
                    </article>

                </div>
            </form>
        </section>
    );
};
export default DeleteGame;
