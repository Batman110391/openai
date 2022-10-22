import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DownloadForOfflineTwoToneIcon from "@mui/icons-material/DownloadForOfflineTwoTone";
import { searchFreeImages } from "../api/searchImages";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageLoading } from "../applications/FindImages";
import { areEqual } from "../utils/util";

const query = {
  orientation: "all",
  category: "",
  colors: "",
  order: "popular",
  page: 1,
};

const ImageRow = React.memo(ImageLoading, areEqual);

export default function DialogDetailImages({
  open,
  closeDialog,
  image,
  handleOpenDialogImages,
}) {
  const [zoomIn, setZoomIn] = React.useState(false);
  const [relatedImages, setRelatedImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const imageStart = React.useRef(null);

  const handleClose = () => {
    closeDialog();
  };

  const handleSettingZoom = () => {
    setZoomIn(!zoomIn);
  };

  React.useEffect(() => {
    if (open) {
      const extractTagsForQuery = image?.tags.split(",").join(" ");

      if (extractTagsForQuery) {
        getRelatedImages({
          ...query,
          q: extractTagsForQuery,
          image_type: image?.type,
        });
      }
    }
  }, [open]);

  const getRelatedImages = async (query) => {
    setLoading(true);

    const param = Object.entries(query).reduce((prev, [key, value]) => {
      if (value !== "") {
        prev[key] = value;
      }

      return prev;
    }, {});

    const response = await searchFreeImages(param).catch((err) => {
      console.error(err);
      setLoading(false);

      return;
    });

    if (response?.hits) {
      setRelatedImages(response.hits);
    }

    setLoading(false);
  };

  const styleImage = {
    maxHeight: zoomIn ? "unset" : '"500px"',
    cursor: zoomIn ? "zoom-out" : "zoom-in",
    width: zoomIn ? "100%" : "unset",
  };

  console.log("ITEM -> ", relatedImages);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      fullWidth={true}
      maxWidth={"lg"}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={image?.user} src={image?.userImageURL} />
          <Typography variant="button">{image?.user}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers={true} sx={{ p: 3 }}>
        <div ref={imageStart} />
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <img
            onClick={handleSettingZoom}
            src={image?.webformatURL}
            alt={image?.tags || ""}
            style={styleImage}
          />
        </Box>
        <Box>
          <Typography variant="caption" fontWeight="bold">
            Immagini correlate
          </Typography>
          <ImageList variant="masonry" cols={3} gap={8}>
            {!loading &&
              relatedImages
                .filter((item, i) => item.id !== image.id && i <= 10)
                .map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      onClick={() => {
                        imageStart?.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                        handleOpenDialogImages(item);
                      }}
                      src={item?.webformatURL}
                      alt={item?.tags || ""}
                      style={{ objectFit: "cover", cursor: "pointer" }}
                    />
                  </ImageListItem>
                ))}
          </ImageList>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          endIcon={<DownloadForOfflineTwoToneIcon />}
        >
          Scarica immagine
        </Button>
      </DialogActions>
    </Dialog>
  );
}
