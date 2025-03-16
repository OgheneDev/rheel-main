'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 41.2033, // Approximate center based on your image
  lng: -74.0123
};

const OfficeLocation = {
  position: { lat: 41.85, lng: -87.65 }, // Chicago coordinates
  address: "101 E 129th St, East Chicago, IN 46312, US",
  phone: "1-333-345-6868",
  email: "themesfat@gmail.com"
};

function MapComponent() {
  const [showInfoWindow, setShowInfoWindow] = React.useState(false);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDHIcilHwvBLQCQCzLNBMlmArIxsiU4eA4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={9}
      >
        <Marker 
          position={OfficeLocation.position}
          onClick={() => setShowInfoWindow(true)}
        />
        
        {showInfoWindow && (
          <InfoWindow
            position={OfficeLocation.position}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-2">Office address</h3>
              <div className="flex items-center mb-2">
                <span className="mr-2">📍</span>
                <span>{OfficeLocation.address}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">📞</span>
                <span>{OfficeLocation.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <span>{OfficeLocation.email}</span>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;