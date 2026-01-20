import { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LeaveType = "Class Leave" | "Hostel Leave";
type LeaveStatus = "Pending" | "Approved" | "Rejected";

type Leave = {
  id: string;
  type: LeaveType;
  from: string;
  to: string;
  reason: string;
  status: LeaveStatus;
};

export default function LeaveScreen() {
  const [type, setType] =
    useState<LeaveType>("Class Leave");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");

  const [leaves, setLeaves] = useState<Leave[]>([
    {
      id: "1",
      type: "Class Leave",
      from: "10 Jan",
      to: "11 Jan",
      reason: "Fever",
      status: "Approved",
    },
    {
      id: "2",
      type: "Hostel Leave",
      from: "15 Jan",
      to: "17 Jan",
      reason: "Family Function",
      status: "Pending",
    },
  ]);

  const applyLeave = () => {
    if (!from || !to || !reason) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    setLeaves((prev) => [
      {
        id: Date.now().toString(),
        type,
        from,
        to,
        reason,
        status: "Pending",
      },
      ...prev,
    ]);

    setFrom("");
    setTo("");
    setReason("");

    Alert.alert(
      "Leave Applied",
      "Your leave request is pending approval"
    );
  };

  const renderItem = ({ item }: { item: Leave }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.leaveType}>
          {item.type}
        </Text>
        <Text
          style={[
            styles.status,
            item.status === "Approved"
              ? styles.approved
              : item.status === "Rejected"
              ? styles.rejected
              : styles.pending,
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.date}>
        {item.from} → {item.to}
      </Text>
      <Text style={styles.reason}>
        {item.reason}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              Apply Leave
            </Text>

            {/* TYPE SWITCH */}
            <View style={styles.switchRow}>
              {(["Class Leave", "Hostel Leave"] as LeaveType[]).map(
                (t) => (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.switchBtn,
                      type === t &&
                        styles.activeSwitch,
                    ]}
                    onPress={() => setType(t)}
                  >
                    <Text
                      style={[
                        styles.switchText,
                        type === t &&
                          styles.activeSwitchText,
                      ]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            {/* INPUTS */}
            <TextInput
              placeholder="From Date (e.g. 20 Jan)"
              style={styles.input}
              value={from}
              onChangeText={setFrom}
            />
            <TextInput
              placeholder="To Date (e.g. 22 Jan)"
              style={styles.input}
              value={to}
              onChangeText={setTo}
            />
            <TextInput
              placeholder="Reason"
              style={[
                styles.input,
                { height: 80 },
              ]}
              multiline
              value={reason}
              onChangeText={setReason}
            />

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={applyLeave}
            >
              <Text style={styles.applyText}>
                Apply Leave
              </Text>
            </TouchableOpacity>

            <Text style={styles.section}>
              Leave History
            </Text>
          </>
        }
        data={leaves}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* 🎨 STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },

  switchRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  switchBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    marginRight: 6,
    alignItems: "center",
  },
  activeSwitch: {
    backgroundColor: "#4A4AFF",
  },
  switchText: {
    fontWeight: "700",
  },
  activeSwitchText: {
    color: "#FFFFFF",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },

  applyBtn: {
    backgroundColor: "#020617",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
  },
  applyText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  section: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leaveType: {
    fontWeight: "800",
  },

  status: {
    fontSize: 12,
    fontWeight: "800",
  },
  approved: {
    color: "#22C55E",
  },
  pending: {
    color: "#F97316",
  },
  rejected: {
    color: "#EF4444",
  },

  date: {
    marginTop: 6,
    fontWeight: "600",
  },
  reason: {
    marginTop: 4,
    color: "#64748B",
  },
});
