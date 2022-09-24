import {
  BrowserRouter as Router,
  Switch,
  Route,
  //useNavigate,
} from "react-router-dom";
//import { useReducer, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
/* import {
  setDocuments,
  setLastDateAcquisition,
  setLoading,
} from "./store/store.actions"; */
//import reducer from "./store/store.reducer";
import ResponsiveDrawer from "./pages/ResponsiveDrawer";
import ChatBot from "./pages/ChatBot";

const initialState = {
  documents: [],
  sections: [],
  currentFilter: "",
  collection: [],
  currentArticle: {},
  orderBy: "descA",
  loading: true,
  checkNewDocuments: {
    loading: false,
  },
  corruptedDocumentsIds: [],
  lastDateAcquisition: false,
};

export default function App() {
  //const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <CssBaseline />
      <ResponsiveDrawer>
        <Router>
          <Switch>
            <Route path="/" exact>
              <ChatBot />
            </Route>
            <Route path="/test" exact>
              <div>Hello</div>
            </Route>
          </Switch>
        </Router>
      </ResponsiveDrawer>
    </>
  );
}
