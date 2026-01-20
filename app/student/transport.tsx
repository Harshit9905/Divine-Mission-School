import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Transport() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.title}>Transport</Text>

        {/* BUS DETAILS */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="bus-outline"
              size={26}
              color="#4A4AFF"
            />
            <Text style={styles.cardTitle}>
              Bus Details
            </Text>
          </View>

          <Text style={styles.label}>
            Bus Number:
            <Text style={styles.value}>
              {" "} BR06KJ9334 (BUS-12)
            </Text>
          </Text>

          <Text style={styles.label}>
            Route:
            <Text style={styles.value}>
              {" "}Gauripur → Divine Mission School
            </Text>
          </Text>
        </View>

        {/* TIMINGS */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="time-outline"
              size={24}
              color="#16A34A"
            />
            <Text style={styles.cardTitle}>
              Timings
            </Text>
          </View>

          <Text style={styles.label}>
            Pickup Time:
            <Text style={styles.value}>
              {" "}7:15 AM
            </Text>
          </Text>

          <Text style={styles.label}>
            Drop Time:
            <Text style={styles.value}>
              {" "}2:45 PM
            </Text>
          </Text>
        </View>

        {/* STOP DETAILS */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#EA580C"
            />
            <Text style={styles.cardTitle}>
              Stop Details
            </Text>
          </View>

          <Text style={styles.label}>
            Pickup Stop:
            <Text style={styles.value}>
              {" "} Gauripur, Kali Mandir 
            </Text>
          </Text>

          <Text style={styles.label}>
            Drop Stop:
            <Text style={styles.value}>
              {" "} Gauripur, Kali Mandir 
            </Text>
          </Text>
        </View>

        {/* DRIVER */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#2563EB"
            />
            <Text style={styles.cardTitle}>
              Driver Details
            </Text>
          </View>

          <Text style={styles.label}>
            Name:
            <Text style={styles.value}>
              {" "}Ramesh Patel
            </Text>
          </Text>

          <Text style={styles.label}>
            Contact:
            <Text style={styles.value}>
              {" "}98765 43210
            </Text>
          </Text>
        </View>

        {/* FEES */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="wallet-outline"
              size={24}
              color="#DC2626"
            />
            <Text style={styles.cardTitle}>
              Transport Fee
            </Text>
          </View>

          <Text style={styles.label}>
            Status:
            <Text
              style={[
                styles.value,
                { color: "#16A34A" },
              ]}
            >
              {" "}Paid
            </Text>
          </Text>

          <Text style={styles.label}>
            Monthly Fee:
            <Text style={styles.value}>
              {" "}₹1,200
            </Text>
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },

  value: {
    fontWeight: "700",
    color: "#111827",
  },
});
