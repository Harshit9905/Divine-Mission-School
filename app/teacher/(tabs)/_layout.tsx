import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TeacherTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4A4AFF",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="classes"
        options={{
          title: "Classes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="students"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="upload-results"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="homework"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="assignments"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="view-timetable"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="send-notification"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="ptm-schedule"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
