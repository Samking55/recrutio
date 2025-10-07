import { ActivityIndicator, Modal, View, Text } from "react-native";
import colors from "../assets/styles/colors";

function Loader() {
  return (
    <Modal animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <ActivityIndicator size="large" color={colors.main} />
        <Text
          style={{
            color: colors.white,
            marginTop: 20,
            fontSize: 12,
          }}
        >
          {" "}
          Chargement{" "}
        </Text>
      </View>
    </Modal>
  );
}

export default Loader;
