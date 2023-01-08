import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { red, pink, purple, green, orange, blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { TimelineOppositeContent } from "@mui/lab";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function CustomizedTimeline({ categories, setCategory }) {
  const colors = [
    red[500],
    purple[500],
    orange[500],
    green[500],
    pink[500],
    blue[500],
  ];

  let indexColor = 0;

  return (
    <Timeline
      position="right"
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {categories.map((category, i) => {
        if (indexColor >= colors.length - 1) {
          indexColor = 0;
        } else if (i !== 0) {
          indexColor++;
        }

        const stylesDot =
          i % 2
            ? {
                backgroundColor: colors[indexColor],
                color: "#fff",
              }
            : {
                backgroundColor: "#fff",
                color: colors[indexColor],
                borderColor: colors[indexColor],
              };

        return (
          <TimelineItem key={category.type}>
            <TimelineOppositeContent
              sx={{ flex: "0", py: 3, px: 2 }}
              align="right"
            >
              <FiberManualRecordIcon
                sx={{
                  visibility: category.select ? "visible" : "hidden",
                  color: red["A400"],
                  fontSize: 12,
                }}
              />
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <Box
                onClick={() => setCategory(category.type)}
                sx={
                  !category.select
                    ? {
                        "&:hover": {
                          transform: "scale(1.2)",
                          cursor: "pointer",
                        },
                      }
                    : { transform: "scale(1.2)", cursor: "pointer" }
                }
              >
                <TimelineDot sx={stylesDot}>{category.icon}</TimelineDot>
              </Box>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: 3, px: 2 }}>
              <Typography variant="button" component="span" fontWeight="bold">
                {category.type}
              </Typography>
              {/* <Typography variant="caption">{category.description}</Typography> */}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
