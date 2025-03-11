"use client";
import React, { useEffect, useRef } from "react";

interface LocationData {
  address: string;
  city: string;
  latitude: number;
  longitude: number;
}

interface AutocompleteInputProps {
  placeholder: string;
  className: string;
  value: string;
  onChange: (location: LocationData) => void;
}

const getCityFromComponents = (components: google.maps.GeocoderAddressComponent[]) => {
  for (const component of components) {
    if (component.types.includes("locality")) {
      return component.long_name;
    }
  }
  return "";
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder,
  className,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (inputRef.current && window.google) {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["geocode"] }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address && place.geometry?.location) {
          onChange({
            address: place.formatted_address,
            city: getCityFromComponents(place.address_components || []),
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          });
        }
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={className}
      defaultValue={value}
    />
  );
};

export default AutocompleteInput;





