// import { useEffect, useState } from "react";
// import {
//   Collapse,
//   Card,
//   Tag,
//   Button,
//   Modal,
//   Form,
//   Input,
//   DatePicker,
//   message,
//   Spin,
//   Badge,
// } from "antd";
// import { WifiOutlined, HomeOutlined } from "@ant-design/icons";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../comp/firebaseConfig";
// import SizedBox from "../components/SizedBox";
// import NavigationBar from "../components/NavigationBar";

// /* ===========================
//    ROOM AVAILABILITY PAGE
// =========================== */

// export default function RoomAvailability() {
//   const [hostels, setHostels] = useState([]);
//   const [fetchingHostels, setFetchingHostels] = useState(true);

//   // Booking modal state
//   const [bookingModal, setBookingModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null); // { room, hostel }
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [form] = Form.useForm();

//   /* ---------- FETCH HOSTELS + ROOMS ---------- */
//   const fetchData = async () => {
//     setFetchingHostels(true);
//     try {
//       const hostelSnap = await getDocs(collection(db, "hostels"));
//       const hostelData = [];

//       for (const h of hostelSnap.docs) {
//         const roomSnap = await getDocs(
//           collection(db, "hostels", h.id, "rooms")
//         );
//         const rooms = roomSnap.docs.map((r) => ({ id: r.id, ...r.data() }));
//         const availableCount = rooms.filter((r) => r.available).length;

//         hostelData.push({
//           id: h.id,
//           name: h.data().name,
//           availableCount,
//           rooms,
//         });
//       }

//       setHostels(hostelData);
//     } catch (err) {
//       console.error(err);
//       message.error("Failed to load hostels");
//     }
//     setFetchingHostels(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   /* ---------- OPEN BOOKING MODAL ---------- */
//   const openBooking = (room, hostel) => {
//     setSelectedRoom({ room, hostel });
//     form.resetFields();
//     setBookingModal(true);
//   };

//   /* ---------- SUBMIT BOOKING ---------- */
//   const handleBooking = async (values) => {
//     const { room, hostel } = selectedRoom;
//     setBookingLoading(true);

//     try {
//       // 1. Save booking to top-level 'bookings' collection
//       await addDoc(collection(db, "bookings"), {
//         hostelId: hostel.id,
//         hostelName: hostel.name,
//         roomId: room.id,
//         roomCapacity: room.capacity,
//         roomAc: room.ac,
//         guestName: values.name.trim(),
//         phone: values.phone.trim(),
//         checkIn: values.checkIn.toDate(),
//         checkOut: values.checkOut.toDate(),
//         purpose: values.purpose.trim(),
//         bookedAt: new Date(),
//         status: "active",
//       });

//       // 2. Mark room as unavailable
//       await updateDoc(
//         doc(db, "hostels", hostel.id, "rooms", room.id),
//         { available: false }
//       );

//       // 3. Optimistic UI — update local state
//       setHostels((prev) =>
//         prev.map((h) =>
//           h.id !== hostel.id
//             ? h
//             : {
//                 ...h,
//                 availableCount: h.availableCount - 1,
//                 rooms: h.rooms.map((r) =>
//                   r.id === room.id ? { ...r, available: false } : r
//                 ),
//               }
//         )
//       );

//       message.success("Room booked successfully!");
//       setBookingModal(false);
//     } catch (err) {
//       console.error(err);
//       message.error("Booking failed. Please try again.");
//     }

//     setBookingLoading(false);
//   };

//   /* ---------- COLLAPSE ITEMS ---------- */
//   const items = hostels.map((h) => ({
//     key: h.id,
//     label: (
//       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <HomeOutlined />
//         <span style={{ fontWeight: 600, fontSize: 16 }}>{h.name}</span>
//         {h.availableCount > 0 ? (
//           <Tag color="green">{h.availableCount} Available</Tag>
//         ) : (
//           <Tag color="red">Fully Booked</Tag>
//         )}
//       </div>
//     ),
//     children: (
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//           gap: 16,
//         }}
//       >
//         {h.rooms.length === 0 && (
//           <p style={{ color: "#888" }}>No rooms configured for this hostel.</p>
//         )}

//         {h.rooms.map((room, index) => (
//           <RoomCard
//             key={room.id}
//             room={room}
//             index={index}
//             hostel={h}
//             onBook={() => openBooking(room, h)}
//           />
//         ))}
//       </div>
//     ),
//   }));

//   /* ---------- RENDER ---------- */
//   return (
//     <SizedBox>
//       <NavigationBar />
//       <h1 style={{ marginBottom: 24 }}>Guest Room Availability</h1>

