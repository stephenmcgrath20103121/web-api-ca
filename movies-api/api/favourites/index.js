import express from 'express';
import FavouriteMovie from './favouriteModel';
import moviesRouter from './movies'

const router = express.Router(); 
router.get('/movies', async (req, res) => {
    const movies = await FavouriteMovie.find();
    res.status(200).json(movies);
});

router.use('/movies', moviesRouter);

export default router;