import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/*
  type:
  holiday | exam | result | event | vacation
*/

const CALENDAR_DATA = [
  {
    month: "January",
    events: [
      { date: "01 Jan", title: "New Year Holiday", type: "holiday" },
      { date: "14 Jan", title: "Makar Sankranti", type: "holiday" },
      { date: "25 Jan", title: "Term–1 Unit Test – Science", type: "exam" },
      { date: "26 Jan", title: "Republic Day", type: "holiday" },
    ],
  },

  {
    month: "February",
    events: [
      { date: "05 Feb", title: "Annual Sports Day", type: "event" },
      { date: "18 Feb", title: "Term–1 Unit Test – Mathematics", type: "exam" },
      { date: "26 Feb", title: "Maha Shivratri", type: "holiday" },
    ],
  },

  {
    month: "March",
    events: [
      { date: "10 Mar", title: "Term–1 Final Exams Begin", type: "exam" },
      { date: "18 Mar", title: "Final Practical Exams", type: "exam" },
      { date: "25 Mar", title: "Term–1 Final Exams End", type: "exam" },
      { date: "28 Mar", title: "Holi", type: "holiday" },
    ],
  },

  {
    month: "April",
    events: [
      { date: "05 Apr", title: "Term–1 Final Result Declaration", type: "result" },
      { date: "10 Apr", title: "New Academic Session Begins", type: "event" },
      { date: "14 Apr", title: "Ambedkar Jayanti", type: "holiday" },
    ],
  },

  {
    month: "May",
    events: [
      { date: "01 May", title: "Labour Day", type: "holiday" },
      { date: "10 May", title: "Summer Vacation Begins", type: "vacation" },
    ],
  },

  {
    month: "June",
    events: [
      { date: "20 Jun", title: "Summer Vacation Ends", type: "vacation" },
      { date: "21 Jun", title: "Term–2 Session Begins", type: "event" },
    ],
  },

  {
    month: "July",
    events: [
      { date: "15 Jul", title: "Term–2 Unit Test – English", type: "exam" },
      { date: "29 Jul", title: "Term–2 Unit Test – Maths", type: "exam" },
    ],
  },

  {
    month: "August",
    events: [
      { date: "09 Aug", title: "Raksha Bandhan", type: "holiday" },
      { date: "15 Aug", title: "Independence Day", type: "holiday" },
      { date: "22 Aug", title: "Term–2 Mid Term Exams Begin", type: "exam" },
      { date: "30 Aug", title: "Term–2 Mid Term Exams End", type: "exam" },
    ],
  },

  {
    month: "September",
    events: [
      { date: "05 Sep", title: "Teachers’ Day Celebration", type: "event" },
      { date: "12 Sep", title: "Term–2 Result Declaration", type: "result" },
    ],
  },

  {
    month: "October",
    events: [
      { date: "02 Oct", title: "Gandhi Jayanti", type: "holiday" },
      { date: "12 Oct", title: "Dussehra", type: "holiday" },
      { date: "20 Oct", title: "Annual Function", type: "event" },
    ],
  },

  {
    month: "November",
    events: [
      { date: "01 Nov", title: "Diwali", type: "holiday" },
      { date: "14 Nov", title: "Children’s Day Celebration", type: "event" },
    ],
  },

  {
    month: "December",
    events: [
      { date: "20 Dec", title: "Winter Vacation Begins", type: "vacation" },
      { date: "25 Dec", title: "Christmas", type: "holiday" },
      { date: "31 Dec", title: "Winter Vacation Continues", type: "vacation" },
    ],
  },
];

export default function AcademicCalendar() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Academic Calendar
        </Text>

        {CALENDAR_DATA.map((monthItem) => (
          <View
            key={monthItem.month}
            style={styles.monthBlock}
          >
            <Text style={styles.monthTitle}>
              {monthItem.month}
            </Text>

            {monthItem.events.map((event, index) => (
              <View
                key={index}
                style={[
                  styles.eventCard,
                  event.type === "holiday" && styles.holiday,
                  event.type === "exam" && styles.exam,
                  event.type === "event" && styles.event,
                  event.type === "vacation" && styles.vacation,
                  event.type === "result" && styles.result,
                ]}
              >
                <Text style={styles.date}>
                  {event.date}
                </Text>
                <Text style={styles.eventTitle}>
                  {event.title}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
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
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },

  monthBlock: {
    marginBottom: 20,
  },

  monthTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  eventCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 8,
    elevation: 3,
  },

  date: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },

  eventTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },

  holiday: {
    borderLeftWidth: 6,
    borderLeftColor: "#22C55E",
  },
  exam: {
    borderLeftWidth: 6,
    borderLeftColor: "#EF4444",
  },
  event: {
    borderLeftWidth: 6,
    borderLeftColor: "#2563EB",
  },
  vacation: {
    borderLeftWidth: 6,
    borderLeftColor: "#F59E0B",
  },
  result: {
    borderLeftWidth: 6,
    borderLeftColor: "#8B5CF6",
  },
});
