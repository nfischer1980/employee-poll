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
