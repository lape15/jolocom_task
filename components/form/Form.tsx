import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import InputBox from "../inputs/Input";

type FormProps = {
  fields: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    age: string;
    isValid: boolean;
  };
  updateFields: Function;
  handleProfileSubmit: Function;
  showScreen: string;
};
const Form = (props: FormProps) => {
  const { fields, updateFields, handleProfileSubmit, showScreen } = props;
  const firstName = useRef<null | { focus: Function }>(null);
  const lastName = useRef<null | { focus: Function }>(null);
  const phoneNumber = useRef<null | { focus: Function }>(null);
  const email = useRef<null | { focus: Function }>(null);
  const age = useRef<null | { focus: Function }>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800000,
      useNativeDriver: true,
      delay: 1000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 80000,
      useNativeDriver: true,
      delay: 1000,
    }).start();
  };
  useEffect(() => {
    if (showScreen === " ") {
      fadeIn();
    }
    return () => {
      fadeOut();
    };
  }, [showScreen]);

  const moveToNextField = (name: string) => {
    if (name === "lasttName") return lastName.current?.focus();
    if (name === "phoneNumber") return phoneNumber.current?.focus();
    if (name === "email") return email.current?.focus();
    if (name === "age") return age.current?.focus();
    if (name === "age") return firstName.current?.focus();
  };

  return (
    <Animated.View
      style={[
        styles.view,
        {
          transform: [
            { translateY: fadeAnim },
            // { scale: fadeAnim }
          ],
        },
      ]}
    >
      <InputBox
        value={fields.firstName}
        setValue={updateFields}
        name="firstName"
        placeholder="First name"
        keyboardType="default"
        refName="lastName"
        ref={firstName}
        moveToNextField={moveToNextField}
      />

      <InputBox
        value={fields.lastName}
        setValue={updateFields}
        name="lastName"
        placeholder="Last name"
        keyboardType="default"
        ref={lastName}
        refName="phoneNumber"
        moveToNextField={moveToNextField}
      />
      <InputBox
        value={fields.phoneNumber}
        setValue={updateFields}
        name="phoneNumber"
        keyboardType="numeric"
        placeholder="Phone number"
        ref={phoneNumber}
        refName="email"
        moveToNextField={moveToNextField}
      />
      <InputBox
        value={fields.email}
        setValue={updateFields}
        name="email"
        keyboardType="email-address"
        placeholder="Email"
        ref={email}
        refName="age"
        moveToNextField={moveToNextField}
      />
      <InputBox
        value={fields.age}
        setValue={updateFields}
        name="age"
        keyboardType="number-pad"
        placeholder="Age"
        ref={age}
        refName="firtName"
        moveToNextField={moveToNextField}
      />
      <View style={styles.btnView}>
        <TouchableOpacity
          onPress={() => handleProfileSubmit()}
          style={{ ...styles.btn, ...(fields.isValid && { opacity: 1 }) }}
          activeOpacity={1}
          disabled={!fields.isValid}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 4,
    marginTop: 10,
    height: 750,
  },
  btnView: {
    flex: 1,
    marginTop: 20,
  },
  btn: {
    width: "100%",
    textAlign: "center",
    padding: 20,
    backgroundColor: "#E75480",
    color: "white",
    opacity: 0.3,
  },
  btnText: {
    textAlign: "center",
    color: "white",
  },
});

export default Form;
