// manage job application listing

import {
  Modal,
  Pressable,
  StatusBar,
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import defaultStyle from "@/assets/styles/default";
import colors from "../../assets/styles/colors";
import { useState } from "react";
import Loader from "../../components/loader";


function AddJobApplicationForm() {
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <>
      {/* Job application add button */}
      <Pressable
        style={{
          position: "absolute",
          bottom: 90,
          right: 25,
          height: 55,
          width: 55,
          backgroundColor: colors.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
        }}
        onPress={() => setDisplayForm(true)}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 28,
          }}
        >
          +
        </Text>
      </Pressable>
      {/* job application add button end */}

      {/* job application form */}
      <Modal
        transparent
        visible={displayForm}
        animationType="fade"
        onRequestClose={() => setDisplayForm(false)}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            height: '100%',
            alignItems: 'center',
          }}
        >
         
          
          
        </ScrollView>
      </Modal>
    </>
  );
}

const inputStyles = StyleSheet.create({
  input: {
    borderColor: colors.main,
    borderWidth: 0.6,
    paddingHorizontal: 14,
    height: 43,
    borderRadius: 10,
    marginVertical: 13,
    color: "rgb(10, 10, 10, .7)",
  },
  textField: {
    color: "rgb(10, 10, 10, .7)",
    borderColor: colors.main,
    borderWidth: 0.6,
    padding: 14,
    borderRadius: 10,
    marginVertical: 13,
  },
});

function JobApplicationScreen() {

  return (
    <>
      <StatusBar hidden />
      <View style={defaultStyle.container}>
        <Text>Job application</Text>
        <AddJobApplicationForm />
      </View>
    </>
  );
}

export default JobApplicationScreen;
