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

const menu = [
  { title: "Child Progress", icon: "stats-chart-outline" },
  { title: "Attendance Overview", icon: "checkmark-done-outline" },
  { title: "Homework Status", icon: "document-text-outline" },
  { title: "Grades & Results", icon: "school-outline" },
  { title: "Notifications", icon: "notifications-outline" },
  { title: "Child Profile", icon: "person-circle-outline" },
];

const stats = [
  {
    title: "Child Name",
    value: "Harshit Raj",
    icon: "person-outline",
    color: "#4A4AFF",
  },
  {
    title: "Class",
    value: "10-A",
    icon: "layers-outline",
    color: "#EA580C",
  },
  {
    title: "Attendance",
    value: "92%",
    icon: "checkmark-circle-outline",
    color: "#16A34A",
  },
  {
    title: "Performance",
    value: "A+ Grade",
    icon: "trophy-outline",
    color: "#DC2626",
  },
];

export default function ParentDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleMenuPress = (title: string) => {
    switch (title) {
      case "Child Progress":
        router.push("./progress" as any);
        break;
      case "Attendance Overview":
        router.push("./attendance" as any);
        break;
      case "Homework Status":
        router.push("./homework" as any);
        break;
      case "Grades & Results":
        router.push("./progress" as any);
        break;
      case "Notifications":
        router.push("./notifications" as any);
        break;
      case "Child Profile":
        router.push("./child-profile" as any);
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
            { paddingTop: insets.top + 8 },
          ]}
        >
          <View style={styles.leftBox}>
            <Image
              source={require("../../../assets/harshit.jpg")}
              style={styles.parentImage}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.parentName}>
                Rajeev Kumar Pandey
              </Text>
              <Text style={styles.parentSub}>
                Parent of Harshit Raj
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
          Child Overview
        </Text>

        <View style={styles.statsGrid}>
          {stats.map((item, idx) => (
            <TouchableOpacity
              key={idx}
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
          contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuCard}
              activeOpacity={0.8}
              onPress={() => handleMenuPress(item.title)}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={32}
                  color="#4A4AFF"
                />
              </View>
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

  parentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },

  parentName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  parentSub: {
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

  menuCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    minHeight: 110,
  },

  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  menuText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#020617",
    textAlign: "center",
    marginTop: 8,
  },
});
