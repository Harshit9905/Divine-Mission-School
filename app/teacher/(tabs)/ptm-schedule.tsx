import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* Teacher Info - Class Teacher of 10-A */
const teacherInfo = {
  name: "Mr. Rajesh Kumar",
  classTeacherOf: "10-A",
};

const ptmData = [
  {
    id: 1,
    date: "28 Jan 2026",
    time: "10:00 AM - 12:00 PM",
    class: "10-A",
    location: "Class Room 10-A",
    ptmStatus: "Not Started",
    bookedSlots: 6,
    totalSlots: 8,
    parents: [
      { studentId: 1, studentName: "Harshit Raj", parentName: "Rajeev Kumar", time: "10:15 AM", status: "Pending" },
      { studentId: 2, studentName: "Priya Singh", parentName: "Arun Singh", time: "10:30 AM", status: "Pending" },
      { studentId: 3, studentName: "Arjun Kumar", parentName: "Vikas Kumar", time: "10:45 AM", status: "Pending" },
      { studentId: 4, studentName: "Ananya Patel", parentName: "Rajesh Patel", time: "11:00 AM", status: "Pending" },
      { studentId: 5, studentName: "Rahul Verma", parentName: "Arvind Verma", time: "11:15 AM", status: "Pending" },
      { studentId: 6, studentName: "Neha Singh", parentName: "Pradeep Singh", time: "11:30 AM", status: "Pending" },
    ],
  },
  {
    id: 2,
    date: "29 Jan 2026",
    time: "02:00 PM - 04:00 PM",
    class: "10-B",
    location: "Class Room 10-B",
    ptmStatus: "Not Started",
    bookedSlots: 5,
    totalSlots: 8,
    parents: [
      { studentId: 9, studentName: "Simran Sharma", parentName: "Rajesh Sharma", time: "02:00 PM", status: "Pending" },
      { studentId: 10, studentName: "Aarav Singh", parentName: "Vikram Singh", time: "02:15 PM", status: "Pending" },
      { studentId: 12, studentName: "Rohan Kumar", parentName: "Suresh Kumar", time: "02:30 PM", status: "Pending" },
      { studentId: 15, studentName: "Kriti Khan", parentName: "Ahmed Khan", time: "02:45 PM", status: "Pending" },
      { studentId: 16, studentName: "Nayan Desai", parentName: "Ashish Desai", time: "03:00 PM", status: "Pending" },
    ],
  },
  {
    id: 3,
    date: "01 Feb 2026",
    time: "11:00 AM - 01:00 PM",
    class: "11-A",
    location: "Class Room 11-A",
    ptmStatus: "Not Started",
    bookedSlots: 7,
    totalSlots: 8,
    parents: [
      { studentId: 17, studentName: "Aryan Malhotra", parentName: "Rajiv Malhotra", time: "11:00 AM", status: "Pending" },
      { studentId: 18, studentName: "Pooja Iyer", parentName: "Suresh Iyer", time: "11:15 AM", status: "Pending" },
      { studentId: 20, studentName: "Ananya Mishra", parentName: "Anil Mishra", time: "11:30 AM", status: "Pending" },
      { studentId: 21, studentName: "Vihaan Kapoor", parentName: "Vikrant Kapoor", time: "11:45 AM", status: "Pending" },
      { studentId: 22, studentName: "Riya Gupta", parentName: "Amit Gupta", time: "12:00 PM", status: "Pending" },
      { studentId: 23, studentName: "Siddharth Nair", parentName: "Rajesh Nair", time: "12:15 PM", status: "Pending" },
      { studentId: 24, studentName: "Zara Ahmed", parentName: "Farhan Ahmed", time: "12:30 PM", status: "Pending" },
    ],
  },
];

