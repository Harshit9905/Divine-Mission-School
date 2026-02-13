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

const assignmentsData = [
  {
    id: 1,
    title: "Quadratic Equations",
    class: "10-A",
    subject: "Mathematics",
    dueDate: "29 Jan 2026",
    description: "Solve 15 quadratic equations using different methods",
    submitted: 38,
    total: 45,
    marks: 50,
    submissions: [
      { studentId: 1, name: "Harshit Raj", status: "Submitted", score: 45, files: ["Quadratic_Solutions.pdf"] },
      { studentId: 2, name: "Priya Singh", status: "Submitted", score: 50, files: ["Equations.pdf", "Workings.docx"] },
      { studentId: 3, name: "Arjun Kumar", status: "Not Submitted", score: null, files: [] },
      { studentId: 4, name: "Ananya Patel", status: "Submitted", score: 48, files: ["Assignment_Complete.pdf"] },
      { studentId: 5, name: "Rahul Verma", status: "Submitted", score: 42, files: ["Math_Work.pdf"] },
      { studentId: 6, name: "Neha Singh", status: "Submitted", score: 46, files: ["Quadratic_Answer.pdf"] },
      { studentId: 7, name: "Vikram Joshi", status: "Submitted", score: 49, files: ["Equations_Solutions.pdf"] },
      { studentId: 8, name: "Aisha Khan", status: "Submitted", score: 50, files: ["All_Solutions.pdf"] },
    ],
  },
  {
    id: 2,
    title: "Trigonometry Problems",
    class: "10-A",
    subject: "Mathematics",
    dueDate: "31 Jan 2026",
    description: "Complete worksheet on sine, cosine, tangent",
    submitted: 25,
    total: 45,
    marks: 50,
    submissions: [
      { studentId: 1, name: "Harshit Raj", status: "Submitted", score: 38, files: ["Trigonometry.pdf"] },
      { studentId: 2, name: "Priya Singh", status: "Submitted", score: 40, files: ["Trig_Solutions.pdf", "Notes.docx"] },
      { studentId: 3, name: "Arjun Kumar", status: "Not Submitted", score: null, files: [] },
      { studentId: 4, name: "Ananya Patel", status: "Not Submitted", score: null, files: [] },
      { studentId: 5, name: "Rahul Verma", status: "Submitted", score: 35, files: ["Trigonometry_Work.pdf"] },
      { studentId: 6, name: "Neha Singh", status: "Submitted", score: 42, files: ["Trig_Answer.pdf"] },
      { studentId: 7, name: "Vikram Joshi", status: "Not Submitted", score: null, files: [] },
      { studentId: 8, name: "Aisha Khan", status: "Submitted", score: 45, files: ["Trigonometry_Complete.pdf"] },
    ],
  },
  {
    id: 3,
    title: "Science Project",
    class: "10-B",
    subject: "Science",
    dueDate: "02 Feb 2026",
    description: "Create a model of solar system",
    submitted: 7,
    total: 8,
    marks: 100,
    submissions: [
      { studentId: 9, name: "Simran Sharma", status: "Submitted", score: 92, files: ["Project_Report.pdf"] },
      { studentId: 10, name: "Aarav Singh", status: "Submitted", score: 88, files: ["Solar_System.pdf"] },
      { studentId: 11, name: "Diya Patel", status: "Submitted", score: 95, files: ["Project.pdf"] },
      { studentId: 12, name: "Rohan Kumar", status: "Not Submitted", score: null, files: [] },
      { studentId: 13, name: "Sneha Verma", status: "Submitted", score: 85, files: ["Science_Project.pdf"] },
      { studentId: 14, name: "Abhi Joshi", status: "Submitted", score: 90, files: ["Model_Report.pdf"] },
      { studentId: 15, name: "Kriti Khan", status: "Submitted", score: 87, files: ["Project_Submission.pdf"] },
      { studentId: 16, name: "Nayan Desai", status: "Submitted", score: 93, files: ["Science.pdf"] },
    ],
  },
  {
    id: 4,
    title: "Physics Lab Report",
    class: "11-A",
    subject: "Physics",
    dueDate: "28 Jan 2026",
    description: "Experiment on laws of motion",
    submitted: 8,
    total: 8,
    marks: 50,
    submissions: [
      { studentId: 17, name: "Aryan Malhotra", status: "Submitted", score: 48, files: ["Lab_Report.pdf"] },
      { studentId: 18, name: "Pooja Iyer", status: "Submitted", score: 50, files: ["Motion_Study.pdf"] },
      { studentId: 19, name: "Kartik Yadav", status: "Submitted", score: 45, files: ["Physics_Lab.pdf"] },
      { studentId: 20, name: "Ananya Mishra", status: "Submitted", score: 49, files: ["Experiment.pdf"] },
      { studentId: 21, name: "Vihaan Kapoor", status: "Submitted", score: 46, files: ["Lab_Work.pdf"] },
      { studentId: 22, name: "Riya Gupta", status: "Submitted", score: 50, files: ["Physics_Report.pdf"] },
      { studentId: 23, name: "Siddharth Nair", status: "Submitted", score: 47, files: ["Motion_Report.pdf"] },
      { studentId: 24, name: "Zara Ahmed", status: "Submitted", score: 48, files: ["Physics.pdf"] },
    ],
  },
];

