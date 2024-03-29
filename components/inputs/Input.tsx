import React, { useState, forwardRef } from "react";
import { TextInput, StyleSheet, SafeAreaView, Platform } from "react-native";

type inputProp = {
  value: string | number;
  setValue: Function;
  keyboardType: any;
  name: string;
  placeholder: string;
  refName: string;
  moveToNextField: Function;
};
const InputBox = forwardRef((props: inputProp, ref: any) => {
  //   const [value, setValue] = useState("");
  const {
    value,
    setValue,
    keyboardType,
    name,
    placeholder,
    refName,
    moveToNextField,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <SafeAreaView style={styles.inputBox}>
      <TextInput
        {...props}
        ref={ref}
        style={{ ...styles.input, ...(isFocused && { borderColor: "blue" }) }}
        placeholder={placeholder}
        accessibilityLabel="answer input"
        accessibilityHint="input"
        value={String(value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => setValue(name, text)}
        keyboardType={keyboardType}
        returnKeyType="done"
        testID="input"
        placeholderTextColor={`${isFocused ? "white" : "grey"}`}
        onSubmitEditing={() => moveToNextField(refName)}
      />
    </SafeAreaView>
  );
});

export default InputBox;
const styles = StyleSheet.create({
  inputBox: {
    padding: 10,
    margin: 10,
    marginTop: Platform.OS === "ios" ? 5 : 0,
    paddingTop: Platform.OS === "ios" ? 30 : 20,
  },

  input: {
    backgroundColor: "rgba(126,94,129,0.25)",
    borderColor: "rgba(126,94,129,0.1)",
    borderWidth: 1,
    padding: Platform.OS === "ios" ? 18 : 15,
    borderStyle: "solid",
    borderRadius: 8,
    color: "white",
  },
});
