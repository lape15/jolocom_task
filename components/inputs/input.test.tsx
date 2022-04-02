/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputBox from "./Input";

describe("form submits two answers", () => {
  const name = "firstName";
  const mockFn = jest.fn();
  const value = "firstName";

  it("Renders input field ", () => {
    const { getAllByA11yLabel, getByTestId } = render(
      <InputBox
        value={value}
        setValue={mockFn}
        name="firstName"
        placeholder="First name"
        keyboardType="default"
        refName="lastName"
        ref={mockFn}
        moveToNextField={mockFn}
      />
    );
    const answerInputs = getByTestId("input");
    fireEvent.changeText(answerInputs, "Lape");
  });
});
