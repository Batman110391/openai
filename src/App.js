import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useReducer } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import reducer from "./store/store.reducer";
import ResponsiveDrawer from "./pages/ResponsiveDrawer";
import Dashboard from "./pages/Dashboard";
import ChatBot from "./applications/ChatBot";
import Review from "./applications/Review";

const initialState = {
  message: [],
  review: [],
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
          </Switch>
        </ResponsiveDrawer>
      </Router>
    </>
  );
}
