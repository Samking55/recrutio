// display user personnal informations

import { Text, View, TextInput, StyleSheet } from "react-native";
import defaultStyle from "../../assets/styles/default";
import colors from "../../assets/styles/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";


function InfoInput({ state = false, defaultValue, onPressEvent }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  return (
    <View style={state ? inputStyles.container : inputStyles.disabledContainer}>
      <TextInput
        style={state ? inputStyles.input : inputStyles.disabledInput}
        defaultValue={inputValue}
        value={inputValue}
        onChangeText={setInputValue}
        editable={state}
      />

      {state ? (
        <MaterialIcons
          name="save"
          size={21}
          color="black"
          onPress={onPressEvent}
        />
      ) : (
        <FontAwesome
          name="pencil-square-o"
          size={21}
          color="black"
          onPress={onPressEvent}
        />
      )}
    </View>
  );
}
const inputStyles = StyleSheet.create({
  input: {
    width: "90%",
  },
  disabledInput: {
    width: "90%",
    color: "rgb(100, 100, 100)",
  },
  container: {
    borderWidth: 0.7,
    borderRadius: 7,
    color: "rgb(100, 100, 100)",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  disabledContainer: {
    borderWidth: 0.3,
    borderRadius: 7,
    color: "rgb(100, 100, 100)",
    borderColor: "rgb(100, 100, 100)",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
});

function PersonnalInfoScreen() {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);

//   set default value on component mount
useEffect(()=>{
    setEmailEdit(false)
    setNameEdit(false)
},[])

  return (
    <View style={defaultStyle.container}>
      <Text>Personnal info</Text>
      <InfoInput
        state={nameEdit}
        defaultValue={"Luc samuel"}
        onPressEvent={() => setNameEdit(!nameEdit)}
      />
      <InfoInput
        state={emailEdit}
        defaultValue={"ndris219@gmail.com"}
        onPressEvent={() => setEmailEdit(!emailEdit)}
      />
    </View>
  );
}

export default PersonnalInfoScreen;
