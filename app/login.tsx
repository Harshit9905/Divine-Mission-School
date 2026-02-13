import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= ROLES ================= */
const ROLES = [
  { key: "student", label: "Student", icon: "school-outline" },
  { key: "teacher", label: "Teacher", icon: "person-outline" },
  { key: "parent", label: "Parent", icon: "people-outline" },
  { key: "admin", label: "Admin", icon: "settings-outline" },
];

/* ================= CREDENTIALS ================= */
const CREDENTIALS = {
  student: { id: "STU001", password: "0000" },
  teacher: { id: "TCH001", password: "1111" },
  parent: { id: "PAR001", password: "2222" },
  admin: { id: "ADMIN001", password: "5555" },
};

export default function Login() {
  const router = useRouter();

  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* ================= LOGIN ================= */
  const login = () => {
    if (!username || !password) {
      alert("Please enter ID and Password");
      return;
    }

    const creds =
      CREDENTIALS[role as keyof typeof CREDENTIALS];

    if (
      username !== creds.id ||
      password !== creds.password
    ) {
      alert("Invalid ID or Password");
      return;
    }

    /* ROUTING */
    if (role === "student") {
      router.replace("/(tabs)");
      return;
    }

    if (role === "teacher") {
      router.replace("/teacher/(tabs)");
      return;
    }

    if (role === "parent") {
      router.replace("/parent/(tabs)");
      return;
    }

    if (role === "admin") {
      router.replace("/admin/(tabs)");
      return;
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios" ? "padding" : "height"
          }
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ========== LOGO ========== */}
            <View style={styles.top}>
              <Image
                source={require("../assets/school_logo.png")}
                style={styles.logo}
              />

              <Text style={styles.title}>
                Divine Mission School
              </Text>

              <Text style={styles.sub}>
                Login Portal
              </Text>
            </View>

            {/* ========== ROLE ========== */}
            <Text style={styles.sectionTitle}>
              Select Role
            </Text>

            <View style={styles.roleRow}>
              {ROLES.map((r) => (
                <TouchableOpacity
                  key={r.key}
                  style={[
                    styles.roleCard,
                    role === r.key &&
                      styles.roleActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() =>
                    setRole(r.key)
                  }
                >
                  <Ionicons
                    name={r.icon as any}
                    size={22}
                    color={
                      role === r.key
                        ? "#FFFFFF"
                        : "#4A4AFF"
                    }
                  />

                  <Text
                    style={[
                      styles.roleText,
                      role === r.key && {
                        color: "#FFFFFF",
                      },
                    ]}
                  >
                    {r.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* ========== FORM ========== */}
            <View style={styles.form}>
              <TextInput
                placeholder="Enter ID"
                placeholderTextColor="#64748B"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />

              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#64748B"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={styles.loginBtn}
                activeOpacity={0.9}
                onPress={login}
              >
                <Text style={styles.loginText}>
                  Login
                </Text>
              </TouchableOpacity>

              <Text style={styles.note}>
                Forgot password? Contact school
                administration
              </Text>
            </View>

            {/* ========== NEW ADMISSION ========== */}
            <TouchableOpacity
              style={styles.admissionSection}
              onPress={() =>
                router.push("/new-admission")
              }
            >
              <View style={styles.admissionContent}>
                <View
                  style={styles.admissionIconBox}
                >
                  <Ionicons
                    name="person-add"
                    size={24}
                    color="#4A4AFF"
                  />
                </View>

                <View style={styles.admissionText}>
                  <Text
                    style={
                      styles.admissionTitle
                    }
                  >
                    New Admission
                  </Text>

                  <Text
                    style={
                      styles.admissionSubtitle
                    }
                  >
                    Apply for admission now
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#94A3B8"
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
    justifyContent: "center",
  },

  /* TOP */
  top: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  sub: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  /* ROLE */
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },

  roleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  roleCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
  },

  roleActive: {
    backgroundColor: "#4A4AFF",
  },

  roleText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  /* FORM */
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  loginBtn: {
    backgroundColor: "#020617",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },

  loginText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
  },

  note: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    color: "#64748B",
  },

  /* ADMISSION */
  admissionSection: {
    backgroundColor: "#EFF2FF",
    borderRadius: 14,
    padding: 12,
    marginTop: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#4A4AFF",
  },

  admissionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  admissionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  admissionText: {
    flex: 1,
  },

  admissionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4A4AFF",
  },

  admissionSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
});
