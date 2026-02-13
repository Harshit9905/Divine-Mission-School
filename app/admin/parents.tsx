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

/* ================= PARENT DATA ================= */
const PARENTS_DATA = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@gmail.com",
    phone: "9876543210",
    children: ["Harshit Raj (STU001)", "Priya Kumar (STU015)"],
    status: "Active",
  },
  {
    id: 2,
    name: "Soni Pandey",
    email: "soni.pandey@gmail.com",
    phone: "9123456789",
    children: ["Akhil Pandey (STU003)", "Anjali Pandey (STU008)"],
    status: "Active",
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "9234567890",
    children: ["Rohan Singh (STU004)"],
    status: "Active",
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha.gupta@gmail.com",
    phone: "9345678901",
    children: ["Arjun Gupta (STU005)", "Zara Gupta (STU009)", "Dev Gupta (STU020)"],
    status: "Active",
  },
  {
    id: 5,
    name: "Amit Patel",
    email: "amit.patel@gmail.com",
    phone: "9456789012",
    children: ["Isha Patel (STU006)"],
    status: "Inactive",
  },
  {
    id: 6,
    name: "Sneha Sharma",
    email: "sneha.sharma@gmail.com",
    phone: "9567890123",
    children: ["Nikhil Sharma (STU007)", "Pooja Sharma (STU016)"],
    status: "Active",
  },
  {
    id: 7,
    name: "Deepak Verma",
    email: "deepak.verma@gmail.com",
    phone: "9678901234",
    children: ["Ravi Verma (STU010)"],
    status: "Active",
  },
  {
    id: 8,
    name: "Priya Nair",
    email: "priya.nair@gmail.com",
    phone: "9789012345",
    children: ["Aditya Nair (STU011)", "Maya Nair (STU021)"],
    status: "Active",
  },
  {
    id: 9,
    name: "Manoj Desai",
    email: "manoj.desai@gmail.com",
    phone: "9890123456",
    children: ["Sanjay Desai (STU012)"],
    status: "Active",
  },
  {
    id: 10,
    name: "Anita Joshi",
    email: "anita.joshi@gmail.com",
    phone: "9901234567",
    children: ["Kabir Joshi (STU013)", "Saira Joshi (STU022)"],
    status: "Active",
  },
];

export default function ParentsManagement() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const filteredParents = PARENTS_DATA.filter((parent) => {
    const searchLower = searchText.toLowerCase();
    return (
      parent.name.toLowerCase().includes(searchLower) ||
      parent.email.toLowerCase().includes(searchLower) ||
      parent.phone.includes(searchText)
    );
  });

  const renderParentCard = (parent: any) => (
    <View key={parent.id} style={styles.parentCard}>
      <View style={styles.parentHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{parent.name.charAt(0)}</Text>
        </View>
        <View style={styles.parentInfo}>
          <Text style={styles.parentName}>{parent.name}</Text>
          <Text style={styles.parentEmail}>{parent.email}</Text>
          <Text style={styles.parentPhone}>{parent.phone}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: parent.status === "Active" ? "#10B981" : "#EF4444" }]}>
          <Text style={styles.statusText}>{parent.status}</Text>
        </View>
      </View>

      <View style={styles.childrenContainer}>
        <Text style={styles.childrenLabel}>Children Enrolled:</Text>
        {parent.children.map((child: string, idx: number) => (
          <Text key={idx} style={styles.childName}>• {child}</Text>
        ))}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            Alert.alert("Edit Parent", `Editing ${parent.name}'s profile`, [
              { text: "Cancel" },
              { text: "Edit" },
            ])
          }
        >
          <Ionicons name="pencil" size={18} color="#4A4AFF" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            Alert.alert("Call Parent", `Calling ${parent.phone}`, [
              { text: "Cancel" },
              { text: "Call Now" },
            ])
          }
        >
          <Ionicons name="call" size={18} color="#16A34A" />
          <Text style={[styles.actionText, { color: "#16A34A" }]}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            Alert.alert("Delete Parent", `Are you sure you want to delete ${parent.name}?`, [
              { text: "Cancel" },
              {
                text: "Delete",
                onPress: () => Alert.alert("Success", `${parent.name} has been deleted`),
                style: "destructive",
              },
            ])
          }
        >
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
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parents Management</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          placeholder="Search parents..."
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

      {/* PARENT LIST */}
      <FlatList
        data={filteredParents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderParentCard(item)}
        scrollEnabled={true}
        style={styles.listContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No parents found</Text>
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
    marginTop: -16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
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
  },

  parentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
  },

  parentHeader: {
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

  parentInfo: {
    flex: 1,
  },

  parentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  parentEmail: {
    fontSize: 11,
    color: "#4A4AFF",
    marginTop: 2,
  },

  parentPhone: {
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

  childrenContainer: {
    backgroundColor: "#F3F0FF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  childrenLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 6,
  },

  childName: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 3,
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
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
