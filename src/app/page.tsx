"use client";

import GoogleMaps from "@/components/page";
import {useState} from "react";

export default function Home() {
    const [form, setFrom] = useState({
        name: "",
        address: "",
        latitude: null,
        longitude: null,
        radius: 500,
    })

    const [latitude, setLatitude] = useState(14);
    const [longitude, setLongitude] = useState(14);
    const [address, setAddress] = useState("");

  return (
    <div className="bg-primary flex-row justify-content-end">
      <p className="text-center fs-5">test test test</p>
        <GoogleMaps style="" address={address} setAddress={setAddress} radius={form.radius} latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude}/>
        <div>
            <span className="">Address: {address}</span>
            <span className="">Latitude: {latitude}</span>
            <span className="">Longitude: {longitude}</span>
        </div>

    </div>

  );
}
