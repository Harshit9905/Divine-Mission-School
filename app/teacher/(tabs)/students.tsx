import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const students = [
  // 10-A Students
  { id: 1, name: "Harshit Raj", class: "10-A", roll: 1, status: "Present" },
  { id: 2, name: "Priya Singh", class: "10-A", roll: 2, status: "Present" },
  { id: 3, name: "Arjun Kumar", class: "10-A", roll: 3, status: "Absent" },
  { id: 4, name: "Ananya Patel", class: "10-A", roll: 4, status: "Present" },
  { id: 5, name: "Rahul Verma", class: "10-A", roll: 5, status: "Leave" },
  { id: 6, name: "Neha Singh", class: "10-A", roll: 6, status: "Present" },
  { id: 7, name: "Vikram Joshi", class: "10-A", roll: 7, status: "Present" },
  { id: 8, name: "Aisha Khan", class: "10-A", roll: 8, status: "Present" },
  // 10-B Students
  { id: 9, name: "Simran Sharma", class: "10-B", roll: 1, status: "Present" },
  { id: 10, name: "Aarav Singh", class: "10-B", roll: 2, status: "Present" },
  { id: 11, name: "Diya Patel", class: "10-B", roll: 3, status: "Absent" },
  { id: 12, name: "Rohan Kumar", class: "10-B", roll: 4, status: "Present" },
  { id: 13, name: "Sneha Verma", class: "10-B", roll: 5, status: "Leave" },
  { id: 14, name: "Abhi Joshi", class: "10-B", roll: 6, status: "Present" },
  { id: 15, name: "Kriti Khan", class: "10-B", roll: 7, status: "Present" },
  { id: 16, name: "Nayan Desai", class: "10-B", roll: 8, status: "Present" },
  // 11-A Students
  { id: 17, name: "Aryan Malhotra", class: "11-A", roll: 1, status: "Present" },
  { id: 18, name: "Pooja Iyer", class: "11-A", roll: 2, status: "Present" },
  { id: 19, name: "Kartik Yadav", class: "11-A", roll: 3, status: "Absent" },
  { id: 20, name: "Ananya Mishra", class: "11-A", roll: 4, status: "Present" },
  { id: 21, name: "Vihaan Kapoor", class: "11-A", roll: 5, status: "Leave" },
  { id: 22, name: "Riya Gupta", class: "11-A", roll: 6, status: "Present" },
  { id: 23, name: "Siddharth Nair", class: "11-A", roll: 7, status: "Present" },
  { id: 24, name: "Zara Ahmed", class: "11-A", roll: 8, status: "Present" },
];

