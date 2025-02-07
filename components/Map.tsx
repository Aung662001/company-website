/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
Must contain Inforamions 
1.Some width and height in container styles
2.Map center
3.Map zoom level
4.Map options
*/

"use client";

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};
const defaultMapCenter = {
  lat: 16.832005,
  lng: 96.190731,
};
const defaultMapZoom = 18;
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "terrain",//roadmap /satellite /hybrid /terrain 
};

const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>
    </div>
  );
};

export { MapComponent };
