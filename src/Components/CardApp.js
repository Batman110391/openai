import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export default function CardApp({ title, path, image }) {
  return (
    <Tooltip title={title}>
      <Card sx={{ width: 175 }} component={Link} to={path}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} alt={title} />
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}
