import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DAYS = ["Time", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIMETABLE = [
  {
    time: "09:00 - 09:45",
    Mon: "Maths",
    Tue: "English",
    Wed: "Science",
    Thu: "Maths",
    Fri: "Hindi",
    Sat: "Art",
  },
  {
    time: "09:45 - 10:30",
    Mon: "English",
    Tue: "Maths",
    Wed: "Hindi",
    Thu: "Science",
    Fri: "SST",
    Sat: "Maths",
  },
  {
    time: "10:30 - 11:15",
    Mon: "Science",
    Tue: "SST",
    Wed: "Maths",
    Thu: "English",
    Fri: "Art",
    Sat: "Hindi",
  },
  {
    time: "11:15 - 11:45",
    lunch: true,
  },
  {
    time: "11:45 - 12:30",
    Mon: "Hindi",
    Tue: "Science",
    Wed: "English",
    Thu: "SST",
    Fri: "Maths",
    Sat: "Science",
  },
  {
    time: "12:30 - 01:15",
    Mon: "SST",
    Tue: "Hindi",
    Wed: "Art",
    Thu: "Maths",
    Fri: "English",
    Sat: "SST",
  },
  {
    time: "01:15 - 02:00",
    Mon: "Art",
    Tue: "English",
    Wed: "SST",
    Thu: "Hindi",
    Fri: "Science",
    Sat: "Maths",
  },
];

export default function TimeTable() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View>
          {/* HEADER ROW */}
          <View style={styles.row}>
            {DAYS.map((day) => (
              <View key={day} style={styles.headerCell}>
                <Text style={styles.headerText}>
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* TABLE BODY */}
          {TIMETABLE.map((slot, index) => {
            if (slot.lunch) {
              return (
                <View
                  key={index}
                  style={styles.lunchRow}
                >
                  <Text style={styles.lunchText}>
                    🍱 Lunch Break ({slot.time})
                  </Text>
                </View>
              );
            }

            return (
              <View key={index} style={styles.row}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>
                    {slot.time}
                  </Text>
                </View>

                {["Mon","Tue","Wed","Thu","Fri","Sat"].map(
                  (day) => (
                    <View
                      key={day}
                      style={styles.cell}
                    >
                      <Text style={styles.cellText}>
                        {(slot as any)[day]}
                      </Text>
                    </View>
                  )
                )}
              </View>
            );
          })}
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

  row: {
    flexDirection: "row",
  },

  headerCell: {
    width: 100,
    padding: 10,
    backgroundColor: "#020617",
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },

  headerText: {
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },

  timeCell: {
    width: 100,
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderWidth: 0.5,
    borderColor: "#CBD5E1",
  },

  timeText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 12,
  },

  cell: {
    width: 100,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },

  cellText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },

  lunchRow: {
    backgroundColor: "#FEF3C7",
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#FACC15",
    alignItems: "center",
  },

  lunchText: {
    fontWeight: "800",
    color: "#92400E",
  },
});
