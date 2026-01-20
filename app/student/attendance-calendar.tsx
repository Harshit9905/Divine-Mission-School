import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* SAME DATA SOURCE */
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

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function AttendanceCalendar() {
  const [month, setMonth] = useState(0); // January

  const daysInMonth = 31;
  const dates = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* MONTH SWITCH */}
        <View style={styles.monthHeader}>
          <TouchableOpacity
            onPress={() =>
              setMonth((m) => Math.max(m - 1, 0))
            }
          >
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>

          <Text style={styles.monthText}>
            {MONTHS[month]} 2026
          </Text>

          <TouchableOpacity
            onPress={() =>
              setMonth((m) => Math.min(m + 1, 11))
            }
          >
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>
        </View>

        {/* CALENDAR GRID */}
        <View style={styles.grid}>
          {dates.map((d) => {
            const key = `2026-${String(
              month + 1
            ).padStart(2, "0")}-${String(d).padStart(
              2,
              "0"
            )}`;

            const status = attendanceData[key];

            return (
              <View
                key={d}
                style={[
                  styles.dateBox,
                  status === true && styles.present,
                  status === false && styles.absent,
                ]}
              >
                <Text style={styles.dateText}>{d}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.legend}>
          🟢 Present 🔴 Absent ⚪ No data
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FF" },
  container: { flex: 1, padding: 16 },

  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthText: { fontSize: 18, fontWeight: "700" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateBox: {
    width: "14%",
    aspectRatio: 1,
    marginVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  present: { backgroundColor: "#22C55E" },
  absent: { backgroundColor: "#EF4444" },

  dateText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  legend: {
    marginTop: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "#475569",
  },
});
