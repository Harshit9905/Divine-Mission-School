import { Ionicons } from "@expo/vector-icons";
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

/* ================= STAFF DATA ================= */
const TEACHING_STAFF = [
  { id: 1, name: "Mr. Rajesh Kumar", subject: "Mathematics", class: "10-A", status: "Active" },
  { id: 2, name: "Mrs. Priya Singh", subject: "English", class: "9-B", status: "Active" },
  { id: 3, name: "Mr. Amit Patel", subject: "Science", class: "10-B", status: "Active" },
  { id: 4, name: "Mrs. Sneha Sharma", subject: "History", class: "8-A", status: "Active" },
  { id: 5, name: "Mr. Vikram Desai", subject: "Geography", class: "9-A", status: "Active" },
  { id: 6, name: "Mrs. Neha Gupta", subject: "Hindi", class: "10-C", status: "Active" },
  { id: 7, name: "Mr. Rohan Verma", subject: "Physical Education", class: "All", status: "Active" },
  { id: 8, name: "Mrs. Anjali Nair", subject: "Computer Science", class: "10-A,10-B", status: "Active" },
];

const NON_TEACHING_STAFF = [
  { id: 1, name: "Mr. Suresh Kumar", designation: "Principal", department: "Administration", status: "Active" },
  { id: 2, name: "Mrs. Lata Singh", designation: "Vice Principal", department: "Administration", status: "Active" },
  { id: 3, name: "Mr. Bhavesh Patel", designation: "Office Manager", department: "Administration", status: "Active" },
  { id: 4, name: "Mrs. Pooja Sharma", designation: "Receptionist", department: "Reception", status: "Active" },
  { id: 5, name: "Mr. Mahesh Desai", designation: "Security Officer", department: "Security", status: "Active" },
  { id: 6, name: "Mrs. Geeta Verma", designation: "Librarian", department: "Library", status: "Active" },
  { id: 7, name: "Mr. Ravi Nair", designation: "Maintenance Staff", department: "Maintenance", status: "Active" },
];

export default function StaffsManagement() {
  const [activeTab, setActiveTab] = useState<"teaching" | "non-teaching">("teaching");
  const [searchText, setSearchText] = useState("");

  const staffList = activeTab === "teaching" ? TEACHING_STAFF : NON_TEACHING_STAFF;
  
  const filteredStaff = staffList.filter((staff: any) => {
    const searchLower = searchText.toLowerCase();
    return (
      staff.name.toLowerCase().includes(searchLower) ||
      (staff.subject?.toLowerCase().includes(searchLower)) ||
      (staff.designation?.toLowerCase().includes(searchLower))
    );
  });

  const renderStaffCard = (staff: any) => (
    <View key={staff.id} style={styles.staffCard}>
      <View style={styles.staffHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{staff.name.charAt(0)}</Text>
        </View>
        <View style={styles.staffInfo}>
          <Text style={styles.staffName}>{staff.name}</Text>
          <Text style={styles.staffRole}>
            {activeTab === "teaching" ? staff.subject : staff.designation}
          </Text>
          <Text style={styles.staffDept}>
            {activeTab === "teaching" ? `Class: ${staff.class}` : `Dept: ${staff.department}`}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: staff.status === "Active" ? "#10B981" : "#EF4444" }]}>
          <Text style={styles.statusText}>{staff.status}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="pencil" size={18} color="#4A4AFF" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="trash" size={18} color="#EF4444" />
          <Text style={[styles.actionText, { color: "#EF4444" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Staff Management</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "teaching" && styles.tabActive]}
          onPress={() => setActiveTab("teaching")}
        >
          <Ionicons name="school" size={20} color={activeTab === "teaching" ? "#4A4AFF" : "#94A3B8"} />
          <Text style={[styles.tabText, activeTab === "teaching" && styles.tabTextActive]}>Teaching</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "non-teaching" && styles.tabActive]}
          onPress={() => setActiveTab("non-teaching")}
        >
          <Ionicons name="briefcase" size={20} color={activeTab === "non-teaching" ? "#4A4AFF" : "#94A3B8"} />
          <Text style={[styles.tabText, activeTab === "non-teaching" && styles.tabTextActive]}>Non-Teaching</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          placeholder="Search staff..."
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

      {/* STAFF LIST */}
      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderStaffCard(item)}
        scrollEnabled={true}
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No staff found</Text>
          </View>
        }
      />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },

  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },

  tabActive: {
    backgroundColor: "#EFF2FF",
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
  },

  tabTextActive: {
    color: "#4A4AFF",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
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
    paddingBottom: 20,
  },

  staffCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
  },

  staffHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4A4AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatar: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  staffInfo: {
    flex: 1,
  },

  staffName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  staffRole: {
    fontSize: 12,
    color: "#4A4AFF",
    marginTop: 2,
    fontWeight: "600",
  },

  staffDept: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "600",
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
});
