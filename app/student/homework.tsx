import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Homework = {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: "pending" | "submitted";
  fileName?: string;
};

const INITIAL_HOMEWORK: Homework[] = [
  {
    id: "1",
    subject: "Maths",
    title: "Exercise 5.2",
    dueDate: "22 Jan",
    status: "pending",
  },
  {
    id: "2",
    subject: "Science",
    title: "Chapter 3 Notes",
    dueDate: "23 Jan",
    status: "pending",
  },
  {
    id: "3",
    subject: "English",
    title: "Essay on Discipline",
    dueDate: "18 Jan",
    status: "submitted",
    fileName: "essay.pdf",
  },
];

export default function Homework() {
  const [homework, setHomework] =
    useState<Homework[]>(INITIAL_HOMEWORK);

  const uploadHomework = async (id: string) => {
    const result =
      await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

    if (result.canceled) return;

    const file = result.assets[0];

    setHomework((prev) =>
      prev.map((hw) =>
        hw.id === id
          ? {
              ...hw,
              status: "submitted",
              fileName: file.name,
            }
          : hw
      )
    );

    Alert.alert(
      "Upload Successful",
      `File uploaded: ${file.name}`
    );
  };

  const pending = homework.filter(
    (h) => h.status === "pending"
  );
  const submitted = homework.filter(
    (h) => h.status === "submitted"
  );

  const renderItem = ({
    item,
  }: {
    item: Homework;
  }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.subject}>
          {item.subject}
        </Text>

        <View
          style={[
            styles.badge,
            item.status === "pending"
              ? styles.pending
              : styles.submitted,
          ]}
        >
          <Text style={styles.badgeText}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.due}>
        Due: {item.dueDate}
      </Text>

      {item.status === "submitted" &&
        item.fileName && (
          <Text style={styles.file}>
            📎 {item.fileName}
          </Text>
        )}

      {item.status === "pending" && (
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() =>
            uploadHomework(item.id)
          }
        >
          <Ionicons
            name="cloud-upload-outline"
            size={18}
            color="#FFFFFF"
          />
          <Text style={styles.uploadText}>
            Upload Homework
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.pageTitle}>
              Homework
            </Text>

            <Text style={styles.section}>
              Pending Homework
            </Text>
          </>
        }
        data={pending}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={
          <>
            <Text style={styles.section}>
              Submitted Homework
            </Text>

            <FlatList
              data={submitted}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </>
        }
        showsVerticalScrollIndicator={false}
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

  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 10,
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
    fontWeight: "800",
    fontSize: 14,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  pending: {
    backgroundColor: "#F97316",
  },

  submitted: {
    backgroundColor: "#22C55E",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  title: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  due: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748B",
  },

  file: {
    marginTop: 6,
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
  },

  uploadBtn: {
    marginTop: 10,
    backgroundColor: "#4A4AFF",
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  uploadText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
