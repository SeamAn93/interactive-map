import {GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox} from "@react-google-maps/api";
import {useMemo, useState,useEffect,useRef} from "react";
import "./style.css"

const GoogleMaps =({
    radius,
    style,
    address,
    setAddress,
    latitude,
    setLatitude,
    longitude,
    setLongitude
}) => {
    const [map, setMap] = useState(null);
    const {isLoaded} = useLoadScript ({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const center = useMemo(() => ({ lat: latitude, lng: longitude}), [latitude,longitude]);

    const changeCoordinate = (cord, index) => {
        const {latLng} = cord;
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
        const [place] = inputRef.current.getplaces();

        if (place){
            setAddress(place.formatted_address)
            setLatitude(place.geometry.location.lat())
            setLongitude(place.geometry.location.lng())
        }
    }

    return (
        <div className="map__container__height">
    {
        !isLoaded ? (
            <h1 className="map__container__load">Loading...</h1>
        ) : (

            <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={16}
            onLoad={(map) => setMap(map)}
            >

                <StandaloneSearchBox
                onLoad={(ref) => (inputRef.current = ref)}
                onPladcesChanged={handlePlaceChanged}
                >
                    <div className="search__bar">
                        <input type="text" className={`search__bar__style {$Style}`} value={address} placeholder="Search Location" onChange={(e) => setAddress(e.target.value)}/>
                    </div>

                </StandaloneSearchBox>

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