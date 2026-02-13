import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialAttendanceData = [
  {
    id: 1,
    date: "25 Jan 2026",
    class: "10-A",
    present: 42,
    absent: 2,
    leave: 1,
  },
  {
    id: 2,
    date: "24 Jan 2026",
    class: "10-A",
    present: 43,
    absent: 1,
    leave: 1,
  },
  {
    id: 3,
    date: "25 Jan 2026",
    class: "10-B",
    present: 40,
    absent: 2,
    leave: 0,
  },
  {
    id: 4,
    date: "24 Jan 2026",
    class: "10-B",
    present: 41,
    absent: 1,
    leave: 0,
  },
  {
    id: 5,
    date: "25 Jan 2026",
    class: "11-A",
    present: 46,
    absent: 1,
    leave: 1,
  },
];

const studentList = [
  // 10-A Students
  { id: 1, name: "Harshit Raj", roll: 1, status: "present", class: "10-A" },
  { id: 2, name: "Priya Singh", roll: 2, status: "present", class: "10-A" },
  { id: 3, name: "Arjun Kumar", roll: 3, status: "absent", class: "10-A" },
  { id: 4, name: "Ananya Patel", roll: 4, status: "present", class: "10-A" },
  { id: 5, name: "Rahul Verma", roll: 5, status: "leave", class: "10-A" },
  { id: 6, name: "Neha Singh", roll: 6, status: "present", class: "10-A" },
  { id: 7, name: "Vikram Joshi", roll: 7, status: "present", class: "10-A" },
  { id: 8, name: "Aisha Khan", roll: 8, status: "present", class: "10-A" },
  // 10-B Students
  { id: 9, name: "Simran Sharma", roll: 1, status: "present", class: "10-B" },
  { id: 10, name: "Aarav Singh", roll: 2, status: "present", class: "10-B" },
  { id: 11, name: "Diya Patel", roll: 3, status: "absent", class: "10-B" },
  { id: 12, name: "Rohan Kumar", roll: 4, status: "present", class: "10-B" },
  { id: 13, name: "Sneha Verma", roll: 5, status: "leave", class: "10-B" },
  { id: 14, name: "Abhi Joshi", roll: 6, status: "present", class: "10-B" },
  { id: 15, name: "Kriti Khan", roll: 7, status: "present", class: "10-B" },
  { id: 16, name: "Nayan Desai", roll: 8, status: "present", class: "10-B" },
  // 11-A Students
  { id: 17, name: "Aryan Malhotra", roll: 1, status: "present", class: "11-A" },
  { id: 18, name: "Pooja Iyer", roll: 2, status: "present", class: "11-A" },
  { id: 19, name: "Kartik Yadav", roll: 3, status: "absent", class: "11-A" },
  { id: 20, name: "Ananya Mishra", roll: 4, status: "present", class: "11-A" },
  { id: 21, name: "Vihaan Kapoor", roll: 5, status: "leave", class: "11-A" },
  { id: 22, name: "Riya Gupta", roll: 6, status: "present", class: "11-A" },
  { id: 23, name: "Siddharth Nair", roll: 7, status: "present", class: "11-A" },
  { id: 24, name: "Zara Ahmed", roll: 8, status: "present", class: "11-A" },
];

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [allStudents, setAllStudents] = useState(studentList);
  const [showMarkingMode, setShowMarkingMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState("10-A");
  
  const students = allStudents.filter((s) => s.class === selectedClass);

  const handleEditAttendance = (date: string, classInfo: string) => {
    setSelectedClass(classInfo);
    setShowMarkingMode(true);
  };

  const updateStudentStatus = (studentId: number, status: "present" | "absent" | "leave") => {
    setAllStudents(
      allStudents.map((student) => {
        if (student.id === studentId) {
          return { ...student, status };
        }
        return student;
      })
    );
  };

  const saveAttendance = () => {
    const present = students.filter((s) => s.status === "present").length;
    const absent = students.filter((s) => s.status === "absent").length;
    const leave = students.filter((s) => s.status === "leave").length;

    const newRecord = {
      id: attendanceData.length + 1,
      date: new Date().toLocaleDateString("en-GB"),
      class: selectedClass,
      present,
      absent,
      leave,
    };

    setAttendanceData([newRecord, ...attendanceData]);
    setShowMarkingMode(false);

    Alert.alert(
      "Success",
      `Attendance saved!\nPresent: ${present}, Absent: ${absent}, Leave: ${leave}`
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "#16A34A";
      case "absent":
        return "#DC2626";
      case "leave":
        return "#EA580C";
      default:
        return "#6B7280";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {showMarkingMode ? "Mark Attendance" : "Attendance Records"}
        </Text>
        <Text style={styles.subtitle}>
          {showMarkingMode
            ? `Class ${selectedClass} - Select attendance status`
            : "Select class and view/mark attendance"
          }
        </Text>
      </View>

      {!showMarkingMode && (
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

      {showMarkingMode && (
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

      {showMarkingMode ? (
        <>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.studentCard}>
                <View style={styles.studentInfo}>
                  <Text style={styles.roll}>{item.roll}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                
                <View style={styles.statusContainer}>
                  {/* Circle with Status Icon */}
                  <View
                    style={[
                      styles.statusCircle,
                      {
                        backgroundColor:
                          item.status === "present"
                            ? "#DCFCE7"
                            : item.status === "absent"
                            ? "#FEE2E2"
                            : "#FEF3C7",
                        borderColor: getStatusColor(item.status),
                      },
                    ]}
                  >
                    <Ionicons
                      name={
                        item.status === "present"
                          ? "checkmark"
                          : item.status === "absent"
                          ? "close"
                          : "alert"
                      }
                      size={28}
                      color={getStatusColor(item.status)}
                    />
                  </View>

                  {/* Present/Absent Buttons */}
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        item.status === "present" && styles.actionBtnActive,
                      ]}
                      onPress={() => updateStudentStatus(item.id, "present")}
                    >
                      <Text
                        style={[
                          styles.actionBtnText,
                          item.status === "present" &&
                            styles.actionBtnTextActive,
                        ]}
                      >
                        Present
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        item.status === "absent" && styles.actionBtnActive,
                      ]}
                      onPress={() => updateStudentStatus(item.id, "absent")}
                    >
                      <Text
                        style={[
                          styles.actionBtnText,
                          item.status === "absent" &&
                            styles.actionBtnTextActive,
                        ]}
                      >
                        Absent
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={saveAttendance}
          >
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            <Text style={styles.saveBtnText}>Save Attendance</Text>
          </TouchableOpacity>
        </>
      ) : (
        <FlatList
          data={attendanceData}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.date}>{item.date}</Text>
                  <Text style={styles.classInfo}>
                    Class {item.class}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() =>
                    handleEditAttendance(item.date, item.class)
                  }
                >
                  <Ionicons
                    name="create-outline"
                    size={18}
                    color="#4A4AFF"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="#16A34A"
                  />
                  <Text style={styles.statValue}>{item.present}</Text>
                  <Text style={styles.statLabel}>Present</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                  <Ionicons
                    name="close-circle-outline"
                    size={20}
                    color="#DC2626"
                  />
                  <Text style={styles.statValue}>{item.absent}</Text>
                  <Text style={styles.statLabel}>Absent</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color="#EA580C"
                  />
                  <Text style={styles.statValue}>{item.leave}</Text>
                  <Text style={styles.statLabel}>Leave</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
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
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    fontWeight: "700",
    color: "#020617",
  },
  classInfo: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  editBtn: {
    padding: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
    marginTop: 2,
  },
  studentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 1,
    marginHorizontal: 12,
  },
  studentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 1,
  },
  statusContainer: {
    alignItems: "center",
    gap: 8,
  },
  statusCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 6,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  actionBtnActive: {
    backgroundColor: "#4A4AFF",
    borderColor: "#4A4AFF",
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  actionBtnTextActive: {
    color: "#FFFFFF",
  },
  studentInfo: {
    flex: 1,
  },
  roll: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#020617",
    marginTop: 2,
  },
  saveBtn: {
    backgroundColor: "#4A4AFF",
    marginHorizontal: 12,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#F1F5F9",
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
