import React from "react";
import BoxLayout from "../Components/BoxLayout";
import RatingReview from "../Components/RatingReview";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";
import RamenDiningTwoToneIcon from "@mui/icons-material/RamenDiningTwoTone";
import { styled } from "@mui/material/styles";
import { getMovieSearch } from "../api/searchMovie";
import { reviewIA } from "../api/suggestion";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import { setReview } from "../store/store.actions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: "100%",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));

const labels = {
  1: "Pessima",
  2: "Discreta",
  3: "Buona",
  4: "Ottima",
  5: "Eccellente",
};

export default function Review({ review, dispatch }) {
  const [currentMovie, setCurrentMovie] = React.useState(null);
  const [currentRestaurant, setCurrentRestaurant] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [note, setNote] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [viewMode, setViewMode] = React.useState("movie");

  const { enqueueSnackbar } = useSnackbar();

  const [movieValueRating, setMovieValueRating] = React.useState({
    photograph: 2,
    actors: 2,
    stories: 2,
    directors: 2,
  });

  const [restaurantValueRating, setRestaurantValueRating] = React.useState({
    service: 2,
    quality: 2,
    location: 2,
    prices: 2,
  });

  const [movieAttributes, setMovieAttributes] = React.useState([
    { type: "photograph", label: "Fotografia", check: false },
    { type: "actors", label: "Attori", check: false },
    { type: "stories", label: "Storia", check: false },
    { type: "directors", label: "Regia", check: false },
  ]);

  const [restaurantAttributes, setRestaurantAttributes] = React.useState([
    { type: "service", label: "Servizio", check: false },
    { type: "quality", label: "Qualità", check: false },
    { type: "location", label: "Ambiente", check: false },
    { type: "prices", label: "Prezzi", check: false },
  ]);

  const reviewStart = useRef(null);

  React.useEffect(() => {
    getMovies();
  }, []);

  const actualAttribute =
    viewMode === "movie" ? movieAttributes : restaurantAttributes;

  const actualValueRating =
    viewMode === "movie" ? movieValueRating : restaurantValueRating;

  const createSnackbar = (text, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(text, { variant });
  };

  const getMovies = async (value) => {
    const keyword = value || "a";

    const response = await getMovieSearch(keyword);

    if (Boolean(response?.length)) {
      setMovies(response);
    }
  };

  const handleChangeViewMode = (event, nextView) => {
    if (nextView !== null) {
      setViewMode(nextView);
    }
  };

  const handleChangeAttCheck = (value, type) => {
    const newAttr = actualAttribute.map((attr) => {
      if (type === attr.type) {
        return { ...attr, check: !value };
      } else {
        return attr;
      }
    });
    if (viewMode === "movie") {
      setMovieAttributes(newAttr);
    } else {
      setRestaurantAttributes(newAttr);
    }
  };

  const handleChangeRating = (value, type) => {
    if (viewMode === "movie") {
      setMovieValueRating({ ...movieValueRating, [type]: value });
    } else {
      setRestaurantValueRating({ ...actualValueRating, [type]: value });
    }
  };

  const handleChangeAutocomplete = (e) => {
    getMovies(e.target.value);
  };

  const handleRemove = (index) => {
    const newReviews = review.filter((rew, i) => i !== index);

    dispatch(setReview(newReviews));
  };

  const generateReview = async () => {
    setLoading(true);

    reviewStart?.current?.scrollIntoView({ behavior: "smooth" });

    if (
      (Boolean(currentMovie) && viewMode === "movie") ||
      (Boolean(currentRestaurant) && viewMode === "restaurant")
    ) {
      const ratings = actualAttribute
        .map((attr) => {
          if (attr.check) {
            return attr.label + " " + labels[actualValueRating[attr.type]];
          } else {
            return null;
          }
        })
        .filter((attr) => Boolean(attr));

      const titleMovie = currentMovie?.title
        ? currentMovie?.title + " del " + currentMovie?.release_date
        : "";

      const firstParam =
        viewMode === "movie"
          ? titleMovie
          : "Il nome del ristorante è " + currentRestaurant;

      const notes = [firstParam, ...ratings, note].join(",");

      const reviewResp = await reviewIA(notes, viewMode);

      if (Boolean(reviewResp)) {
        dispatch(setReview([...review, reviewResp]));
      }
    } else {
      if (viewMode === "movie") {
        createSnackbar("Inserire almeno un film", "error");
      } else {
        createSnackbar("Inserire almeno un ristorante", "error");
      }
    }

    setLoading(false);
  };

  return (
    <BoxLayout>
      <Grid
        container
        spacing={2}
        sx={{ height: "100%" }}
        columns={{ xs: 6, sm: 6, md: 12 }}
      >
        <Grid item xs={6}>
          <Item>
            <FormGroup
              sx={{
                width: "100%",
                height: "100%",
                p: "16px 0px",
                alignItems: "center",
              }}
            >
              <ToggleButtonGroup
                sx={{ marginBottom: 1 }}
                orientation="horizontal"
                value={viewMode}
                exclusive
                onChange={handleChangeViewMode}
              >
                <ToggleButton value="movie" aria-label="movie">
                  <Tooltip title="Film">
                    <MovieCreationTwoToneIcon />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="restaurant" aria-label="restaurant">
                  <Tooltip title="Ristoranti">
                    <RamenDiningTwoToneIcon />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
              <Box
                component="div"
                sx={{ width: "280px", marginBottom: "25px" }}
              >
                {viewMode === "movie" ? (
                  <Autocomplete
                    value={currentMovie}
                    onChange={(event, newValue) => {
                      setCurrentMovie(newValue);
                    }}
                    options={movies}
                    autoHighlight
                    getOptionLabel={(option) =>
                      option?.title
                        ? option?.title + " del " + option?.release_date
                        : ""
                    }
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {Boolean(option?.backdrop_path) && (
                          <img
                            loading="lazy"
                            width="30"
                            src={`http://image.tmdb.org/t/p/w500${option?.backdrop_path}`}
                            srcSet={`http://image.tmdb.org/t/p/w500${option?.backdrop_path} 2x`}
                            alt={option.title}
                          />
                        )}

                        {option.title + " del " + option.release_date}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        onChange={handleChangeAutocomplete}
                        {...params}
                        label="Film"
                      />
                    )}
                  />
                ) : (
                  <TextField
                    fullWidth
                    label="Ristorante"
                    variant="outlined"
                    onChange={(e) => setCurrentRestaurant(e.target.value)}
                  />
                )}
              </Box>

              <Box component="div" sx={{ width: "280px" }}>
                {actualAttribute.map((attr, i) => {
                  return (
                    <React.Fragment key={attr.type}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={attr.check}
                            onChange={() =>
                              handleChangeAttCheck(attr.check, attr.type)
                            }
                          />
                        }
                        label={attr.label}
                      />
                      <RatingReview
                        disabled={!attr.check}
                        value={actualValueRating[attr.type]}
                        onChange={handleChangeRating}
                        type={attr.type}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>
              <TextField
                label={"Note aggiuntive"}
                sx={{ mt: 4, width: "280px" }}
                multiline
                value={note}
                row={2}
                maxRows={3}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                onClick={generateReview}
                variant="contained"
                disableElevation
                sx={{ marginTop: "30px", width: "220px" }}
              >
                Genera Recensione
              </Button>
            </FormGroup>
          </Item>
        </Grid>
        <Grid item xs={6} sx={{ height: "100%", xs: { paddingBottom: "8px" } }}>
          <Item>
            {loading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            <div ref={reviewStart} />
            {Boolean(review.length) ? (
              <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
                {review.map((rew, i) => (
                  <TextField
                    key={i + "rew"}
                    sx={{ my: "15px" }}
                    fullWidth
                    label="Recensione"
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            display: "flex",
                            gap: "15px",
                          }}
                        >
                          <Tooltip title="Copia">
                            <IconButton
                              edge="end"
                              onClick={() => {
                                createSnackbar("Testo copiato", "info");
                                navigator.clipboard.writeText(rew);
                              }}
                            >
                              <ContentCopyTwoToneIcon
                                fontSize="small"
                                color="inherit"
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Rimuovi">
                            <IconButton
                              edge="end"
                              onClick={() => handleRemove(i)}
                            >
                              <DisabledByDefaultTwoToneIcon
                                fontSize="small"
                                color="inherit"
                              />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    multiline
                    variant="filled"
                    value={rew || "..."}
                  />
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Nessuna recensione generata
                </Typography>
                <Typography
                  variant="caption"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Cerca un film e imposta i parametri per generare delle
                  recensioni
                </Typography>
              </Box>
            )}
          </Item>
        </Grid>
      </Grid>
    </BoxLayout>
  );
}
