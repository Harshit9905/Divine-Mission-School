import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Exam = {
  subject: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed";
};

type TermGroup = {
  term: string;
  exams: Exam[];
};

const EXAM_SCHEDULE: TermGroup[] = [
  {
    term: "1st Term",
    exams: [
      {
        subject: "Maths",
        date: "10 Mar 2026",
        time: "9:00 AM – 12:00 PM",
        status: "Completed",
      },
      {
        subject: "English",
        date: "12 Mar 2026",
        time: "9:00 AM – 12:00 PM",
        status: "Completed",
      },
      {
        subject: "Science",
        date: "14 Mar 2026",
        time: "9:00 AM – 12:00 PM",
        status: "Completed",
      },
    ],
  },
  {
    term: "2nd Term",
    exams: [
      {
        subject: "SST",
        date: "20 Aug 2026",
        time: "9:00 AM – 12:00 PM",
        status: "Upcoming",
      },
      {
        subject: "Hindi",
        date: "22 Aug 2026",
        time: "9:00 AM – 12:00 PM",
        status: "Upcoming",
      },
    ],
  },
  {
    term: "Mid Term",
    exams: [
      {
        subject: "Maths",
        date: "15 Jan 2027",
        time: "9:00 AM – 12:00 PM",
        status: "Upcoming",
      },
      {
        subject: "English",
        date: "17 Jan 2027",
        time: "9:00 AM – 12:00 PM",
        status: "Upcoming",
      },
    ],
  },
  {
    term: "Final",
    exams: [
      {
        subject: "Maths",
        date: "20 Apr 2027",
        time: "9:00 AM – 12:00 PM",
        status: "Upcoming",
      },
      {
        subject: "Science",
        date: "22 Apr 2027",
        time: "9:00 AM – 12:00 PM",
        status: "Upcoming",
      },
    ],
  },
];

export default function ExamSchedule() {
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={EXAM_SCHEDULE}
        keyExtractor={(item) => item.term}
        ListHeaderComponent={
          <Text style={styles.title}>
            Exam Schedule
          </Text>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            {/* TERM HEADER */}
            <Text style={styles.termHeader}>
              {item.term}
            </Text>

            {item.exams.map((exam, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.subject}>
                    {exam.subject}
                  </Text>
                  <Text
                    style={[
                      styles.status,
                      exam.status === "Upcoming"
                        ? styles.upcoming
                        : styles.completed,
                    ]}
                  >
                    {exam.status}
                  </Text>
                </View>

                <Text style={styles.info}>
                  📅 {exam.date}
                </Text>
                <Text style={styles.info}>
                  ⏰ {exam.time}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  termHeader: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 6,
    color: "#020617",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subject: {
    fontSize: 15,
    fontWeight: "800",
  },

  info: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },

  status: {
    fontSize: 12,
    fontWeight: "800",
  },

  upcoming: {
    color: "#2563EB",
  },

  completed: {
    color: "#16A34A",
  },
});
