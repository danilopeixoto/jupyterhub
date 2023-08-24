import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import ProtectedComponent from "./ProtectedComponent";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

var protectedComponentJsx = (store, strategy) => (
  <Provider store={store}>
    <ProtectedComponent strategy={strategy} scopes={["scope1", "scope2"]}>
      <div data-testid="child">Child</div>
    </ProtectedComponent>
  </Provider>
);

const userWithScopes = {
  name: "test1",
  scopes: ["scope1", "scope2"],
};

const userWithoutScopes = {
  name: "test2",
  scopes: [],
};

test("Renders children when user has required scopes", async () => {
  var store = createStore(() => ({ user: userWithScopes }));
  await act(async () => {
    render(protectedComponentJsx(store));
  });
  expect(screen.getByTestId("child")).toBeInTheDocument();
});

test("Does not render children when user does not have required scopes", async () => {
  var store = createStore(() => ({ user: userWithoutScopes }));
  await act(async () => {
    render(protectedComponentJsx(store));
  });
  expect(screen.getByTestId("child")).toBeNull();
});
