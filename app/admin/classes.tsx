import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

/* ================= CLASSES DATA ================= */
const CLASSES_DATA = [
  { id: 1, class: "6-A", students: 42, teacher: "Mrs. Anjali Nair", section: "A" },
  { id: 2, class: "6-B", students: 38, teacher: "Mr. Vikram Desai", section: "B" },
  { id: 3, class: "7-A", students: 45, teacher: "Mr. Rajesh Kumar", section: "A" },
  { id: 4, class: "7-B", students: 40, teacher: "Mrs. Priya Singh", section: "B" },
  { id: 5, class: "8-A", students: 43, teacher: "Mrs. Sneha Sharma", section: "A" },
  { id: 6, class: "8-B", students: 39, teacher: "Mr. Amit Patel", section: "B" },
  { id: 7, class: "9-A", students: 41, teacher: "Mrs. Neha Gupta", section: "A" },
  { id: 8, class: "9-B", students: 37, teacher: "Mr. Rohan Verma", section: "B" },
  { id: 9, class: "10-A", students: 44, teacher: "Mrs. Anjali Nair", section: "A" },
  { id: 10, class: "10-B", students: 36, teacher: "Mr. Vikram Desai", section: "B" },
  { id: 11, class: "10-C", students: 40, teacher: "Mrs. Neha Gupta", section: "C" },
  { id: 12, class: "11-A", students: 35, teacher: "Mr. Rajesh Kumar", section: "A" },
];

export default function ClassesManagement() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const filteredClasses = CLASSES_DATA.filter((cls) => {
    const searchLower = searchText.toLowerCase();
    return (
      cls.class.toLowerCase().includes(searchLower) ||
      cls.teacher.toLowerCase().includes(searchLower)
    );
  });

  const renderClassCard = (cls: any) => (
    <TouchableOpacity
      key={cls.id}
      onPress={() => setSelectedClass(cls)}
      style={styles.classCard}
    >
      <View style={styles.classHeader}>
        <View style={styles.classIconContainer}>
          <Text style={styles.classIcon}>{cls.class.split("-")[0]}</Text>
        </View>
        <View style={styles.classInfo}>
          <Text style={styles.className}>{cls.class}</Text>
          <Text style={styles.classTeacher}>{cls.teacher}</Text>
        </View>
        <View style={styles.studentBadge}>
          <Ionicons name="people" size={18} color="#4A4AFF" />
          <Text style={styles.studentCount}>{cls.students}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getClassStats = () => {
    const totalStudents = CLASSES_DATA.reduce((sum, cls) => sum + cls.students, 0);
    const avgStudents = Math.round(totalStudents / CLASSES_DATA.length);
    return { totalStudents, avgStudents };
  };

  const stats = getClassStats();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Classes Management</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* STATS */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Classes</Text>
          <Text style={styles.statValue}>{CLASSES_DATA.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Students</Text>
          <Text style={styles.statValue}>{stats.totalStudents}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg per Class</Text>
          <Text style={styles.statValue}>{stats.avgStudents}</Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          placeholder="Search classes..."
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

      {/* CLASSES LIST */}
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderClassCard(item)}
        scrollEnabled={true}
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No classes found</Text>
          </View>
        }
      />

      {/* CLASS DETAILS MODAL */}
      {selectedClass && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedClass.class} Details</Text>
              <TouchableOpacity onPress={() => setSelectedClass(null)}>
                <Ionicons name="close" size={24} color="#020617" />
              </TouchableOpacity>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Class Name:</Text>
              <Text style={styles.detailValue}>{selectedClass.class}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Class Teacher:</Text>
              <Text style={styles.detailValue}>{selectedClass.teacher}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Students:</Text>
              <Text style={styles.detailValue}>{selectedClass.students}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Section:</Text>
              <Text style={styles.detailValue}>{selectedClass.section}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedClass(null)}
              style={styles.closeBtn}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  header: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    alignItems: "center",
  },

  statLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4A4AFF",
    marginTop: 4,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    elevation: 2,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
  },

  listContainer: {
    paddingHorizontal: 16,
  },

  classCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
  },

  classHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  classIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EFF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  classIcon: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4A4AFF",
  },

  classInfo: {
    flex: 1,
  },

  className: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },

  classTeacher: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  studentBadge: {
    alignItems: "center",
    gap: 4,
  },

  studentCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4A4AFF",
  },

  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#020617",
  },

  detailItem: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF2FF",
  },

  detailLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#020617",
  },

  closeBtn: {
    backgroundColor: "#4A4AFF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },

  closeBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
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
});
