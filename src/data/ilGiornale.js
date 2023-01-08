import SportsBasketballTwoToneIcon from "@mui/icons-material/SportsBasketballTwoTone";
import BusinessCenterTwoToneIcon from "@mui/icons-material/BusinessCenterTwoTone";
import BarChartTwoToneIcon from "@mui/icons-material/BarChartTwoTone";
import ArchitectureTwoToneIcon from "@mui/icons-material/ArchitectureTwoTone";
import NewspaperTwoToneIcon from "@mui/icons-material/NewspaperTwoTone";
import TheaterComedyTwoToneIcon from "@mui/icons-material/TheaterComedyTwoTone";
import HealthAndSafetyTwoToneIcon from "@mui/icons-material/HealthAndSafetyTwoTone";
import ElectricCarTwoToneIcon from "@mui/icons-material/ElectricCarTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";

export const ilGiornaleUrlsCategories = [
  {
    type: "sport",
    url: "https://www.ilgiornale.it/sezioni/sport.html?page=",
    icon: <SportsBasketballTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "politica",
    url: "https://www.ilgiornale.it/sezioni/interni.html?page=",
    icon: <BusinessCenterTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "economia",
    url: "https://www.ilgiornale.it/sezioni/economia.html?page=",
    icon: <BarChartTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "tecnologia",
    url: "https://www.ilgiornale.it/sezioni/tecnologia.html?page=",
    icon: <ArchitectureTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "cronache",
    url: "https://www.ilgiornale.it/sezioni/cronache.html?page=",
    icon: <NewspaperTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "cultura e spettacoli",
    url: "https://www.ilgiornale.it/sezioni/cultura-e-spettacoli.html?page=",
    icon: <TheaterComedyTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "salute",
    url: "https://www.ilgiornale.it/sezioni/salute.html?page=",
    icon: <HealthAndSafetyTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "motori",
    url: "https://www.ilgiornale.it/sezioni/auto-moto-motori.html?page=",
    icon: <ElectricCarTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "cronaca locale",
    url: "https://www.ilgiornale.it/sezioni/cronaca-locale-167540.html?page=",
    icon: <LocalLibraryTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
  {
    type: "mondo",
    url: "https://www.ilgiornale.it/sezioni/esteri.html?page=",
    icon: <PublicTwoToneIcon />,
    description: "",
    select: false,
    page: 1,
    data: [],
  },
];

export const ilGiornaleList = {
  mainSelector: "div.cards",
  list: true,
  childrenSelector: [
    { key: "title", selector: "a .card__title", type: "text" },
    { key: "date", selector: "a .card__date", type: "text" },
    { key: "img", selector: "a picture img", attr: "src" },
    { key: "link", selector: "a", attr: "href" },
  ],
};

export const ilGiornaleDetail = {
  mainSelector: "article",
  list: false,
  childrenSelector: [
    { key: "video", selector: ".jw-video.jw-reset", attr: "src" },
    { key: "date", selector: ".content__date", type: "text" },
    { key: "img", selector: "figure.content__image picture img", attr: "src" },
    { key: "title", selector: ".content__title", type: "text" },
    { key: "subtitle", selector: ".content__excerpt p", type: "text" },
    {
      key: "author",
      selector:
        ".content__authors-comments .content__authors .author-ref span span",
      type: "text",
    },
    {
      key: "imageAuthor",
      selector:
        ".content__authors-comments .content__authors .author-ref picture img",
      attr: "src",
    },
    { key: "text", selector: ".content__body", type: "text" },
  ],
};

export const ilGiornaleDetailVideo = {
  mainSelector: ".content-video__main",
  list: false,
  childrenSelector: [
    { key: "video", selector: ".jw-video.jw-reset", attr: "src" },
    { key: "date", selector: ".content__date", type: "text" },
    { key: "img", selector: "figure.content__image picture img", attr: "src" },
    { key: "title", selector: ".content__title", type: "text" },
    { key: "text", selector: ".content__excerpt p", type: "text" },
  ],
};
