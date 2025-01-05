import asyncHandler from 'express-async-handler';
import express from 'express';
import { getActor } from '../tmdb-api';
import imagesRouter from './images';

const router = express.Router();
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const actor = await getActor(id);
        if (actor) 
            res.status(200).json(actor);
    } catch (error) {
        console.error('Error fetching actor:', error);
        res.status(500).json({ error: 'Failed to fetch actor' });
    }
}));

router.use('/images', imagesRouter);

export default router;