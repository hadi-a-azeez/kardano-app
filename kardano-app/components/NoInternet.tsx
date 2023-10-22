import { Image, StyleSheet, Text, View } from "react-native";

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
          source={require("../assets/no-internet.png")}
          style={styles.image}
        /> */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.noInternetText}>No Internet Connection</Text>
      </View>
    </View>
  );
};

export default NoInternet;

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
    flex: 1,
  },
  imageContainer: {
    position: "absolute",
    bottom: 16,
    left: 10,
  },
  image: {
    width: 350,
    height: 350,
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
