import React from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    Tooltip
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LatLngExpression } from 'leaflet';


function AdventureMap({ location, address }: any) {
    const MarkerIcon = new L.Icon({
        iconUrl: '/icons/marker.png',
        iconSize: [30, 30]
    });

    return (
        <MapContainer className='w-[90%] md:w-[55%] h-[400px] rounded-xl' center={location} zoom={3} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} icon={MarkerIcon}>
                <Popup>
                    {address}
                </Popup>
                <Tooltip direction="bottom" offset={[0, 10]} opacity={1} permanent>
                    {address}
                </Tooltip>
            </Marker>
        </MapContainer>
    )
}

export default AdventureMap