import dotenv from 'dotenv';

dotenv.config();

export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_BASE_CONFIG = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
    }
};