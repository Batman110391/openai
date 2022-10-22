import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function shallowDiffers(prev, next) {
  for (let attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }
  for (let attribute in next) {
    if (prev[attribute] !== next[attribute]) {
      return true;
    }
  }
  return false;
}

export function areEqual(prevProps, nextProps) {
  const {
    style: prevStyle,
    isScrolling: prevIsScrolling,
    ...prevRest
  } = prevProps;
  const {
    style: nextStyle,
    isScrolling: nextIsScrolling,
    ...nextRest
  } = nextProps;

  return (
    !shallowDiffers(prevStyle, nextStyle) &&
    !shallowDiffers(prevRest, nextRest) &&
    (nextIsScrolling === prevIsScrolling || nextIsScrolling)
  );
}

export function useBreakpointWidht(breakpoint) {
  const theme = useTheme();
  let matches = useMediaQuery(theme.breakpoints.up(breakpoint));
  return matches;
}
