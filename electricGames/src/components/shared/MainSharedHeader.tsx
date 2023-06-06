import { Link } from 'react-router-dom';
import './MainSharedHeader.css';

const MainSharedHeader = () => {

    return (
        <header className='sticky-top text-uppercase fw-bold pb-3'>
            <nav>
                <ul className='nav nav-tabs justify-content-center bg-dark navbar-dark pt-3'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'> <img src={require('../../assets/logo/electric.png')} width="30" height="24" alt="Electric Game Logo" /> </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/get-all-games'>All Games</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/get-by-id'>Get By ID</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/get-by-title'>Get By Title</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/upload-game'>Upload Game</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/edit-game'>Edit Game</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/delete-game'>Delete Game</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default MainSharedHeader;