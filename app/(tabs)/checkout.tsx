import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = () => {
    clearCart();
    Alert.alert(
      "Order Placed",
      "Your order has been placed successfully.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Checkout</Text>

        {cart.length === 0 ? (
          <Text style={styles.empty}>
            Your cart is empty
          </Text>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <View>
                    <Text style={styles.itemName}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemQty}>
                      Qty: {item.qty}
                    </Text>
                  </View>

                  <Text style={styles.itemPrice}>
                    ₹{item.price * item.qty}
                  </Text>
                </View>
              )}
            />

            <View style={styles.summary}>
              <View style={styles.row}>
                <Text style={styles.label}>
                  Items Total
                </Text>
                <Text style={styles.value}>
                  ₹{totalAmount}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>
                  Payment Mode
                </Text>
                <Text style={styles.value}>
                  School Fees
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.placeBtn}
              onPress={placeOrder}
            >
              <Text style={styles.placeText}>
                Place Order
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

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

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#64748B",
  },

  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
  },
  itemQty: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4A4AFF",
  },

  summary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#475569",
    fontWeight: "600",
  },
  value: {
    fontWeight: "700",
  },

  placeBtn: {
    backgroundColor: "#4A4AFF",
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 16,
    alignItems: "center",
  },
  placeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
