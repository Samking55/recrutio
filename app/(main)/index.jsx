import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import colors from "@/assets/styles/colors";
import defaultStyle from "@/assets/styles/default";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Resume from "../../components/resume";
import model1 from "../../assets/resume/model-1.jpg";
import { router } from "expo-router";

function TaskIdeas() {
  return (
    <View style={cardStyle.card}>
      <View style={cardStyle.header}>
        <View
          style={{
            backgroundColor: colors.main,
            width: 36,
            height: 36,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="lightbulb-on-10"
            size={24}
            color={colors.white}
          />
        </View>
        <Text style={cardStyle.headerTitle}>Task Ideas</Text>
      </View>
    </View>
  );
}

const resumeList = [
  { id: "1", image: model1 },
  { id: "2", image: model1 },
  { id: "3", image: model1 },
  { id: "4", image: model1 },
  { id: "5", image: model1 },
  { id: "6", image: model1 },
  { id: "7", image: model1 },
  { id: "8", image: model1 },
  { id: "9", image: model1 },
  { id: "10", image: model1 },
  { id: "11", image: model1 },
  { id: "12", image: model1 },
];

export default function HomeScreen() {
  const renderItem = ({ item }) => <Resume image={item.image} />;

  return (
    <FlatList
      data={resumeList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 13 }}
      contentContainerStyle={{ padding: 14 }}
      ListHeaderComponent={
        <>
          <TaskIdeas />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            Quelques design de CV qui pourraient vous plaire
          </Text>
        </>
      }
      ListFooterComponent={() => (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 70,
          }}
        >
          <Pressable
            style={{
              height: 34,
              width: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              backgroundColor: colors.main,
            }}
            onPress={() => router.navigate("/(main)/find-resume")}
          >
            <Text
              style={{
                color: colors.white,
              }}
            >
              Voir plus
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const cardStyle = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    height: 170,
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    margin: 6,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
});
