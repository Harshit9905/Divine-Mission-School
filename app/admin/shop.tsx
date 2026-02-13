import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const shopOrders = [
  {
    id: "ORD-001",
    customerName: "Aditya Kumar",
    items: [
      { name: "School Uniform", qty: 2, price: 800, icon: "shirt-outline", color: "#4A4AFF", img: "👕" },
      { name: "Notebook Set", qty: 1, price: 350, icon: "document-outline", color: "#EA580C", img: "📓" },
    ],
    totalAmount: 1950,
    orderDate: "2026-01-20",
    status: "Pending",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-002",
    customerName: "Priya Singh",
    items: [
      { name: "Sports Shoes", qty: 1, price: 2500, icon: "footsteps-outline", color: "#16A34A", img: "👟" },
      { name: "School Bag", qty: 1, price: 1200, icon: "backpack-outline", color: "#DC2626", img: "🎒" },
    ],
    totalAmount: 3700,
    orderDate: "2026-01-21",
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-003",
    customerName: "Rajesh Patel",
    items: [
      { name: "Sweater", qty: 1, price: 650, icon: "shirt-outline", color: "#8B5CF6", img: "🧶" },
      { name: "Tie", qty: 2, price: 150, icon: "ribbon-outline", color: "#EC4899", img: "🎀" },
    ],
    totalAmount: 950,
    orderDate: "2026-01-19",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-004",
    customerName: "Neha Sharma",
    items: [{ name: "PE Kit", qty: 1, price: 1800, icon: "fitness-outline", color: "#F59E0B", img: "🏃" }],
    totalAmount: 1800,
    orderDate: "2026-01-22",
    status: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    id: "ORD-005",
    customerName: "Akshay Verma",
    items: [
      { name: "Books Bundle", qty: 1, price: 2500, icon: "book-outline", color: "#0891B2", img: "📚" },
      { name: "Stationery Pack", qty: 1, price: 450, icon: "pencil-outline", color: "#6366F1", img: "✏️" },
    ],
    totalAmount: 2950,
    orderDate: "2026-01-18",
    status: "Processing",
    paymentStatus: "Paid",
  },
];

