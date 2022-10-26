import React from "react";
import { searchFreeImages } from "../api/searchImages";
import Paper from "@mui/material/Paper";
import BoxLayout from "../Components/BoxLayout";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { setFindImages } from "../store/store.actions";
import ImageSearchTwoToneIcon from "@mui/icons-material/ImageSearchTwoTone";
import InfiniteScroll from "react-infinite-scroll-component";
import ProgressiveImage from "react-progressive-graceful-image";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { areEqual, useBreakpointWidht } from "../utils/util";
import "./cubeLoading.css";
import DialogDetailImages from "../Components/DialogDetailImages";

/*  q: "",
    image_type: "all",
    orientation: "all",
    category: null,
    colors: null,
    order: "popular",
    page: 1,
    images: [], */

const categories = [
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

const colors = [
  "grayscale",
  "transparent",
  "red",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "lilac",
  "pink",
  "white",
  "gray",
  "black",
  "brown",
];

export default function FindImages({ queryFindImage, dispatch }) {
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHashMore] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState({});

  const actualImages = React.useMemo(() => {
    return queryFindImage.images;
  }, [queryFindImage.images]);

  const handleChange = (e, type) => {
    dispatch(setFindImages({ ...queryFindImage, [type]: e.target.value }));
  };

  const handleOpenDialogImages = (item) => {
    setCurrentImage(item);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const getImages = async (query, onlyImages) => {
    const param = Object.entries(query).reduce((prev, [key, value]) => {
      if (value !== "" && key !== "images") {
        prev[key] = value;
      }

      return prev;
    }, {});

    const response = await searchFreeImages(param).catch((err) => {
      console.error(err);
      setLoading(false);

      return;
    });

    setLoading(false);

    if (onlyImages) {
      return response;
    } else {
      dispatch(setFindImages({ ...queryFindImage, images: response }));
    }
  };

  React.useEffect(() => {
    if (loading) {
      getImages(queryFindImage);
    }
  }, [queryFindImage]);

  const fetchMoreData = async (hits, total) => {
    console.log(hits.length, total);
    if (hits.length >= total) {
      setHashMore(false);
      return;
    }

    const newQueryFindImages = { ...queryFindImage };
    newQueryFindImages.page = newQueryFindImages.page + 1;

    const response = await getImages(newQueryFindImages, true);

    setTimeout(() => {
      dispatch(
        setFindImages({
          ...newQueryFindImages,
          images: {
            ...newQueryFindImages.images,
            hits: [...newQueryFindImages.images.hits.concat(response.hits)],
          },
        })
      );
    }, 100);
  };

  console.log(queryFindImage);

  return (
    <BoxLayout>
      <InputFindImages
        queryFindImage={queryFindImage}
        dispatch={dispatch}
        setHashMore={setHashMore}
        setLoading={setLoading}
      />

      <Box sx={{ py: 4 }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          spacing={2}
        >
          <Stack flexDirection="column" alignItems="center" spacing={2}>
            <Box sx={{ minWidth: "350px" }}>
              <FormLabel id="image_type">Tipo di immagine</FormLabel>
              <RadioGroup
                row
                name="image_type"
                value={queryFindImage.image_type}
                onChange={(e) => handleChange(e, "image_type")}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Tutti"
                />
                <FormControlLabel
                  value="photo"
                  control={<Radio />}
                  label="Foto"
                />
                <FormControlLabel
                  value="illustration"
                  control={<Radio />}
                  label="Illustrazioni"
                />
                <FormControlLabel
                  value="vector"
                  control={<Radio />}
                  label="Vector"
                />
              </RadioGroup>
            </Box>
            <Box sx={{ minWidth: "350px" }}>
              <FormLabel id="orientation">Orientamento</FormLabel>
              <RadioGroup
                row
                name="orientation"
                value={queryFindImage.orientation}
                onChange={(e) => handleChange(e, "orientation")}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Qualsiasi"
                />
                <FormControlLabel
                  value="horizontal"
                  control={<Radio />}
                  label="Orizzontale"
                />
                <FormControlLabel
                  value="vertical"
                  control={<Radio />}
                  label="Verticale"
                />
              </RadioGroup>
            </Box>
          </Stack>
          <Stack flexDirection="column" alignItems="center" spacing={2}>
            <FormControl sx={{ minWidth: "350px" }}>
              <InputLabel id="category">Categoria</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={queryFindImage.category}
                label="Categoria"
                onChange={(e) => handleChange(e, "category")}
                fullWidth
              >
                <MenuItem value="">
                  <em>Default</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: "350px" }}>
              <InputLabel id="colors">Colore</InputLabel>
              <Select
                labelId="colors"
                id="colors"
                value={queryFindImage.colors}
                label="Colore"
                onChange={(e) => handleChange(e, "colors")}
                fullWidth
              >
                <MenuItem value="">
                  <em>Default</em>
                </MenuItem>
                {colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>

      {queryFindImage?.images?.hits && (
        <MasonryVirtualizationImageList
          itemData={actualImages}
          hasMore={hasMore}
          fetchMoreData={fetchMoreData}
          handleOpenDialogImages={handleOpenDialogImages}
        />
      )}
      <DialogDetailImages
        open={openDialog}
        closeDialog={closeDialog}
        image={currentImage}
        handleOpenDialogImages={handleOpenDialogImages}
      />
    </BoxLayout>
  );
}

function InputFindImages({
  queryFindImage,
  dispatch,
  setHashMore,
  setLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const resetQuery = {
      ...queryFindImage,
      page: 1,
    };

    setLoading(true);

    setHashMore(true);

    dispatch(setFindImages(resetQuery));
  };

  const handleChange = (e) => {
    dispatch(setFindImages({ ...queryFindImage, q: e.target.value }));
  };

  return (
    <Paper
      component="form"
      variant="outlined"
      square
      sx={{
        p: "0px 4px 2px 4px",
        marginTop: "0",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Cerca immagine..."
        onChange={handleChange}
        value={queryFindImage.q}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={handleSubmit}
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
      >
        <ImageSearchTwoToneIcon color="action" />
      </IconButton>
    </Paper>
  );
}

function MasonryVirtualizationImageList({
  itemData,
  hasMore,
  fetchMoreData,
  handleOpenDialogImages,
}) {
  return itemData ? (
    <InfiniteScroll
      //height={1000}
      dataLength={itemData?.hits?.length || 0}
      next={() => fetchMoreData(itemData?.hits, itemData?.totalHits || 0)}
      hasMore={hasMore}
      //scrollableTarget="boxLayout"
      loader={
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube" />
          <div className="sk-cube2 sk-cube" />
          <div className="sk-cube4 sk-cube" />
          <div className="sk-cube3 sk-cube" />
        </div>
      }
    >
      <ItemRow
        itemData={itemData}
        handleOpenDialogImages={handleOpenDialogImages}
      />
    </InfiniteScroll>
  ) : (
    <div>
      <Typography variant="h4">{"Nessun contenuto"}</Typography>

      <div>
        <Typography variant="caption">
          {"Non sono presenti documenti da mostrare"}
        </Typography>
      </div>
    </div>
  );
}

const ItemRow = React.memo(RenderRow, areEqual);

const ImageRow = React.memo(ImageLoading, areEqual);

function RenderRow({ itemData, handleOpenDialogImages }) {
  const colsSM = useBreakpointWidht("sm");
  const colsMD = useBreakpointWidht("md");

  return (
    <ImageList variant="masonry" cols={colsMD || colsSM ? 2 : 1} gap={8}>
      {itemData.hits.map(
        (item) =>
          item?.webformatURL && (
            <ImageRow
              key={item.id}
              item={item}
              handleOpenDialogImages={handleOpenDialogImages}
            />
          )
      )}
    </ImageList>
  );
}

export function ImageLoading({
  item,
  handleOpenDialogImages,
  headetTitle = true,
  otherStyle,
  otherAction,
  ...rest
}) {
  const styleLoading = {
    loading: {
      width: "100%",
      filter: "blur(7px)",
      cursor: "progress",
      objectFit: "cover",
    },
    loaded: {
      width: "100%",
      filter: "blur(0px)",
      transition: "filter 0.2s linear",
      cursor: "zoom-in",
      objectFit: "cover",
      ...otherStyle,
    },
  };

  return (
    <ImageListItem>
      <ProgressiveImage
        src={item?.webformatURL || ""}
        placeholder={`image/blur.jpg?h=${item?.webformatHeight}`}
      >
        {(src, loading) => (
          <img
            onClick={
              otherAction ? otherAction : () => handleOpenDialogImages(item)
            }
            style={
              loading
                ? {
                    ...styleLoading.loading,
                    height: `${item?.webformatHeight}px`,
                  }
                : {
                    ...styleLoading.loaded,
                    height: `${item?.webformatHeight}px`,
                  }
            }
            src={loading ? `image/blur.jpg?h=${item?.webformatHeight}` : src}
            alt={item?.tags || ""}
            {...rest}
          />
        )}
      </ProgressiveImage>
      {headetTitle && (
        <ImageListItemBar
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
          }}
          title={item?.tags}
          position="top"
        />
      )}
    </ImageListItem>
  );
}

/*
q	str	A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters.
text field guarda chat bot

image_type
Accepted values: "all", "photo", "illustration", "vector"
radio

orientation
Accepted values: "all", "horizontal", "vertical"
radio

category
Accepted values: backgrounds, fashion, nature, science, education,
feelings, health, people, religion, places, animals, industry, computer,
food, sports, transportation, travel, buildings, business, music
select

colors
Accepted values: "grayscale", "transparent", "red", "orange", "yellow",
"green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"
select

safesearch ?

order
Accepted values: "popular", "latest"
Default: "popular"
??

page
Default: 1
paginations

callback	string	JSONP callback function name
pretty	bool	Indent JSON output. This option should not be used in production.
Accepted values: "true", "false"
Default: "false"
*/
