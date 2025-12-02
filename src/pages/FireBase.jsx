import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";

const RoomManager = () => {
  const [rooms, setRooms] = useState({});
console.log(rooms)
  // 🔥 REALTIME LISTENER
  useEffect(() => {
    const roomsRef = ref(
      db,
      "TFi4sVt5vLYYQli7uMSCLsAKGH43/rooms"
    );

    const unsubscribe = onValue(roomsRef, (snapshot) => {
      if (snapshot.exists()) {
        setRooms(snapshot.val());
      } else {
        setRooms({});
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 TOGGLE SWITCH FUNCTION
  const toggleSwitch = (roomId, switchId, currentState) => {
    const switchRef = ref(
      db,
      `TFi4sVt5vLYYQli7uMSCLsAKGH43/rooms/${roomId}/switches/${switchId}`
    );

    update(switchRef, {
      state: currentState === 1 ? 0 : 1,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">🔥 Real-Time Rooms</h2>

      {Object.entries(rooms).map(([roomId, roomData]) => (
        <div key={roomId} className="p-3 border mb-3 rounded">
          <h3 className="font-semibold text-lg">
            {roomData.room_name || "Unnamed Room"}
          </h3>

          {/* Switch List */}
          {roomData.switches ? (
            Object.entries(roomData.switches).map(([switchId, sw]) => (
              <div key={switchId} className="flex items-center gap-3 mt-2">
                <span>
                  {sw.switch_id} → State:{" "}
                  <b>{sw.state === 1 ? "ON" : "OFF"}</b>
                </span>

                <button
                  onClick={() => toggleSwitch(roomId, switchId, sw.state)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Toggle
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-2">No switches</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomManager;
