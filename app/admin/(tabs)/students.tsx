import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

/* ================= FIRST NAMES ================= */
const FIRST_NAMES = [
  "Harshit", "Arjun", "Priya", "Rahul", "Neha", "Akash", "Anjali", "Aditya", "Bhavna", "Chetan",
  "Deepika", "Esha", "Faisal", "Gautam", "Heena", "Ishaan", "Jiya", "Karan", "Leela", "Manoj",
  "Nisha", "Omit", "Piyush", "Quresh", "Rishav", "Simran", "Tarun", "Ushma", "Vishal", "Walia",
  "Yuki", "Zara", "Ananya", "Babu", "Chitrangada", "Diksha", "Ethan", "Fatima", "Gaurav", "Hina"
];

const LAST_NAMES = [
  "Raj", "Singh", "Sharma", "Kumar", "Verma", "Patel", "Nair", "Desai", "Gupta", "Khanna",
  "Pandey", "Mishra", "Shukla", "Rao", "Kulkarni", "Bhat", "Shah", "Joshi", "Trivedi", "Agarwal"
];

const CLASSES = ["6-A", "6-B", "7-A", "7-B", "8-A", "8-B", "9-A", "9-B", "10-A", "10-B", "10-C"];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

/* ================= GENERATE 50 STUDENTS ================= */
const generateStudents = () => {
  const students = [];
  for (let i = 1; i <= 50; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const classIndex = Math.floor(Math.random() * CLASSES.length);
    
    students.push({
      id: i,
      admissionNo: `STU${String(i).padStart(3, "0")}`,
      name: `${firstName} ${lastName}`,
      dob: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2010`,
      class: CLASSES[classIndex],
      roll: Math.floor(Math.random() * 35) + 1,
      status: Math.random() > 0.1 ? "Active" : "Inactive",
      busFacility: Math.random() > 0.4 ? "Yes" : "No",
      busNo: Math.random() > 0.4 ? `DMS-${Math.floor(Math.random() * 5) + 101}` : "N/A",
      // New fields
      fatherName: `Mr. ${lastName}`,
      motherName: `Mrs. ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
      parentPhone: `98${Math.floor(Math.random() * 9999999999)}`,
      bloodGroup: BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)],
      address: `${Math.floor(Math.random() * 999) + 1}, Sector ${Math.floor(Math.random() * 20) + 1}`,
      city: "Patna",
      lastExamMarks: Math.floor(Math.random() * 40) + 60,
      percentage: Math.floor(Math.random() * 20) + 70,
      attendance: Math.floor(Math.random() * 20) + 80,
      feesPaid: Math.random() > 0.3 ? "Paid" : "Pending",
      feesAmount: "₹15,000",
      academicRating: ["A", "A+", "B", "B+", "C", "C+"][Math.floor(Math.random() * 6)],
      allergies: Math.random() > 0.8 ? "Peanuts" : "None",
    });
  }
  return students;
};

const STUDENTS_LIST = generateStudents();

