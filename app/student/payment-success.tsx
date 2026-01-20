import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentSuccess() {
  const { month, amount } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ICON */}
        <View style={styles.iconWrap}>
          <Ionicons
            name="checkmark-circle"
            size={90}
            color="#22C55E"
          />
        </View>

        <Text style={styles.title}>Payment Successful</Text>
        <Text style={styles.sub}>
          Your fee payment has been completed
        </Text>

        {/* DETAILS */}
        <View style={styles.detailCard}>
          <Text style={styles.row}>
            Month: <Text style={styles.bold}>{month}</Text>
          </Text>
          <Text style={styles.row}>
            Amount Paid:{" "}
            <Text style={styles.bold}>₹{amount}</Text>
          </Text>
          <Text style={styles.row}>
            Status:{" "}
            <Text style={styles.success}>Paid</Text>
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            router.push({
              pathname: "/student/receipt",
              params: { month, amount },
            })
          }
        >
          <Text style={styles.primaryText}>
            View Receipt
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F6FF" },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },

  iconWrap: { marginBottom: 20 },

  title: { fontSize: 24, fontWeight: "800" },
  sub: {
    color: "#64748B",
    marginBottom: 20,
    textAlign: "center",
  },

  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    width: "100%",
    elevation: 4,
    marginBottom: 20,
  },
  row: {
    fontSize: 14,
    marginBottom: 6,
    color: "#334155",
  },
  bold: { fontWeight: "700" },
  success: { color: "#16A34A", fontWeight: "800" },

  primaryBtn: {
    backgroundColor: "#4A4AFF",
    paddingVertical: 14,
    borderRadius: 16,
    width: "100%",
  },
  primaryText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
