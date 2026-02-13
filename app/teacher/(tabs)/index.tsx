import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

/* ================= HOMEWORK DATA ================= */

const homeworkData = [
  {
    id: 1,
    title: "Chapter 5 Exercise",
    class: "10-A",
    subject: "Mathematics",
    dueDate: "26 Jan 2026",
    description: "Complete exercises 5.1 to 5.5",
    submitted: 6,
    total: 8,
    submissions: [
      { studentId: 1, name: "Harshit Raj", status: "Submitted", date: "25 Jan 2026 10:30 AM", files: ["Chapter5_Exercises.pdf", "Notes.docx"] },
      { studentId: 2, name: "Priya Singh", status: "Submitted", date: "25 Jan 2026 09:15 AM", files: ["Solution.pdf"] },
      { studentId: 3, name: "Arjun Kumar", status: "Not Submitted", date: null, files: [] },
      { studentId: 4, name: "Ananya Patel", status: "Submitted", date: "24 Jan 2026 02:00 PM", files: ["Chapter5.pdf", "Rough_Work.jpg"] },
      { studentId: 5, name: "Rahul Verma", status: "Submitted", date: "25 Jan 2026 11:45 AM", files: ["Ex5_Answer.pdf"] },
      { studentId: 6, name: "Neha Singh", status: "Submitted", date: "25 Jan 2026 08:20 AM", files: ["Homework.pdf"] },
      { studentId: 7, name: "Vikram Joshi", status: "Not Submitted", date: null, files: [] },
      { studentId: 8, name: "Aisha Khan", status: "Submitted", date: "25 Jan 2026 10:00 AM", files: ["Complete.pdf"] },
    ],
  },
  {
    id: 2,
    title: "Algebra Problems",
    class: "10-A",
    subject: "Mathematics",
    dueDate: "28 Jan 2026",
    description: "Solve 10 algebra problems from worksheet",
    submitted: 5,
    total: 8,
    submissions: [
      { studentId: 1, name: "Harshit Raj", status: "Submitted", date: "25 Jan 2026 03:30 PM", files: ["Algebra_Solutions.pdf"] },
      { studentId: 2, name: "Priya Singh", status: "Submitted", date: "25 Jan 2026 04:00 PM", files: ["Algebra_Work.docx", "Answers.pdf"] },
      { studentId: 3, name: "Arjun Kumar", status: "Not Submitted", date: null, files: [] },
      { studentId: 4, name: "Ananya Patel", status: "Not Submitted", date: null, files: [] },
      { studentId: 5, name: "Rahul Verma", status: "Submitted", date: "24 Jan 2026 05:20 PM", files: ["Problems_Solved.pdf"] },
      { studentId: 6, name: "Neha Singh", status: "Submitted", date: "25 Jan 2026 02:15 PM", files: ["Algebra.pdf"] },
      { studentId: 7, name: "Vikram Joshi", status: "Not Submitted", date: null, files: [] },
      { studentId: 8, name: "Aisha Khan", status: "Submitted", date: "25 Jan 2026 05:45 PM", files: ["Solutions.pdf"] },
    ],
  },
  {
    id: 4,
    title: "English Essay",
    class: "10-B",
    subject: "English",
    dueDate: "27 Jan 2026",
    description: "Write an essay on 'My Favourite Teacher'",
    submitted: 6,
    total: 8,
    submissions: [
      { studentId: 9, name: "Simran Sharma", status: "Submitted", date: "25 Jan 2026 02:30 PM", files: ["Essay.pdf"] },
      { studentId: 10, name: "Aarav Singh", status: "Submitted", date: "25 Jan 2026 01:15 PM", files: ["Teacher_Essay.docx"] },
      { studentId: 11, name: "Diya Patel", status: "Submitted", date: "25 Jan 2026 03:45 PM", files: ["Essay_Final.pdf"] },
      { studentId: 12, name: "Rohan Kumar", status: "Not Submitted", date: null, files: [] },
      { studentId: 13, name: "Sneha Verma", status: "Submitted", date: "24 Jan 2026 06:00 PM", files: ["My_Essay.pdf"] },
      { studentId: 14, name: "Abhi Joshi", status: "Not Submitted", date: null, files: [] },
      { studentId: 15, name: "Kriti Khan", status: "Submitted", date: "25 Jan 2026 04:30 PM", files: ["Essay.docx"] },
      { studentId: 16, name: "Nayan Desai", status: "Submitted", date: "25 Jan 2026 12:00 PM", files: ["Teacher_Essay.pdf"] },
    ],
  },
  {
    id: 5,
    title: "Organic Chemistry",
    class: "11-A",
    subject: "Chemistry",
    dueDate: "26 Jan 2026",
    description: "Study reactions of alkenes and alkynes",
    submitted: 7,
    total: 8,
    submissions: [
      { studentId: 17, name: "Aryan Malhotra", status: "Submitted", date: "25 Jan 2026 11:30 AM", files: ["Reactions.pdf"] },
      { studentId: 18, name: "Pooja Iyer", status: "Submitted", date: "25 Jan 2026 10:15 AM", files: ["Notes.docx", "Summary.pdf"] },
      { studentId: 19, name: "Kartik Yadav", status: "Not Submitted", date: null, files: [] },
      { studentId: 20, name: "Ananya Mishra", status: "Submitted", date: "25 Jan 2026 09:45 AM", files: ["Chemistry_Work.pdf"] },
      { studentId: 21, name: "Vihaan Kapoor", status: "Submitted", date: "24 Jan 2026 07:20 PM", files: ["Organic_Notes.pdf"] },
      { studentId: 22, name: "Riya Gupta", status: "Submitted", date: "25 Jan 2026 03:30 PM", files: ["Reactions_Study.pdf"] },
      { studentId: 23, name: "Siddharth Nair", status: "Submitted", date: "25 Jan 2026 02:00 PM", files: ["Study_Material.pdf"] },
      { studentId: 24, name: "Zara Ahmed", status: "Submitted", date: "25 Jan 2026 05:15 PM", files: ["Chemistry.pdf"] },
    ],
  },
];

