import {GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox} from "@react-google-maps/api";
import {useMemo, useState,useEffect,useRef} from "react";
import "./style.css"

const GoogleMaps =({
    radius,
    setLatitude,
    style,
    address,
    setAddress,
    latitude,
    longitude,
    setLongitude
}) => {
    const [map, setMap] = useState(null);
    const {isLoaded} = useLoadScript ({
        googleMapsApiKey: process.env.REACT_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    const center = useMemo(() => ({ lat: latitude, lng: longitude}), [latitude,longitude])

    const changeCoordinate = (coord, index) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setLatitude(lat);
        setLongitude(lng);
    }

    useEffect(() => {
        map?.panTo({lat: latitude, lng: longitude})
    }, [latitude, longitude])

    const inputRef = useRef();
    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlace();

        if (place){
            setAddress(place.formatted_address)
            setLatitude(place.geometry.location.lat())
            setLongitude(place.geometry.location.lng())
        }
    }

    return (
        <div className="">
    {
        !isLoaded ? (
            <h1>Loading...</h1>
        ) : (
            <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
            onLoad={(map) => setMap(map)}
            >

                <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPladcesChanged={handlePlaceChanged}
                >
                    <div className="">
                        <input type="text" className={`${style}`} value={address} placeholder="Search Location" onChange={(e) => setAddress(e.target.value)}/>
                    </div>

                </StandaloneSearchBox>

                <button onClick={() => map.panTo({let: latitude, lng: longitude})} className=""><span className="">Click her</span></button>

                <Marker
                    draggable
                    animation={google.maps.Animation.DROP}
                    onDragEnd={changeCoordinate}
                    position={{lat: latitude, lng: longitude}}
                    />

                <Circle
                    options={{
                        fillColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeColor: "#FF0000",
                        strokeWeight: 2,
                        fillOpacity: 0.35,
                    }}
                />

            </GoogleMap>
        )}
    </div>
    );
};

export default GoogleMaps;