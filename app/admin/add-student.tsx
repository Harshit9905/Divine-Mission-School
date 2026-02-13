import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddStudent() {
  const router = useRouter();
  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNo: "",
    class: "",
    email: "",
    phone: "",
    dob: "",
    bloodGroup: "",
    address: "",
    city: "",
  });

  const classes = [
    "1-A",
    "1-B",
    "2-A",
    "2-B",
    "3-A",
    "3-B",
    "4-A",
    "4-B",
    "5-A",
    "5-B",
    "10-A",
    "12-A",
  ];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleAddStudent = () => {
    if (!studentForm.name || !studentForm.rollNo || !studentForm.class) {
      Alert.alert("Error", "Please fill in all required fields (Name, Roll No, Class)");
      return;
    }

    Alert.alert("Success", `Student ${studentForm.name} added successfully!`, [
      {
        text: "OK",
        onPress: () => {
          setStudentForm({
            name: "",
            rollNo: "",
            class: "",
            email: "",
            phone: "",
            dob: "",
            bloodGroup: "",
            address: "",
            city: "",
          });
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Student</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* BASIC INFO SECTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Student Name *</Text>
              <TextInput
                placeholder="Enter full name"
                style={styles.input}
                value={studentForm.name}
                onChangeText={(text) =>
                  setStudentForm({ ...studentForm, name: text })
                }
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Roll Number *</Text>
                <TextInput
                  placeholder="Roll No."
                  style={styles.input}
                  value={studentForm.rollNo}
                  onChangeText={(text) =>
                    setStudentForm({ ...studentForm, rollNo: text })
                  }
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Class *</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() =>
                    Alert.alert("Select Class", "", [
                      ...classes.map((c) => ({
                        text: c,
                        onPress: () =>
                          setStudentForm({ ...studentForm, class: c }),
                      })),
                    ])
                  }
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      !studentForm.class && { color: "#94A3B8" },
                    ]}
                  >
                    {studentForm.class || "Select"}
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* CONTACT INFO SECTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="student@school.com"
                style={styles.input}
                value={studentForm.email}
                onChangeText={(text) =>
                  setStudentForm({ ...studentForm, email: text })
                }
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                placeholder="Enter phone number"
                style={styles.input}
                value={studentForm.phone}
                onChangeText={(text) =>
                  setStudentForm({ ...studentForm, phone: text })
                }
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                placeholder="Street address"
                style={styles.input}
                value={studentForm.address}
                onChangeText={(text) =>
                  setStudentForm({ ...studentForm, address: text })
                }
                placeholderTextColor="#94A3B8"
                multiline
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>City</Text>
              <TextInput
                placeholder="Enter city"
                style={styles.input}
                value={studentForm.city}
                onChangeText={(text) =>
                  setStudentForm({ ...studentForm, city: text })
                }
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* PERSONAL INFO SECTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                placeholder="DD/MM/YYYY"
                style={styles.input}
                value={studentForm.dob}
                onChangeText={(text) =>
                  setStudentForm({ ...studentForm, dob: text })
                }
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Blood Group</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() =>
                  Alert.alert("Select Blood Group", "", [
                    ...bloodGroups.map((bg) => ({
                      text: bg,
                      onPress: () =>
                        setStudentForm({ ...studentForm, bloodGroup: bg }),
                    })),
                  ])
                }
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !studentForm.bloodGroup && { color: "#94A3B8" },
                  ]}
                >
                  {studentForm.bloodGroup || "Select"}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleAddStudent}>
              <Ionicons name="checkmark-done" size={20} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Add Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  header: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#020617",
    marginBottom: 12,
  },

  formGroup: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#F5F6FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: "#020617",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  rowContainer: {
    flexDirection: "row",
  },

  dropdown: {
    backgroundColor: "#F5F6FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 13,
    color: "#020617",
    fontWeight: "600",
    flex: 1,
  },

  buttonContainer: {
    gap: 10,
    marginBottom: 10,
  },

  submitBtn: {
    backgroundColor: "#4A4AFF",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 3,
  },

  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  cancelBtn: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  cancelBtnText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "700",
  },
});
