import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notificationsData = [
  {
    id: 1,
    from: "Ms. Priya Sharma (Math Teacher)",
    title: "Great Performance in Monthly Exam",
    message:
      "Harshit has scored 95/100 in Mathematics and is doing excellent work. Keep it up!",
    timestamp: "Mar 28, 10:30 AM",
    read: false,
    type: "praise",
  },
  {
    id: 2,
    from: "Mr. Rajesh Kumar (Class Teacher)",
    title: "PTM Reminder",
    message:
      "Parent-Teacher Meeting scheduled for Class 10-A on April 5, 2024 at 3:00 PM.",
    timestamp: "Mar 27, 2:15 PM",
    read: false,
    type: "reminder",
  },
  {
    id: 3,
    from: "Dr. Anil Kumar (Science Teacher)",
    title: "Science Project Submission",
    message:
      "Please remind Harshit to submit the science project report by March 30. The practical work is complete and well done.",
    timestamp: "Mar 26, 1:45 PM",
    read: true,
    type: "reminder",
  },
  {
    id: 4,
    from: "School Administration",
    title: "Annual Sports Day Announcement",
    message:
      "The Annual Sports Day will be held on April 15, 2024. Registration for various events starts from April 1.",
    timestamp: "Mar 25, 9:20 AM",
    read: true,
    type: "announcement",
  },
  {
    id: 5,
    from: "Ms. Sunita Singh (History Teacher)",
    title: "Homework Submission Issue",
    message:
      "Harshit has not submitted the history project yet. It was due on March 22. Please remind him to submit ASAP.",
    timestamp: "Mar 24, 3:00 PM",
    read: true,
    type: "warning",
  },
  {
    id: 6,
    from: "School Administration",
    title: "Summer Vacation Notification",
    message:
      "Summer vacation will commence from May 20 to June 30, 2024. School reopens on July 1, 2024.",
    timestamp: "Mar 22, 11:00 AM",
    read: true,
    type: "announcement",
  },
];

interface Notification {
  id: number;
  from: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: string;
}

interface NotificationCardProps {
  notification: Notification;
  onPress?: () => void;
}

const NotificationCard = ({ notification, onPress }: NotificationCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "praise":
        return { bg: "#DCFCE7", icon: "checkmark-circle", color: "#16A34A" };
      case "reminder":
        return { bg: "#FEF3C7", icon: "alert-circle", color: "#EA580C" };
      case "warning":
        return { bg: "#FEE2E2", icon: "close-circle", color: "#DC2626" };
      case "announcement":
        return { bg: "#DBEAFE", icon: "information-circle", color: "#0284C7" };
      default:
        return { bg: "#F1F5F9", icon: "mail", color: "#64748B" };
    }
  };

  const type = getTypeColor(notification.type);

  return (
    <TouchableOpacity style={styles.notificationCard} onPress={onPress}>
      <View style={styles.notificationLeft}>
        <View style={[styles.iconContainer, { backgroundColor: type.bg }]}>
          <Ionicons name={type.icon as any} size={20} color={type.color} />
        </View>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.headerRow}>
          <Text style={styles.fromText}>{notification.from}</Text>
          {!notification.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.titleText}>{notification.title}</Text>
        <Text numberOfLines={2} style={styles.messageText}>
          {notification.message}
        </Text>
        <Text style={styles.timestampText}>{notification.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Notifications() {
  const unreadCount = notificationsData.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>Teacher messages and announcements</Text>
      </View>

      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NotificationCard notification={item} onPress={undefined} />}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  unreadBadge: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  unreadText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  subtitle: {
    fontSize: 13,
    color: "#CBD5E1",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    alignItems: "flex-start",
  },
  notificationLeft: {
    marginRight: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  fromText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A4AFF",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DC2626",
  },
  titleText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
    marginBottom: 6,
  },
  timestampText: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "600",
  },
});
