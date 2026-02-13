import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Teacher's assigned class is 10-A
// Teacher teaches Mathematics - 1st period, 2nd period (10-B), 4th period (11-A)
const myTimetable = [
  { period: "1st", subject: "Mathematics (10-A)", time: "09:00 - 09:45", room: "Room 101" },
  { period: "2nd", subject: "Mathematics (10-B)", time: "09:45 - 10:30", room: "Room 102" },
  { period: "3rd", subject: "Free Period", time: "10:45 - 11:30", room: "-" },
  { period: "4th", subject: "Mathematics (11-A)", time: "11:30 - 12:15", room: "Room 103" },
  { period: "Break", subject: "Lunch Break", time: "12:15 - 12:45", room: "Staff Room" },
  { period: "5th", subject: "Class Teacher (10-A)", time: "12:45 - 01:30", room: "Room 101" },
  { period: "6th", subject: "Free Period", time: "01:30 - 02:15", room: "-" },
];

export default function ViewTimetable() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Timetable</Text>
        <Text style={styles.subtitle}>Mathematics Teacher - Class Teacher 10-A</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#4A4AFF" />
          <Text style={styles.infoText}>Monday - Friday (Same Schedule)</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#16A34A" />
          <Text style={styles.infoText}>9:00 AM - 2:15 PM</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={20} color="#EA580C" />
          <Text style={styles.infoText}>3 Classes + Class Teacher Duties</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {myTimetable.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.periodCard,
              item.period === "Break" && styles.breakCard,
              item.subject.includes("Free") && styles.freePeriodCard,
            ]}
          >
            <View style={styles.periodLeft}>
              <View style={[
                styles.periodNumber,
                item.period === "Break" && styles.breakNumber,
                item.subject.includes("Free") && styles.freeNumber,
              ]}>
                <Text style={[
                  styles.periodNumberText,
                  item.period === "Break" && styles.breakNumberText,
                  item.subject.includes("Free") && styles.freeNumberText,
                ]}>
                  {item.period}
                </Text>
              </View>
              
              <View style={styles.periodDetails}>
                <Text style={[
                  styles.subjectName,
                  item.subject.includes("Free") && styles.freeSubject,
                ]}>
                  {item.subject}
                </Text>
                <View style={styles.timeAndRoom}>
                  <View style={styles.timeRow}>
                    <Ionicons name="time-outline" size={14} color="#64748B" />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                  <View style={styles.roomRow}>
                    <Ionicons name="location-outline" size={14} color="#64748B" />
                    <Text style={styles.roomText}>{item.room}</Text>
                  </View>
                </View>
              </View>
            </View>

            {item.subject.includes("10-A") && (
              <View style={styles.classTeacherBadge}>
                <Text style={styles.badgeText}>Class Teacher</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Classes:</Text>
            <Text style={styles.summaryValue}>3</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Free Periods:</Text>
            <Text style={styles.summaryValue}>2</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Class Teacher For:</Text>
            <Text style={styles.summaryValue}>10-A</Text>
          </View>
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
  infoCard: {
    backgroundColor: "#E0E7FF",
    marginHorizontal: 12,
    marginVertical: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4A4AFF",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#020617",
    flex: 1,
  },
  listContent: {
    padding: 12,
  },
  periodCard: {
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
  breakCard: {
    borderLeftColor: "#EA580C",
    backgroundColor: "#FEF3C7",
  },
  freePeriodCard: {
    borderLeftColor: "#94A3B8",
    backgroundColor: "#F8FAFC",
  },
  periodLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 12,
  },
  periodNumber: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 70,
    alignItems: "center",
  },
  breakNumber: {
    backgroundColor: "#FED7AA",
  },
  freeNumber: {
    backgroundColor: "#E2E8F0",
  },
  periodNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4A4AFF",
  },
  breakNumberText: {
    color: "#EA580C",
  },
  freeNumberText: {
    color: "#64748B",
  },
  periodDetails: {
    flex: 1,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 8,
  },
  freeSubject: {
    color: "#94A3B8",
  },
  timeAndRoom: {
    gap: 6,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  roomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roomText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  classTeacherBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    elevation: 2,
    borderTopWidth: 2,
    borderTopColor: "#4A4AFF",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#020617",
  },
});
