import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
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

const ROLES = [
  { key: "student", label: "Student", icon: "school-outline" },
  { key: "teacher", label: "Teacher", icon: "person-outline" },
  { key: "parent", label: "Parent", icon: "people-outline" },
  { key: "admin", label: "Admin", icon: "settings-outline" },
];

export default function Login() {
  const router = useRouter();

  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!username || !password) {
      alert("Please enter ID and password");
      return;
    }

    if (role === "student") {
      router.replace("/student"); // ✅ FIXED
      return;
    }

    alert(`${role} panel coming soon`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* SCHOOL BRAND */}
          <View style={styles.top}>
            <Image
              source={require("../assets/school_logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Divine Mission School</Text>
            <Text style={styles.sub}>Login Portal</Text>
          </View>

          {/* ROLE */}
          <Text style={styles.sectionTitle}>Select Role</Text>

          <View style={styles.roleRow}>
            {ROLES.map((r) => (
              <TouchableOpacity
                key={r.key}
                style={[
                  styles.roleCard,
                  role === r.key && styles.roleActive,
                ]}
                onPress={() => setRole(r.key)}
              >
                <Ionicons
                  name={r.icon as any}
                  size={22}
                  color={role === r.key ? "#FFFFFF" : "#4A4AFF"}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === r.key && { color: "#FFFFFF" },
                  ]}
                >
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <TextInput
              placeholder={`${role.toUpperCase()} ID`}
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginBtn} onPress={login}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              Forgot password? Contact school administration
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FF" },
  container: {
    padding: 20,
    paddingBottom: 40,
    justifyContent: "center",
  },

  top: { alignItems: "center", marginBottom: 30 },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 18,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  title: { fontSize: 22, fontWeight: "800" },
  sub: { fontSize: 12, color: "#64748B" },

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
  roleActive: { backgroundColor: "#4A4AFF" },
  roleText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

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
});
