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
import ContentCopyIcon from "@mui/icons-material/ContentCopyTwoTone";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { getMovieSearch } from "../api/searchMovie";
import { movieReview } from "../api/suggestion";

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

export default function Review() {
  const [review, setReview] = React.useState([]);
  const [currentMovie, setCurrentMovie] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [note, setNote] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [movieValueRating, setMovieValueRating] = React.useState({
    photograph: 2,
    actors: 2,
    stories: 2,
    directors: 2,
  });

  const [movieAttributes, setMovieAttributes] = React.useState([
    { type: "photograph", label: "Fotografia", check: false },
    { type: "actors", label: "Attori", check: false },
    { type: "stories", label: "Storia", check: false },
    { type: "directors", label: "Regia", check: false },
  ]);

  React.useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async (value) => {
    const keyword = value || "a";

    const response = await getMovieSearch(keyword);

    if (Boolean(response?.length)) {
      setMovies(response);
    }
  };

  const handleChangeAttCheck = (value, type) => {
    const newAttr = movieAttributes.map((attr) => {
      if (type === attr.type) {
        return { ...attr, check: !value };
      } else {
        return attr;
      }
    });

    setMovieAttributes(newAttr);
  };

  const handleChange = (value, type) => {
    setMovieValueRating({ ...movieValueRating, [type]: value });
  };

  const handleChangeAutocomplete = (e) => {
    getMovies(e.target.value);
  };

  const handleRemove = (index) => {
    const newReviews = review.filter((rew, i) => i !== index);

    setReview(newReviews);
  };

  const generateReview = async () => {
    setLoading(true);

    const ratings = movieAttributes
      .map((attr) => {
        if (attr.check) {
          return attr.label + " " + labels[movieValueRating[attr.type]];
        } else {
          return null;
        }
      })
      .filter((attr) => Boolean(attr));

    const notes = [currentMovie, ...ratings, note].join(",");

    const reviewResp = await movieReview(notes);

    if (Boolean(reviewResp)) {
      setReview([...review, reviewResp]);
    }

    setLoading(false);
  };

  return (
    <BoxLayout>
      <Grid
        container
        spacing={2}
        sx={{ height: "100%" }}
        columns={{ xs: 4, sm: 6, md: 12 }}
      >
        <Grid item xs={6}>
          <Item>
            <FormGroup
              sx={{
                width: "100%",
                height: "100%",
                p: "16px 0px",
              }}
            >
              <Box
                component="div"
                sx={{ width: "280px", marginBottom: "25px" }}
              >
                <Autocomplete
                  value={currentMovie}
                  onChange={(event, newValue) => {
                    setCurrentMovie(newValue);
                  }}
                  freeSolo
                  options={movies.map(
                    (option) => option.title + " del " + option.release_date
                  )}
                  renderInput={(params) => (
                    <TextField
                      onChange={handleChangeAutocomplete}
                      {...params}
                      label="Film"
                    />
                  )}
                />
              </Box>

              <Box component="div" sx={{ width: "100%" }}>
                {movieAttributes.map((attr, i) => {
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
                        value={movieValueRating[attr.type]}
                        onChange={handleChange}
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
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Item>
            {loading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            {Boolean(review.length) ? (
              review.map((rew, i) => (
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
              ))
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
                  gutterBotto
                  sx={{ textAlign: "center" }}
                >
                  Nessuna recensione generata
                </Typography>
                <Typography
                  variant="caption"
                  gutterBotto
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
