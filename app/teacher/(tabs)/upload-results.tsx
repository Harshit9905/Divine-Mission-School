import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const studentsResults = [
  // 10-A Results
  { id: 1, name: "Harshit Raj", roll: 1, marks: 85, class: "10-A" },
  { id: 2, name: "Priya Singh", roll: 2, marks: 92, class: "10-A" },
  { id: 3, name: "Arjun Kumar", roll: 3, marks: 78, class: "10-A" },
  { id: 4, name: "Ananya Patel", roll: 4, marks: 88, class: "10-A" },
  { id: 5, name: "Rahul Verma", roll: 5, marks: 75, class: "10-A" },
  { id: 6, name: "Neha Singh", roll: 6, marks: 90, class: "10-A" },
  { id: 7, name: "Vikram Joshi", roll: 7, marks: 82, class: "10-A" },
  { id: 8, name: "Aisha Khan", roll: 8, marks: 95, class: "10-A" },
  // 10-B Results
  { id: 9, name: "Simran Sharma", roll: 1, marks: 88, class: "10-B" },
  { id: 10, name: "Aarav Singh", roll: 2, marks: 84, class: "10-B" },
  { id: 11, name: "Diya Patel", roll: 3, marks: 91, class: "10-B" },
  { id: 12, name: "Rohan Kumar", roll: 4, marks: 79, class: "10-B" },
  { id: 13, name: "Sneha Verma", roll: 5, marks: 86, class: "10-B" },
  { id: 14, name: "Abhi Joshi", roll: 6, marks: 80, class: "10-B" },
  { id: 15, name: "Kriti Khan", roll: 7, marks: 87, class: "10-B" },
  { id: 16, name: "Nayan Desai", roll: 8, marks: 93, class: "10-B" },
  // 11-A Results
  { id: 17, name: "Aryan Malhotra", roll: 1, marks: 92, class: "11-A" },
  { id: 18, name: "Pooja Iyer", roll: 2, marks: 89, class: "11-A" },
  { id: 19, name: "Kartik Yadav", roll: 3, marks: 85, class: "11-A" },
  { id: 20, name: "Ananya Mishra", roll: 4, marks: 94, class: "11-A" },
  { id: 21, name: "Vihaan Kapoor", roll: 5, marks: 88, class: "11-A" },
  { id: 22, name: "Riya Gupta", roll: 6, marks: 91, class: "11-A" },
  { id: 23, name: "Siddharth Nair", roll: 7, marks: 86, class: "11-A" },
  { id: 24, name: "Zara Ahmed", roll: 8, marks: 90, class: "11-A" },
];

export default function UploadResults() {
  const [allResults, setAllResults] = useState(studentsResults);
  const [selectedClass, setSelectedClass] = useState("10-A");
  const results = allResults.filter((r) => r.class === selectedClass);

  const handleMarksChange = (id: number, marks: string) => {
    setAllResults(
      allResults.map((item) =>
        item.id === id ? { ...item, marks: parseInt(marks) || 0 } : item
      )
    );
  };

  const handleUpload = () => {
    Alert.alert(
      "Upload Results",
      "Are you sure you want to upload these results?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Upload",
          onPress: () => {
            Alert.alert(
              "Success",
              "Results uploaded successfully for all 8 students!"
            );
          },
        },
      ]
    );
  };

  const getGrade = (marks: number) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    return "D";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Results</Text>
        <Text style={styles.subtitle}>Class {selectedClass} Mathematics</Text>
      </View>

      <View style={styles.classSelector}>
        <Text style={styles.classSelectorLabel}>Select Class:</Text>
        <View style={styles.classButtonsContainer}>
          {["10-A", "10-B", "11-A"].map((cls) => (
            <TouchableOpacity
              key={cls}
              style={[
                styles.classButton,
                selectedClass === cls && styles.classButtonActive,
              ]}
              onPress={() => setSelectedClass(cls)}
            >
              <Text
                style={[
                  styles.classButtonText,
                  selectedClass === cls && styles.classButtonTextActive,
                ]}
              >
                {cls}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionLabel}>Enter Marks</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.colName}>Student Name</Text>
          <Text style={styles.colRoll}>Roll</Text>
          <Text style={styles.colMarks}>Marks</Text>
          <Text style={styles.colGrade}>Grade</Text>
        </View>

        {results.map((student) => (
          <View key={student.id} style={styles.tableRow}>
            <Text style={styles.colName}>{student.name}</Text>
            <Text style={styles.colRoll}>{student.roll}</Text>
            <TextInput
              style={styles.marksInput}
              value={student.marks.toString()}
              onChangeText={(text) => handleMarksChange(student.id, text)}
              maxLength={3}
              keyboardType="numeric"
              placeholder="0"
            />
            <Text
              style={[
                styles.colGrade,
                {
                  color: student.marks >= 80 ? "#16A34A" : "#DC2626",
                },
              ]}
            >
              {getGrade(student.marks)}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={handleUpload}
        >
          <Ionicons name="cloud-upload" size={20} color="#FFFFFF" />
          <Text style={styles.uploadBtnText}>Upload Results</Text>
        </TouchableOpacity>
      </ScrollView>
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
    color: "#94A3B8",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E0E7FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4A4AFF",
  },
  colName: {
    flex: 2,
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
  },
  colRoll: {
    flex: 0.5,
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
    textAlign: "center",
  },
  colMarks: {
    flex: 0.7,
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
    textAlign: "center",
  },
  colGrade: {
    flex: 0.6,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  marksInput: {
    flex: 0.7,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "center",
  },
  uploadBtn: {
    backgroundColor: "#4A4AFF",
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    elevation: 3,
    shadowColor: "#4A4AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  uploadBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  classSelector: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  classSelectorLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 8,
  },
  classButtonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  classButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  classButtonActive: {
    backgroundColor: "#4A4AFF",
    borderColor: "#4A4AFF",
  },
  classButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  classButtonTextActive: {
    color: "#FFFFFF",
  },
});