export default function ShopOrders() {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<(typeof shopOrders)[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("orders");

  const statuses = ["All", "Pending", "Processing", "Delivered", "Cancelled"];
  const paymentStatuses = ["All", "Paid", "Unpaid"];

  const filteredOrders = shopOrders.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#EA580C";
      case "Processing":
        return "#4A4AFF";
      case "Delivered":
        return "#10B981";
      case "Cancelled":
        return "#DC2626";
      default:
        return "#94A3B8";
    }
  };

  const getPaymentColor = (status: string) => {
    return status === "Paid" ? "#10B981" : "#DC2626";
  };

  const stats = [
    {
      label: "Total Orders",
      value: shopOrders.length.toString(),
      icon: "cart-outline",
      color: "#4A4AFF",
    },
    {
      label: "Pending",
      value: shopOrders.filter((o) => o.status === "Pending").length.toString(),
      icon: "time-outline",
      color: "#EA580C",
    },
    {
      label: "Processing",
      value: shopOrders.filter((o) => o.status === "Processing").length.toString(),
      icon: "swap-horizontal-outline",
      color: "#4A4AFF",
    },
    {
      label: "Delivered",
      value: shopOrders.filter((o) => o.status === "Delivered").length.toString(),
      icon: "checkmark-done-outline",
      color: "#10B981",
    },
  ];

  const renderStatCard = (stat: any) => (
    <View key={stat.label} style={styles.statCard}>
      <View style={styles.statIconContainer}>
        <Ionicons name={stat.icon} size={24} color={stat.color} />
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  const renderOrderCard = (order: (typeof shopOrders)[0]) => (
    <TouchableOpacity
      key={order.id}
      style={styles.orderCard}
      onPress={() => setSelectedOrder(order)}
    >
      <View style={styles.orderCardContent}>
        <View style={styles.orderCardHeader}>
          <View style={styles.orderCardLeft}>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <Text style={styles.orderDate}>{order.orderDate}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(order.status) },
            ]}
          >
            <Text style={styles.statusTextBadge}>{order.status}</Text>
          </View>
        </View>

        <View style={styles.orderCardBody}>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Items:</Text>
            <Text style={styles.orderInfoValue}>{order.items.length}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Amount:</Text>
            <Text style={styles.orderInfoValue}>₹{order.totalAmount}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Payment:</Text>
            <Text
              style={[
                styles.orderInfoValue,
                {
                  color:
                    order.paymentStatus === "Paid" ? "#10B981" : "#DC2626",
                },
              ]}
            >
              {order.paymentStatus}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* TAB BUTTONS */}
        <View style={styles.tabContainer}>
          {["orders", "products", "analytics"].map((tab) => (
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
                  tab === "orders"
                    ? "list-outline"
                    : tab === "products"
                    ? "cube-outline"
                    : "bar-chart-outline"
                }
                size={16}
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

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <>
            {/* STATS */}
            <View style={styles.statsContainer}>
              {stats.map(renderStatCard)}
            </View>

            {/* FILTER BUTTONS */}
            <Text style={styles.sectionTitle}>Filter by Status</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
            >
              {statuses.map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => setFilterStatus(status)}
                  style={[
                    styles.filterBtn,
                    {
                      backgroundColor:
                        filterStatus === status ? "#4A4AFF" : "#FFFFFF",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      {
                        color:
                          filterStatus === status ? "#FFFFFF" : "#020617",
                      },
                    ]}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* ORDERS LIST */}
            <Text style={styles.sectionTitle}>
              Orders ({filteredOrders.length})
            </Text>
            <View style={styles.ordersList}>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(renderOrderCard)
              ) : (
                <View style={styles.emptyState}>
                  <Ionicons name="cart-outline" size={48} color="#CBD5E1" />
                  <Text style={styles.emptyText}>No orders found</Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Shop Products</Text>
            <View style={styles.productCard}>
              <Ionicons name="cube" size={40} color="#4A4AFF" />
              <Text style={styles.productName}>School Uniforms</Text>
              <Text style={styles.productPrice}>₹800</Text>
              <View style={styles.productActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productCard}>
              <Ionicons name="cube" size={40} color="#4A4AFF" />
              <Text style={styles.productName}>Sports Equipment</Text>
              <Text style={styles.productPrice}>₹1200</Text>
              <View style={styles.productActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Sales Analytics</Text>
            <View style={styles.analyticsCard}>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Total Revenue</Text>
                <Text style={styles.analyticsValue}>₹12,350</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Orders Today</Text>
                <Text style={styles.analyticsValue}>5</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={styles.analyticsLabel}>Pending Amount</Text>
                <Text style={styles.analyticsValue}>₹1,800</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ORDER DETAIL MODAL */}
      <Modal visible={selectedOrder !== null} transparent animationType="slide">
        <SafeAreaView style={styles.modalBg}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedOrder(null)}>
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Order Details</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {selectedOrder && (
                <>
                  {/* ORDER INFO */}
                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Order Information</Text>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Order ID:</Text>
                      <Text style={styles.infoValue}>{selectedOrder.id}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Customer:</Text>
                      <Text style={styles.infoValue}>
                        {selectedOrder.customerName}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Order Date:</Text>
                      <Text style={styles.infoValue}>{selectedOrder.orderDate}</Text>
                    </View>
                  </View>

                  {/* ITEMS */}
                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Items Ordered</Text>
                    {selectedOrder.items.map((item, idx) => (
                      <View key={idx} style={styles.itemCard}>
                        <View style={styles.itemImageBox}>
                          <Text style={styles.itemImage}>{item.img}</Text>
                        </View>
                        <View style={styles.itemDetails}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemQty}>Quantity: {item.qty}</Text>
                        </View>
                        <Text style={styles.itemPrice}>₹{item.price}</Text>
                      </View>
                    ))}
                  </View>

                  {/* STATUS */}
                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Status & Payment</Text>
                    <View style={styles.statusRow}>
                      <Text style={styles.statusLabel}>Order Status:</Text>
                      <View
                        style={[
                          styles.statusBadgeLarge,
                          {
                            backgroundColor:
                              getStatusColor(selectedOrder.status) + "20",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusTextLarge,
                            { color: getStatusColor(selectedOrder.status) },
                          ]}
                        >
                          {selectedOrder.status}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.statusRow}>
                      <Text style={styles.statusLabel}>Payment Status:</Text>
                      <View
                        style={[
                          styles.statusBadgeLarge,
                          {
                            backgroundColor:
                              getPaymentColor(selectedOrder.paymentStatus) +
                              "20",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusTextLarge,
                            {
                              color: getPaymentColor(
                                selectedOrder.paymentStatus
                              ),
                            },
                          ]}
                        >
                          {selectedOrder.paymentStatus}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* AMOUNT */}
                  <View style={styles.modalSection}>
                    <View style={styles.amountRow}>
                      <Text style={styles.amountLabel}>Total Amount:</Text>
                      <Text style={styles.amountValue}>
                        ₹{selectedOrder.totalAmount}
                      </Text>
                    </View>
                  </View>

                  {/* ACTION BUTTONS */}
                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={[styles.actionBtnLarge, styles.btnPrimary]}
                      onPress={() => {
                        Alert.alert("Update Status", "Select new status:", [
                          {
                            text: "Pending",
                            onPress: () =>
                              Alert.alert(
                                "Success",
                                "Order status updated to Pending"
                              ),
                          },
                          {
                            text: "Processing",
                            onPress: () =>
                              Alert.alert(
                                "Success",
                                "Order status updated to Processing"
                              ),
                          },
                          {
                            text: "Delivered",
                            onPress: () =>
                              Alert.alert(
                                "Success",
                                "Order status updated to Delivered"
                              ),
                          },
                          { text: "Cancel" },
                        ]);
                      }}
                    >
                      <Ionicons name="swap-horizontal" size={18} color="#fff" />
                      <Text style={styles.actionBtnText}>Update Status</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionBtnLarge, styles.btnSecondary]}
                      onPress={() => {
                        Alert.alert(
                          "Delete Order",
                          "Are you sure you want to delete this order?",
                          [
                            { text: "Cancel" },
                            {
                              text: "Delete",
                              onPress: () => {
                                Alert.alert(
                                  "Success",
                                  "Order deleted successfully"
                                );
                                setSelectedOrder(null);
                              },
                              style: "destructive",
                            },
                          ]
                        );
                      }}
                    >
                      <Ionicons name="trash-outline" size={18} color="#DC2626" />
                      <Text style={[styles.actionBtnText, { color: "#DC2626" }]}>
                        Delete Order
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
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
    paddingHorizontal: 12,
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

  tabContent: {
    marginBottom: 20,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },

  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#020617",
  },

  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#020617",
    marginBottom: 12,
    marginTop: 8,
  },

  filterScroll: {
    marginBottom: 16,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    elevation: 2,
  },

  filterText: {
    fontSize: 12,
    fontWeight: "700",
  },

  ordersList: {
    marginBottom: 20,
  },

  orderCard: {
    backgroundColor: "#4A4AFF",
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
    overflow: "hidden",
  },

  orderCardContent: {
    padding: 14,
  },

  orderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  orderCardLeft: {
    flex: 1,
  },

  orderId: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  customerName: {
    fontSize: 13,
    color: "#E0E7FF",
    marginTop: 4,
    fontWeight: "600",
  },

  orderDate: {
    fontSize: 11,
    color: "#C7D2FE",
    marginTop: 3,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  statusTextBadge: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  orderCardBody: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 10,
  },

  orderInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },

  orderInfoLabel: {
    fontSize: 12,
    color: "#E0E7FF",
    fontWeight: "600",
  },

  orderInfoValue: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 8,
  },

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  productName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#020617",
    marginTop: 8,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#4A4AFF",
    marginTop: 4,
    marginBottom: 10,
  },

  productActions: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },

  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },

  actionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4A4AFF",
  },

  analyticsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 20,
  },

  analyticsItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  analyticsLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6,
  },

  analyticsValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4A4AFF",
  },

  modalBg: {
    flex: 1,
    backgroundColor: "#F5F6FF",
  },

  modalContent: {
    flex: 1,
  },

  modalHeader: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  modalScroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  modalSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 12,
    color: "#020617",
    fontWeight: "700",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  itemInfo: {
    flex: 1,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    gap: 10,
  },

  itemIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  itemImageBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  itemImage: {
    fontSize: 24,
  },

  itemDetails: {
    flex: 1,
  },

  itemName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#020617",
  },

  itemQty: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  itemPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4A4AFF",
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  statusLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  statusBadgeLarge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  statusTextLarge: {
    fontSize: 12,
    fontWeight: "700",
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amountLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },

  amountValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4A4AFF",
  },

  modalActions: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  actionBtnLarge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    elevation: 2,
  },

  btnPrimary: {
    backgroundColor: "#4A4AFF",
  },

  btnSecondary: {
    backgroundColor: "#FEE2E2",
  },

  actionBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
