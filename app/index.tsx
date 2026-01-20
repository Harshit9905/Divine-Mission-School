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
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

/* ================= MENU ================= */
const menu = [
  { title: "Academic Calendar", icon: "calendar-outline" },
  { title: "Time Table", icon: "time-outline" },
  { title: "Attendance", icon: "checkmark-done-outline" },
  { title: "Transport", icon: "bus-outline" },
  { title: "Exam Schedule", icon: "clipboard-outline" },
  { title: "Results", icon: "document-text-outline" },
  { title: "Fees", icon: "wallet-outline" },
  { title: "Feedback", icon: "chatbubble-outline" },
  { title: "Notifications", icon: "notifications-outline" },
  { title: "Leave", icon: "home-outline" },
  { title: "School Shop", icon: "cart-outline" },
];

/* ================= STATS ================= */
const stats = [
  {
    title: "Attendance",
    value: "92%",
    icon: "checkmark-done-outline",
    color: "#16A34A",
    route: "/student/attendance",
  },
  {
    title: "Homework",
    value: "2 Pending",
    icon: "book-outline",
    color: "#EA580C",
    route: "/student/homework",
  },
  {
    title: "Fees Due",
    value: "₹2,000",
    icon: "wallet-outline",
    color: "#DC2626",
    route: "/student/fees",
  },
  {
    title: "Next Exam",
    value: "25 Jan",
    icon: "clipboard-outline",
    color: "#2563EB",
    route: "/student/exams",
  },
];

export default function StudentDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HEADER ================= */}
        <View
          style={[
            styles.header,
            { paddingTop: insets.top + 12 },
          ]}
        >
          {/* LEFT */}
          <View style={styles.leftBox}>
            <Image
              source={require("../../assets/harshit.jpg")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.studentName}>
                Harshit Raj
              </Text>
              <Text style={styles.studentSub}>
                Class 10 • Sec A • Roll 17
              </Text>
            </View>
          </View>

          {/* RIGHT */}
          <View style={styles.rightBox}>
            <Image
              source={require("../../assets/school_logo.png")}
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

        <View style={styles.statsRow}>
          {stats.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.statCard}
              activeOpacity={0.85}
              onPress={() => router.push(item.route)}
            >
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: item.color },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.statValue}>
                {item.value}
              </Text>
              <Text style={styles.statTitle}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= GRID ================= */}
        <FlatList
          data={menu}
          numColumns={3}
          keyExtractor={(item) => item.title}
          scrollEnabled={false}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                item.title === "School Shop" &&
                  styles.shopCard,
              ]}
              onPress={() => {
                if (item.title === "School Shop")
                  router.push("/shop");
                if (item.title === "Attendance")
                  router.push("/student/attendance");
                if (item.title === "Fees")
                  router.push("/student/fees");
                if (item.title === "Exam Schedule")
                  router.push("/student/exams");
                if (item.title === "Academic Calendar")
                  router.push(
                    "/student/academic-calendar"
                  );
                if (item.title === "Time Table")
                  router.push("/student/timetable");
                if (item.title === "Transport")
                  router.push("/student/transport");
                if (item.title === "Results")
                  router.push("/student/results");
                if (item.title === "Feedback")
                  router.push("/student/feedback");
                if (item.title === "Notifications")
                  router.push("/notices");
                if (item.title === "Leave")
                  router.push("/student/leave");
              }}
            >
              <Ionicons
                name={item.icon as any}
                size={26}
                color={
                  item.title === "School Shop"
                    ? "#FFFFFF"
                    : "#4A4AFF"
                }
              />
              <Text
                style={[
                  styles.cardText,
                  item.title ===
                    "School Shop" && {
                    color: "#FFFFFF",
                  },
                ]}
              >
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
    backgroundColor: "#F5F6FF", // 🔥 BLACK STRIP FIX
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
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  studentName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  studentSub: {
    color: "#CBD5E1",
    fontSize: 12,
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
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    margin: "1%",
    borderRadius: 16,
    padding: 12,
    elevation: 4,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "800",
  },
  statTitle: {
    fontSize: 12,
    color: "#475569",
  },

  /* GRID */
  card: {
    flex: 1,
    margin: 8,
    height: 110,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  shopCard: {
    backgroundColor: "#4A4AFF",
  },
  cardText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#111827",
  },
});
