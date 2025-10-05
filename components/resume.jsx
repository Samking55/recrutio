// resume design component

import { View, Image, StyleSheet } from "react-native";

function Resume({ image }) {
  return (
    <View style={style.card}>
      <Image source={image} style={style.img} />
    </View>
  );
}

export default Resume;

const style = StyleSheet.create({
  card: {
    height: 200,
    aspectRatio: 3 / 4,
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});
