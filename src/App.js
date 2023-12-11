import React from "react";
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { LoadingBar } from "react-redux-loading-bar";
import Nav from "./components/Nav";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NewQuestion from "./components/NewQuestion";
import Leaderboard from "./components/Leaderboard";
import QuestionPage from "./components/QuestionPage";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  const location = useLocation();
  console.log(props);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        <Routes>
          <Route
            path="/"
            exact
            element={
              props.isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate
                  to="/signin"
                  state={{ from: `${location.pathname}${location.search}` }}
                />
              )
            }
          />
          <Route
            path="/add"
            exact
            element={
              props.isAuthenticated ? (
                <NewQuestion />
              ) : (
                <Navigate
                  to="/signin"
                  state={{ from: `${location.pathname}${location.search}` }}
                />
              )
            }
          />
          <Route
            path="/questions/:question_id"
            element={
              props.isAuthenticated ? (
                <QuestionPage />
              ) : (
                <Navigate
                  to="/signin"
                  state={{ from: `${location.pathname}${location.search}` }}
                />
              )
            }
          />
          <Route
            path="/leaderboard"
            exact
            element={
              props.isAuthenticated ? (
                <Leaderboard />
              ) : (
                <Navigate
                  to="/signin"
                  state={{ from: `${location.pathname}${location.search}` }}
                />
              )
            }
          />
          <Route path="/signin" exact element={<SignIn />} />
          <Route path="*" element={<NotFound reason="Invalid Route" />}></Route>
        </Routes>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authUser }) => ({
  authUser,
  isAuthenticated: authUser !== null,
});

export default connect(mapStateToProps)(App);
