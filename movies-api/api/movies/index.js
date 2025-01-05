import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import imagesRouter from './images';
import {
    getUpcomingMovies, getGenres, getMovies, getMovie, getPopularMovies, getTopRatedMovies, getMovieImages
  } from '../tmdb-api';
  
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const movie = await getMovie(id);
        if (movie) 
            res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    [page] = [+page];

    try {
        const movies = await getMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(404).json({message: 'The movies you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    [page] = [+page];

    try {
        const upcomingMovies = await getUpcomingMovies(page);
        res.status(200).json(upcomingMovies);
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        res.status(404).json({message: 'The upcoming movies you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    [page] = [+page];

    try {
        const popularMovies = await getPopularMovies(page);
        res.status(200).json(popularMovies);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        res.status(404).json({message: 'The popular movies you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/topRated', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    [page] = [+page];

    try {
        const topRatedMovies = await getTopRatedMovies(page);
        res.status(200).json(topRatedMovies);
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        res.status(404).json({message: 'The top rated movies you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.use('/images', imagesRouter);

export default router;
