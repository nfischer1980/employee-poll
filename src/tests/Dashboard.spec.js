import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { users, questions } from "../utils/_DATA";
import Dashboard from "../components/Dashboard";
import { MemoryRouter } from "react-router-dom";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Dashboard component", () => {
  it("should display unanswered questions by default", () => {
    const initialState = { authUser: "sarahedo", users, questions };
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );

    let questionList = screen.getAllByTestId("question-extract");
    expect(questionList.length).toBe(2);
  });

  it("should be able to toggle to answered questions", () => {
    const initialState = { authUser: "sarahedo", users, questions };
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );

    var answeredButton = screen.getByTestId("answered-button");
    fireEvent.click(answeredButton);

    let questionList = screen.getAllByTestId("question-extract");
    expect(questionList.length).toBe(4);
  });
});