/* ================= QUICK ACCESS MENU ================= */

const menu = [
  { title: "Mark Attendance", icon: "checkmark-outline" },
  { title: "Upload Results", icon: "cloud-upload-outline" },
  { title: "View Students", icon: "people-outline" },
  { title: "Send Notification", icon: "notifications-outline" },
  { title: "Homework", icon: "document-text-outline" },
  { title: "View Timetable", icon: "calendar-outline" },
  { title: "PTM Schedule", icon: "people-circle-outline" },
];

export default function TeacherDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Calculate pending submissions (students who haven't submitted)
  const pendingCount = homeworkData.reduce((total, hw) => {
    const notSubmitted = hw.submissions.filter((s) => s.status === "Not Submitted").length;
    return total + notSubmitted;
  }, 0);

  const stats = [
    {
      title: "Classes",
      value: "5",
      icon: "layers-outline",
      color: "#4A4AFF",
    },
    {
      title: "Students",
      value: "24",
      icon: "people-outline",
      color: "#EA580C",
    },
    {
      title: "Assignments",
      value: "12",
      icon: "document-outline",
      color: "#16A34A",
    },
    {
      title: "Pending",
      value: pendingCount.toString(),
      icon: "alert-circle-outline",
      color: "#DC2626",
    },
  ];

  const handleMenuPress = (title: string) => {
    switch (title) {
      case "Mark Attendance":
        router.push("/teacher/(tabs)/attendance");
        break;
      case "Upload Results":
        router.push("/teacher/(tabs)/upload-results");
        break;
      case "View Students":
        router.push("/teacher/(tabs)/students");
        break;
      case "Send Notification":
        router.push("/teacher/(tabs)/send-notification");
        break;
      case "Homework":
        router.push("/teacher/(tabs)/homework");
        break;
      case "View Timetable":
        router.push("/teacher/(tabs)/view-timetable");
        break;
      case "PTM Schedule":
        router.push("../teacher/(tabs)/ptm-schedule");
        break;
      default:
        break;
    }
  };

  const handleStatPress = (title: string) => {
    switch (title) {
      case "Classes":
        router.push("/teacher/(tabs)/classes");
        break;
      case "Students":
        router.push("/teacher/(tabs)/students");
        break;
      case "Assignments":
        router.push("/teacher/(tabs)/assignments");
        break;
      case "Pending":
        router.push("/teacher/(tabs)/homework");
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["right", "bottom", "left"]}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HEADER ================= */}

        <View
          style={[
            styles.header,
            { paddingTop: insets.top + 12 },
          ]}
        >
          <View style={styles.leftBox}>
            <Image
              source={require("../../../assets/teacher.avif")}
              style={styles.teacherImage}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.teacherName}>
                Mr. Rajesh Kumar
              </Text>
              <Text style={styles.teacherSub}>
                Mathematics Department
              </Text>
            </View>
          </View>

          <View style={styles.rightBox}>
            <Image
              source={require("../../../assets/school_logo.png")}
              style={styles.schoolLogo}
              resizeMode="contain"
            />
            <Text style={styles.schoolName}>
              Divine Mission School
            </Text>
          </View>
        </View>

        {/* ================= OVERVIEW ================= */}

        <Text style={styles.sectionTitle}>
          Overview
        </Text>

        <View style={styles.statsGrid}>
          {stats.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.statCard,
                { borderLeftColor: item.color },
              ]}
              onPress={() => handleStatPress(item.title)}
            >
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: item.color },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.statValue}>
                {item.value}
              </Text>
              <Text style={styles.statLabel}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= QUICK ACCESS ================= */}

        <Text style={styles.sectionTitle}>
          Quick Access
        </Text>

        <FlatList
          data={menu}
          numColumns={2}
          keyExtractor={(item) => item.title}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuCard}
              activeOpacity={0.85}
              onPress={() => handleMenuPress(item.title)}
            >
              <Ionicons
                name={item.icon as any}
                size={28}
                color="#4A4AFF"
              />
              <Text style={styles.menuText}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  /* HEADER */

  header: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  leftBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
  },

  teacherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },

  teacherName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  teacherSub: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 2,
  },

  rightBox: {
    alignItems: "flex-end",
    maxWidth: 130,
  },

  schoolLogo: {
    width: 44,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 4,
  },

  schoolName: {
    color: "#E5E7EB",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "right",
  },

  /* OVERVIEW */

  sectionTitle: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    marginTop: 12,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    margin: "1%",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },

  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#020617",
  },

  statLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  /* MENU */

  menuCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    margin: "1%",
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    marginTop: 12,
    minHeight: 100,
  },

  menuText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#020617",
    textAlign: "center",
    marginTop: 8,
  },
});
