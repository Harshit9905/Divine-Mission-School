import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useCart } from "../context/CartContext";

const PRODUCTS = [
  {
    id: "shirt",
    name: "School Shirt",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  },
  {
    id: "pant",
    name: "School Pant",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1602810319127-bb8e9e76c1d5",
  },
  {
    id: "shoes",
    name: "School Shoes",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c17a24d",
  },
  {
    id: "tie",
    name: "Tie",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1620799139507-2a76f79f78ef",
  },
  {
    id: "socks",
    name: "Socks",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1618354691249-bc7d91aa9e4d",
  },
  {
    id: "blazer",
    name: "Blazer",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1520974735194-8d42f0e50c0f",
  },
  {
    id: "sweater",
    name: "Sweater",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716e",
  },
  {
    id: "ptshirt",
    name: "PT Shirt",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    id: "ptpant",
    name: "PT Pant",
    price: 400,
    image:
      "https://images.unsplash.com/photo-1588731234159-6c8f5e9b4c09",
  },
  {
    id: "ptshoes",
    name: "PT Shoes",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
];

export default function Shop() {
  const router = useRouter();
  const { cart, addItem, removeItem } = useCart();

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>School Shop</Text>

        <TouchableOpacity
          style={{ position: "relative" }}
          onPress={() => router.push("/checkout")}
        >
          <Ionicons name="cart-outline" size={26} />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* GRID */}
      <FlatList
        data={PRODUCTS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const qty =
            cart.find((c) => c.id === item.id)?.qty ||
            0;

          return (
            <View style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                ₹{item.price}
              </Text>

              {qty === 0 ? (
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                    })
                  }
                >
                  <Text style={styles.addText}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.qtyBtn}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.qty}>{qty}</Text>

                  <TouchableOpacity
                    onPress={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    }
                  >
                    <Text style={styles.qtyBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 12,
    backgroundColor: "#F5F6FF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },

  badge: {
    position: "absolute",
    right: -10,
    top: -6,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    margin: 8,
    borderRadius: 16,
    padding: 10,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  name: {
    marginTop: 8,
    fontWeight: "700",
  },
  price: {
    color: "#4A4AFF",
    marginBottom: 6,
    fontWeight: "600",
  },

  addBtn: {
    backgroundColor: "#4A4AFF",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
  },

  qtyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    fontSize: 22,
    width: 32,
    height: 32,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#4A4AFF",
    color: "#fff",
    borderRadius: 6,
  },
  qty: {
    fontWeight: "700",
    fontSize: 16,
  },
});
