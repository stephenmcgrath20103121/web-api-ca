import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import favMovies from './favMovies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';
import FavoriteMovie from '../api/favourites/favouriteModel';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
    await User.collection.drop().catch(err => console.log('User collection not found'));
    await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
    await FavoriteMovie.collection.drop().catch(err => console.log('FavouriteMovie collection not found'));
    await User.create(users);
    await Movie.create(movies);
    await FavoriteMovie.create(favMovies);
    console.log('Database initialised');
    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`);
    console.log(`${favMovies.length} fav movies loaded`);
    await mongoose.disconnect();
}

main();
