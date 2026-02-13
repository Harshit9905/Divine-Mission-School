import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const homeworkData = [
  {
    id: 1,
    title: "Chapter 5 Exercise",
    class: "10-A",
    subject: "Mathematics",
    dueDate: "26 Jan 2026",
    description: "Complete exercises 5.1 to 5.5",
    submitted: 6,
    total: 8,
    submissions: [
      { studentId: 1, name: "Harshit Raj", status: "Submitted", date: "25 Jan 2026 10:30 AM", files: ["Chapter5_Exercises.pdf", "Notes.docx"] },
      { studentId: 2, name: "Priya Singh", status: "Submitted", date: "25 Jan 2026 09:15 AM", files: ["Solution.pdf"] },
      { studentId: 3, name: "Arjun Kumar", status: "Not Submitted", date: null, files: [] },
      { studentId: 4, name: "Ananya Patel", status: "Submitted", date: "24 Jan 2026 02:00 PM", files: ["Chapter5.pdf", "Rough_Work.jpg"] },
      { studentId: 5, name: "Rahul Verma", status: "Submitted", date: "25 Jan 2026 11:45 AM", files: ["Ex5_Answer.pdf"] },
      { studentId: 6, name: "Neha Singh", status: "Submitted", date: "25 Jan 2026 08:20 AM", files: ["Homework.pdf"] },
      { studentId: 7, name: "Vikram Joshi", status: "Not Submitted", date: null, files: [] },
      { studentId: 8, name: "Aisha Khan", status: "Submitted", date: "25 Jan 2026 10:00 AM", files: ["Complete.pdf"] },
    ],
  },
  {
    id: 2,
    title: "Algebra Problems",
    class: "10-A",
    subject: "Mathematics",
    dueDate: "28 Jan 2026",
    description: "Solve 10 algebra problems from worksheet",
    submitted: 5,
    total: 8,
    submissions: [
      { studentId: 1, name: "Harshit Raj", status: "Submitted", date: "25 Jan 2026 03:30 PM", files: ["Algebra_Solutions.pdf"] },
      { studentId: 2, name: "Priya Singh", status: "Submitted", date: "25 Jan 2026 04:00 PM", files: ["Algebra_Work.docx", "Answers.pdf"] },
      { studentId: 3, name: "Arjun Kumar", status: "Not Submitted", date: null, files: [] },
      { studentId: 4, name: "Ananya Patel", status: "Not Submitted", date: null, files: [] },
      { studentId: 5, name: "Rahul Verma", status: "Submitted", date: "24 Jan 2026 05:20 PM", files: ["Problems_Solved.pdf"] },
      { studentId: 6, name: "Neha Singh", status: "Submitted", date: "25 Jan 2026 02:15 PM", files: ["Algebra.pdf"] },
      { studentId: 7, name: "Vikram Joshi", status: "Not Submitted", date: null, files: [] },
      { studentId: 8, name: "Aisha Khan", status: "Submitted", date: "25 Jan 2026 05:45 PM", files: ["Solutions.pdf"] },
    ],
  },
  {
    id: 4,
    title: "English Essay",
    class: "10-B",
    subject: "English",
    dueDate: "27 Jan 2026",
    description: "Write an essay on 'My Favourite Teacher'",
    submitted: 6,
    total: 8,
    submissions: [
      { studentId: 9, name: "Simran Sharma", status: "Submitted", date: "25 Jan 2026 02:30 PM", files: ["Essay.pdf"] },
      { studentId: 10, name: "Aarav Singh", status: "Submitted", date: "25 Jan 2026 01:15 PM", files: ["Teacher_Essay.docx"] },
      { studentId: 11, name: "Diya Patel", status: "Submitted", date: "25 Jan 2026 03:45 PM", files: ["Essay_Final.pdf"] },
      { studentId: 12, name: "Rohan Kumar", status: "Not Submitted", date: null, files: [] },
      { studentId: 13, name: "Sneha Verma", status: "Submitted", date: "24 Jan 2026 06:00 PM", files: ["My_Essay.pdf"] },
      { studentId: 14, name: "Abhi Joshi", status: "Not Submitted", date: null, files: [] },
      { studentId: 15, name: "Kriti Khan", status: "Submitted", date: "25 Jan 2026 04:30 PM", files: ["Essay.docx"] },
      { studentId: 16, name: "Nayan Desai", status: "Submitted", date: "25 Jan 2026 12:00 PM", files: ["Teacher_Essay.pdf"] },
    ],
  },
  {
    id: 5,
    title: "Organic Chemistry",
    class: "11-A",
    subject: "Chemistry",
    dueDate: "26 Jan 2026",
    description: "Study reactions of alkenes and alkynes",
    submitted: 7,
    total: 8,
    submissions: [
      { studentId: 17, name: "Aryan Malhotra", status: "Submitted", date: "25 Jan 2026 11:30 AM", files: ["Reactions.pdf"] },
      { studentId: 18, name: "Pooja Iyer", status: "Submitted", date: "25 Jan 2026 10:15 AM", files: ["Notes.docx", "Summary.pdf"] },
      { studentId: 19, name: "Kartik Yadav", status: "Not Submitted", date: null, files: [] },
      { studentId: 20, name: "Ananya Mishra", status: "Submitted", date: "25 Jan 2026 09:45 AM", files: ["Chemistry_Work.pdf"] },
      { studentId: 21, name: "Vihaan Kapoor", status: "Submitted", date: "24 Jan 2026 07:20 PM", files: ["Organic_Notes.pdf"] },
      { studentId: 22, name: "Riya Gupta", status: "Submitted", date: "25 Jan 2026 03:30 PM", files: ["Reactions_Study.pdf"] },
      { studentId: 23, name: "Siddharth Nair", status: "Submitted", date: "25 Jan 2026 02:00 PM", files: ["Study_Material.pdf"] },
      { studentId: 24, name: "Zara Ahmed", status: "Submitted", date: "25 Jan 2026 05:15 PM", files: ["Chemistry.pdf"] },
    ],
  },
];

