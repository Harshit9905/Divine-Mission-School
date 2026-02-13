import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const classes = [
  {
    id: 1,
    name: "10-A",
    subject: "Mathematics",
    students: 45,
    timing: "9:00 AM - 10:00 AM",
  },
  {
    id: 2,
    name: "10-B",
    subject: "Mathematics",
    students: 42,
    timing: "10:15 AM - 11:15 AM",
  },
  {
    id: 3,
    name: "11-A",
    subject: "Mathematics",
    students: 48,
    timing: "12:00 PM - 1:00 PM",
  },
  {
    id: 4,
    name: "11-B",
    subject: "Mathematics",
    students: 46,
    timing: "2:00 PM - 3:00 PM",
  },
  {
    id: 5,
    name: "12-A",
    subject: "Mathematics",
    students: 50,
    timing: "3:15 PM - 4:15 PM",
  },
];

export default function Classes() {
  const router = useRouter();

  const handleAttendance = (className: string) => {
    Alert.alert("Attendance", `Mark attendance for ${className}?`, [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Mark",
        onPress: () => router.push("/teacher/(tabs)/attendance"),
      },
    ]);
  };

  const handleResults = (className: string) => {
    Alert.alert("Upload Results", `Upload results for ${className}?`, [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Upload",
        onPress: () => router.push("/teacher/(tabs)/upload-results"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Classes</Text>
        <Text style={styles.subtitle}>
          {classes.length} Classes
        </Text>
      </View>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.classCard}>
            <View style={styles.classHeader}>
              <View>
                <Text style={styles.className}>
                  {item.name} - {item.subject}
                </Text>
                <Text style={styles.classTime}>
                  {item.timing}
                </Text>
              </View>
              <View style={styles.studentsCount}>
                <Ionicons
                  name="people-outline"
                  size={18}
                  color="#4A4AFF"
                />
                <Text style={styles.studentText}>
                  {item.students}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => handleAttendance(item.name)}
              >
                <Ionicons
                  name="checkmark-done-outline"
                  size={18}
                  color="#16A34A"
                />
                <Text style={styles.actionText}>
                  Attendance
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => handleResults(item.name)}
              >
                <Ionicons
                  name="document-text-outline"
                  size={18}
                  color="#2563EB"
                />
                <Text style={styles.actionText}>
                  Results
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },
  header: {
    backgroundColor: "#020617",
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 13,
    color: "#CBD5E1",
    marginTop: 4,
  },
  listContent: {
    padding: 12,
  },
  classCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  classHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  className: {
    fontSize: 15,
    fontWeight: "700",
    color: "#020617",
  },
  classTime: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  studentsCount: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  studentText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 4,
    color: "#4A4AFF",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    padding: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
    color: "#020617",
  },
});
