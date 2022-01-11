import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Load from "./Images/Load";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { loadingState$ } from "./redux/selectors";

function App() {
  const isLoading = useSelector(loadingState$);

  return (
    <>
      <Router>
        <Switch>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Container style={{ justifyContent: "center", display: "flex" }}>
            <Route path={"/"}>
              {isLoading && <Load />}
              <Home />
            </Route>
          </Container>
        </Switch>
      </Router>
    </>
  );
}

export default App;