export default function Homework() {
  const [homework, setHomework] = useState(homeworkData);
  const [showForm, setShowForm] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [newTitle, setNewTitle] = useState("");
  const [newClass, setNewClass] = useState("10-A");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const handleAddHomework = () => {
    if (!newTitle.trim() || !newDescription.trim() || !newDueDate.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newHW = {
      id: homework.length + 1,
      title: newTitle,
      class: selectedClass,
      subject: "Mathematics",
      dueDate: newDueDate,
      description: newDescription,
      submitted: 0,
      total: 45,
      submissions: [],
    };

    setHomework([newHW, ...homework]);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setShowForm(false);

    Alert.alert("Success", "Homework assigned successfully!");
  };

  const handleDeleteHomework = (id: number) => {
    Alert.alert("Delete Homework", "Are you sure?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setHomework(homework.filter((item) => item.id !== id));
        },
        style: "destructive",
      },
    ]);
  };

  const getSubmissionPercentage = (submitted: number, total: number) => {
    return Math.round((submitted / total) * 100);
  };

  // Filter homework by class (teacher's class)
  const teacherClass = selectedClass;
  const filteredHomework = homework.filter((hw) => hw.class === teacherClass);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Homework</Text>
        <Text style={styles.subtitle}>
          Class {teacherClass} • {filteredHomework.length} Assignments
        </Text>
      </View>

      {!selectedHomework && (
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
      )}

      {selectedHomework ? (
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <TouchableOpacity onPress={() => setSelectedHomework(null)}>
              <Ionicons name="chevron-back" size={28} color="#020617" />
            </TouchableOpacity>
            <Text style={styles.detailsTitle}>{selectedHomework.title}</Text>
            <View style={{ width: 28 }} />
          </View>

          <Text style={styles.submissionsLabel}>Submissions ({selectedHomework.submitted}/{selectedHomework.total})</Text>

          <FlatList
            data={selectedHomework.submissions}
            keyExtractor={(item) => item.studentId.toString()}
            contentContainerStyle={styles.submissionsListContent}
            renderItem={({ item }) => (
              <View style={styles.submissionItem}>
                <View style={styles.submissionInfo}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.submissionDate}>
                    {item.status === "Submitted"
                      ? `Submitted: ${item.date}`
                      : "Not Submitted"}
                  </Text>
                  {item.files && item.files.length > 0 && (
                    <View style={styles.filesContainer}>
                      {item.files.map((file: string, idx: number) => (
                        <View key={idx} style={styles.fileItem}>
                          <Ionicons name="document-outline" size={14} color="#4A4AFF" />
                          <Text style={styles.fileName}>{file}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        item.status === "Submitted"
                          ? "#DBEAFE"
                          : "#FEE2E2",
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      item.status === "Submitted"
                        ? "checkmark-circle"
                        : "close-circle"
                    }
                    size={18}
                    color={
                      item.status === "Submitted"
                        ? "#2563EB"
                        : "#DC2626"
                    }
                  />
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          item.status === "Submitted"
                            ? "#2563EB"
                            : "#DC2626",
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      ) : showForm ? (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Create Homework</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter homework title"
            value={newTitle}
            onChangeText={setNewTitle}
            placeholderTextColor="#CBD5E1"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter homework description"
            value={newDescription}
            onChangeText={setNewDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#CBD5E1"
          />

          <Text style={styles.label}>Due Date (DD MMM YYYY)</Text>
          <TextInput
            style={styles.input}
            placeholder="26 Jan 2026"
            value={newDueDate}
            onChangeText={setNewDueDate}
            placeholderTextColor="#CBD5E1"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.formBtn, styles.cancelBtn]}
              onPress={() => setShowForm(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formBtn, styles.submitBtn]}
              onPress={handleAddHomework}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Assign</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredHomework}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card}
                onPress={() => setSelectedHomework(item)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.titleSection}>
                    <Text style={styles.hwTitle}>{item.title}</Text>
                    <Text style={styles.classLabel}>
                      {item.class} • {item.subject}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteHomework(item.id)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color="#DC2626"
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.description}>
                  {item.description}
                </Text>

                <View style={styles.dueDate}>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color="#EA580C"
                  />
                  <Text style={styles.dueDateText}>
                    Due: {item.dueDate}
                  </Text>
                </View>

                <View style={styles.submissionBar}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${getSubmissionPercentage(
                            item.submitted,
                            item.total
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.submissionText}>
                    {item.submitted}/{item.total} ({getSubmissionPercentage(item.submitted, item.total)}%)
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setShowForm(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.addBtnText}>Assign Homework</Text>
          </TouchableOpacity>
        </>
      )}
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
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  titleSection: {
    flex: 1,
    marginRight: 10,
  },
  hwTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },
  classLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 10,
    lineHeight: 18,
  },
  dueDate: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dueDateText: {
    fontSize: 12,
    color: "#EA580C",
    fontWeight: "600",
    marginLeft: 6,
  },
  submissionBar: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginBottom: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4A4AFF",
  },
  submissionText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  formContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1E293B",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  formBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: "#E5E7EB",
  },
  cancelBtnText: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "700",
  },
  submitBtn: {
    backgroundColor: "#4A4AFF",
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  addBtn: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#4A4AFF",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#4A4AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
    flex: 1,
    textAlign: "center",
  },
  submissionsLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  submissionsListContent: {
    paddingBottom: 20,
  },
  submissionItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  submissionInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#020617",
  },
  submissionDate: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  filesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    gap: 6,
  },
  fileName: {
    fontSize: 11,
    color: "#4A4AFF",
    fontWeight: "600",
    flex: 1,
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
