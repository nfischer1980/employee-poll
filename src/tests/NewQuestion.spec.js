import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { users, questions } from "../utils/_DATA";
import NewQuestion from "../components/NewQuestion";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("NewPage content", () => {
  it("will contain a form to add a question", () => {
    const initialState = { authUser: "sarahedo", users, questions };
    const store = mockStore(initialState);

    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewQuestion />
        </Provider>
      </MemoryRouter>
    );

    expect(view).toMatchSnapshot();
  });
});

describe("NewPage click", () => {
  it("will add a new unanswered question", async () => {
    const initialState = { authUser: "sarahedo", users, questions };
    const store = mockStore(initialState);

    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewQuestion />
        </Provider>
      </MemoryRouter>
    );

    let optionOne = screen.getByTestId("optionOne-input");
    fireEvent.change(optionOne, { target: { value: "Go outside" } });

    let optionTwo = screen.getByTestId("optionTwo-input");
    fireEvent.change(optionTwo, { target: { value: "Go inside" } });

    var submitButton = screen.getByTestId("submit-question");
    fireEvent.click(submitButton);

    await Promise.resolve();

    const optionOneElement = screen.getByLabelText("Option One");
    expect(optionOneElement.value).toBe("");

    const optionTwoElement = screen.getByLabelText("Option One");
    expect(optionTwoElement.value).toBe("");
  });
});
