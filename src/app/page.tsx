"use client";

import GoogleMaps from "@/components/page";
import {useState} from "react";

export default function Home() {
    const [form] = useState({
        name: "",
        address: "",
        latitude: null,
        longitude: null,
        radius: 500,
    })

    const [latitude, setLatitude] = useState(55.64714227730732);
    const [longitude, setLongitude] = useState(12.284983916424554);
    const [address, setAddress] = useState("");

  return (
    <div className="container-fluid container-md mb-4 mb-md-5">
        <div className="mt-4 mt-md-5 mb-4 mb-md-5">
            <h1 className="text-center text-white">Find the location</h1>
        </div>
        <div className="d-flex flex-column flex-lg-row">
            <div className="col-12 col-lg-8">
                <GoogleMaps style="" address={address} setAddress={setAddress} radius={form.radius} latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude}/>
            </div>
            <div className="col-12 col-lg-4 flex-column ps-lg-5 mt-4 mt-lg-0">
                <div className="border rounded-2 border-2 border-black p-3 bg-white">
                    <h2 className="mb-4">Information</h2>
                    <div className="fs-6 fw-bold mb-2">Address:
                        <p className="mt-1 fw-normal">{address}</p>
                    </div>
                    <div className="fs-6 fw-bold mb-2">Latitude:
                        <p className="mt-1 fw-normal">{latitude}</p>
                    </div>
                    <div className="fs-6 fw-bold mb-2">Longitude:
                        <p className="mt-1 fw-normal">{longitude}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

)
    ;
}
