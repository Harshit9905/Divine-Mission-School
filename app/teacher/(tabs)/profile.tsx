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

/* REUSABLE COMPONENTS */
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
          <View style={styles.profileLeft}>
            <Image
              source={require("../../../assets/teacher.avif")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Mr. Rajesh Kumar</Text>
              <Text style={styles.sub}>Mathematics Department</Text>
            </View>
          </View>
          
          <View style={styles.profileRight}>
            <Image
              source={require("../../../assets/school_logo.png")}
              style={styles.schoolLogo}
              resizeMode="contain"
            />
            <Text style={styles.schoolName}>Divine Mission{"\n"}School</Text>
          </View>
        </View>

        {/* PROFESSIONAL INFO */}
        <Section title="Professional Details">
          <Row label="Employee ID" value="DIVM001" />
          <Row label="Department" value="Mathematics" />
          <Row label="Qualification" value="B.Sc, B.Ed" />
          <Row label="Experience" value="12 Years" />
        </Section>

        {/* PERSONAL INFO */}
        <Section title="Personal Information">
          <Row label="Age" value="38" />
          <Row label="Blood Group" value="B Positive" />
          <Row label="Address" value="Mandro,Jharkhand,India" />
          <Row label="Gender" value="Male" />
        </Section>

        {/* FAMILY DETAILS */}
        <Section title="Family Details">
          <Row label="Father" value="Mr. Ashok Kumar" />
          <Row label="Mother" value="Mrs. Lakshmi Kumari" />
          <Row label="Emergency Contact" value="+91 98765 43210" />
          <Row label="Relation" value="Self" />
        </Section>

        {/* MEDICAL HISTORY */}
        <Section title="Medical History">
          <Row label="Allergies" value="None" />
          <Row label="Medication" value="Blood Pressure (ongoing)" />
          <Row label="Note" value="Regular checkups recommended" />
        </Section>

        {/* ACCOUNT */}
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.card}>
          <Row label="Email" value="rajeshdivinemandro@gmail.com" />
          <Row label="Phone" value="+91 98765 43210" />
          <Row label="School" value="Divine Mission School" />
        </View>

        {/* ACCOUNT ACTIONS */}
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

/* STYLES */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FF" },
  container: { padding: 16 },

  profileCard: {
    backgroundColor: "#020617",
    borderRadius: 26,
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileRight: {
    alignItems: "center",
    marginLeft: 12,
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 12 },
  schoolLogo: { width: 50, height: 50, marginBottom: 8, borderRadius: 25, backgroundColor: "#FFFFFF" },
  schoolName: { color: "#E5E7EB", fontSize: 10, fontWeight: "600", textAlign: "center" },
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
