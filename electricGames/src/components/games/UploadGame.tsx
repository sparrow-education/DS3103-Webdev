import { useContext, useState, ChangeEvent } from 'react';
import IGameContext from '../../interfaces/IGameContext';
import { GameContext } from '../../contexts/GameContext';
import ImageUploadServiceModule from '../../services/ImageUploadServiceModule';

const UploadGame = () => {
    
    // Using context to access function
    const { postGame } = useContext( GameContext ) as IGameContext;

    // console.log( _title, _platform, _year, _img?.name )
    // When reading the input from user everything will be stored as string anyways so we initialize it as string
    const [title, setTitle] = useState<string>('');
    const [platform, setPlatform] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    const [message, setMessage] = useState<string>('');


    // A handler to kind of storing the state of lifecycle from a component 
    // This will "react" to the change of its state and state will be stored in the latter variables
    const changeHandler = ( event: ChangeEvent<HTMLInputElement> ) => {

        // Destructure the input field of type file
        // FileList has a method .item() which is index zero based
        // Retrieves the object that represents the object in the list
        // name and value corresponds to input other input field's attribute
        // Using HTML attribute 'name' in a switch case to evaluate target value

        // Using event.target.value *target is the element that trigger the event* which is input on change will trigger self.
        // Using currentTarget.value *currentTarget is the element the event is attached to* would also work.
        const { name, value, files } = event.currentTarget;
        switch ( name ) {
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
                if ( files != null ) {
                    const file = files[0];
                    setImage( file );
                } 
                break;
        };
    }

    // Async function direct call from ImageUploadServiceModule.
    // Uploading an image object function as formData
    // which is an object that will encode file input content from form submission
    const uploadImageToAPI = async () => {
        if ( image != null ) {
            await ImageUploadServiceModule.uploadImage( image );
        }
        else console.log(`Image is "${ image }" - not uploaded.`);
    }

    // This function is using the function provided by context - 
    // in theory an async will not be necessarily.
    const uploadGame = ( e: ChangeEvent<HTMLFormElement> ) => {
        console.clear();
        
        // Preventing the form to execute "POST"
        e.preventDefault();                  

        // Initializing new object and map current state to properties. Set default image url if null
        const newGame = {
            title: title,
            platform: platform,
            releaseYear: parseInt( releaseYear ),
            gameImageURL: `${ image != null ? image.name : image == null ? 'electricGames.png' : '' }`
        }

        if ( newGame != null ) {
            const save = prompt(`Do you want to save? Y/N`)?.trim().toLowerCase();
            if ( save?.slice(0, 1).includes('y') ) {
                uploadImageToAPI();
                setMessage( `Game "${title}" was created.` );
                postGame( newGame );
                timeRefresh(3500);
            }
        }
        else console.log(`"${ newGame }" failed to post`);
    }

    // 😂
    const timeRefresh = (time: number) => {
        setTimeout(() => {
            window.location.reload()
        }, time);
    }

    return (
        <section>
            <form onSubmit={uploadGame}>
                <div className="form__wrapper">
                    <article className="form__control">
                        <label>Title</label>
                        <input className='ripple' onChange={changeHandler} name='title' type="text" placeholder='Enter title' required />
                    </article>

                    <article className="form__control">
                        <label>Platform</label>
                        <input onChange={changeHandler} name='platform' type="text" placeholder='Enter platform' required />
                    </article>

                    <article className="form__control">
                        <label>Release Year</label>
                        <input onChange={changeHandler} name='releaseYear' type="number" min="1970" max="2030" placeholder='Enter year' required />
                    </article>

                    <article className="form__control">
                        <label>Artwork</label>
                        <input onChange={changeHandler} name='image' type="file" />
                    </article>

                    <article className="form__control">
                        <label>Save Game</label>
                        <input type="submit" value="Save" className='btn btn-success btn-lg' />
                    </article>

                    <article className='form__control'>
                        <p>{ message }</p>
                    </article>
                    
                </div>
            </form>
        </section>

    )
}
export default UploadGame;