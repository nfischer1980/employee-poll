import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App when no users are signed in", () => {
  it("should render Sign In", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    let signinLink = screen.getByTestId("signin-link");
    expect(signinLink).toBeInTheDocument();
  });
  it("should not render Add", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    let addLink = screen.queryByTestId("add-link");
    expect(addLink).not.toBeInTheDocument();
  });
});

/*describe("App when a user is signed in", () => {
  it("should not render Sign In", () => {
    const initialState = { authUser: "sarahedo", users, questions };
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    let signinLink = screen.queryByTestId("signin-link");
    expect(signinLink).not.toBeInTheDocument();
  });
  it("should render Logout", () => {
    const initialState = { authUser: "sarahedo", users, questions };
    const store = mockStore(initialState);
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    let addLink = screen.getByTestId("logout-link");
    expect(addLink).toBeInTheDocument();
  });
});*/
