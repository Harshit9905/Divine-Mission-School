import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PayFee() {
  const { month, due } = useLocalSearchParams<{ month: string; due: string }>();
  const router = useRouter();
  const [custom, setCustom] = useState("");

  const pay = (amount: number) => {
    router.replace({
      pathname: "/student/payment-success",
      params: { month, amount },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>Fee Payment</Text>
        <Text style={styles.sub}>{month}</Text>

        {/* DUE CARD */}
        <View style={styles.card}>
          <Ionicons name="wallet-outline" size={26} color="#4A4AFF" />
          <Text style={styles.cardLabel}>Due Amount</Text>
          <Text style={styles.amount}>₹{due}</Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => pay(Number(due))}
          >
            <Text style={styles.primaryText}>Pay Full Due</Text>
          </TouchableOpacity>
        </View>

        {/* CUSTOM PAYMENT */}
        <View style={styles.customCard}>
          <Text style={styles.customTitle}>Custom Payment</Text>

          <TextInput
            placeholder="Enter amount"
            keyboardType="numeric"
            value={custom}
            onChangeText={setCustom}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.secondaryBtn}
            disabled={!custom}
            onPress={() => pay(Number(custom))}
          >
            <Text style={styles.secondaryText}>
              Pay Custom Amount
            </Text>
          </TouchableOpacity>
        </View>

        {/* INFO */}
        <Text style={styles.info}>
          🔒 Secure payment • Receipt generated instantly
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FF" },
  container: { padding: 16 },

  title: { fontSize: 24, fontWeight: "800" },
  sub: { color: "#64748B", marginBottom: 20 },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
  },
  cardLabel: { marginTop: 8, color: "#64748B" },
  amount: {
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 8,
  },

  primaryBtn: {
    backgroundColor: "#4A4AFF",
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    marginTop: 10,
  },
  primaryText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  customCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  secondaryBtn: {
    backgroundColor: "#020617",
    paddingVertical: 14,
    borderRadius: 14,
  },
  secondaryText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
  },

  info: {
    marginTop: 14,
    textAlign: "center",
    color: "#475569",
    fontSize: 12,
  },
});
