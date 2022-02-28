import { StyleSheet, Text, View } from "react-native";

type headerProp = {
  title: string;
};
const Header = ({ title }: headerProp) => (
  <View style={styles.view}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 30,
  },
});

export default Header;
