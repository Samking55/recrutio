// long text input
import { TextInput, View, StyleSheet, Text } from "react-native";
import colors from "../assets/styles/colors";

function LongTextInput({
  label = "Input",
  marginTop = 0,
  marginBottom = 0,
  state = true,
  updateInput = null,
  value = null
}) {
  return (
    <View
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        borderWidth: 1.4,
        borderColor: colors.main,
        borderRadius: 7,
      }}
    >
      <Text style={longInputStyles.label}>{label}</Text>
      <TextInput
        multiline
        value={value}
        style={!state ? longInputStyles.disabledInput : longInputStyles.input}
        editable={state}
        onChangeText={updateInput}
      />
    </View>
  );
}

const longInputStyles = StyleSheet.create({
  label: {
    fontWeight: "500",
    top: -10,
    backgroundColor: colors.white,
    left: 24,
    textAlign: "center",
    position: "absolute",
    paddingHorizontal: 3,
    maxWidth: 170,
    overflow: "hidden",
    fontSize: 12,
  },
  input: {
    padding: 11,
    minHeight: 58,
    maxHeight: 200,
  },
  disabledInput: {
    padding: 11,
    minHeight: 58,
    maxHeight: 200,
    color: "rgb(10, 10, 10, .5)",
  },
});

export default LongTextInput;
