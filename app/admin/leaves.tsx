import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

/* ================= LEAVE DATA ================= */
const INITIAL_LEAVES = [
  {
    id: 1,
    type: "Student",
    name: "Harshit Raj",
    admissionNo: "STU001",
    class: "10-A",
    leaveType: "Medical",
    fromDate: "2026-01-26",
    toDate: "2026-01-28",
    reason: "Fever and cold",
    status: "Pending",
    appliedDate: "2026-01-25",
  },
  {
    id: 2,
    type: "Teacher",
    name: "Mr. Rajesh Kumar",
    subject: "Mathematics",
    leaveType: "Casual",
    fromDate: "2026-02-01",
    toDate: "2026-02-02",
    reason: "Personal work",
    status: "Pending",
    appliedDate: "2026-01-24",
  },
  {
    id: 3,
    type: "Student",
    name: "Priya Singh",
    admissionNo: "STU002",
    class: "10-B",
    leaveType: "Sick",
    fromDate: "2026-01-25",
    toDate: "2026-01-25",
    reason: "Headache",
    status: "Pending",
    appliedDate: "2026-01-25",
  },
  {
    id: 4,
    type: "Teacher",
    name: "Mrs. Priya Singh",
    subject: "English",
    leaveType: "Medical",
    fromDate: "2026-02-05",
    toDate: "2026-02-07",
    reason: "Doctor appointment",
    status: "Pending",
    appliedDate: "2026-01-23",
  },
  {
    id: 5,
    type: "Student",
    name: "Rahul Kumar",
    admissionNo: "STU010",
    class: "9-A",
    leaveType: "Casual",
    fromDate: "2026-02-10",
    toDate: "2026-02-12",
    reason: "Family function",
    status: "Pending",
    appliedDate: "2026-01-20",
  },
];

export default function LeaveManagement() {
  const router = useRouter();
  const [leaves, setLeaves] = useState(INITIAL_LEAVES);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Student" | "Teacher">("All");

  const filteredLeaves = leaves.filter((leave) => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      leave.name.toLowerCase().includes(searchLower) ||
      (leave.admissionNo?.toLowerCase().includes(searchLower)) ||
      leave.leaveType.toLowerCase().includes(searchLower);

    const matchesType = filterType === "All" ? true : leave.type === filterType;

    return matchesSearch && matchesType && leave.status === "Pending";
  });

  const handleAccept = (id: number) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "Accepted" } : leave
      )
    );
    Alert.alert("Success", "Leave approved!");
  };

  const handleDecline = (id: number) => {
    Alert.prompt(
      "Decline Leave",
      "Enter reason for decline:",
      (reason) => {
        if (reason) {
          setLeaves((prev) =>
            prev.map((leave) =>
              leave.id === id ? { ...leave, status: "Declined", reason } : leave
            )
          );
          Alert.alert("Success", "Leave declined!");
        }
      },
      "plain-text"
    );
  };

  const renderLeaveCard = (leave: any) => (
    <View key={leave.id} style={styles.leaveCard}>
      <View style={styles.leaveHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{leave.name.charAt(0)}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.userName}>{leave.name}</Text>
            <Text style={styles.userType}>
              {leave.type === "Student"
                ? `${leave.admissionNo} • ${leave.class}`
                : leave.subject}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.typeBadge,
            {
              backgroundColor:
                leave.type === "Student" ? "#EFF2FF" : "#FEF3C7",
            },
          ]}
        >
          <Text
            style={[
              styles.typeBadgeText,
              {
                color: leave.type === "Student" ? "#4A4AFF" : "#EA580C",
              },
            ]}
          >
            {leave.type}
          </Text>
        </View>
      </View>

      <View style={styles.leaveDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Leave Type</Text>
            <Text style={styles.detailValue}>{leave.leaveType}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>
              {leave.fromDate} to {leave.toDate}
            </Text>
          </View>
        </View>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>Reason</Text>
          <Text style={styles.reasonText}>{leave.reason}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.acceptBtn}
          onPress={() => handleAccept(leave.id)}
        >
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
          <Text style={styles.acceptBtnText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.declineBtn}
          onPress={() => handleDecline(leave.id)}
        >
          <Ionicons name="close-circle" size={18} color="#FFFFFF" />
          <Text style={styles.declineBtnText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Leave Management</Text>
          <Text style={styles.headerSub}>
            {filteredLeaves.length} pending requests
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          placeholder="Search by name, ID, or leave type..."
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

      {/* FILTER TABS */}
      <View style={styles.filterContainer}>
        {["All", "Student", "Teacher"].map((type: any) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterBtn,
              filterType === type && styles.filterBtnActive,
            ]}
            onPress={() => setFilterType(type)}
          >
            <Text
              style={[
                styles.filterBtnText,
                filterType === type && styles.filterBtnTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LEAVES LIST */}
      <FlatList
        data={filteredLeaves}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderLeaveCard(item)}
        scrollEnabled={true}
        style={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="calendar" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No pending leave requests</Text>
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

  headerSub: {
    fontSize: 11,
    color: "#CBD5E1",
    marginTop: 4,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 12,
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

  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },

  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    elevation: 1,
  },

  filterBtnActive: {
    backgroundColor: "#4A4AFF",
  },

  filterBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },

  filterBtnTextActive: {
    color: "#FFFFFF",
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  leaveCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
  },

  leaveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatarContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#4A4AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatar: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  details: {
    flex: 1,
  },

  userName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  userType: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  typeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  leaveDetails: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  detailItem: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "700",
  },

  reasonContainer: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    padding: 10,
  },

  reasonLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 4,
  },

  reasonText: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "500",
  },

  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },

  acceptBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: "#10B981",
    borderRadius: 8,
  },

  acceptBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  declineBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: "#EF4444",
    borderRadius: 8,
  },

  declineBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 12,
  },
});
