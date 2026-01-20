import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* 🔹 FEES BREAKDOWN */
const FEES_BREAKDOWN = [
  { title: "Tuition Fee", amount: 24000 },
  { title: "Exam Fee", amount: 3000 },
  { title: "Bus Fee", amount: 6000 },
  { title: "Miscellaneous", amount: 2000 },
];

/* 🔹 MONTH WISE FEES */
const MONTH_FEES = [
  { month: "January", amount: 3000, status: "Paid" },
  { month: "February", amount: 3000, status: "Due" },
  { month: "March", amount: 3000, status: "Upcoming" },
  { month: "April", amount: 3000, status: "Upcoming" },
  { month: "May", amount: 3000, status: "Upcoming" },
  { month: "June", amount: 3000, status: "Upcoming" },
  { month: "July", amount: 3000, status: "Upcoming" },
  { month: "August", amount: 3000, status: "Upcoming" },
  { month: "September", amount: 3000, status: "Upcoming" },
  { month: "October", amount: 3000, status: "Upcoming" },
  { month: "November", amount: 3000, status: "Upcoming" },
  { month: "December", amount: 3000, status: "Upcoming" },
];

export default function Fees() {
  const router = useRouter();

  const totalFees = FEES_BREAKDOWN.reduce(
    (sum, i) => sum + i.amount,
    0
  );

  const paidAmount = MONTH_FEES.filter(
    (m) => m.status === "Paid"
  ).reduce((s, m) => s + m.amount, 0);

  const dueAmount = totalFees - paidAmount;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>Fees</Text>

        {/* 🔝 FEES BREAKDOWN */}
        <View style={styles.breakdownCard}>
          <Text style={styles.sectionTitle}>
            Fees Breakdown
          </Text>

          {FEES_BREAKDOWN.map((item) => (
            <View key={item.title} style={styles.row}>
              <Text style={styles.label}>
                {item.title}
              </Text>
              <Text style={styles.value}>
                ₹{item.amount}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>
              Total Fees
            </Text>
            <Text style={styles.totalValue}>
              ₹{totalFees}
            </Text>
          </View>
        </View>

        {/* 📆 MONTH WISE FEES */}
        <Text style={styles.sectionTitle}>
          Month-wise Fees
        </Text>

        <FlatList
          data={MONTH_FEES}
          keyExtractor={(i) => i.month}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isPayable = item.status === "Due";

            return (
              <TouchableOpacity
                style={styles.monthCard}
                disabled={!isPayable}
                onPress={() =>
                  router.push({
                    pathname: "/student/pay-fee",
                    params: {
                      month: item.month,
                      due: item.amount,
                    },
                  })
                }
              >
                <View>
                  <Text style={styles.month}>
                    {item.month}
                  </Text>
                  <Text style={styles.amount}>
                    ₹{item.amount}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.status,
                    item.status === "Paid" &&
                      styles.paid,
                    item.status === "Due" &&
                      styles.due,
                    item.status === "Upcoming" &&
                      styles.upcoming,
                  ]}
                >
                  {item.status}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* SUMMARY */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Paid: ₹{paidAmount}
          </Text>
          <Text style={styles.summaryText}>
            Due: ₹{dueAmount}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  /* BREAKDOWN */
  breakdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  label: {
    color: "#475569",
    fontWeight: "600",
  },
  value: {
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "800",
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "800",
  },

  /* MONTH CARD */
  monthCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  month: {
    fontSize: 15,
    fontWeight: "700",
  },
  amount: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  status: {
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  paid: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },
  due: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
  },
  upcoming: {
    backgroundColor: "#DBEAFE",
    color: "#1E40AF",
  },

  /* SUMMARY */
  summary: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: {
    fontWeight: "700",
    fontSize: 14,
  },
});
