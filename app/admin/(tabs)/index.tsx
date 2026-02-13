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

const stats = [
  {
    title: "Total Students",
    value: "450",
    icon: "school-outline",
    color: "#4A4AFF",
    action: "students",
  },
  {
    title: "Total Teachers",
    value: "25",
    icon: "person-outline",
    color: "#EA580C",
    action: "teachers",
  },
  {
    title: "Parents Registered",
    value: "380",
    icon: "people-outline",
    color: "#16A34A",
    action: "parents",
  },
  {
    title: "Classes",
    value: "12",
    icon: "layers-outline",
    color: "#DC2626",
    action: "classes",
  },
];

const quickActions = [
  { title: "Add Student", icon: "person-add-outline" },
  { title: "Staffs", icon: "briefcase-outline" },
  { title: "Leave Management", icon: "calendar-outline" },
  { title: "View Buses", icon: "bus-outline" },
  { title: "Manage Fees", icon: "cash-outline" },
  { title: "Shop Orders", icon: "cart-outline" },
  { title: "Settings", icon: "settings-outline" },
];

export default function AdminDashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleStatClick = (action: string) => {
    if (action === "students") {
      router.push("./students" as any);
    } else if (action === "teachers") {
      router.push("/admin/staffs" as any);
    } else if (action === "parents") {
      router.push("/admin/parents" as any);
    } else if (action === "classes") {
      router.push("/admin/classes" as any);
    }
  };

  const handleQuickAction = (title: string) => {
    if (title === "Add Student") {
      router.push("/admin/add-student" as any);
    } else if (title === "Staffs") {
      router.push("/admin/staffs" as any);
    } else if (title === "Leave Management") {
      router.push("/admin/leaves" as any);
    } else if (title === "View Buses") {
      router.push("/admin/buses" as any);
    } else if (title === "Manage Fees") {
      router.push("/admin/fees" as any);
    } else if (title === "Shop Orders") {
      router.push("/admin/shop" as any);
    } else if (title === "Settings") {
      router.push("/admin/settings" as any);
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
            { paddingTop: insets.top + 8 },
          ]}
        >
          <View style={styles.leftBox}>
            <Image
              source={require("../../../assets/school_logo.png")}
              style={styles.logo}
            />
            <View>
              <Text style={styles.adminName}>Admin Panel</Text>
              <Text style={styles.adminSub}>Divine Mission School</Text>
            </View>
          </View>

          <View style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>

        {/* ================= STATS GRID ================= */}
        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.statsGrid}>
          {stats.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleStatClick(item.action)}
              style={[
                styles.statCard,
                { borderLeftColor: item.color },
              ]}
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
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= QUICK ACTIONS ================= */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <FlatList
          data={quickActions}
          numColumns={2}
          keyExtractor={(item) => item.title}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => handleQuickAction(item.title)}>
              <View style={styles.actionIconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={32}
                  color="#4A4AFF"
                />
              </View>
              <Text style={styles.actionText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        {/* ================= RECENT ACTIVITY ================= */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>New Student Enrolled</Text>
              <Text style={styles.activityTime}>5 minutes ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Announcement Posted</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>Report Generated</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

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

  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },

  adminAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4A4AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  adminName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  adminSub: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 2,
  },

  notificationIcon: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#DC2626",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  sectionTitle: {
    marginTop: 12,
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

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    minHeight: 110,
  },

  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#020617",
    textAlign: "center",
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4A4AFF",
    marginRight: 12,
  },

  activityTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#020617",
  },

  activityTime: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
});
