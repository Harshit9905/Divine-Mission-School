import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTICES = [
  {
    id: "1",
    title: "Holiday Notice",
    desc: "School will remain closed on Friday.",
    date: "18 Jan 2026",
  },
  {
    id: "2",
    title: "Exam Schedule",
    desc: "Mid-term exams start from 25 Jan.",
    date: "16 Jan 2026",
  },
  {
    id: "3",
    title: "Fee Reminder",
    desc: "Last date for fee payment is 20 Jan.",
    date: "15 Jan 2026",
  },
];

export default function Notices() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Notices</Text>

        <FlatList
          data={NOTICES}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.noticeCard}>
              <Text style={styles.noticeTitle}>
                {item.title}
              </Text>
              <Text style={styles.noticeDesc}>
                {item.desc}
              </Text>
              <Text style={styles.noticeDate}>
                {item.date}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },

  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 3,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  noticeDesc: {
    marginTop: 6,
    color: "#334155",
  },
  noticeDate: {
    marginTop: 8,
    fontSize: 12,
    color: "#64748B",
  },
});
