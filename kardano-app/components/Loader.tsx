import { Image, StyleSheet, Text, View, Dimensions } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View> */}
      <Image source={require("../assets/icon.png")} style={styles.image} />
      {/* <View style={styles.textContainer}>
        <Text style={styles.noInternetText}>Loading..</Text>
      </View> */}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 20,
    backgroundColor: "#30C67E",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    height: Dimensions.get("screen").height,
    backgroundColor: "white",
    paddingTop: 140,
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    bottom: 16,
    left: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 200,
    alignItems: "center",
  },
  noInternetText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
