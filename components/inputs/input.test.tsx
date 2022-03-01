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
  //   const setState = jest.fn();
  //   const useStateSpy = jest.spyOn(React, "useState");
  //   useStateSpy.mockImplementation((init: any) => [init, setState]);
  //   const initialState = {
  //     firstName: "",
  //     lastName: "",
  //     phoneNumber: "",
  //     email: "",
  //     age: "",
  //     isValid: false,
  //   };

  const { getAllByA11yLabel, getByText, queryAllByA11yLabel, toJSON } = render(
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

  const answerInputs = getAllByA11yLabel("answer input");

  fireEvent.changeText(answerInputs[0], "Lape");

  expect(toJSON()).toMatchSnapshot();
});
