import { View, StyleSheet } from "react-native";
import Chat from "../components/Chat";

export default function GetHelpPage() {
  return (
    <View style={styles.page}>
      <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
  },
});
