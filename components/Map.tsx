"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

type LatLngLiteral = google.maps.LatLngLiteral;

// Global variable to track if the script is already loaded
let scriptLoadPromise: Promise<void> | null = null;

const Map: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const pickupMarkerRef = useRef<google.maps.Marker | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initMap = useCallback(() => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location: LatLngLiteral = { lat: latitude, lng: longitude };

        mapRef.current = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: location,
            zoom: 12, // Start with a lower zoom level for animation
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }
        );

        // Add a bouncing animation to the marker
        pickupMarkerRef.current = new google.maps.Marker({
          position: location,
          map: mapRef.current,
          title: "Your Location",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
          animation: google.maps.Animation.BOUNCE,
        });

        // Zoom in animation
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.setZoom(15); // Zoom to the desired level
          }
        }, 1000); // Delay the zoom for 1 second

        directionsServiceRef.current = new google.maps.DirectionsService();
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map: mapRef.current,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#3b82f6",
            strokeWeight: 5,
          },
        });

        setIsLoading(false);
        setErrorMessage(null); // Clear any previous error messages
      },
      (error) => {
        console.error("Error getting location:", error);
        setErrorMessage(
          "Please allow location access in your browser settings to use this feature."
        );
        setIsLoading(false);
      }
    );
  }, []);

  const loadGoogleMapsScript = useCallback(() => {
    if (scriptLoadPromise) return scriptLoadPromise;

    scriptLoadPromise = new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0Om8IPTwtRsdTAlnJ49neYABZFSf8enA&libraries=places";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = () => {
        reject(new Error("Failed to load Google Maps script."));
      };

      document.head.appendChild(script);
    });

    return scriptLoadPromise;
  }, []);

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        initMap();
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setErrorMessage("Failed to load Google Maps. Please try again later.");
      });

    return () => {
      if (pickupMarkerRef.current) {
        pickupMarkerRef.current.setMap(null);
      }

      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, [initMap, loadGoogleMapsScript]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[500px] md:h-[570px] lg:h-[580px] rounded-lg shadow-lg overflow-hidden relative"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"
            />
          </motion.div>
        </div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 p-4"
        >
          <p className="text-center text-red-600 font-medium">{errorMessage}</p>
        </motion.div>
      )}

      <motion.div
        id="map"
        className="w-full h-full rounded-lg hover:shadow-xl transition-shadow duration-300 md:ml-4"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Map;