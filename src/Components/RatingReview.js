import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const labels = {
  1: "Pessima",
  2: "Discreta",
  3: "Buona",
  4: "Ottima",
  5: "Eccellente",
};

function getLabelText(value) {
  return `${labels[value]}`;
}

export default function RatingReview({ disabled, value = 2, onChange, type }) {
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        disabled={disabled}
        name="feedback"
        value={value}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          onChange(newValue, type);
        }}
        size="large"
      />

      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
  );
}