export default function Assignments() {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newClass, setNewClass] = useState("10-A");
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newMarks, setNewMarks] = useState("50");

  const handleAddAssignment = () => {
    if (
      !newTitle.trim() ||
      !newDescription.trim() ||
      !newDueDate.trim() ||
      !newMarks.trim()
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newAssignment = {
      id: assignments.length + 1,
      title: newTitle,
      class: selectedClass,
      subject: "Mathematics",
      dueDate: newDueDate,
      description: newDescription,
      submitted: 0,
      total: 45,
      marks: parseInt(newMarks),
      submissions: [],
    };

    setAssignments([newAssignment, ...assignments]);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setNewMarks("50");
    setShowForm(false);

    Alert.alert("Success", "Assignment created successfully!");
  };

  const handleDeleteAssignment = (id: number) => {
    Alert.alert("Delete Assignment", "Are you sure?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setAssignments(assignments.filter((item) => item.id !== id));
        },
        style: "destructive",
      },
    ]);
  };

  const getSubmissionPercentage = (submitted: number, total: number) => {
    return Math.round((submitted / total) * 100);
  };

  const teacherClass = "10-A";
  const filteredAssignments = assignments.filter((a) => a.class === selectedClass);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
        <Text style={styles.subtitle}>
          Class {selectedClass} • {filteredAssignments.length} Active Assignments
        </Text>
      </View>

      {!selectedAssignment && (
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

      {selectedAssignment ? (
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <TouchableOpacity onPress={() => setSelectedAssignment(null)}>
              <Ionicons name="chevron-back" size={28} color="#020617" />
            </TouchableOpacity>
            <Text style={styles.detailsTitle}>{selectedAssignment.title}</Text>
            <View style={{ width: 28 }} />
          </View>

          <Text style={styles.submissionsLabel}>
            Submissions ({selectedAssignment.submitted}/{selectedAssignment.total})
          </Text>

          <FlatList
            data={selectedAssignment.submissions}
            keyExtractor={(item) => item.studentId.toString()}
            contentContainerStyle={styles.submissionsListContent}
            renderItem={({ item }) => (
              <View style={styles.submissionItem}>
                <View style={styles.submissionInfo}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.submissionScore}>
                    {item.status === "Submitted"
                      ? `Score: ${item.score}/${selectedAssignment.marks}`
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
          <Text style={styles.formTitle}>Create Assignment</Text>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter assignment title"
            value={newTitle}
            onChangeText={setNewTitle}
            placeholderTextColor="#CBD5E1"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter assignment description"
            value={newDescription}
            onChangeText={setNewDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#CBD5E1"
          />

          <Text style={styles.label}>Due Date (DD MMM YYYY)</Text>
          <TextInput
            style={styles.input}
            placeholder="29 Jan 2026"
            value={newDueDate}
            onChangeText={setNewDueDate}
            placeholderTextColor="#CBD5E1"
          />

          <Text style={styles.label}>Total Marks</Text>
          <TextInput
            style={styles.input}
            placeholder="50"
            value={newMarks}
            onChangeText={setNewMarks}
            keyboardType="numeric"
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
              onPress={handleAddAssignment}
            >
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredAssignments}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card}
                onPress={() => setSelectedAssignment(item)}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.titleSection}>
                    <Text style={styles.assignmentTitle}>{item.title}</Text>
                    <Text style={styles.classLabel}>
                      {item.class} • {item.subject}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteAssignment(item.id)}
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

                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#EA580C"
                    />
                    <Text style={styles.infoText}>
                      Due: {item.dueDate}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="star-outline"
                      size={16}
                      color="#4A4AFF"
                    />
                    <Text style={styles.infoText}>
                      {item.marks} Marks
                    </Text>
                  </View>
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
                    {item.submitted}/{item.total} submitted ({getSubmissionPercentage(item.submitted, item.total)}%)
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
            <Text style={styles.addBtnText}>Create Assignment</Text>
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
  assignmentTitle: {
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
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
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
  submissionScore: {
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
