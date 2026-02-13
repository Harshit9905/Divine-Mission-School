import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

export default function Admission() {
  const router = useRouter();

  /* FORM STATES */
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [className, setClassName] = useState("");
  const [dob, setDob] = useState("");
  const [blood, setBlood] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [medical, setMedical] = useState("");
  const [agree, setAgree] = useState(false);

  /* SUBMIT */
  const submitForm = () => {
    if (
      !name ||
      !father ||
      !className ||
      !mobile ||
      !address
    ) {
      Alert.alert(
        "Error",
        "Please fill all required fields"
      );
      return;
    }

    if (!agree) {
      Alert.alert(
        "Rules",
        "Please accept school rules"
      );
      return;
    }

    Alert.alert(
      "Success",
      "Admission form submitted successfully!"
    );

    router.back();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {/* ===== SCHOOL HEADER ===== */}
          <View style={styles.header}>
            <Image
              source={require("../assets/school_logo.png")}
              style={styles.logo}
            />

            <Text style={styles.school}>
              Divine Mission School
            </Text>

            <Text style={styles.sub}>
              Mandro, Sahibganj •
              📞 9931338729
            </Text>

            <Text style={styles.sub}>
              ✉️ divinemission@gmail.com
            </Text>
          </View>

          {/* ===== TITLE ===== */}
          <Text style={styles.title}>
            New Admission Form
          </Text>

          {/* ===== FORM ===== */}
          <View style={styles.card}>
            <Input
              label="Student Name *"
              value={name}
              onChange={setName}
            />

            <Input
              label="Father Name *"
              value={father}
              onChange={setFather}
            />

            <Input
              label="Mother Name"
              value={mother}
              onChange={setMother}
            />

            <Input
              label="Class Applying For *"
              value={className}
              onChange={setClassName}
            />

            <Input
              label="Date of Birth"
              value={dob}
              onChange={setDob}
              placeholder="DD/MM/YYYY"
            />

            <Input
              label="Blood Group"
              value={blood}
              onChange={setBlood}
            />

            <Input
              label="Mobile Number *"
              value={mobile}
              onChange={setMobile}
              keyboard="numeric"
            />

            <Input
              label="Email"
              value={email}
              onChange={setEmail}
              keyboard="email-address"
            />

            <Input
              label="Address *"
              value={address}
              onChange={setAddress}
              multiline
            />

            <Input
              label="Medical History / Allergy"
              value={medical}
              onChange={setMedical}
              multiline
            />
          </View>

          {/* ===== RULES ===== */}
          <View style={styles.rulesBox}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={agree}
                onValueChange={setAgree}
                color={agree ? "#4A4AFF" : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.rulesText}>
                I have read and understood all rules & regulations of the school and agree to follow them.
              </Text>
            </View>
          </View>

          {/* ===== SUBMIT ===== */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={submitForm}
          >
            <Ionicons
              name="send"
              size={18}
              color="#FFF"
            />
            <Text style={styles.submitText}>
              Submit Application
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ===== INPUT COMPONENT ===== */
const Input = ({
  label,
  value,
  onChange,
  placeholder,
  keyboard,
  multiline,
}: any) => (
  <View style={styles.inputBox}>
    <Text style={styles.label}>
      {label}
    </Text>

    <TextInput
      style={[
        styles.input,
        multiline && { height: 70 },
      ]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      keyboardType={keyboard}
      multiline={multiline}
    />
  </View>
);

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  /* HEADER */
  header: {
    backgroundColor: "#020617",
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: "#FFF",
    marginBottom: 8,
  },

  school: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
  },

  sub: {
    color: "#CBD5E1",
    fontSize: 11,
    marginTop: 2,
  },

  /* TITLE */
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },

  /* CARD */
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    elevation: 4,
  },

  inputBox: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
    color: "#334155",
  },

  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
  },

  /* RULES */
  rulesBox: {
    marginTop: 16,
    marginHorizontal: 12,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  checkbox: {
    width: 22,
    height: 22,
    marginTop: 2,
  },

  rulesText: {
    fontSize: 13,
    color: "#475569",
    flex: 1,
    fontWeight: "500",
    lineHeight: 20,
  },

  /* SUBMIT */
  submitBtn: {
    backgroundColor: "#4A4AFF",
    padding: 16,
    borderRadius: 18,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#FFF",
    fontWeight: "800",
    marginLeft: 8,
  },
});
