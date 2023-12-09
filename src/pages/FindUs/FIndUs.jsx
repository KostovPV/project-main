


import React, { useEffect } from 'react';

const FindUs = () => {
  const centerLocation = { lat: 42.525899, lng: 27.454538 };
  let map;
  let directionsService;
  let directionsRenderer;

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
  // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAeze8SmEQ1zLTS43pSmM-ZnHViQom20Eg&libraries=places`;
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAX6SEchN9tHFooLh3-FH9FP4vOpOGQVHw&libraries=places`;
// 'AIzaSyAX6SEchN9tHFooLh3-FH9FP4vOpOGQVHw'
      script.async = true;
      document.head.appendChild(script);

      // Define the callback function
      window.initMap = initializeMap;

      script.onload = () => {
        initializeMap();
      };

      script.onerror = () => {
        console.error('Error loading Google Maps API.');
      };
    };

    // Check if the Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      loadScript();
    }

    return () => {
      // Remove the callback function from the global scope
      delete window.initMap;
    };
  }, []); 

  const initializeMap = () => {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: centerLocation.lat, lng: centerLocation.lng },
      zoom: 15,
    });

    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: map,
    });

    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
    
        // Display user marker on the map
        new window.google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location',
        });
    
        // Calculate and display directions
        calculateAndDisplayRoute(userLocation);
      },
      (error) => {
        console.error('Error getting user location:', error);
    
        // Default to a fallback location if user's location cannot be obtained
        const fallbackLocation = { lat: 42.525899, lng: 27.454538 };
        calculateAndDisplayRoute(fallbackLocation);
      }
    );
  };

  const calculateAndDisplayRoute = (userLocation) => {
    const request = {
      origin: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
      destination: new window.google.maps.LatLng(centerLocation.lat, centerLocation.lng),
      travelMode: 'DRIVING',
    };
  
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        // You can also access distance and duration from 'result' object
        console.log('Distance:', result.routes[0].legs[0].distance.text);
        console.log('Duration:', result.routes[0].legs[0].duration.text);
      } else {
        console.error('Error calculating route:', status);
      }
    });
  };
  

  return(
    <div className='findus-container'>
     <div id="map" style={{ height: '900px', width: '100%' }}>

  </div>
  </div>)
};

export default FindUs;