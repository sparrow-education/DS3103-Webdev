// Service is a special type of Module that connects to server API

import axios from 'axios';
import IGame from '../interfaces/IGame';

// Using Immediate Invoke Function Expression
const GameServiceModule = (
    // Lambda Anonymous Function Expression
    () => {

        // Endpoints to Electric Game API
        const electricGameApiEndpoints = {
            getAllGames: "https://localhost:7215/api/Game/GetAllGames",
            getGameById: "https://localhost:7215/api/Game/GetById",
            getGameByTitle: "https://localhost:7215/api/Game/GetByName",
            postNewGame: "https://localhost:7215/api/Game/Post",
            putGame: "https://localhost:7215/api/Game/Put",
            deleteGameById: "https://localhost:7215/api/Game/Delete",
        }

        // Get all games with axios wait for the response before return
        const getAllGames = async () => {
            try {
                const result = await axios.get(electricGameApiEndpoints.getAllGames);
                console.log(result.data);
                return result.data;
            } catch {
                console.log("Error in getAllGames");
            }
        }

        const getGameById = async (id: number) => {
            try {
                const result = await axios.get(`${electricGameApiEndpoints.getGameById}/${id}`);
                console.log(result.data);
                return result.data;
            } catch {
                console.log(`Game with id "${id}" not found`);
            }
        }

        const getGameByTitle = async (title: string) => {
            try {
                const result = await axios.get(`${electricGameApiEndpoints.getGameByTitle}/${title}`);
                console.log(result.data)
                return result.data;
            } catch {
                console.log(`Game with title "${title}" not found`);
            }
        }

        const postGame = async (game: IGame) => {
            try {
                const result = await axios.post(electricGameApiEndpoints.postNewGame, game);
                console.log(result.data)
                return result.data;
            } catch {
                console.log("Game not posted");
            }
        }

        const putGame = async (game: IGame) => {
            try {
                const result = await axios.put(electricGameApiEndpoints.putGame, game);
                console.log(`Edit success - ${result.status}`)
                return result.data;
            } catch {
                console.log(`Game with id "${game.id}" not found`);
            }
        }

        // Delete a game by it's ID URL is in this way: https://localhost:7215/api/Game/id
        const deleteGameById = async (id: number) => {
            try {
                const result = await axios.delete(`${electricGameApiEndpoints.deleteGameById}/${id}`);
                console.log(`Delete success - ${result.status}`)
                return result.data;
            } catch {
                console.log(`Game with id "${id}" not found`);
            }
        }



        // Return all the functions
        return { getAllGames, getGameById, getGameByTitle, postGame, putGame, deleteGameById }
    }
)();

// Exporting the Service Module to access it from outside
export default GameServiceModule;