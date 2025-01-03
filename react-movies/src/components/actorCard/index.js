import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const ActorCard = ({ cast }) => {
    return (
    <Link to={`/person/${cast.id}`} style={{ textDecoration: "none"}}>
        <Card>
            <CardHeader
            avatar = {
                <Avatar sx ={{ backgroundColor: 'blue'}}>
                    {cast.popularity >= 25 ? <StarRateIcon /> : null}
                </Avatar>
            }
            title={
                <Typography variant="h6" component="p">
                    {cast.name}
                </Typography>
            }
            subheader={`as ${cast.character}`}
            />
            <CardMedia 
            sx = {{height: 400}}
            image = {cast.profile_path ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`: img}
            alt={cast.name}
            />
        </Card>
    </Link>
    );
};
export default ActorCard;