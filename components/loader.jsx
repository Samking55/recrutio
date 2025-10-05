import { ActivityIndicator, Modal, View } from "react-native";
import colors from "../assets/styles/colors";

function Loader() {
  return (
    <Modal
      animationType="fade"
      transparent
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    </Modal>
  );
}

export default Loader;
