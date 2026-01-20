import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
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
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* ===== HEADER ===== */}
        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/harshit.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Harshit Raj</Text>
          <Text style={styles.sub}>Class 10 • Roll No 17</Text>
        </View>

        {/* STUDENT INFO */}
        <Section title="Student Information">
          <Row label="Age" value="17" />
          <Row label="Blood Group" value="O Negative" />
          <Row label="Class Teacher" value="Mr. Verma" />
          <Row label="Address" value="Gauripur" />
        </Section>

        {/* PARENT DETAILS */}
        <Section title="Parent Details">
          <Row label="Father" value="Rajeev Kumar Pandey" />
          <Row label="Mother" value="Soni Pandey" />
          <Row label="Contact" value="7634938203" />
          <Row label="Email" value="harshitraj456z@gmail.com" />
        </Section>

        {/* MEDICAL */}
        <Section title="Medical History">
          <Row label="Allergies" value="Penicillin, Dust" />
          <Row label="Medication" value="Asthma Inhaler (if required)" />
          <Row label="Note" value="Immediate attention during breathing issues" />
        </Section>

        {/* ACCOUNT */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <ActionItem
            icon="create-outline"
            title="Edit Profile"
            onPress={() =>
              Alert.alert(
                "Contact Admin",
                "Please contact school administration to update profile details."
              )
            }
          />
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
                "📞 Office: 9931338729\n📧 support@divinemission.edu\n🕘 9 AM – 4 PM"
              )
            }
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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

/* REUSABLE */
const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Section = ({ title, children }: any) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </>
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

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FF" },
  container: { padding: 16 },

  profileCard: {
    backgroundColor: "#020617",
    borderRadius: 26,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  name: { color: "#fff", fontSize: 20, fontWeight: "800" },
  sub: { color: "#CBD5E1", fontSize: 12 },

  sectionTitle: { fontSize: 16, fontWeight: "800", marginBottom: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 4,
  },

  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  label: { color: "#64748B", fontSize: 12 },
  value: { fontWeight: "700", fontSize: 13, maxWidth: "60%", textAlign: "right" },

  actionRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14 },
  actionLeft: { flexDirection: "row", alignItems: "center" },
  actionText: { marginLeft: 10, fontSize: 14, fontWeight: "600" },

  logoutBtn: {
    backgroundColor: "#DC2626",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  logoutText: { color: "#fff", fontWeight: "700", marginLeft: 6 },

  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalCard: { backgroundColor: "#fff", margin: 20, borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  input: { backgroundColor: "#F1F5F9", borderRadius: 12, padding: 12, marginBottom: 10 },
  saveBtn: { backgroundColor: "#4A4AFF", padding: 14, borderRadius: 14, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "700" },
  cancel: { textAlign: "center", marginTop: 10, color: "#64748B" },
});
