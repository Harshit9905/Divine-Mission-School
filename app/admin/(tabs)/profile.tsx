import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const adminInfo = {
  name: "Sanjeev Anand",
  email: "divinemandro@gmail.com",
  phone: "+91 9931338729",
  role: "Principal (admin)",
  designation: "Principal",
  joinedDate: "2007",
  school: "Divine Mission School",
};

const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

const ActionItem = ({ icon, title, onPress }: any) => (
  <TouchableOpacity style={styles.actionRow} onPress={onPress}>
    <View style={styles.actionLeft}>
      <Ionicons name={icon} size={20} color="#4A4AFF" />
      <Text style={styles.actionText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
  </TouchableOpacity>
);

export default function Profile() {
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const changePassword = () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    if (newPass.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (newPass !== confirmPass) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    Alert.alert("Success", "Password changed successfully");
    setShowPasswordModal(false);
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/login"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* ADMIN PROFILE */}
        <Section title="Admin Information">
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>
                {adminInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{adminInfo.name}</Text>
              <Text style={styles.profileRole}>{adminInfo.designation}</Text>
              <Text style={styles.profileSchool}>{adminInfo.school}</Text>
            </View>
          </View>

          <Row label="Email" value={adminInfo.email} />
          <Row label="Phone" value={adminInfo.phone} />
          <Row label="Role" value={adminInfo.role} />
          <Row label="Joined" value={adminInfo.joinedDate} />
        </Section>

        {/* ACCOUNT */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <ActionItem
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => setShowPasswordModal(true)}
          />
          <ActionItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() =>
              Alert.alert(
                "Help & Support",
                "📞 Office: 9931338729\n📧 divinemandro@gmail.com\n🕘 9 AM – 4 PM"
              )
            }
          />
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* CHANGE PASSWORD MODAL */}
      <Modal visible={showPasswordModal} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalBg}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              placeholder="Old Password"
              secureTextEntry
              style={styles.input}
              value={oldPass}
              onChangeText={setOldPass}
            />
            <TextInput
              placeholder="New Password"
              secureTextEntry
              style={styles.input}
              value={newPass}
              onChangeText={setNewPass}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              value={confirmPass}
              onChangeText={setConfirmPass}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={changePassword}>
              <Text style={styles.saveText}>Save Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },
  header: {
    backgroundColor: "#020617",
    padding: 16,
    paddingTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", marginBottom: 8, marginLeft: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 4,
    marginHorizontal: 16,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4A4AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatar: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#020617",
  },
  profileRole: {
    fontSize: 13,
    color: "#4A4AFF",
    marginTop: 2,
    fontWeight: "700",
  },
  profileSchool: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    flex: 1,
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    flex: 1,
    textAlign: "right",
  },
  actionRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14 },
  actionLeft: { flexDirection: "row", alignItems: "center" },
  actionText: { marginLeft: 10, fontSize: 14, fontWeight: "600" },
  logoutBtn: {
    backgroundColor: "#DC2626",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 30,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalCard: { backgroundColor: "#fff", margin: 20, borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  input: { backgroundColor: "#F1F5F9", borderRadius: 12, padding: 12, marginBottom: 10 },
  saveBtn: { backgroundColor: "#4A4AFF", padding: 14, borderRadius: 14, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "700" },
  cancel: { textAlign: "center", marginTop: 10, color: "#64748B" },
});
