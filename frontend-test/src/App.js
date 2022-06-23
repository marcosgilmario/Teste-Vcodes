import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RequireAuth } from "./services/useAuth";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "./containers/Auth";
import Painel from "./containers/Panel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
        {/* <Route path="/panel" element={<Navigate to="/panel/home" replace />} /> */}
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/panel/home" element={<Painel />} />
      </Routes>
    </Router>
  );
}

export default App;
