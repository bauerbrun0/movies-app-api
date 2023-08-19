import dotenv from "dotenv";

dotenv.config();

export default {
    baseURL: "https://api.themoviedb.org/3",
    requestConfig: {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    },
    maxPages: 500
};