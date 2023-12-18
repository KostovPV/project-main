
import React, { useEffect, useState } from 'react';

const FindUs = () => {
  const [loading, setLoading] = useState(true);
  const centerLocation = { lat: 42.525899, lng: 27.454538 };

  useEffect(() => {
   
    const initializeMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: centerLocation,
        zoom: 15,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: map,
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: 'Your Location',
          });

          calculateAndDisplayRoute(userLocation);
        },
        (error) => {
          console.error('Error getting user location:', error);

          const fallbackLocation = { lat: 42.525899, lng: 27.454538 };
          calculateAndDisplayRoute(fallbackLocation);
        }
      );

      const calculateAndDisplayRoute = (userLocation) => {
        const request = {
          origin: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
          destination: new window.google.maps.LatLng(centerLocation.lat, centerLocation.lng),
          travelMode: 'DRIVING',
        };

        directionsService.route(request, (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
          } else {
            console.error('Error calculating route:', status);
          }
        });
      };
    };

    
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAX6SEchN9tHFooLh3-FH9FP4vOpOGQVHw&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);

      script.onerror = () => {
        setLoading(false);
        console.error('Error loading Google Maps API.');
      };
    };


    window.initMap = initializeMap;

    
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      loadScript();
    }

    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <div className='findus-container'>
      
      <div id="map" style={{ height: '100vh', width: '100%' }} />
    </div>
  );
};

export default FindUs;
