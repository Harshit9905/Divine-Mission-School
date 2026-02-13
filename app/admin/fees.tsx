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

/* ================= FEES DATA ================= */
const FEES_STRUCTURE = [
  {
    id: 1,
    class: "Class 6",
    tuitionFee: 3500,
    developmentFee: 1000,
    transportFee: 800,
    totalFee: 5300,
  },
  {
    id: 2,
    class: "Class 7",
    tuitionFee: 3800,
    developmentFee: 1000,
    transportFee: 800,
    totalFee: 5600,
  },
  {
    id: 3,
    class: "Class 8",
    tuitionFee: 4100,
    developmentFee: 1200,
    transportFee: 800,
    totalFee: 6100,
  },
  {
    id: 4,
    class: "Class 9",
    tuitionFee: 4500,
    developmentFee: 1200,
    transportFee: 800,
    totalFee: 6500,
  },
  {
    id: 5,
    class: "Class 10",
    tuitionFee: 5000,
    developmentFee: 1500,
    transportFee: 800,
    totalFee: 7300,
  },
];

const STUDENT_FEES = [
  {
    id: 1,
    admissionNo: "STU001",
    studentName: "Harshit Raj",
    class: "10-A",
    totalFee: 7300,
    paidAmount: 7300,
    dueAmount: 0,
    status: "Paid",
  },
  {
    id: 2,
    admissionNo: "STU002",
    studentName: "Priya Singh",
    class: "10-B",
    totalFee: 7300,
    paidAmount: 4000,
    dueAmount: 3300,
    status: "Partial",
  },
  {
    id: 3,
    admissionNo: "STU003",
    studentName: "Rahul Verma",
    class: "9-A",
    totalFee: 6500,
    paidAmount: 0,
    dueAmount: 6500,
    status: "Pending",
  },
  {
    id: 4,
    admissionNo: "STU004",
    studentName: "Anjali Nair",
    class: "10-C",
    totalFee: 7300,
    paidAmount: 7300,
    dueAmount: 0,
    status: "Paid",
  },
  {
    id: 5,
    admissionNo: "STU005",
    studentName: "Akash Patel",
    class: "9-B",
    totalFee: 6500,
    paidAmount: 2000,
    dueAmount: 4500,
    status: "Partial",
  },
];

export default function FeesManagement() {
  const [activeTab, setActiveTab] = useState<"structure" | "collection">("structure");
  const [searchText, setSearchText] = useState("");

  const dataList =
    activeTab === "structure"
      ? FEES_STRUCTURE.filter((fee) =>
          fee.class.toLowerCase().includes(searchText.toLowerCase())
        )
      : STUDENT_FEES.filter((fee) => {
          const searchLower = searchText.toLowerCase();
          return (
            fee.studentName.toLowerCase().includes(searchLower) ||
            fee.admissionNo.toLowerCase().includes(searchLower) ||
            fee.class.toLowerCase().includes(searchLower)
          );
        });

  const getStatusColor = (status: string) => {
    if (status === "Paid") return "#10B981";
    if (status === "Partial") return "#F59E0B";
    return "#EF4444";
  };

  const renderFeeStructure = (fee: any) => (
    <View key={fee.id} style={styles.feeCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.className}>{fee.class}</Text>
        <Text style={styles.totalFee}>₹{fee.totalFee.toLocaleString()}</Text>
      </View>

      <View style={styles.feeDetails}>
        <View style={styles.feeRow}>
          <View style={styles.feeItem}>
            <Text style={styles.feeLabel}>Tuition</Text>
            <Text style={styles.feeAmount}>₹{fee.tuitionFee.toLocaleString()}</Text>
          </View>
          <View style={styles.feeItem}>
            <Text style={styles.feeLabel}>Development</Text>
            <Text style={styles.feeAmount}>₹{fee.developmentFee.toLocaleString()}</Text>
          </View>
          <View style={styles.feeItem}>
            <Text style={styles.feeLabel}>Transport</Text>
            <Text style={styles.feeAmount}>₹{fee.transportFee.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Ionicons name="pencil" size={16} color="#4A4AFF" />
        <Text style={styles.editBtnText}>Edit Structure</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStudentFee = (fee: any) => (
    <View key={fee.id} style={styles.feeCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{fee.studentName}</Text>
          <Text style={styles.admissionNo}>{fee.admissionNo}</Text>
          <Text style={styles.className}>{fee.class}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(fee.status) },
          ]}
        >
          <Text style={styles.statusText}>{fee.status}</Text>
        </View>
      </View>

      <View style={styles.feeBreakdown}>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Total Fee</Text>
          <Text style={styles.breakdownValue}>₹{fee.totalFee.toLocaleString()}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Paid Amount</Text>
          <Text style={[styles.breakdownValue, { color: "#10B981" }]}>
            ₹{fee.paidAmount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Due Amount</Text>
          <Text style={[styles.breakdownValue, { color: "#EF4444" }]}>
            ₹{fee.dueAmount.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="cash" size={16} color="#10B981" />
          <Text style={[styles.actionText, { color: "#10B981" }]}>Record Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="document" size={16} color="#4A4AFF" />
          <Text style={styles.actionText}>Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fees Management</Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "structure" && styles.tabActive]}
          onPress={() => setActiveTab("structure")}
        >
          <Ionicons name="list" size={20} color={activeTab === "structure" ? "#4A4AFF" : "#94A3B8"} />
          <Text style={[styles.tabText, activeTab === "structure" && styles.tabTextActive]}>
            Structure
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "collection" && styles.tabActive]}
          onPress={() => setActiveTab("collection")}
        >
          <Ionicons name="cash" size={20} color={activeTab === "collection" ? "#4A4AFF" : "#94A3B8"} />
          <Text style={[styles.tabText, activeTab === "collection" && styles.tabTextActive]}>
            Collection
          </Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          placeholder={activeTab === "structure" ? "Search by class..." : "Search by name, admission no..."}
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

      {/* LIST */}
      <FlatList
        data={dataList as any}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          activeTab === "structure" ? renderFeeStructure(item) : renderStudentFee(item)
        }
        scrollEnabled={true}
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cash" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No fees found</Text>
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

  feeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  className: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  totalFee: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4A4AFF",
  },

  feeDetails: {
    marginBottom: 12,
  },

  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  feeItem: {
    flex: 1,
  },

  feeLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 4,
  },

  feeAmount: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "700",
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  editBtnText: {
    color: "#4A4AFF",
    fontSize: 12,
    fontWeight: "700",
  },

  studentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  admissionNo: {
    fontSize: 12,
    color: "#4A4AFF",
    marginTop: 2,
    fontWeight: "600",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  feeBreakdown: {
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  breakdownLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  breakdownValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "700",
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  actionText: {
    fontSize: 12,
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
});
