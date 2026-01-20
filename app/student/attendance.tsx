import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* 🔥 REAL DATA (1–19 Jan only) */
const attendanceData: Record<string, boolean> = {
  "2026-01-01": true,
  "2026-01-02": true,
  "2026-01-03": false,
  "2026-01-04": true,
  "2026-01-05": true,
  "2026-01-06": false,
  "2026-01-07": true,
  "2026-01-08": true,
  "2026-01-09": true,
  "2026-01-10": false,
  "2026-01-11": true,
  "2026-01-12": true,
  "2026-01-13": true,
  "2026-01-14": false,
  "2026-01-15": true,
  "2026-01-16": true,
  "2026-01-17": true,
  "2026-01-18": false,
  "2026-01-19": true,
};

/* 📊 SUMMARY HELPER */
const getSummary = () => {
  const days = Object.values(attendanceData);
  const present = days.filter(Boolean).length;
  const absent = days.length - present;
  const percent = Math.round((present / days.length) * 100);
  return { present, absent, percent };
};

/* 📅 MONTHS */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Attendance() {
  const router = useRouter();
  const summary = getSummary();

  const monthData = MONTHS.map((month, index) => ({
    month,
    value: index === 0 ? `${summary.percent}%` : "--",
    isCurrent: index === 0,
  }));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Attendance</Text>

          <TouchableOpacity
            onPress={() =>
              router.push("/student/attendance-calendar")
            }
          >
            <Ionicons
              name="calendar-outline"
              size={26}
              color="#020617"
            />
          </TouchableOpacity>
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryCard}>
          <Text style={styles.percent}>
            {summary.percent}%
          </Text>
          <Text style={styles.sub}>
            Current Attendance
          </Text>

          <View style={styles.row}>
            <Text style={styles.present}>
              Present: {summary.present}
            </Text>
            <Text style={styles.absent}>
              Absent: {summary.absent}
            </Text>
          </View>
        </View>

        {/* MONTH WISE */}
        <Text style={styles.section}>
          Month-wise Attendance
        </Text>

        <FlatList
          data={monthData}
          keyExtractor={(item) => item.month}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[
                styles.monthCard,
                item.isCurrent &&
                  styles.currentMonthCard,
              ]}
            >
              <Text
                style={[
                  styles.month,
                  item.isCurrent &&
                    styles.currentMonthText,
                ]}
              >
                {item.month}
              </Text>

              <Text
                style={[
                  styles.monthValue,
                  item.isCurrent &&
                    styles.currentMonthText,
                ]}
              >
                {item.value}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  summaryCard: {
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 20,
    marginVertical: 16,
  },
  percent: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sub: {
    color: "#CBD5E1",
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  present: {
    color: "#22C55E",
    fontWeight: "700",
  },
  absent: {
    color: "#EF4444",
    fontWeight: "700",
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  monthCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  currentMonthCard: {
    backgroundColor: "#020617",
  },

  month: {
    fontWeight: "700",
  },
  monthValue: {
    fontWeight: "800",
  },
  currentMonthText: {
    color: "#FFFFFF",
  },
});
