import { Box, FormGroup, Grid, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import scrapeHtmlWeb from "scrape-html-web";
import BoxLayout from "../Components/BoxLayout";
import {
  ilGiornaleDetail,
  ilGiornaleList,
  ilGiornaleUrlsCategories,
} from "../data/ilGiornale";
import CustomizedTimeline from "../Components/CustomizedTimeline";
import CustomNewsList from "../Components/CustomNewsList";
import InfiniteScroll from "react-infinite-scroll-component";
import { areEqual, useBreakpointWidht } from "../utils/util";
import "./cubeLoading.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: "100%",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));

const MAX_ELEMENT = 800;

export default function News() {
  const [news, setNews] = React.useState(ilGiornaleUrlsCategories);
  const [pageDetail, setPageDetail] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHashMore] = React.useState(true);

  const fetchMoreData = async (news) => {
    setLoading(true);

    console.log("aggregateNews.length", aggregateNews.length);

    if (aggregateNews.length >= MAX_ELEMENT) {
      setHashMore(false);
      return;
    }

    const currentSelected = news.reduce((prev, curr, i) => {
      if (curr.select) {
        prev = { ...prev, [curr.type]: i };
      }

      return prev;
    }, {});

    console.log("currentSelected", currentSelected);

    let requests = news
      .map((cat) =>
        cat.select
          ? scrapeHtmlWeb({
              url: `${cat.url}${cat.page + 1}`,
              ...ilGiornaleList,
            })
          : null
      )
      .filter((ele) => Boolean(ele));

    const response = await Promise.all(requests);

    setTimeout(() => {
      if (requests.length > 0) {
        setNews((previous) => {
          return previous.map((pre, i) => {
            if (Object.keys(currentSelected).find((key) => key === pre.type)) {
              return {
                ...pre,
                data: pre.data.concat(response[currentSelected[pre.type]]),
                page: pre.page + 1,
              };
            } else {
              return pre;
            }
          });
        });
      } else {
        getAllNews(true);
      }
    }, 100);

    setLoading(false);
  };

  const handleSetCategory = (currType) => {
    setNews((previous) => {
      return previous.map((pre, i) => {
        if (currType === pre.type) {
          return { ...pre, select: !pre.select };
        } else {
          return pre;
        }
      });
    });
  };

  const getAllNews = async (after) => {
    setLoading(true);
    let requests = news.map((cat) =>
      scrapeHtmlWeb({
        url: `${cat.url}${after ? cat.page + 1 : cat.page}`,
        ...ilGiornaleList,
      })
    );

    const response = await Promise.all(requests);

    setNews((previous) => {
      return previous.map((pre, i) => {
        return { ...pre, data: pre.data.concat(response[i]) };
      });
    });

    setLoading(false);
  };

  const getNews = async (type, nPage) => {
    setLoading(true);

    const currentUrl = news.find((ele) => ele.type === type);

    const currentDate = await scrapeHtmlWeb({
      url: `${currentUrl.url}${nPage}`,
      ...ilGiornaleList,
    });

    setNews((previous) => {
      return previous.map((pre, i) => {
        if (pre.type === type) {
          return { ...pre, data: currentDate };
        }
      });
    });

    setLoading(false);
  };

  const getDetailNews = async (url) => {
    setLoading(true);

    const currentDate = await scrapeHtmlWeb({
      url: url,
      ...ilGiornaleDetail,
    });

    setPageDetail(currentDate);
    setLoading(false);
  };

  const defaultNews = news.reduce((prev, curr) => {
    curr?.data?.forEach((ele, i) => {
      if (i < Math.floor(curr.data.length / 3)) {
        //TODO: prenderende uno diverso da un altro
        prev.push(ele);
      }
    });

    return prev;
  }, []);

  const aggregateNews = news.reduce((prev, curr) => {
    if (curr.select) {
      curr?.data?.forEach((ele, i) => {
        prev.push(ele);
      });
    }

    return prev;
  }, []);

  React.useEffect(() => {
    getAllNews();
  }, []);

  console.log(news);
  console.log("aggregateNews", aggregateNews);
  console.log("defaultNews", defaultNews);

  return (
    <BoxLayout>
      <Grid
        container
        spacing={2}
        sx={{ height: "100%" }}
        columns={{ xs: 6, sm: 6, md: 12 }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{ height: "100%", xs: { paddingBottom: "8px" } }}
        >
          <Item>
            <CustomizedTimeline
              categories={news}
              setCategory={handleSetCategory}
            />
          </Item>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{ padding: 1, height: "100%", xs: { paddingBottom: "8px" } }}
        >
          {loading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          <div id="scrollableDiv" style={{ height: "100%", overflow: "auto" }}>
            <InfiniteScroll
              dataLength={
                aggregateNews.length ? aggregateNews.length : defaultNews.length
              }
              next={() => fetchMoreData(news)}
              hasMore={hasMore}
              scrollableTarget="scrollableDiv"
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
                itemData={
                  aggregateNews.length > 0 ? aggregateNews : defaultNews
                }
              />
            </InfiniteScroll>
          </div>
        </Grid>
      </Grid>
    </BoxLayout>
  );
}

const ItemRow = React.memo(RenderRow, areEqual);

function RenderRow({ itemData }) {
  //TODO: Skeleton loading
  return <CustomNewsList itemData={itemData} />;
}
