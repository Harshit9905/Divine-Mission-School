import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* DEMO DATA */
const CATEGORIES = ["Teaching", "App", "Facilities", "Buses"];
const TEACHERS = [
  "Mr. Sharma",
  "Ms. Verma",
  "Mr. Singh",
  "Mrs. Patel",
  "Mr. Khan",
  "Ms. Roy",
];

export default function Feedback() {
  const [category, setCategory] = useState("");
  const [teacher, setTeacher] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  const isValid =
    category &&
    rating > 0 &&
    message.trim().length > 0 &&
    (category !== "Teaching" || teacher);

  const submit = () => {
    if (!isValid) return;

    const newFeedback = {
      id: Date.now().toString(),
      category,
      teacher: category === "Teaching" ? teacher : "-",
      rating,
      message,
    };

    setHistory((prev) => [newFeedback, ...prev]);

    Alert.alert("Success", "Feedback submitted successfully");

    // reset form
    setCategory("");
    setTeacher("");
    setRating(0);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.sub}>All fields are mandatory</Text>

          {/* CATEGORY */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.wrap}>
            {CATEGORIES.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.chip,
                  category === c && styles.chipActive,
                ]}
                onPress={() => {
                  setCategory(c);
                  setTeacher("");
                }}
              >
                <Text
                  style={[
                    styles.chipText,
                    category === c && styles.chipTextActive,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* TEACHER */}
          {category === "Teaching" && (
            <>
              <Text style={styles.label}>Teacher</Text>
              <View style={styles.wrap}>
                {TEACHERS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.teacherChip,
                      teacher === t && styles.teacherActive,
                    ]}
                    onPress={() => setTeacher(t)}
                  >
                    <Text
                      style={[
                        styles.teacherText,
                        teacher === t &&
                          styles.teacherTextActive,
                      ]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* RATING */}
          <Text style={styles.label}>Rating</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setRating(i)}
              >
                <Ionicons
                  name={
                    i <= rating ? "star" : "star-outline"
                  }
                  size={34}
                  color="#F59E0B"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* MESSAGE */}
          <Text style={styles.label}>Feedback</Text>
          <TextInput
            placeholder="Write your feedback here..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={styles.input}
          />

          {/* SUBMIT */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              !isValid && styles.disabled,
            ]}
            onPress={submit}
            disabled={!isValid}
          >
            <Text style={styles.submitText}>
              Submit Feedback
            </Text>
          </TouchableOpacity>

          {/* HISTORY */}
          {history.length > 0 && (
            <>
              <Text style={styles.section}>
                Submitted Feedback
              </Text>

              {history.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardCat}>
                      {item.category}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={14}
                          color="#F59E0B"
                        />
                      ))}
                    </View>
                  </View>

                  {item.category === "Teaching" && (
                    <Text style={styles.teacherName}>
                      Teacher: {item.teacher}
                    </Text>
                  )}

                  <Text style={styles.msg}>
                    {item.message}
                  </Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FF" },
  container: { padding: 16, paddingBottom: 40 },

  title: { fontSize: 22, fontWeight: "800" },
  sub: { color: "#DC2626", fontSize: 12 },

  label: {
    marginTop: 14,
    marginBottom: 6,
    fontWeight: "700",
  },

  wrap: { flexDirection: "row", flexWrap: "wrap" },

  chip: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: "#4A4AFF" },
  chipText: { fontWeight: "600" },
  chipTextActive: { color: "#FFFFFF" },

  teacherChip: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  teacherActive: { backgroundColor: "#020617" },
  teacherText: { fontSize: 12 },
  teacherTextActive: { color: "#FFFFFF" },

  ratingRow: { flexDirection: "row", marginBottom: 6 },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    height: 120,
    textAlignVertical: "top",
    elevation: 3,
  },

  submitBtn: {
    backgroundColor: "#4A4AFF",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  disabled: { opacity: 0.4 },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    elevation: 3,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardCat: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4A4AFF",
  },
  teacherName: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 4,
  },
  msg: {
    fontSize: 13,
    color: "#334155",
  },
});
