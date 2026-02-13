import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialNotifications = [
  {
    id: 1,
    message: "Midterm exams will start from 1st February",
    class: "10-A",
    date: "24 Jan 2026 2:30 PM",
    status: "sent",
  },
  {
    id: 2,
    message: "Complete your homework before tomorrow",
    class: "10-B",
    date: "24 Jan 2026 11:00 AM",
    status: "sent",
  },
  {
    id: 3,
    message: "Please bring your assignment on Monday",
    class: "11-A",
    date: "23 Jan 2026 4:45 PM",
    status: "sent",
  },
];

export default function SendNotification() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSendNotification = () => {
    if (!message.trim()) {
      Alert.alert("Error", "Please enter a message");
      return;
    }

    const newNotification = {
      id: notifications.length + 1,
      message: message.trim(),
      class: selectedClass,
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setNotifications([newNotification, ...notifications]);
    setMessage("");
    setShowForm(false);

    Alert.alert(
      "Success",
      `Notification sent to Class ${selectedClass}!`,
      [{ text: "OK" }]
    );
  };

  const handleDeleteNotification = (id: number) => {
    Alert.alert("Delete Notification", "Remove this notification?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setNotifications(notifications.filter((item) => item.id !== id));
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Notification</Text>
        <Text style={styles.subtitle}>Communicate with students</Text>
      </View>

      {showForm ? (
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.formCard}>
            <Text style={styles.formLabel}>Select Class</Text>
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

            <Text style={styles.formLabel}>Notification Message</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Enter message for students..."
              placeholderTextColor="#94A3B8"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <Text style={styles.charCount}>{message.length}/500 characters</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowForm(false);
                  setMessage("");
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handleSendNotification}
              >
                <Ionicons name="send" size={18} color="#FFFFFF" />
                <Text style={styles.sendBtnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <>
          <TouchableOpacity
            style={styles.newNotificationBtn}
            onPress={() => setShowForm(true)}
          >
            <Ionicons name="add-circle" size={24} color="#4A4AFF" />
            <Text style={styles.newNotificationText}>Send New Notification</Text>
          </TouchableOpacity>

          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Recent Notifications</Text>
            <Text style={styles.notificationCount}>{notifications.length}</Text>
          </View>

          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.notificationCard}>
                <View style={styles.notificationContent}>
                  <View style={styles.classAndDate}>
                    <View style={styles.classBadge}>
                      <Text style={styles.classBadgeText}>{item.class}</Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text style={styles.messageText}>{item.message}</Text>
                  <View style={styles.statusBadge}>
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color="#16A34A"
                    />
                    <Text style={styles.statusText}>Sent</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDeleteNotification(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#DC2626" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons
                  name="notifications-off-outline"
                  size={48}
                  color="#CBD5E1"
                />
                <Text style={styles.emptyText}>No notifications yet</Text>
              </View>
            }
          />
        </>
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
  newNotificationBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#E0E7FF",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4A4AFF",
    gap: 8,
  },
  newNotificationText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4A4AFF",
  },
  formContainer: {
    padding: 16,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    elevation: 3,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 10,
    marginTop: 12,
  },
  classButtonsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  classButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  messageInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#020617",
    backgroundColor: "#F8FAFC",
    marginBottom: 8,
  },
  charCount: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },
  sendBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#4A4AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    elevation: 2,
  },
  sendBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#020617",
  },
  notificationCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4A4AFF",
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  listContent: {
    padding: 12,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#4A4AFF",
  },
  notificationContent: {
    flex: 1,
  },
  classAndDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  classBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  classBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A4AFF",
  },
  dateText: {
    fontSize: 11,
    color: "#94A3B8",
  },
  messageText: {
    fontSize: 14,
    color: "#1E293B",
    lineHeight: 20,
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#16A34A",
  },
  deleteBtn: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 8,
  },
});
