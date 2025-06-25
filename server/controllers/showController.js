import axios from "axios"
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

// api to add new movies to the website
export const getNowPlayingMovies = async(req , res)=>{
    try {
       const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing',
        {
            params: {api_key: process.env.TMDB_API_KEY}
        })
        const movies = data.results;
        res.json({success : true , movies : movies})
    } catch (error) {
        console.log(error)
        res.json({success : false , message : error.message})
    }
}

// api to add new shows to the website

export const addShow = async(req , res) =>{
    try {
        const {movieId , showInput , showPrice} = req.body;
        let movie = await Movie.findById(movieId)

        if(!movie) {
            // fetch movie  from tmdb
            const [movieDetailsResponse , movieCreditResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {api_key: process.env.TMDB_API_KEY }
                }) , 
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    params: {api_key: process.env.TMDB_API_KEY }
                })
            ])
            const movieApiData = movieDetailsResponse.data;
            const movieCreditData = movieCreditResponse.data;

            const movieDetails = {
                _id : movieId,
                title : movieApiData.title,
                overview : movieApiData.overview,
                poster_path : movieApiData.poster_path,
                backdrop_path : movieApiData.backdrop_path,
                genres : movieApiData.genres,
                casts : movieCreditData.casts,
                release_date : movieCreditData.release_date,
                original_language : movieCreditData.original_language,
                tagline : movieApiData.tagline || "",
                vote_average : movieApiData.vote_average,
                runtime : movieApiData.runtime,
            }
        }
        movie = await Movie.create(movieDetails);
        const showToCreate = [];
        showInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time)=>{
                const dateTimeString = `${showDate}${time}`;
                showToCreate.push({
                    movie : movieId,
                    showDateTime : new Date(dateTimeString),
                    showPrice, 
                    occupiedSeats: {}
                })
            })
        });
        if(showToCreate.length > 0){
            await Show.insertMany(showToCreate);
        }
        res.json({success : true , message : 'show added Successfully.'})
    } catch (error) {
        
    }
}