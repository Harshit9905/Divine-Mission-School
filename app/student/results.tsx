import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SubjectMark = {
  subject: string;
  marks: number;
  total: number;
};

type TermKey = "term1" | "term2" | "mid" | "final";

const RESULTS: Record<
  TermKey,
  { name: string; marks: SubjectMark[] | null }
> = {
  term1: {
    name: "1st Term",
    marks: [
      { subject: "Maths", marks: 78, total: 100 },
      { subject: "English", marks: 72, total: 100 },
      { subject: "Science", marks: 81, total: 100 },
      { subject: "SST", marks: 75, total: 100 },
      { subject: "Hindi", marks: 70, total: 100 },
      { subject: "Art", marks: 88, total: 100 },
    ],
  },
  term2: {
    name: "2nd Term",
    marks: null,
  },
  mid: {
    name: "Mid Term",
    marks: null,
  },
  final: {
    name: "Final Exam",
    marks: null,
  },
};

const calculateSummary = (data: SubjectMark[]) => {
  const obtained = data.reduce(
    (s, i) => s + i.marks,
    0
  );
  const total = data.reduce(
    (s, i) => s + i.total,
    0
  );
  const percent = Math.round(
    (obtained / total) * 100
  );

  let grade = "C";
  if (percent >= 90) grade = "A+";
  else if (percent >= 80) grade = "A";
  else if (percent >= 70) grade = "B";

  return { obtained, total, percent, grade };
};

export default function Results() {
  const [term, setTerm] =
    useState<TermKey>("term1");

  const current = RESULTS[term];
  const hasResult = current.marks !== null;

  const summary = hasResult
    ? calculateSummary(current.marks!)
    : null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* TITLE */}
        <Text style={styles.title}>
          Results
        </Text>

        {/* TERM SWITCHER */}
        <View style={styles.tabs}>
          {(Object.keys(RESULTS) as TermKey[]).map(
            (key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.tab,
                  term === key &&
                    styles.activeTab,
                ]}
                onPress={() =>
                  setTerm(key)
                }
              >
                <Text
                  style={[
                    styles.tabText,
                    term === key &&
                      styles.activeTabText,
                  ]}
                >
                  {RESULTS[key].name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* RESULT CONTENT */}
        {!hasResult ? (
          <View style={styles.blankBox}>
            <Text style={styles.blankTitle}>
              Result Not Published
            </Text>
            <Text style={styles.blankSub}>
              Please check back later
            </Text>
          </View>
        ) : (
          <>
            {/* SUMMARY */}
            <View style={styles.summary}>
              <View>
                <Text style={styles.percent}>
                  {summary!.percent}%
                </Text>
                <Text style={styles.sub}>
                  Overall Percentage
                </Text>
              </View>

              <View style={styles.rightSummary}>
                <Text style={styles.grade}>
                  Grade: {summary!.grade}
                </Text>
                <Text style={styles.total}>
                  {summary!.obtained} /{" "}
                  {summary!.total}
                </Text>
              </View>
            </View>

            {/* SUBJECT MARKS */}
            <FlatList
              data={current.marks!}
              keyExtractor={(i) => i.subject}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.subject}>
                    {item.subject}
                  </Text>
                  <Text style={styles.marks}>
                    {item.marks} /{" "}
                    {item.total}
                  </Text>
                </View>
              )}
            />
          </>
        )}
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

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  tabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  activeTab: {
    backgroundColor: "#4A4AFF",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  activeTabText: {
    color: "#FFFFFF",
  },

  summary: {
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  percent: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  sub: {
    color: "#CBD5E1",
    marginTop: 4,
  },

  rightSummary: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  grade: {
    color: "#22C55E",
    fontWeight: "800",
    fontSize: 16,
  },
  total: {
    color: "#E5E7EB",
    marginTop: 4,
    fontWeight: "600",
  },

  blankBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginTop: 40,
    elevation: 3,
  },
  blankTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  blankSub: {
    marginTop: 6,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subject: {
    fontWeight: "700",
    fontSize: 14,
  },
  marks: {
    fontWeight: "800",
    color: "#4A4AFF",
  },
});
