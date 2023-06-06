// Importing React Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importing custom made shared header component containing Links from Router
import MainSharedHeader from './components/shared/MainSharedHeader';
// Importing all Page components for assigning path
import { HomePage, GetAllGamesPage, GetByTitlePage, GetByIdPage, UploadGamePage, EditGamePage, DeleteGamesPage } from './pages';
// Importing Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/games/Games.css';
import './MyApp.css';
function App() {
    return (
        <BrowserRouter>
        
            <MainSharedHeader />

            <main className='container-fluid text-center overflow-hidden'>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path="/get-all-games" element={<GetAllGamesPage />}></Route>
                    <Route path="/get-by-id" element={<GetByIdPage />}></Route>
                    <Route path="/get-by-title" element={<GetByTitlePage />}></Route>
                    <Route path="/upload-game" element={<UploadGamePage />}></Route>
                    <Route path="/edit-game" element={<EditGamePage />}></Route>
                    <Route path="/delete-game" element={<DeleteGamesPage />}></Route>
                    <Route path="*" element={<p className='display-1'>Not Found 404</p>}></Route>
                </Routes>
            </main>
            
        </BrowserRouter>
    );
}

export default App;
