import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomNewsList({ itemData }) {
  return (
    <ImageList
      sx={{
        width: "100%",
        height: "100%",
        paddingBottom: "8px",
        margin: 0,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: "translateZ(0)",
        overflow: "hidden",
      }}
      gap={2}
    >
      {itemData.map((item, i) => {
        const cols = i === 0 ? 2 : 1;
        const rows = i === 0 ? 2 : 1;

        return (
          <ImageListItem key={item.title + i} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 200, 150, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                "& .MuiImageListItemBar-title": {
                  whiteSpace: "normal",
                },
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)",
              }}
              title={
                i === 0 ? (
                  <Typography variant="h3" fontFamily="Noticia Text, serif">
                    {item.title}
                  </Typography>
                ) : (
                  <Typography variant="h6" fontFamily="Noticia Text, serif">
                    {item.title}
                  </Typography>
                )
              }
              position="top"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
