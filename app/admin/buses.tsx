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

/* ================= BUS DATA ================= */
const BUSES = [
  {
    id: 1,
    busNo: "DMS-101",
    driverName: "Mr. Ramesh",
    salary: "₹18,000",
    route: "Sector 1-2-3",
    capacity: 50,
    occupied: 42,
    status: "Active",
    students: [
      { id: "STU001", name: "Harshit Raj", class: "10-A" },
      { id: "STU005", name: "Arjun Gupta", class: "9-A" },
      { id: "STU009", name: "Zara Gupta", class: "8-B" },
      { id: "STU012", name: "Sanjay Desai", class: "8-A" },
      { id: "STU018", name: "Vikram Singh", class: "7-A" },
      { id: "STU024", name: "Neha Sharma", class: "6-B" },
      { id: "STU031", name: "Ravi Kumar", class: "10-B" },
      { id: "STU038", name: "Anjali Patel", class: "9-B" },
      { id: "STU045", name: "Aisha Khan", class: "8-A" },
      { id: "STU051", name: "Karan Singh", class: "7-A" },
    ],
  },
  {
    id: 2,
    busNo: "DMS-102",
    driverName: "Mr. Sunil",
    salary: "₹17,500",
    route: "Sector 4-5-6",
    capacity: 50,
    occupied: 38,
    status: "Active",
    students: [
      { id: "STU002", name: "Priya Singh", class: "10-B" },
      { id: "STU006", name: "Isha Patel", class: "9-B" },
      { id: "STU010", name: "Ravi Verma", class: "8-B" },
      { id: "STU014", name: "Saira Joshi", class: "10-A" },
      { id: "STU019", name: "Pooja Sharma", class: "7-B" },
      { id: "STU025", name: "Maya Nair", class: "6-A" },
      { id: "STU032", name: "Sneha Gupta", class: "10-C" },
      { id: "STU039", name: "Rohit Verma", class: "9-A" },
    ],
  },
  {
    id: 3,
    busNo: "DMS-103",
    driverName: "Mr. Akshay",
    salary: "₹17,000",
    route: "Sector 7-8-9",
    capacity: 45,
    occupied: 35,
    status: "Active",
    students: [
      { id: "STU003", name: "Akhil Pandey", class: "10-C" },
      { id: "STU007", name: "Nikhil Sharma", class: "9-A" },
      { id: "STU011", name: "Aditya Nair", class: "8-A" },
      { id: "STU015", name: "Priya Kumar", class: "10-B" },
      { id: "STU020", name: "Dev Gupta", class: "7-B" },
      { id: "STU026", name: "Kabir Joshi", class: "6-B" },
      { id: "STU033", name: "Aryan Singh", class: "10-A" },
    ],
  },
  {
    id: 4,
    busNo: "DMS-104",
    driverName: "Mr. Vijay",
    salary: "₹18,500",
    route: "Sector 10-11",
    capacity: 50,
    occupied: 45,
    status: "Active",
    students: [
      { id: "STU004", name: "Rohan Singh", class: "9-B" },
      { id: "STU008", name: "Anjali Pandey", class: "9-A" },
      { id: "STU013", name: "Kabir Joshi", class: "10-B" },
      { id: "STU016", name: "Pooja Sharma", class: "10-A" },
      { id: "STU021", name: "Maya Nair", class: "7-A" },
      { id: "STU027", name: "Vedant Patel", class: "6-A" },
      { id: "STU034", name: "Simran Kaur", class: "9-B" },
      { id: "STU040", name: "Diya Verma", class: "8-B" },
    ],
  },
  {
    id: 5,
    busNo: "DMS-105",
    driverName: "Mr. Harish",
    salary: "₹18,000",
    route: "Sector 12-13-14",
    capacity: 50,
    occupied: 40,
    status: "Active",
    students: [
      { id: "STU017", name: "Aman Kumar", class: "8-A" },
      { id: "STU022", name: "Saira Joshi", class: "6-B" },
      { id: "STU028", name: "Harsh Desai", class: "6-A" },
      { id: "STU035", name: "Navneet Singh", class: "9-A" },
      { id: "STU041", name: "Esha Nair", class: "7-B" },
      { id: "STU046", name: "Tushar Patel", class: "8-B" },
      { id: "STU050", name: "Zainab Khan", class: "10-A" },
    ],
  },
];