export default function PTMSchedule() {
  const [ptmList, setPtmList] = useState(ptmData);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Filter PTM to only show the class teacher's class
  const filteredPTM = ptmList.filter((ptm) => ptm.class === teacherInfo.classTeacherOf);

  const getProgressPercentage = (booked: number, total: number) => {
    return Math.round((booked / total) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "#16A34A";
      case "Pending":
        return "#EA580C";
      case "Not Started":
        return "#DC2626";
      default:
        return "#64748B";
    }
  };

  const handleStartPTM = (ptmId: number) => {
    Alert.alert("Start PTM", "Begin this PTM session?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Start",
        onPress: () => {
          const updated = ptmList.map((ptm) =>
            ptm.id === ptmId ? { ...ptm, ptmStatus: "Ongoing" } : ptm
          );
          setPtmList(updated);
          Alert.alert("Success", "PTM session started!");
        },
      },
    ]);
  };

  const handleMarkStatus = (ptmId: number, parentIndex: number, newStatus: "Done" | "Pending") => {
    const updated = ptmList.map((ptm) => {
      if (ptm.id === ptmId) {
        return {
          ...ptm,
          parents: ptm.parents.map((p, idx) =>
            idx === parentIndex ? { ...p, status: newStatus } : p
          ),
        };
      }
      return ptm;
    });
    setPtmList(updated);
    Alert.alert("Success", `Meeting marked as ${newStatus}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PTM Schedule</Text>
        <Text style={styles.subtitle}>Class {teacherInfo.classTeacherOf} • Manage parent-teacher meetings</Text>
      </View>

      {filteredPTM.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={48} color="#CBD5E1" />
          <Text style={styles.emptyText}>No PTM scheduled for your class</Text>
        </View>
      ) : (
      <FlatList
        data={filteredPTM}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.ptmCard}>
            <TouchableOpacity
              style={styles.ptmHeader}
              onPress={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            >
              <View style={styles.ptmInfo}>
                <Text style={styles.ptmDate}>{item.date}</Text>
                <Text style={styles.ptmTime}>{item.time}</Text>
                <Text style={styles.ptmClass}>Class {item.class}</Text>
              </View>

              <View style={styles.ptmRight}>
                <View
                  style={[
                    styles.ptmStatusBadge,
                    {
                      backgroundColor:
                        item.ptmStatus === "Not Started"
                          ? "#FEE2E2"
                          : item.ptmStatus === "Ongoing"
                          ? "#FEF3C7"
                          : "#DCFCE7",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.ptmStatusText,
                      {
                        color: getStatusColor(item.ptmStatus),
                      },
                    ]}
                  >
                    {item.ptmStatus}
                  </Text>
                </View>
                <Ionicons
                  name={
                    expandedId === item.id
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={20}
                  color="#4A4AFF"
                />
              </View>
            </TouchableOpacity>

            {/* Action Buttons */}
            {item.ptmStatus === "Not Started" && (
              <TouchableOpacity
                style={styles.startPTMBtn}
                onPress={() => handleStartPTM(item.id)}
              >
                <Ionicons name="play-outline" size={16} color="#FFFFFF" />
                <Text style={styles.startPTMText}>Start PTM</Text>
              </TouchableOpacity>
            )}

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${getProgressPercentage(
                      item.bookedSlots,
                      item.totalSlots
                    )}%`,
                  },
                ]}
              />
            </View>

            {/* Expanded Details */}
            {expandedId === item.id && (
              <View style={styles.expandedContent}>
                <View style={styles.locationRow}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color="#64748B"
                  />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>

                <Text style={styles.parentListTitle}>Parents Scheduled:</Text>

                {item.parents.map((parent, idx) => (
                  <View key={idx} style={styles.parentRow}>
                    <View style={styles.parentInfo}>
                      <Text style={styles.parentStudent}>
                        {parent.studentName}
                      </Text>
                      <Text style={styles.parentName}>
                        Parent: {parent.parentName}
                      </Text>
                      <Text style={styles.parentTime}>{parent.time}</Text>
                    </View>

                    <View style={styles.parentRight}>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              parent.status === "Done"
                                ? "#DCFCE7"
                                : "#FEF3C7",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color: getStatusColor(parent.status),
                            },
                          ]}
                        >
                          {parent.status}
                        </Text>
                      </View>

                      <View style={styles.actionButtons}>
                        <TouchableOpacity
                          style={styles.doneBtn}
                          onPress={() => handleMarkStatus(item.id, idx, "Done")}
                        >
                          <Ionicons
                            name="checkmark"
                            size={14}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>

                        {parent.status === "Done" && (
                          <TouchableOpacity
                            style={styles.pendingBtn}
                            onPress={() => handleMarkStatus(item.id, idx, "Pending")}
                          >
                            <Ionicons
                              name="close"
                              size={14}
                              color="#FFFFFF"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
      )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 13,
    color: "#CBD5E1",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 12,
    textAlign: "center",
  },
  listContent: {
    padding: 12,
  },
  ptmCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    overflow: "hidden",
  },
  ptmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  ptmInfo: {
    flex: 1,
  },
  ptmDate: {
    fontSize: 14,
    fontWeight: "700",
    color: "#020617",
  },
  ptmTime: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  ptmClass: {
    fontSize: 12,
    color: "#4A4AFF",
    fontWeight: "600",
    marginTop: 2,
  },
  ptmRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  slotInfo: {
    alignItems: "center",
  },
  slotText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
  },
  slotLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 14,
    marginVertical: 10,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4A4AFF",
    borderRadius: 3,
  },
  expandedContent: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  locationText: {
    fontSize: 12,
    color: "#64748B",
    marginLeft: 8,
  },
  parentListTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 8,
  },
  parentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  parentInfo: {
    flex: 1,
  },
  parentStudent: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
  },
  parentName: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  parentTime: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
  parentRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  doneBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  pendingBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EA580C",
    justifyContent: "center",
    alignItems: "center",
  },
  ptmStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  ptmStatusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  startPTMBtn: {
    backgroundColor: "#4A4AFF",
    marginHorizontal: 14,
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  startPTMText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
