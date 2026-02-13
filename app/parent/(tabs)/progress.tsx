import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const childAnalytics = {
  studentName: "Harshit Raj",
  class: "10-A",
  roll: 1,
  overallGrade: "A+",
  gpa: 9.2,
  subjects: [
    { name: "Mathematics", marks: 95, grade: "A+", trend: "↑" },
    { name: "English", marks: 88, grade: "A", trend: "→" },
    { name: "Science", marks: 92, grade: "A+", trend: "↑" },
    { name: "Social Studies", marks: 90, grade: "A+", trend: "↑" },
    { name: "Hindi", marks: 85, grade: "A", trend: "→" },
  ],
  attendance: {
    present: 42,
    absent: 2,
    leave: 1,
    percentage: 92,
  },
  homeworkStats: {
    submitted: 28,
    pending: 2,
    submissionRate: 93,
  },
  behaviorReport: {
    discipline: "Excellent",
    participation: "Very Good",
    punctuality: "Excellent",
  },
};

export default function Progress() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Child Progress</Text>
          <Text style={styles.subtitle}>{childAnalytics.studentName} • {childAnalytics.class}</Text>
        </View>

        {/* OVERALL PERFORMANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.card}>
            <View style={styles.gradeContainer}>
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeText}>{childAnalytics.overallGrade}</Text>
              </View>
              <View>
                <Text style={styles.gpaLabel}>GPA</Text>
                <Text style={styles.gpaValue}>{childAnalytics.gpa}/10</Text>
              </View>
            </View>
            <Text style={styles.performanceText}>
              Excellent performance! Keep it up! 🌟
            </Text>
          </View>
        </View>

        {/* SUBJECT WISE PERFORMANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject-wise Performance</Text>
          <View style={styles.card}>
            {childAnalytics.subjects.map((subject, idx) => (
              <View key={idx} style={styles.subjectRow}>
                <View style={styles.subjectLeft}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <View style={styles.marksContainer}>
                    <View style={styles.marksBar}>
                      <View
                        style={[
                          styles.marksProgress,
                          { width: `${subject.marks}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.marksText}>{subject.marks}%</Text>
                  </View>
                </View>
                <View style={styles.subjectRight}>
                  <View style={styles.gradeBadgeSmall}>
                    <Text style={styles.gradeSmall}>{subject.grade}</Text>
                  </View>
                  <Text style={styles.trend}>{subject.trend}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ATTENDANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance Overview</Text>
          <View style={styles.card}>
            <View style={styles.attendanceStats}>
              <View style={styles.attendanceItem}>
                <Ionicons name="checkmark-circle" size={24} color="#16A34A" />
                <Text style={styles.statValue}>{childAnalytics.attendance.present}</Text>
                <Text style={styles.statLabel}>Present</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.attendanceItem}>
                <Ionicons name="close-circle" size={24} color="#DC2626" />
                <Text style={styles.statValue}>{childAnalytics.attendance.absent}</Text>
                <Text style={styles.statLabel}>Absent</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.attendanceItem}>
                <Ionicons name="alert-circle" size={24} color="#EA580C" />
                <Text style={styles.statValue}>{childAnalytics.attendance.leave}</Text>
                <Text style={styles.statLabel}>Leave</Text>
              </View>
            </View>
            <View style={styles.attendanceProgress}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${childAnalytics.attendance.percentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.percentageText}>
                {childAnalytics.attendance.percentage}% Attendance
              </Text>
            </View>
          </View>
        </View>

        {/* HOMEWORK STATUS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Homework Status</Text>
          <View style={styles.card}>
            <View style={styles.homeworkStats}>
              <View style={styles.hwItem}>
                <Text style={styles.hwNumber}>{childAnalytics.homeworkStats.submitted}</Text>
                <Text style={styles.hwLabel}>Submitted</Text>
              </View>
              <View style={styles.hwDivider} />
              <View style={styles.hwItem}>
                <Text style={[styles.hwNumber, { color: "#EA580C" }]}>
                  {childAnalytics.homeworkStats.pending}
                </Text>
                <Text style={styles.hwLabel}>Pending</Text>
              </View>
            </View>
            <View style={styles.submissionRate}>
              <Text style={styles.rateLabel}>Submission Rate</Text>
              <Text style={styles.rateValue}>{childAnalytics.homeworkStats.submissionRate}%</Text>
            </View>
          </View>
        </View>

        {/* BEHAVIOR REPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior Report</Text>
          <View style={styles.card}>
            <View style={styles.behaviorRow}>
              <Text style={styles.behaviorLabel}>Discipline</Text>
              <View style={styles.behaviorBadge}>
                <Text style={styles.behaviorValue}>
                  {childAnalytics.behaviorReport.discipline}
                </Text>
              </View>
            </View>
            <View style={styles.behaviorRow}>
              <Text style={styles.behaviorLabel}>Participation</Text>
              <View style={styles.behaviorBadge}>
                <Text style={styles.behaviorValue}>
                  {childAnalytics.behaviorReport.participation}
                </Text>
              </View>
            </View>
            <View style={styles.behaviorRow}>
              <Text style={styles.behaviorLabel}>Punctuality</Text>
              <View style={styles.behaviorBadge}>
                <Text style={styles.behaviorValue}>
                  {childAnalytics.behaviorReport.punctuality}
                </Text>
              </View>
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
  gradeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 12,
  },
  gradeBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#4A4AFF",
  },
  gradeText: {
    fontSize: 40,
    fontWeight: "800",
    color: "#4A4AFF",
  },
  gpaLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },
  gpaValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#020617",
    marginTop: 4,
  },
  performanceText: {
    fontSize: 13,
    color: "#64748B",
    fontStyle: "italic",
  },
  subjectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  subjectLeft: {
    flex: 1,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 8,
  },
  marksContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  marksBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  marksProgress: {
    height: "100%",
    backgroundColor: "#4A4AFF",
  },
  marksText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
    minWidth: 35,
  },
  subjectRight: {
    alignItems: "center",
    marginLeft: 12,
  },
  gradeBadgeSmall: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 4,
  },
  gradeSmall: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A4AFF",
  },
  trend: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16A34A",
  },
  attendanceStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  attendanceItem: {
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#F1F5F9",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  attendanceProgress: {
    gap: 8,
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
  percentageText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
  },
  homeworkStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  hwItem: {
    alignItems: "center",
  },
  hwNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#16A34A",
  },
  hwLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  hwDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#F1F5F9",
  },
  submissionRate: {
    alignItems: "center",
    gap: 4,
  },
  rateLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  rateValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16A34A",
  },
  behaviorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  behaviorLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#020617",
  },
  behaviorBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  behaviorValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16A34A",
  },
});