export default function Students() {
  const [searchText, setSearchText] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = STUDENTS_LIST.filter((student) => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(searchLower) ||
      student.admissionNo.toLowerCase().includes(searchLower) ||
      student.class.toLowerCase().includes(searchLower);

    const matchesClass = selectedClass ? student.class === selectedClass : true;

    return matchesSearch && matchesClass;
  });

  const renderStudentCard = (student: any) => (
    <View key={student.id} style={styles.studentCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentAvatar}>
          <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.admissionNo}>{student.admissionNo}</Text>
          <Text style={styles.classInfo}>
            {student.class} • Roll {student.roll}
          </Text>
          <View style={styles.busInfo}>
            <Ionicons
              name={student.busFacility === "Yes" ? "bus" : "close-circle"}
              size={14}
              color={student.busFacility === "Yes" ? "#4A4AFF" : "#DC2626"}
            />
            <Text
              style={[
                styles.busText,
                { color: student.busFacility === "Yes" ? "#4A4AFF" : "#DC2626" },
              ]}
            >
              Bus: {student.busFacility} {student.busFacility === "Yes" ? `(${student.busNo})` : ""}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                student.status === "Active" ? "#DCF5E3" : "#FFE5E5",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: student.status === "Active" ? "#16A34A" : "#DC2626",
              },
            ]}
          >
            {student.status}
          </Text>
        </View>
      </View>

      <View style={styles.studentActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setSelectedStudent(student)}>
          <Ionicons name="eye" size={16} color="#4A4AFF" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            Alert.alert("Edit Student", `Editing ${student.name}`, [
              { text: "Cancel" },
              { text: "Edit" },
            ])
          }
        >
          <Ionicons name="pencil" size={16} color="#EA580C" />
          <Text style={[styles.actionText, { color: "#EA580C" }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            Alert.alert("Delete Student", `Delete ${student.name}?`, [
              { text: "Cancel" },
              {
                text: "Delete",
                onPress: () => Alert.alert("Success", "Student deleted"),
                style: "destructive",
              },
            ])
          }
        >
          <Ionicons name="trash" size={16} color="#DC2626" />
          <Text style={[styles.actionText, { color: "#DC2626" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <Text style={styles.title}>Manage Students</Text>
        <Text style={styles.subtitle}>Total: {STUDENTS_LIST.length} Students</Text>
      </View>

      {/* ================= SEARCH ================= */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search by name, admission no..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#94A3B8"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ================= CLASS FILTER ================= */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterChip,
            !selectedClass && styles.filterChipActive,
          ]}
          onPress={() => setSelectedClass(null)}
        >
          <Text
            style={[
              styles.filterChipText,
              !selectedClass && styles.filterChipTextActive,
            ]}
          >
            All Classes
          </Text>
        </TouchableOpacity>
        {CLASSES.map((cls) => (
          <TouchableOpacity
            key={cls}
            style={[
              styles.filterChip,
              selectedClass === cls && styles.filterChipActive,
            ]}
            onPress={() => setSelectedClass(cls)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedClass === cls && styles.filterChipTextActive,
              ]}
            >
              {cls}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ================= ADD NEW STUDENT ================= */}
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={22} color="#FFFFFF" />
        <Text style={styles.addBtnText}>Add New Student</Text>
      </TouchableOpacity>

      {/* ================= STUDENTS LIST ================= */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderStudentCard(item)}
        scrollEnabled={true}
        style={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No students found</Text>
          </View>
        }
        ListHeaderComponent={
          <Text style={styles.resultText}>
            Showing {filteredStudents.length} of {STUDENTS_LIST.length} students
          </Text>
        }
      />

      {/* ================= STUDENT DETAIL MODAL ================= */}
      <Modal visible={!!selectedStudent} transparent animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedStudent(null)}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Student Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {selectedStudent && (
              <>
                {/* BASIC INFO */}
                <View style={styles.section}>
                  <View style={styles.sectionAvatar}>
                    <Text style={styles.sectionAvatarText}>{selectedStudent.name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.sectionName}>{selectedStudent.name}</Text>
                  <Text style={styles.sectionSubtitle}>{selectedStudent.admissionNo}</Text>
                </View>

                {/* PERSONAL INFO */}
                <View style={styles.infoSection}>
                  <Text style={styles.infoSectionTitle}>Personal Information</Text>
                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Date of Birth</Text>
                      <Text style={styles.infoValue}>{selectedStudent.dob}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Blood Group</Text>
                      <Text style={styles.infoValue}>{selectedStudent.bloodGroup}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Allergies</Text>
                      <Text style={styles.infoValue}>{selectedStudent.allergies}</Text>
                    </View>
                  </View>
                </View>

                {/* ACADEMIC INFO */}
                <View style={styles.infoSection}>
                  <Text style={styles.infoSectionTitle}>Academic Information</Text>
                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Class</Text>
                      <Text style={styles.infoValue}>{selectedStudent.class}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Roll Number</Text>
                      <Text style={styles.infoValue}>{selectedStudent.roll}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Last Exam Marks</Text>
                      <Text style={styles.infoValue}>{selectedStudent.lastExamMarks}/100</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Percentage</Text>
                      <Text style={styles.infoValue}>{selectedStudent.percentage}%</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Rating</Text>
                      <Text style={[styles.infoValue, { color: "#4A4AFF", fontWeight: "800" }]}>
                        {selectedStudent.academicRating}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Attendance</Text>
                      <Text style={styles.infoValue}>{selectedStudent.attendance}%</Text>
                    </View>
                  </View>
                </View>

                {/* PARENTS INFO */}
                <View style={styles.infoSection}>
                  <Text style={styles.infoSectionTitle}>Parents Information</Text>
                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Father</Text>
                      <Text style={styles.infoValue}>{selectedStudent.fatherName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Mother</Text>
                      <Text style={styles.infoValue}>{selectedStudent.motherName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Contact</Text>
                      <Text style={styles.infoValue}>{selectedStudent.parentPhone}</Text>
                    </View>
                  </View>
                </View>

                {/* CONTACT INFO */}
                <View style={styles.infoSection}>
                  <Text style={styles.infoSectionTitle}>Contact Information</Text>
                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Address</Text>
                      <Text style={styles.infoValue}>{selectedStudent.address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>City</Text>
                      <Text style={styles.infoValue}>{selectedStudent.city}</Text>
                    </View>
                  </View>
                </View>

                {/* FEES INFO */}
                <View style={styles.infoSection}>
                  <Text style={styles.infoSectionTitle}>Fees Information</Text>
                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Total Fees</Text>
                      <Text style={styles.infoValue}>{selectedStudent.feesAmount}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Status</Text>
                      <Text
                        style={[
                          styles.infoValue,
                          {
                            color: selectedStudent.feesPaid === "Paid" ? "#16A34A" : "#DC2626",
                            fontWeight: "700",
                          },
                        ]}
                      >
                        {selectedStudent.feesPaid}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* BUS INFO */}
                <View style={styles.infoSection}>
                  <Text style={styles.infoSectionTitle}>Transport Information</Text>
                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Bus Facility</Text>
                      <Text style={styles.infoValue}>{selectedStudent.busFacility}</Text>
                    </View>
                    {selectedStudent.busFacility === "Yes" && (
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Bus Number</Text>
                        <Text style={styles.infoValue}>{selectedStudent.busNo}</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={{ height: 30 }} />
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
    paddingTop: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 12,
    color: "#CBD5E1",
    marginTop: 4,
  },

  searchSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#020617",
    marginHorizontal: 8,
  },

  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },

  filterChip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 1,
  },

  filterChipActive: {
    backgroundColor: "#4A4AFF",
  },

  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },

  filterChipTextActive: {
    color: "#FFFFFF",
  },

  addBtn: {
    backgroundColor: "#4A4AFF",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  addBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  resultText: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 12,
    fontWeight: "600",
  },

  studentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },

  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  studentAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#4A4AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
  },

  admissionNo: {
    fontSize: 11,
    color: "#4A4AFF",
    marginTop: 2,
    fontWeight: "600",
  },

  classInfo: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  busInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  busText: {
    fontSize: 10,
    fontWeight: "600",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },

  studentActions: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },

  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },

  actionText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A4AFF",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 12,
  },

  modalContainer: {
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
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  sectionAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A4AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionAvatarText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  sectionName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#020617",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  infoSection: {
    marginBottom: 12,
  },

  infoSectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#020617",
    marginBottom: 10,
  },

  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF2FF",
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
});