export default function Students() {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null);
  const filteredStudents = students.filter((s) => s.class === selectedClass);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "#16A34A";
      case "Absent":
        return "#DC2626";
      case "Leave":
        return "#EA580C";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return "checkmark-circle";
      case "Absent":
        return "close-circle";
      case "Leave":
        return "alert-circle";
      default:
        return "help-circle";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
        <Text style={styles.subtitle}>Class {selectedClass} • {filteredStudents.length} Students</Text>
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

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard} onPress={() => setSelectedStudent(item)}>
            <View style={styles.studentInfo}>
              <View style={styles.avatar}>
                <Image
                  source={require("../../../assets/harshit.jpg")}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.roll}>Roll No: {item.roll}</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <Ionicons
                name={getStatusIcon(item.status) as any}
                size={20}
                color={getStatusColor(item.status)}
              />
              <Text
                style={[
                  styles.status,
                  { color: getStatusColor(item.status) },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* STUDENT DETAILS MODAL */}
      <Modal 
        visible={selectedStudent !== null} 
        transparent 
        animationType="slide"
        onRequestClose={() => setSelectedStudent(null)}
      >
        <SafeAreaView style={styles.modalBg}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setSelectedStudent(null)} 
              style={{ padding: 8 }}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Student Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            {selectedStudent && (
              <>
                {/* STUDENT INFO */}
                <View style={styles.detailCard}>
                  <View style={styles.largeAvatar}>
                    <Ionicons name="person-circle" size={60} color="#4A4AFF" />
                  </View>
                  <Text style={styles.studentName}>{selectedStudent.name}</Text>
                  <Text style={styles.studentMeta}>Roll No: {selectedStudent.roll} • Class: {selectedStudent.class}</Text>
                </View>

                {/* STATUS */}
                <View style={styles.detailCard}>
                  <Text style={styles.sectionTitle}>Attendance Status</Text>
                  <View style={[styles.statusRow, { backgroundColor: getStatusColor(selectedStudent.status) + "20" }]}>
                    <Ionicons name={getStatusIcon(selectedStudent.status) as any} size={24} color={getStatusColor(selectedStudent.status)} />
                    <Text style={[styles.statusLarge, { color: getStatusColor(selectedStudent.status) }]}>{selectedStudent.status}</Text>
                  </View>
                </View>

                {/* ANALYTICS */}
                <View style={styles.detailCard}>
                  <Text style={styles.sectionTitle}>Analytics</Text>
                  <View style={styles.analyticsRow}>
                    <View style={styles.analyticsItem}>
                      <Text style={styles.analyticsLabel}>Total Days</Text>
                      <Text style={styles.analyticsValue}>180</Text>
                    </View>
                    <View style={styles.analyticsItem}>
                      <Text style={styles.analyticsLabel}>Present Days</Text>
                      <Text style={[styles.analyticsValue, { color: "#16A34A" }]}>156</Text>
                    </View>
                    <View style={styles.analyticsItem}>
                      <Text style={styles.analyticsLabel}>Absent Days</Text>
                      <Text style={[styles.analyticsValue, { color: "#DC2626" }]}>16</Text>
                    </View>
                    <View style={styles.analyticsItem}>
                      <Text style={styles.analyticsLabel}>Leave Days</Text>
                      <Text style={[styles.analyticsValue, { color: "#EA580C" }]}>8</Text>
                    </View>
                  </View>
                  <View style={styles.attendanceBar}>
                    <View style={[styles.attendancePercent, { width: "86.6%" }]} />
                  </View>
                  <Text style={styles.attendanceText}>Attendance: 86.6%</Text>
                </View>

                {/* PERFORMANCE */}
                <View style={styles.detailCard}>
                  <Text style={styles.sectionTitle}>Academic Performance</Text>
                  <View style={styles.performanceRow}>
                    <View style={styles.performanceItem}>
                      <Text style={styles.performanceLabel}>Hindi</Text>
                      <Text style={styles.performanceScore}>85</Text>
                    </View>
                    <View style={styles.performanceItem}>
                      <Text style={styles.performanceLabel}>English</Text>
                      <Text style={styles.performanceScore}>78</Text>
                    </View>
                    <View style={styles.performanceItem}>
                      <Text style={styles.performanceLabel}>Maths</Text>
                      <Text style={styles.performanceScore}>92</Text>
                    </View>
                    <View style={styles.performanceItem}>
                      <Text style={styles.performanceLabel}>Science</Text>
                      <Text style={styles.performanceScore}>88</Text>
                    </View>
                  </View>
                </View>

                {/* ACTION BUTTONS */}
                <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.actionBtn, styles.btnPrimary]} onPress={() => Alert.alert("Message", `Message sent to ${selectedStudent.name}`)}>
                    <Ionicons name="chatbubble-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.actionBtnText}>Send Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, styles.btnSecondary]} onPress={() => Alert.alert("Report", `Viewing report for ${selectedStudent.name}`)}>
                    <Ionicons name="document-outline" size={18} color="#4A4AFF" />
                    <Text style={[styles.actionBtnText, { color: "#4A4AFF" }]}>View Report</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  listContent: {
    padding: 12,
  },
  studentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E5E7EB",
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  roll: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  statusBadge: {
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
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

  /* MODAL */
  modalBg: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  modalHeader: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  modalContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F6FF",
  },

  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  largeAvatar: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  studentName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#020617",
    textAlign: "center",
  },

  studentMeta: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#020617",
    marginBottom: 12,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    gap: 12,
  },

  statusLarge: {
    fontSize: 16,
    fontWeight: "700",
  },

  analyticsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  analyticsItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },

  analyticsLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 6,
  },

  analyticsValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4A4AFF",
  },

  attendanceBar: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },

  attendancePercent: {
    height: 8,
    backgroundColor: "#4A4AFF",
  },

  attendanceText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    textAlign: "center",
  },

  performanceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  performanceItem: {
    alignItems: "center",
  },

  performanceLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 6,
  },

  performanceScore: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4A4AFF",
  },

  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },

  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    elevation: 2,
  },

  btnPrimary: {
    backgroundColor: "#4A4AFF",
  },

  btnSecondary: {
    backgroundColor: "#F1F5F9",
  },

  actionBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
