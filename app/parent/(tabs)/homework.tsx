import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const childHomeworkData = {
  studentName: "Harshit Raj",
  class: "10-A",
  submissions: [
    {
      id: 1,
      subject: "Mathematics",
      title: "Chapter 5 - Quadratic Equations",
      setBy: "Ms. Priya Sharma",
      dueDate: "Mar 28, 2024",
      submittedDate: "Mar 27, 2024",
      status: "Submitted",
      marks: 18,
      totalMarks: 20,
      feedback: "Excellent work! Keep it up.",
    },
    {
      id: 2,
      subject: "English",
      title: "Essay - My Summer Vacation",
      setBy: "Mr. Rajesh Verma",
      dueDate: "Mar 29, 2024",
      submittedDate: "Mar 28, 2024",
      status: "Submitted",
      marks: 16,
      totalMarks: 20,
      feedback: "Good content, work on grammar.",
    },
    {
      id: 3,
      subject: "Science",
      title: "Lab Report - Photosynthesis",
      setBy: "Dr. Anil Kumar",
      dueDate: "Mar 30, 2024",
      submittedDate: null,
      status: "Pending",
      marks: null,
      totalMarks: 20,
      feedback: null,
    },
    {
      id: 4,
      subject: "History",
      title: "Project - Ancient Indian Dynasties",
      setBy: "Ms. Sunita Singh",
      dueDate: "Mar 31, 2024",
      submittedDate: null,
      status: "Pending",
      marks: null,
      totalMarks: 20,
      feedback: null,
    },
    {
      id: 5,
      subject: "Geography",
      title: "Map Work - Physical Features",
      setBy: "Mr. Vikas Patel",
      dueDate: "Apr 01, 2024",
      submittedDate: "Mar 28, 2024",
      status: "Submitted",
      marks: 19,
      totalMarks: 20,
      feedback: "Perfect! Neat and accurate.",
    },
    {
      id: 6,
      subject: "Computer Science",
      title: "Coding Assignment - Python",
      setBy: "Ms. Anjali Desai",
      dueDate: "Apr 02, 2024",
      submittedDate: null,
      status: "Pending",
      marks: null,
      totalMarks: 20,
      feedback: null,
    },
  ],
};

const submitted = childHomeworkData.submissions.filter(
  (hw) => hw.status === "Submitted"
);
const pending = childHomeworkData.submissions.filter(
  (hw) => hw.status === "Pending"
);

interface HomeworkCardProps {
  homework: {
    type: string;
    id: number;
    subject: string;
    title: string;
    setBy: string;
    dueDate: string;
    submittedDate: string | null;
    marks: number | null;
    totalMarks: number;
    status: string;
    feedback: string | null;
  };
  isPending: boolean;
}

const HomeworkCard = ({ homework, isPending }: HomeworkCardProps) => (
  <View style={styles.homeworkCard}>
    <View style={styles.homeworkHeader}>
      <View style={styles.subjectBadge}>
        <Text style={styles.subjectText}>{homework.subject}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          isPending ? styles.pendingBadge : styles.submittedBadge,
        ]}
      >
        <Ionicons
          name={isPending ? "alert-circle" : "checkmark-circle"}
          size={14}
          color={isPending ? "#EA580C" : "#16A34A"}
        />
        <Text
          style={[
            styles.statusBadgeText,
            isPending ? styles.pendingText : styles.submittedText,
          ]}
        >
          {homework.status}
        </Text>
      </View>
    </View>

    <Text style={styles.homeworkTitle}>{homework.title}</Text>

    <View style={styles.homeworkDetails}>
      <View style={styles.detailRow}>
        <Ionicons name="person" size={14} color="#64748B" />
        <Text style={styles.detailText}>{homework.setBy}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="calendar" size={14} color="#64748B" />
        <Text style={styles.detailText}>Due: {homework.dueDate}</Text>
      </View>
    </View>

    {!isPending && (
      <View style={styles.submissionInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Submitted</Text>
          <Text style={styles.infoValue}>{homework.submittedDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Marks</Text>
          <Text style={styles.infoValue}>
            {homework.marks}/{homework.totalMarks}
          </Text>
        </View>
      </View>
    )}

    {!isPending && homework.feedback && (
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackLabel}>Feedback</Text>
        <Text style={styles.feedbackText}>{homework.feedback}</Text>
      </View>
    )}
    {!isPending && homework.marks !== null && (
      <View style={styles.performanceBar}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(homework.marks! / homework.totalMarks) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.performanceText}>
          {((homework.marks! / homework.totalMarks) * 100).toFixed(0)}%
        </Text>
      </View>
    )}
  </View>
);

export default function Homework() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Homework Status</Text>
        <Text style={styles.subtitle}>
          {childHomeworkData.studentName} • {childHomeworkData.class}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{submitted.length}</Text>
          <Text style={styles.statLabel}>Submitted</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: "#EA580C" }]}>
            {pending.length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {((submitted.length / childHomeworkData.submissions.length) * 100).toFixed(0)}
            %
          </Text>
          <Text style={styles.statLabel}>Completion</Text>
        </View>
      </View>

      <FlatList
        scrollEnabled={true}
        data={[
          { type: "submitted", title: "Submitted" },
          ...submitted.map((hw) => ({ ...hw, type: "homework" })),
          { type: "pending", title: "Pending" },
          ...pending.map((hw) => ({ ...hw, type: "homework" })),
        ]}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }: { item: any }) => {
          if (item.type === "submitted" || item.type === "pending") {
            return <Text style={styles.sectionTitle}>{item.title}</Text>;
          }
          return (
            <HomeworkCard
              homework={item}
              isPending={item.type === "pending"}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
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
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    margin: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16A34A",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#F1F5F9",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
    marginTop: 16,
    marginBottom: 10,
  },
  homeworkCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  homeworkHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subjectBadge: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  subjectText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4A4AFF",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  submittedBadge: {
    backgroundColor: "#DCFCE7",
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  submittedText: {
    color: "#16A34A",
  },
  pendingText: {
    color: "#EA580C",
  },
  homeworkTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 10,
  },
  homeworkDetails: {
    gap: 6,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  submissionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    marginBottom: 10,
  },
  infoRow: {
    gap: 6,
  },
  infoLabel: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
  },
  feedbackContainer: {
    backgroundColor: "#F0FDF4",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#16A34A",
  },
  feedbackLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 11,
    color: "#15803D",
    lineHeight: 16,
  },
  performanceBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#16A34A",
  },
  performanceText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
    minWidth: 30,
  },
});
