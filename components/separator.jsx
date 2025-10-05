import { View, Text } from "react-native";

function Separator({ text = "Or", width = 135 }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 13,
      }}
    >
      <View
        style={{
          height: 1,
          backgroundColor: "rgb(100, 100, 100, .5)",
          width: width,
        }}
      ></View>
      <Text
        style={{
          color: "rgb(100, 100, 100, .9)",
        }}
      >
        {text}
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: "rgb(100, 100, 100, .5)",
          width: width,
        }}
      ></View>
    </View>
  );
}

export default Separator;
