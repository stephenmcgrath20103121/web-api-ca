import asyncHandler from 'express-async-handler';
import express from 'express';
import { getMovieImages } from '../../tmdb-api';
  
const router = express.Router();
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10); 
    try {
        const images = await getMovieImages(id);
        if (images) {
            res.status(200).json(images);
        } else {
            res.status(404).json({ error: 'Images not found' });
        }
    } catch (error) {
        console.error('Error fetching movie images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
}));

export default router;