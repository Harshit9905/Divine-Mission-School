import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const childProfileData = {
  name: "Harshit Raj",
  class: "10-A",
  rollNumber: 1,
  section: "A",
  dateOfBirth: "March 15, 2009",
  bloodGroup: "O Negative",
  height: "5'8\"",
  weight: "55 kg",
  gender: "Male",
  admissionNumber: "DIV/2019/001",
  admissionDate: "April 2019",
  fatherName: "Rajeev Kumar Pandey",
  motherName: "Soni Pandey",
  permanentAddress: "Gauripur",
  allergies: "Penicillin, Dust",
  medications: "Asthma Inhaler (if required)",
  medicalHistory: [
    "Chicken Pox (2015)",
    "Regular Check-ups (No Major Issues)",
  ],
  hobbies: "Cricket, Photography, Reading",
};

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

export default function ChildProfile() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* ===== HEADER ===== */}
        <View style={styles.profileCard}>
          <Image
            source={require("../../../assets/harshit.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>{childProfileData.name}</Text>
          <Text style={styles.sub}>Class {childProfileData.class} • Roll {childProfileData.rollNumber}</Text>
        </View>

        {/* BASIC INFORMATION */}
        <Section title="Basic Information">
          <Row label="Date of Birth" value={childProfileData.dateOfBirth} />
          <Row label="Gender" value={childProfileData.gender} />
          <Row label="Blood Group" value={childProfileData.bloodGroup} />
          <Row label="Admission Date" value={childProfileData.admissionDate} />
        </Section>

        {/* PHYSICAL INFORMATION */}
        <Section title="Physical Information">
          <Row label="Height" value={childProfileData.height} />
          <Row label="Weight" value={childProfileData.weight} />
        </Section>

        {/* ACADEMIC INFORMATION */}
        <Section title="Academic Information">
          <Row label="Class" value={childProfileData.class} />
          <Row label="Section" value={childProfileData.section} />
          <Row label="Roll Number" value={childProfileData.rollNumber} />
          <Row label="Admission Number" value={childProfileData.admissionNumber} />
        </Section>

        {/* PARENT INFORMATION */}
        <Section title="Parent Information">
          <Row label="Father Name" value={childProfileData.fatherName} />
          <Row label="Mother Name" value={childProfileData.motherName} />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <Row label="Permanent Address" value={childProfileData.permanentAddress} />
        </Section>

        {/* MEDICAL INFORMATION */}
        <Section title="Medical Information">
          <Row label="Allergies" value={childProfileData.allergies} />
          <Row label="Current Medications" value={childProfileData.medications} />
          <View style={styles.medicalHistory}>
            <Text style={styles.medicalTitle}>Medical History</Text>
            {childProfileData.medicalHistory.map((item, idx) => (
              <View key={idx} style={styles.historyItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4A4AFF" />
                <Text style={styles.historyText}>{item}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* INTERESTS & HOBBIES */}
        <Section title="Interests & Hobbies">
          <View style={styles.hobbiesContainer}>
            <Text style={styles.hobbiesText}>{childProfileData.hobbies}</Text>
          </View>
        </Section>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

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

  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  label: { color: "#64748B", fontSize: 12, fontWeight: "600" },
  value: { fontWeight: "700", fontSize: 13, maxWidth: "60%", textAlign: "right", color: "#020617" },

  medicalHistory: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  medicalTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 8,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  historyText: {
    fontSize: 12,
    color: "#020617",
    fontWeight: "500",
  },
  hobbiesContainer: {
    paddingVertical: 10,
  },
  hobbiesText: {
    fontSize: 13,
    color: "#020617",
    fontWeight: "500",
    lineHeight: 20,
  },
});
