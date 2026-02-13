import { Ionicons } from "@expo/vector-icons";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const announcements = [
  {
    id: 1,
    title: "Annual Sports Day",
    message: "Annual Sports Day will be held on March 15, 2026",
    date: "Mar 10, 2026",
    priority: "High",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    message: "PTM scheduled for all classes on March 20, 2026",
    date: "Mar 8, 2026",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Holiday Notice",
    message: "School will be closed for summer vacation from April 1",
    date: "Mar 1, 2026",
    priority: "High",
  },
  {
    id: 4,
    title: "Exam Schedule Released",
    message: "Final exams schedule has been released on the school website",
    date: "Feb 28, 2026",
    priority: "High",
  },
  {
    id: 5,
    title: "Fee Payment Reminder",
    message: "Please ensure all fees are paid by March 31, 2026",
    date: "Feb 25, 2026",
    priority: "Medium",
  },
];

export default function Announcements() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <Text style={styles.title}>Announcements</Text>
          <Text style={styles.subtitle}>Create & Manage announcements</Text>
        </View>

        {/* ================= CREATE ANNOUNCEMENT ================= */}
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() =>
            Alert.alert(
              "Create Announcement",
              "Open announcement form to create new announcement",
              [{ text: "Cancel" }, { text: "Create" }]
            )
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.createBtnText}>Create New Announcement</Text>
        </TouchableOpacity>

        {/* ================= SEARCH ================= */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search announcements..."
            style={styles.searchInput}
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* ================= ANNOUNCEMENTS LIST ================= */}
        <Text style={styles.sectionTitle}>Recent Announcements</Text>

        <View style={styles.listContainer}>
          {announcements.map((announcement, idx) => (
            <View key={idx} style={styles.announcementCard}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  <Text style={styles.announcementDate}>{announcement.date}</Text>
                </View>
                <View
                  style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        announcement.priority === "High" ? "#FEE2E2" : "#FEF3C7",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      {
                        color:
                          announcement.priority === "High" ? "#DC2626" : "#B45309",
                      },
                    ]}
                  >
                    {announcement.priority}
                  </Text>
                </View>
              </View>

              <Text style={styles.announcementMessage}>{announcement.message}</Text>

              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() =>
                    Alert.alert(
                      announcement.title,
                      announcement.message,
                      [{ text: "OK" }]
                    )
                  }
                >
                  <Ionicons name="eye-outline" size={16} color="#4A4AFF" />
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() =>
                    Alert.alert(
                      "Edit Announcement",
                      `Editing: ${announcement.title}`,
                      [{ text: "Cancel" }, { text: "Edit" }]
                    )
                  }
                >
                  <Ionicons name="create-outline" size={16} color="#EA580C" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() =>
                    Alert.alert(
                      "Delete Announcement",
                      `Are you sure you want to delete "${announcement.title}"?`,
                      [
                        { text: "Cancel" },
                        {
                          text: "Delete",
                          onPress: () =>
                            Alert.alert(
                              "Success",
                              "Announcement deleted successfully"
                            ),
                          style: "destructive",
                        },
                      ]
                    )
                  }
                >
                  <Ionicons name="trash-outline" size={16} color="#DC2626" />
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    marginBottom: 16,
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

  createBtn: {
    backgroundColor: "#4A4AFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  createBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    color: "#020617",
  },

  sectionTitle: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 12,
  },

  listContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  announcementCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  announcementTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#020617",
  },

  announcementDate: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 4,
  },

  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  priorityText: {
    fontSize: 11,
    fontWeight: "600",
  },

  announcementMessage: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 10,
  },

  cardActions: {
    flexDirection: "row",
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },

  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 4,
  },

  actionText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
});