export default function BusesManagement() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectedBus, setSelectedBus] = useState<any>(null);

  const filteredBuses = BUSES.filter((bus) => {
    const searchLower = searchText.toLowerCase();
    return (
      bus.busNo.toLowerCase().includes(searchLower) ||
      bus.driverName.toLowerCase().includes(searchLower) ||
      bus.route.toLowerCase().includes(searchLower)
    );
  });

  const getOccupancyColor = (occupied: number, capacity: number) => {
    const percentage = (occupied / capacity) * 100;
    if (percentage >= 90) return "#EF4444";
    if (percentage >= 70) return "#F59E0B";
    return "#10B981";
  };

  const renderBusCard = (bus: any) => (
    <TouchableOpacity
      key={bus.id}
      onPress={() => setSelectedBus(bus)}
      style={styles.busCard}
    >
      <View style={styles.busHeader}>
        <View style={styles.busNoContainer}>
          <Ionicons name="bus" size={24} color="#4A4AFF" />
          <Text style={styles.busNo}>{bus.busNo}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: bus.status === "Active" ? "#10B981" : "#F59E0B" },
          ]}
        >
          <Text style={styles.statusText}>{bus.status}</Text>
        </View>
      </View>

      <View style={styles.busDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Driver</Text>
            <Text style={styles.detailValue}>{bus.driverName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Salary</Text>
            <Text style={styles.detailValue}>{bus.salary}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Route</Text>
            <Text style={styles.detailValue}>{bus.route}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Students</Text>
            <Text style={styles.detailValue}>{bus.occupied}/{bus.capacity}</Text>
          </View>
        </View>

        <View style={styles.occupancyContainer}>
          <View style={styles.occupancyHeader}>
            <Text style={styles.occupancyLabel}>Capacity</Text>
            <Text style={styles.occupancyValue}>
              {bus.occupied}/{bus.capacity}
            </Text>
          </View>
          <View style={styles.occupancyBar}>
            <View
              style={[
                styles.occupancyFill,
                {
                  width: `${(bus.occupied / bus.capacity) * 100}%`,
                  backgroundColor: getOccupancyColor(bus.occupied, bus.capacity),
                },
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bus Management</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          placeholder="Search by bus no, driver, or route..."
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

      {/* BUSES LIST */}
      <FlatList
        data={filteredBuses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderBusCard(item)}
        scrollEnabled={true}
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="bus" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No buses found</Text>
          </View>
        }
      />

      {/* BUS DETAILS MODAL */}
      {selectedBus && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedBus.busNo} - Students</Text>
              <TouchableOpacity onPress={() => setSelectedBus(null)}>
                <Ionicons name="close" size={24} color="#020617" />
              </TouchableOpacity>
            </View>

            <View style={styles.busInfoBox}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Driver:</Text>
                <Text style={styles.infoValue}>{selectedBus.driverName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Salary:</Text>
                <Text style={styles.infoValue}>{selectedBus.salary}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Route:</Text>
                <Text style={styles.infoValue}>{selectedBus.route}</Text>
              </View>
            </View>

            <Text style={styles.studentsTitle}>Students Enrolled ({selectedBus.students.length}):</Text>

            <FlatList
              data={selectedBus.students}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.studentItem}>
                  <View style={styles.studentAvatar}>
                    <Text style={styles.studentInitial}>{item.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.studentInfo}>
                    <Text style={styles.studentName}>{item.name}</Text>
                    <Text style={styles.studentClass}>{item.id} - {item.class}</Text>
                  </View>
                </View>
              )}
              scrollEnabled={false}
            />

            <TouchableOpacity
              onPress={() => setSelectedBus(null)}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  addBtn: {
    flexDirection: "row",
    backgroundColor: "#4A4AFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    gap: 4,
  },

  addBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
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

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  busCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
  },

  busHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  busNoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  busNo: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  busDetails: {
    marginBottom: 12,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
    fontSize: 13,
    color: "#111827",
    fontWeight: "700",
  },

  occupancyContainer: {
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 10,
  },

  occupancyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  occupancyLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },

  occupancyValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "700",
  },

  occupancyBar: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },

  occupancyFill: {
    height: "100%",
    borderRadius: 4,
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

  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "85%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#020617",
  },

  busInfoBox: {
    backgroundColor: "#EFF2FF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
  },

  studentsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 10,
  },

  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF2FF",
  },

  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A4AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  studentInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
  },

  studentClass: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 2,
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
});

