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

const parentInfo = {
  name: "Rajeev Kumar Pandey",
  role: "Father",
  email: "rajeev.pandey@gmail.com",
  phone: "+91 7046541375",
  occupation: "Private Sector",
  address: "Gauripur",
  city: "Bhagalpur",
  state: "Bihar",
  pincode: "813209",
  childName: "Harshit Raj",
  childClass: "10-A",
  childRoll: "1",
  childSection: "A",
  childDOB: "March 15, 2009",
  childGender: "Male",
  childBloodGroup: "O Negative",
  childHeight: "5'8\"",
  childWeight: "55 kg",
  childAdmissionNumber: "DIV/2019/001",
  childAdmissionDate: "April 2019",
  childAddress: "Gauripur",
  childAllergies: "Penicillin, Dust",
  childMedications: "Asthma Inhaler (if required)",
  emergencyContact: "+91 7046541375",
  emergencyContactPerson: "Soni Pandey (Mother)",
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

const EditButton = () => (
  <TouchableOpacity style={styles.editBtn}>
    <Ionicons name="pencil" size={16} color="#FFFFFF" />
    <Text style={styles.editBtnText}>Edit Profile</Text>
  </TouchableOpacity>
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

        {/* PARENT PROFILE */}
        <Section title="Parent Information">
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>
                {parentInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{parentInfo.name}</Text>
              <Text style={styles.profileRole}>{parentInfo.role}</Text>
            </View>
          </View>

          <Row label="Occupation" value={parentInfo.occupation} />
          <Row label="Email" value={parentInfo.email} />
          <Row label="Phone" value={parentInfo.phone} />
        </Section>

        {/* CONTACT INFORMATION */}
        <Section title="Contact Address">
          <Row label="Address" value={parentInfo.address} />
          <Row label="City" value={parentInfo.city} />
          <Row label="State" value={parentInfo.state} />
          <Row label="Pincode" value={parentInfo.pincode} />
        </Section>

        {/* CHILD INFORMATION */}
        <Section title="Child Information">
          <Row label="Child Name" value={parentInfo.childName} />
          <Row label="Class" value={parentInfo.childClass} />
          <Row label="Roll Number" value={parentInfo.childRoll} />
          <Row label="Section" value={parentInfo.childSection} />
          <Row label="Date of Birth" value={parentInfo.childDOB} />
          <Row label="Gender" value={parentInfo.childGender} />
          <Row label="Blood Group" value={parentInfo.childBloodGroup} />
          <Row label="Height" value={parentInfo.childHeight} />
          <Row label="Weight" value={parentInfo.childWeight} />
          <Row label="Admission Number" value={parentInfo.childAdmissionNumber} />
          <Row label="Admission Date" value={parentInfo.childAdmissionDate} />
        </Section>

        {/* CHILD ADDRESS */}
        <Section title="Child Address">
          <Row label="Address" value={parentInfo.childAddress} />
        </Section>

        {/* CHILD MEDICAL INFO */}
        <Section title="Child Medical Information">
          <Row label="Allergies" value={parentInfo.childAllergies} />
          <Row label="Medications" value={parentInfo.childMedications} />
        </Section>

        {/* EMERGENCY CONTACT */}
        <Section title="Emergency Contact">
          <Row
            label="Contact Person"
            value={parentInfo.emergencyContactPerson}
          />
          <Row label="Phone" value={parentInfo.emergencyContact} />
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    elevation: 2,
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
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4A4AFF",
    marginRight: 16,
  },
  avatar: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4A4AFF",
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
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  editBtn: {
    backgroundColor: "#4A4AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  editBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: "#F0F4FF",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    borderLeftWidth: 3,
    borderLeftColor: "#4A4AFF",
  },
  infoText: {
    fontSize: 12,
    color: "#4A4AFF",
    lineHeight: 16,
    flex: 1,
  },
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
  actionRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14 },
  actionLeft: { flexDirection: "row", alignItems: "center" },
  actionText: { marginLeft: 10, fontSize: 14, fontWeight: "600" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  modalCard: { backgroundColor: "#fff", margin: 20, borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  input: { backgroundColor: "#F1F5F9", borderRadius: 12, padding: 12, marginBottom: 10 },
  saveBtn: { backgroundColor: "#4A4AFF", padding: 14, borderRadius: 14, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "700" },
  cancel: { textAlign: "center", marginTop: 10, color: "#64748B" },
});