//       {fetchingHostels ? (
//         <div style={{ textAlign: "center", marginTop: 60 }}>
//           <Spin size="large" />
//         </div>
//       ) : (
//         <Collapse
//           items={items}
//           accordion
//           style={{ background: "white" }}
//         />
//       )}

//       {/* ---- BOOKING MODAL ---- */}
//       <Modal
//         title={
//           selectedRoom
//             ? `Book Room ${selectedRoom.room.index + 1} — ${selectedRoom.hostel.name}`
//             : "Book Room"
//         }
//         open={bookingModal}
//         onCancel={() => setBookingModal(false)}
//         footer={null}
//         destroyOnClose
//       >
//         {selectedRoom && (
//           <>
//             {/* Room summary */}
//             <Card size="small" style={{ marginBottom: 20, background: "#f9f9f9" }}>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//                 <Tag color="blue">Capacity: {selectedRoom.room.capacity}</Tag>
//                 <Tag color={selectedRoom.room.ac ? "cyan" : "default"}>
//                   {selectedRoom.room.ac ? "AC" : "Non-AC"}
//                 </Tag>
//                 <Tag color="green">Available</Tag>
//               </div>
//             </Card>

//             {/* Booking form */}
//             <Form form={form} layout="vertical" onFinish={handleBooking}>
//               <Form.Item
//                 label="Full Name"
//                 name="name"
//                 rules={[{ required: true, message: "Please enter your name" }]}
//               >
//                 <Input placeholder="e.g. Rahul Sharma" />
//               </Form.Item>

//               <Form.Item
//                 label="Phone Number"
//                 name="phone"
//                 rules={[
//                   { required: true, message: "Please enter your phone number" },
//                   {
//                     pattern: /^[0-9]{10}$/,
//                     message: "Enter a valid 10-digit number",
//                   },
//                 ]}
//               >
//                 <Input placeholder="e.g. 9876543210" maxLength={10} />
//               </Form.Item>

//               <Form.Item
//                 label="Check-in Date"
//                 name="checkIn"
//                 rules={[{ required: true, message: "Select check-in date" }]}
//               >
//                 <DatePicker style={{ width: "100%" }} />
//               </Form.Item>

//               <Form.Item
//                 label="Check-out Date"
//                 name="checkOut"
//                 dependencies={["checkIn"]}
//                 rules={[
//                   { required: true, message: "Select check-out date" },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || !getFieldValue("checkIn")) return Promise.resolve();
//                       if (value.isAfter(getFieldValue("checkIn"))) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(
//                         new Error("Check-out must be after check-in")
//                       );
//                     },
//                   }),
//                 ]}
//               >
//                 <DatePicker style={{ width: "100%" }} />
//               </Form.Item>

//               <Form.Item
//                 label="Purpose of Visit"
//                 name="purpose"
//                 rules={[{ required: true, message: "Please state your purpose" }]}
//               >
//                 <Input.TextArea
//                   rows={3}
//                   placeholder="e.g. Parents' visit, Medical, Conference..."
//                 />
//               </Form.Item>

//               <Form.Item style={{ marginBottom: 0 }}>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   block
//                   loading={bookingLoading}
//                 >
//                   Confirm Booking
//                 </Button>
//               </Form.Item>
//             </Form>
//           </>
//         )}
//       </Modal>
//     </SizedBox>
//   );
// }

// /* ===========================
//    ROOM CARD COMPONENT
// =========================== */

// function RoomCard({ room, index, hostel, onBook }) {
//   return (
//     <Card
//       size="small"
//       title={`Room ${index + 1}`}
//       style={{
//         borderColor: room.available ? "#b7eb8f" : "#ffa39e",
//         opacity: room.available ? 1 : 0.65,
//       }}
//       extra={
//         <Tag color={room.available ? "green" : "red"}>
//           {room.available ? "Free" : "Booked"}
//         </Tag>
//       }
//     >
//       <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//         <span>👥 Capacity: <strong>{room.capacity}</strong></span>
//         <span>
//           ❄️ AC:{" "}
//           <Tag color={room.ac ? "cyan" : "default"}>
//             {room.ac ? "Yes" : "No"}
//           </Tag>
//         </span>
//       </div>

//       {room.available && (
//         <Button
//           type="primary"
//           size="small"
//           block
//           style={{ marginTop: 12 }}
//           onClick={onBook}
//         >
//           Book
//         </Button>
//       )}
//     </Card>
//   );
// }
