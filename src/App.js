import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useReducer } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import reducer from "./store/store.reducer";
import ResponsiveDrawer from "./pages/ResponsiveDrawer";
import Dashboard from "./pages/Dashboard";
import ChatBot from "./applications/ChatBot";
import Review from "./applications/Review";
import DiffText from "./applications/DiffText";
import FindImages from "./applications/FindImages";
import GoogleNews from "./applications/GoogleNews";

const initialState = {
  message: [],
  review: [],
  differenceText: { originalText: "", analyzedText: "", before: "", after: "" },
  queryFindImage: {
    q: "",
    image_type: "all",
    orientation: "all",
    category: "",
    colors: "",
    order: "popular",
    page: 1,
    images: [],
  },
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <CssBaseline />
      <Router>
        <ResponsiveDrawer>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/chatbot" exact>
              <ChatBot message={state.message} dispatch={dispatch} />
            </Route>
            <Route path="/review" exact>
              <Review review={state.review} dispatch={dispatch} />
            </Route>
            <Route path="/difference" exact>
              <DiffText difftext={state.differenceText} dispatch={dispatch} />
            </Route>
            <Route path="/findimages" exact>
              <FindImages
                queryFindImage={state.queryFindImage}
                dispatch={dispatch}
              />
            </Route>
            <Route path="/googlenews" exact>
              <GoogleNews dispatch={dispatch} />
            </Route>
          </Switch>
        </ResponsiveDrawer>
      </Router>
    </>
  );
}
