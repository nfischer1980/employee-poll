import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { users, questions } from "../utils/_DATA";
import Leaderboard from "../components/Leaderboard";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Leaderboard component", () => {
  it("should display ranking of users", () => {
    const initialState = { authUser: "sarahedo", users, questions };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    let rankList = screen.getAllByTestId("user-rank");
    expect(rankList.length).toBe(Object.keys(users).length);
  });
});
