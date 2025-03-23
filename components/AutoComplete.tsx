// components/AutocompleteInput.tsx
"use client";
import { useState, useCallback, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface LocationType {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface AutocompleteInputProps {
  label: string;
  value: string;
  onChange: (location: LocationType) => void;
}

interface Prediction {
  description: string;
  place_id?: string;
}

interface AddressComponent {
  types: string[];
  long_name: string;
}

interface GeometryLocation {
  lat: number;
  lng: number;
}

interface PlaceDetailsResult {
  formatted_address: string;
  address_components: AddressComponent[];
  geometry: {
    location: GeometryLocation;
  };
}

// Strongly typed debounce function
function debounce<F extends (query: string) => void>(
  func: F,
  delay: number
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout;
  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const AutocompleteInput = ({ label, value, onChange }: AutocompleteInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch suggestions through proxy
  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/places?input=${encodeURIComponent(query)}&type=geocode`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data = await response.json();
      
      if (data.predictions) {
        setSuggestions(data.predictions.map((p: Prediction) => p.description));
      }
    } catch (err) {
      setError('Error fetching suggestions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Properly typed debounced fetch with dependencies
  const debouncedFetch = useCallback(
    debounce((query: string) => {
      fetchSuggestions(query);
    }, 300),
    [fetchSuggestions]
  );

  // Handle suggestion selection
  const handleSelectSuggestion = useCallback(async (address: string) => {
    setInputValue(address);
    setSuggestions([]);
    
    try {
      const response = await fetch(`/api/places?input=${encodeURIComponent(address)}&type=geocode`);
      const data = await response.json();
      
      if (data.predictions?.[0]?.place_id) {
        const detailsResponse = await fetch(
          `/api/place-details?place_id=${data.predictions[0].place_id}`
        );
        const details: { result?: PlaceDetailsResult } = await detailsResponse.json();
        
        if (details.result) {
          const location: LocationType = {
            address: details.result.formatted_address,
            city: getCity(details.result.address_components),
            lat: details.result.geometry.location.lat,
            lng: details.result.geometry.location.lng,
          };
          onChange(location);
        }
      }
    } catch (err) {
      console.error('Error fetching place details:', err);
      setError('Failed to get location details');
    }
  }, [onChange]);

  // Helper to extract city
  const getCity = useCallback((components: AddressComponent[]) => {
    const cityComponent = components.find(c => 
      c.types.includes('locality') || 
      c.types.includes('administrative_area_level_2')
    );
    return cityComponent?.long_name || '';
  }, []);
  // Add this useEffect in AutocompleteInput.tsx
useEffect(() => {
  setInputValue(value);
}, [value]); // This syncs the input with parent's value changes
  return (
    <div className="relative mb-4">
      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          debouncedFetch(e.target.value);
        }}
        className="w-full pl-12 pr-10 py-3 rounded-lg border-2 border-blue-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-sm"
        placeholder={label}
      />

      {isLoading && <div className="mt-1 text-sm text-gray-500">Loading...</div>}
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;