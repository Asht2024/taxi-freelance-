"use client";
import React, { useEffect, useRef, useState } from "react";

interface AutocompleteInputProps {
  placeholder: string;
  className: string;
  value: string;
  onChange: (location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  }) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder,
  className,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  //@ts-ignore
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!inputRef.current || autocompleteRef.current) return;

    const initAutocomplete = () => {
      if (window.google?.maps?.places) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current!,
          { types: ["geocode"] }
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place?.geometry?.location || !place.address_components) return;

          // Extract city
          const getAddressComponent = (types: string[]) => 
            place.address_components?.find(c => types.some(t => c.types.includes(t)))?.long_name || '';

          const city = 
            getAddressComponent(['locality', 'administrative_area_level_2']) ||
            getAddressComponent(['administrative_area_level_1']);

          const location = {
            address: place.formatted_address || '',
            city,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          };

          console.log('Selected Location:', location);
          
          setInputValue(location.address);
          onChange(location);
        });
      }
    };

    // Initialize when Google Maps is available
    if (window.google?.maps) {
      initAutocomplete();
    } else {
      const timer = setInterval(() => {
        if (window.google?.maps) {
          initAutocomplete();
          clearInterval(timer);
        }
      }, 100);
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={className}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default React.memo(AutocompleteInput);