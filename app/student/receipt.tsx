import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Receipt() {
  const { month, amount } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        {/* HEADER */}
        <Text style={styles.title}>Fee Receipt</Text>
        <Text style={styles.school}>Divine Mission School</Text>

        <View style={styles.divider} />

        {/* DETAILS */}
        <View style={styles.row}>
          <Text>Student</Text>
          <Text style={styles.bold}>Harshit Raj</Text>
        </View>

        <View style={styles.row}>
          <Text>Month</Text>
          <Text style={styles.bold}>{month}</Text>
        </View>

        <View style={styles.row}>
          <Text>Amount Paid</Text>
          <Text style={styles.bold}>₹{amount}</Text>
        </View>

        <View style={styles.row}>
          <Text>Status</Text>
          <Text style={styles.paid}>PAID</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.footer}>
          This is a system-generated receipt.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  school: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bold: { fontWeight: "700" },
  paid: {
    color: "#16A34A",
    fontWeight: "800",
  },

  footer: {
    marginTop: 10,
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
});
