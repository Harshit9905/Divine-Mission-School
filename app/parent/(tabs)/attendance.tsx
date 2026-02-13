import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const childAttendanceData = {
  studentName: "Harshit Raj",
  class: "10-A",
  overall: 92,
  totalDays: 45,
  present: 42,
  absent: 2,
  leave: 1,
  monthlyData: [
    { month: "January", percentage: 96, present: 20, absent: 0, leave: 1 },
    { month: "February", percentage: 88, present: 20, absent: 2, leave: 0 },
    { month: "March", percentage: 92, present: 22, absent: 0, leave: 0 },
    { month: "April", percentage: 95, present: 19, absent: 1, leave: 0 },
  ],
  recentAttendance: [
    { date: "Today (Mar 28)", status: "Present", time: "8:45 AM" },
    { date: "Mar 27", status: "Present", time: "8:50 AM" },
    { date: "Mar 26", status: "Absent", time: "-" },
    { date: "Mar 25", status: "Present", time: "8:42 AM" },
    { date: "Mar 24", status: "Present", time: "8:38 AM" },
  ],
};

export default function Attendance() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Attendance</Text>
          <Text style={styles.subtitle}>
            {childAttendanceData.studentName} • {childAttendanceData.class}
          </Text>
        </View>

        {/* OVERALL ATTENDANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Attendance</Text>
          <View style={styles.card}>
            <View style={styles.overallContainer}>
              <View style={styles.percentageCircle}>
                <Text style={styles.percentageText}>
                  {childAttendanceData.overall}%
                </Text>
              </View>
              <View style={styles.overallStats}>
                <Text style={styles.overallLabel}>Total Days</Text>
                <Text style={styles.overallValue}>
                  {childAttendanceData.totalDays}
                </Text>
                <Text style={styles.statusText}>Good Standing</Text>
              </View>
            </View>

            <View style={styles.breakdown}>
              <View style={styles.breakdownItem}>
                <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
                <Text style={styles.breakdownLabel}>Present</Text>
                <Text style={styles.breakdownValue}>
                  {childAttendanceData.present}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Ionicons name="close-circle" size={20} color="#DC2626" />
                <Text style={styles.breakdownLabel}>Absent</Text>
                <Text style={styles.breakdownValue}>
                  {childAttendanceData.absent}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Ionicons name="alert-circle" size={20} color="#EA580C" />
                <Text style={styles.breakdownLabel}>Leave</Text>
                <Text style={styles.breakdownValue}>
                  {childAttendanceData.leave}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* MONTHLY TREND */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Trend</Text>
          {childAttendanceData.monthlyData.map((month, idx) => (
            <View key={idx} style={styles.monthCard}>
              <View style={styles.monthHeader}>
                <Text style={styles.monthName}>{month.month}</Text>
                <Text style={styles.monthPercentage}>{month.percentage}%</Text>
              </View>
              <View style={styles.monthProgress}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${month.percentage}%` },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.monthStats}>
                <View style={styles.statItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.statText}>{month.present} Present</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="close-circle" size={16} color="#DC2626" />
                  <Text style={styles.statText}>{month.absent} Absent</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="alert-circle" size={16} color="#EA580C" />
                  <Text style={styles.statText}>{month.leave} Leave</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* RECENT ATTENDANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Attendance</Text>
          <View style={styles.card}>
            {childAttendanceData.recentAttendance.map((record, idx) => (
              <View key={idx} style={styles.attendanceRecord}>
                <View style={styles.recordLeft}>
                  <Text style={styles.recordDate}>{record.date}</Text>
                  <Text style={styles.recordTime}>{record.time}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    record.status === "Present"
                      ? styles.presentBadge
                      : styles.absentBadge,
                  ]}
                >
                  <Ionicons
                    name={
                      record.status === "Present"
                        ? "checkmark-circle"
                        : "close-circle"
                    }
                    size={16}
                    color={record.status === "Present" ? "#16A34A" : "#DC2626"}
                  />
                  <Text
                    style={[
                      styles.statusText2,
                      record.status === "Present"
                        ? styles.presentText
                        : styles.absentText,
                    ]}
                  >
                    {record.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ATTENDANCE RULES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance Rules</Text>
          <View style={styles.card}>
            <View style={styles.ruleItem}>
              <Ionicons name="information-circle" size={18} color="#4A4AFF" />
              <Text style={styles.ruleText}>
                Minimum 75% attendance required to appear in exams
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="information-circle" size={18} color="#4A4AFF" />
              <Text style={styles.ruleText}>
                Medical leave requires parent's letter and doctor's certificate
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Ionicons name="information-circle" size={18} color="#4A4AFF" />
              <Text style={styles.ruleText}>
                Casual leave requires prior notification to school
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
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
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  overallContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  percentageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#16A34A",
  },
  percentageText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#16A34A",
  },
  overallStats: {
    flex: 1,
  },
  overallLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 4,
  },
  overallValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#020617",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#16A34A",
    fontWeight: "600",
  },
  breakdown: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  breakdownItem: {
    alignItems: "center",
    flex: 1,
  },
  breakdownLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 6,
    fontWeight: "600",
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#020617",
    marginTop: 2,
  },
  monthCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
  },
  monthPercentage: {
    fontSize: 14,
    fontWeight: "800",
    color: "#16A34A",
  },
  monthProgress: {
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#16A34A",
  },
  monthStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  statText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },
  attendanceRecord: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  recordLeft: {
    flex: 1,
  },
  recordDate: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 2,
  },
  recordTime: {
    fontSize: 11,
    color: "#64748B",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  presentBadge: {
    backgroundColor: "#DCFCE7",
  },
  absentBadge: {
    backgroundColor: "#FEE2E2",
  },
  statusText2: {
    fontSize: 12,
    fontWeight: "700",
  },
  presentText: {
    color: "#16A34A",
  },
  absentText: {
    color: "#DC2626",
  },
  ruleItem: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  ruleText: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
    flex: 1,
    fontWeight: "500",
  },
});
