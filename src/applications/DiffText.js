import React from "react";
import diff from "simple-text-diff";
import BoxLayout from "../Components/BoxLayout";
import { styled } from "@mui/material/styles";
import { Paper, Box, Grid, Fab } from "@mui/material";
import { green, red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import { setDiffText } from "../store/store.actions";

const style = {
  diffTextContainer: {
    letterSpacing: 1,
    padding: 1,
    my: 1,
    "& del": { backgroundColor: red[100] },
    "& ins": { backgroundColor: green[100] },
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: "100%",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));

export default function DiffText({ difftext, dispatch }) {
  const [originalText, setOriginalText] = React.useState(
    difftext?.originalText || ""
  );
  const [analyzedText, setAnalyzedText] = React.useState(
    difftext?.analyzedText || ""
  );

  const compareTextDiff = () => {
    if (originalText && analyzedText) {
      const result = diff.diffPatch(originalText, analyzedText);
      result.originalText = originalText;
      result.analyzedText = analyzedText;
      dispatch(setDiffText(result));
    }
  };

  return (
    <BoxLayout style={{ height: "unset", overflow: "auto" }}>
      <Grid
        container
        spacing={2}
        sx={{ height: "100%" }}
        columns={{ xs: 6, sm: 6, md: 12 }}
      >
        <Grid item xs={6} sx={{ height: "50%" }}>
          <Item>
            <TextField
              key={"originalText"}
              sx={{
                height: "100%",
                "& textarea": {
                  marginTop: 1.5,
                  height: "calc(100% - 12px)!important",
                  overflowY: "auto!important",
                },
                "& .MuiInputBase-root": { height: "100%", px: "8px!important" },
              }}
              fullWidth
              label="Testo originale"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: 2,
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Tooltip title="Copia">
                      <IconButton
                        edge="end"
                        onClick={() => {
                          //createSnackbar("Testo copiato", "info");
                          navigator.clipboard.writeText(originalText);
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
                        onClick={() => setOriginalText("")}
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
              onChange={(e) => setOriginalText(e.target.value)}
              multiline
              variant="outlined"
              value={originalText}
            />
          </Item>
        </Grid>
        <Grid item xs={6} sx={{ height: "50%" }}>
          <Item>
            <TextField
              key={"analyzedText"}
              sx={{
                height: "100%",
                "& textarea": {
                  marginTop: 1.5,
                  height: "calc(100% - 12px)!important",
                  overflowY: "auto!important",
                },
                "& .MuiInputBase-root": { height: "100%", px: "8px!important" },
              }}
              fullWidth
              label="Testo da analizzare"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: 2,
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Tooltip title="Copia">
                      <IconButton
                        edge="end"
                        onClick={() => {
                          //createSnackbar("Testo copiato", "info");
                          navigator.clipboard.writeText(analyzedText);
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
                        onClick={() => setAnalyzedText("")}
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
              onChange={(e) => setAnalyzedText(e.target.value)}
              multiline
              variant="outlined"
              value={analyzedText}
            />
          </Item>
        </Grid>

        <Grid item xs={6} sx={{ paddingBottom: "16px", minHeight: "50%" }}>
          <Item>
            <Box
              sx={style.diffTextContainer}
              component={"div"}
              dangerouslySetInnerHTML={{ __html: difftext?.before }}
            />
          </Item>
        </Grid>
        <Grid item xs={6} sx={{ paddingBottom: "16px", minHeight: "50%" }}>
          <Item>
            <Box
              sx={style.diffTextContainer}
              component={"div"}
              dangerouslySetInnerHTML={{ __html: difftext?.after }}
            />
          </Item>
        </Grid>
      </Grid>

      <Fab
        component={"Button"}
        size={"small"}
        variant="extended"
        color="primary"
        aria-label="generate-diff"
        onClick={compareTextDiff}
        sx={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: { xs: "translateX(-50%)", sm: "translateX(10%)" },
        }}
      >
        Genera differenza
      </Fab>
    </BoxLayout>
  );
}
