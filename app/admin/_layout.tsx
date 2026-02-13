import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="parents"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="classes"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="staffs"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="buses"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="leaves"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="fees"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
