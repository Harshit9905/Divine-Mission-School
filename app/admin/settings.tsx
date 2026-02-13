import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AdminSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("admin");

  const [accessControl, setAccessControl] = useState({
    canManageStudents: true,
    canManageTeachers: true,
    canManageFees: true,
    canViewReports: true,
    canApproveLeaves: true,
    canManageBuses: true,
    canManageAnnouncements: true,
    canEditAdminProfile: true,
  });

  const [studentAccess, setStudentAccess] = useState({
    canViewAttendance: true,
    canViewFees: true,
    canSubmitHomework: true,
    canViewResults: true,
    canViewTimetable: true,
    canApplyLeave: true,
    canViewNotices: true,
    canAccessShop: true,
  });

  const [teacherAccess, setTeacherAccess] = useState({
    canMarkAttendance: true,
    canUploadResults: true,
    canSetHomework: true,
    canSendNotifications: true,
    canViewClasses: true,
    canViewStudents: true,
    canViewSchedule: true,
    canAccessReports: true,
  });

  const [parentAccess, setParentAccess] = useState({
    canViewChildAttendance: true,
    canViewChildFees: true,
    canViewChildProgress: true,
    canViewHomework: true,
    canReceiveNotifications: true,
    canSchedulePTM: true,
    canViewSchoolNotices: true,
    canPayFees: true,
  });

  const [shopAccess, setShopAccess] = useState({
    canManageOrders: true,
    canViewInventory: true,
    canUpdatePrices: true,
    canProcessPayments: true,
    canViewAnalytics: true,
    canAddProducts: true,
    canRemoveProducts: true,
    canManageReturns: true,
  });

  const [adminType, setAdminType] = useState("Admin");

  const toggleAccess = (key: string) => {
    setAccessControl((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleStudentAccess = (key: string) => {
    setStudentAccess((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleTeacherAccess = (key: string) => {
    setTeacherAccess((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleParentAccess = (key: string) => {
    setParentAccess((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleShopAccess = (key: string) => {
    setShopAccess((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAdminTypeSelect = (type: string) => {
    setAdminType(type);
    if (type === "Admin") {
      setAccessControl({
        canManageStudents: true,
        canManageTeachers: true,
        canManageFees: true,
        canViewReports: true,
        canApproveLeaves: true,
        canManageBuses: true,
        canManageAnnouncements: true,
        canEditAdminProfile: true,
      });
    }
  };

  const renderAccessItem = (key: string, label: string, description: string, toggle: (k: string) => void, state: any) => (
    <View key={key} style={styles.accessItem}>
      <View style={styles.accessInfo}>
        <Text style={styles.accessLabel}>{label}</Text>
        <Text style={styles.accessDesc}>{description}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggle(key)}
        style={[
          styles.toggleButton,
          { backgroundColor: state[key as keyof typeof state] ? "#10B981" : "#EF4444" },
        ]}
      >
        <Text style={styles.toggleText}>
          {state[key as keyof typeof state] ? "ON" : "OFF"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings & Access Control</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* TAB BUTTONS */}
        <View style={styles.tabContainer}>
          {["admin", "student", "teacher", "parent", "shop"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                { backgroundColor: activeTab === tab ? "#4A4AFF" : "#FFFFFF" },
              ]}
            >
              <Ionicons
                name={
                  tab === "admin"
                    ? "shield-checkmark"
                    : tab === "student"
                    ? "person"
                    : tab === "teacher"
                    ? "briefcase"
                    : tab === "parent"
                    ? "people"
                    : "cart"
                }
                size={18}
                color={activeTab === tab ? "#FFFFFF" : "#4A4AFF"}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: activeTab === tab ? "#FFFFFF" : "#020617" },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ADMIN SECTION */}
        {activeTab === "admin" && (
          <>
            <Text style={styles.sectionTitle}>Admin Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                onPress={() => handleAdminTypeSelect("Admin")}
                style={[
                  styles.typeCard,
                  styles.fullWidthCard,
                  { backgroundColor: adminType === "Admin" ? "#4A4AFF" : "#FFFFFF" },
                ]}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={24}
                  color={adminType === "Admin" ? "#FFFFFF" : "#4A4AFF"}
                />
                <Text
                  style={[
                    styles.typeLabel,
                    { color: adminType === "Admin" ? "#FFFFFF" : "#020617" },
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Access Controls</Text>
            <View style={styles.accessContainer}>
              {renderAccessItem("canManageStudents", "Manage Students", "Can add, edit, and delete students", toggleAccess, accessControl)}
              {renderAccessItem("canManageTeachers", "Manage Teachers", "Can manage teaching and non-teaching staff", toggleAccess, accessControl)}
              {renderAccessItem("canManageFees", "Manage Fees", "Can view and collect fee payments", toggleAccess, accessControl)}
              {renderAccessItem("canViewReports", "View Reports", "Can access and generate reports", toggleAccess, accessControl)}
              {renderAccessItem("canApproveLeaves", "Approve Leaves", "Can approve or reject leave requests", toggleAccess, accessControl)}
              {renderAccessItem("canManageBuses", "Manage Buses", "Can manage bus routes and students", toggleAccess, accessControl)}
              {renderAccessItem("canManageAnnouncements", "Manage Announcements", "Can create and edit announcements", toggleAccess, accessControl)}
              {renderAccessItem("canEditAdminProfile", "Edit Admin Profile", "Can edit admin account details", toggleAccess, accessControl)}
            </View>
          </>
        )}

        {/* STUDENT SECTION */}
        {activeTab === "student" && (
          <>
            <Text style={styles.sectionTitle}>Student Permissions</Text>
            <View style={styles.accessContainer}>
              {renderAccessItem("canViewAttendance", "View Attendance", "Students can view their attendance", toggleStudentAccess, studentAccess)}
              {renderAccessItem("canViewFees", "View Fees", "Students can view fee information", toggleStudentAccess, studentAccess)}
              {renderAccessItem("canSubmitHomework", "Submit Homework", "Students can submit homework", toggleStudentAccess, studentAccess)}
              {renderAccessItem("canViewResults", "View Results", "Students can view exam results", toggleStudentAccess, studentAccess)}
              {renderAccessItem("canViewTimetable", "View Timetable", "Students can view class timetable", toggleStudentAccess, studentAccess)}
              {renderAccessItem("canApplyLeave", "Apply Leave", "Students can apply for leave", toggleStudentAccess, studentAccess)}
              {renderAccessItem("canViewNotices", "View Notices", "Students can view school notices", toggleStudentAccess, studentAccess)}
              {renderAccessItem("canAccessShop", "Access Shop", "Students can access school shop", toggleStudentAccess, studentAccess)}
            </View>
          </>
        )}

        {/* TEACHER SECTION */}
        {activeTab === "teacher" && (
          <>
            <Text style={styles.sectionTitle}>Teacher Permissions</Text>
            <View style={styles.accessContainer}>
              {renderAccessItem("canMarkAttendance", "Mark Attendance", "Teachers can mark student attendance", toggleTeacherAccess, teacherAccess)}
              {renderAccessItem("canUploadResults", "Upload Results", "Teachers can upload exam results", toggleTeacherAccess, teacherAccess)}
              {renderAccessItem("canSetHomework", "Set Homework", "Teachers can set homework for classes", toggleTeacherAccess, teacherAccess)}
              {renderAccessItem("canSendNotifications", "Send Notifications", "Teachers can send notifications to parents", toggleTeacherAccess, teacherAccess)}
              {renderAccessItem("canViewClasses", "View Classes", "Teachers can view their assigned classes", toggleTeacherAccess, teacherAccess)}
              {renderAccessItem("canViewStudents", "View Students", "Teachers can view student details", toggleTeacherAccess, teacherAccess)}
              {renderAccessItem("canViewSchedule", "View Schedule", "Teachers can view their schedule", toggleTeacherAccess, teacherAccess)}
              {renderAccessItem("canAccessReports", "Access Reports", "Teachers can access performance reports", toggleTeacherAccess, teacherAccess)}
            </View>
          </>
        )}

        {/* PARENT SECTION */}
        {activeTab === "parent" && (
          <>
            <Text style={styles.sectionTitle}>Parent Permissions</Text>
            <View style={styles.accessContainer}>
              {renderAccessItem("canViewChildAttendance", "View Child Attendance", "Parents can view child attendance", toggleParentAccess, parentAccess)}
              {renderAccessItem("canViewChildFees", "View Child Fees", "Parents can view fee information", toggleParentAccess, parentAccess)}
              {renderAccessItem("canViewChildProgress", "View Child Progress", "Parents can view academic progress", toggleParentAccess, parentAccess)}
              {renderAccessItem("canViewHomework", "View Homework", "Parents can view assigned homework", toggleParentAccess, parentAccess)}
              {renderAccessItem("canReceiveNotifications", "Receive Notifications", "Parents can receive school notifications", toggleParentAccess, parentAccess)}
              {renderAccessItem("canSchedulePTM", "Schedule PTM", "Parents can schedule parent-teacher meetings", toggleParentAccess, parentAccess)}
              {renderAccessItem("canViewSchoolNotices", "View School Notices", "Parents can view school announcements", toggleParentAccess, parentAccess)}
              {renderAccessItem("canPayFees", "Pay Fees", "Parents can pay fees online", toggleParentAccess, parentAccess)}
            </View>
          </>
        )}

        {/* SHOP SECTION */}
        {activeTab === "shop" && (
          <>
            <Text style={styles.sectionTitle}>Shop Permissions</Text>
            <View style={styles.accessContainer}>
              {renderAccessItem("canManageOrders", "Manage Orders", "Can view and manage all orders", toggleShopAccess, shopAccess)}
              {renderAccessItem("canViewInventory", "View Inventory", "Can view product inventory", toggleShopAccess, shopAccess)}
              {renderAccessItem("canUpdatePrices", "Update Prices", "Can update product prices", toggleShopAccess, shopAccess)}
              {renderAccessItem("canProcessPayments", "Process Payments", "Can process online payments", toggleShopAccess, shopAccess)}
              {renderAccessItem("canViewAnalytics", "View Analytics", "Can view sales analytics", toggleShopAccess, shopAccess)}
              {renderAccessItem("canAddProducts", "Add Products", "Can add new products to shop", toggleShopAccess, shopAccess)}
              {renderAccessItem("canRemoveProducts", "Remove Products", "Can remove products from shop", toggleShopAccess, shopAccess)}
              {renderAccessItem("canManageReturns", "Manage Returns", "Can manage product returns", toggleShopAccess, shopAccess)}
            </View>
          </>
        )}

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            Alert.alert("Success", "Access control settings saved successfully!", [
              { text: "OK" },
            ]);
          }}
        >
          <Ionicons name="checkmark-done" size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  header: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  tabContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
  },

  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
    elevation: 2,
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#020617",
    marginTop: 16,
    marginBottom: 12,
  },

  typeContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  typeCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    gap: 8,
  },

  fullWidthCard: {
    flex: 0,
    width: "100%",
  },

  typeLabel: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  infoBox: {
    backgroundColor: "#EFF2FF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  infoText: {
    fontSize: 12,
    color: "#020617",
    flex: 1,
  },

  infoHighlight: {
    fontWeight: "800",
    color: "#4A4AFF",
  },

  accessContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    elevation: 2,
    marginBottom: 16,
  },

  accessItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF2FF",
  },

  accessInfo: {
    flex: 1,
  },

  accessLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
  },

  accessDesc: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 3,
  },

  toggleButton: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  toggleText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  summaryBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    marginBottom: 16,
  },

  summaryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginBottom: 10,
  },

  permissionsList: {
    gap: 8,
  },

  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  permissionText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  saveButton: {
    backgroundColor: "#4A4AFF",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    elevation: 3,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
