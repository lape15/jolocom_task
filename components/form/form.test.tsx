/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Form from "./Form";

describe("form submits two answers", () => {
  const name = "firstName";
  const mockFn = jest.fn();
  const value = "firstName";
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
  const fields = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    age: "",
    isValid: false,
  };

  it("matches snapshot", () => {
    const { getAllByA11yLabel, getByText, getByTestId, queryByTestId, toJSON } =
      render(
        <Form
          fields={fields}
          handleProfileSubmit={mockFn}
          updateFields={mockFn}
          showScreen={"success"}
        />
      );

    const btn = getByTestId("submitInfo");
    fireEvent.press(btn);
    const queriedForm = queryByTestId("form");
    console.log(queriedForm);
    // expect(queriedForm).toHaveLength(2);
    expect(toJSON()).toMatchSnapshot();
  });
});
