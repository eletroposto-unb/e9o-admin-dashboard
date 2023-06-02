import React, { useState, useEffect } from "react";
import { getAllStations } from "@/services/station";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

function ChargeStationMap() {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    handleChargeStations();
  }, []);

  const handleChargeStations = async () => {
    const stations = await getAllStations();
    setStations(stations?.value);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map stations={stations} />
    </div>
  );
}

export default ChargeStationMap;
