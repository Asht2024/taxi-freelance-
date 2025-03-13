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
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (!window.google?.maps?.places?.Autocomplete || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["geocode"] }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;
      const components = place.address_components;

      if (!location || !components || !place.formatted_address) return;

      const lat = typeof location.lat === "function" ? location.lat() : 0;
      const lng = typeof location.lng === "function" ? location.lng() : 0;

      const city =
        components.find((comp) =>
          comp.types.includes("locality")
        )?.long_name || "";

      const address = place.formatted_address;

      setInputValue(address);
      onChange({
        address,
        city,
        latitude: lat,
        longitude: lng,
      });
    });
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

export default AutocompleteInput;
