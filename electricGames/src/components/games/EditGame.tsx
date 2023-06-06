import { useContext, useState, ChangeEvent } from 'react';
import IGameContext from '../../interfaces/IGameContext';
import { GameContext } from '../../contexts/GameContext';
import GameServiceModule from '../../services/GameServiceModule';
import ImageUploadServiceModule from '../../services/ImageUploadServiceModule';
import IGame from '../../interfaces/IGame';

const EditGame = () => {

    // Using context to access function
    const { getAllGames, putGame } = useContext( GameContext ) as IGameContext;

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [platform, setPlatform] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<string>('');
    const [imgName, setImgName] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    // Keeping the state of current 'selected' game for a flag check, not overlapping existing game
    const [game, setGame] = useState<IGame>();
    const [message, setMessage] = useState<string>('');

    // A handler to kind of storing the state of lifecycle from a component 
    // This will "react" to the change of its state and state will be stored in the latter variables
    const onChangeHandler = ( event: ChangeEvent<HTMLInputElement> ) => {
        
        // Destructure the input field of type file
        // FileList has a method .item() which is index zero based
        // Retrieves the object that represents the object in the list
        // name and value corresponds to input other input field's attribute
        // Using HTML attribute 'name' in a switch case to evaluate target value
        
        // Using event.target.value *target is the element that trigger the event* which is input on change will trigger self.
        // Using currentTarget.value *currentTarget is the element the event is attached to* would also work.
        const { name, value, files } = event.currentTarget;

        switch( name ) {
            case 'id':
                setId( parseInt(value) );
                break;
            case 'title':
                setTitle( value );
                break;
            case 'platform':
                setPlatform( value );
                break;
            case 'releaseYear':
                setReleaseYear( value );
                break;
            case 'image':
                if (files != null) {
                    const file = files[0];
                    setImage( file );
                }
                break;
        };
    }
    
    // Direct call inside GameServiceModule and result.data contains? the object.
    // If using function provided by context it is just an object "Promise" 
    // That represents the async operation
    const getGameFromService = async () => {
        if ( id !== 0 ) {
            const filteredGame = await GameServiceModule.getGameById( id );
                
            if( filteredGame != null  ) {
                setTitle( filteredGame.title );
                setPlatform( filteredGame.platform );
                setReleaseYear( filteredGame.releaseYear.toString() );
                setImgName( filteredGame.gameImageURL );

                // Save the state of current selected game 
                setGame( filteredGame );
            }
            
        }

        if ( id === 0 ) {
            setTitle( '' );
            setPlatform( '' );
            setReleaseYear( '' );
            setImage( null );
            getAllGames();
            console.log('Id is required');
        }
    }

    // Uploading an image object function as formData
    // which is an object that will encode file input content from form submission
    const uploadImageToAPI = async () => {
        if (image != null) {
            await ImageUploadServiceModule.uploadImage(image);
        }
        else console.log(`Image is "${ image }" - not uploaded.`);
    }

    const editGame = async () => {
        console.clear();

        const editedGame= {
            id: id,
            title: title,
            platform: platform,
            releaseYear: parseInt(releaseYear),
            gameImageURL: image?.name != null ? image.name : imgName
        };

        // Condition for prevention saving over existing game
        if( id !== 0) {
            const save = prompt(`Do you want to save? Y/N`)?.trim().toLowerCase();
            if ( save?.slice(0, 1).includes('y') ) {
                game?.id === id ? putGame( editedGame ) : console.log('Id does not match!');
                game?.id === id ? setMessage( `Game with id "${ id }" edited.`) : setMessage( `Input ID "${ id }" does not match.`);
                uploadImageToAPI();
                timeRefresh(2500);
            };
            
        } else {
            alert("01010111 01101000 01100001 01110100 00100000 01100001 01110010 01100101 00100000 01111001 01101111 01110101 00100000 01110100 01110010 01111001 01101001 01101110 01100111 00100000 01110100 01101111 00100000 01100100 01101111 00111111 🤔");
            console.log('ID does not match');
            setTitle( '' );
            setPlatform( '' );
            setReleaseYear( '' );
            setImage(null);
            setId( 0 );
        }
    }

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
                        <label>ID</label>
                        <input onChange={onChangeHandler} value={ id } name='id' type="number" min={0} max={20} placeholder='Enter ID' required />
                    </article>

                    <article className="form__control">
                        <label>Title</label>
                        <input onChange={onChangeHandler} value={ title } name='title' type="text" placeholder='Edit title' required />
                    </article>

                    <article className="form__control">
                        <label>Platform</label>
                        <input onChange={onChangeHandler} value={ platform } name='platform' type="text" placeholder='Edit platform' required />
                    </article>

                    <article className="form__control">
                        <label>Release Year</label>
                        <input onChange={onChangeHandler} value={ releaseYear } name='releaseYear' type="number" placeholder='Edit year' min="1970" max="2030" required />
                    </article>

                    <article className="form__control">
                        <label>Artwork</label>
                        <input onChange={onChangeHandler} name='image' type="file" accept='image/*' />
                    </article>

                    <article className="form__control">
                        <label>Get Games</label>
                        <input onClick={ getGameFromService } type="button" value="Get" className='btn btn-primary btn-lg' />
                    </article>
                    
                    <article className="form__control">
                        <label>Save Edit</label>
                        <input onClick={ editGame } type="submit" value="Save" className='btn btn-warning btn-lg' />
                    </article>
                    
                    <article className='form__control'>
                        <p>{ message }</p>
                    </article>
                </div>
            </form>
        </section>

    )
}
export default EditGame;