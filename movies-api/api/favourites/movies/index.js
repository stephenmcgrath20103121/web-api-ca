import express from 'express';
import FavouriteMovie from '../favouriteModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const movies = await FavouriteMovie.findByUsername(id);
    res.status(200).json(movies);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { movie_ids } = req.body;
    const updatedMovies = await FavouriteMovie.findOneAndUpdate(
        { username: id }, 
        { movie_ids }, 
        { new: true, upsert: true } 
    );
    res.status(200).json(updatedMovies);
}));

export default router;
