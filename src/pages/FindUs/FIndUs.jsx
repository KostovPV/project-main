// import React, { useEffect, useState } from 'react';

// const FindUs = () => {
//   const [loading, setLoading] = useState(true);

//   const centerLocation = { lat: 42.525899, lng: 27.454538 };
//   let map;
//   let directionsService;
//   let directionsRenderer;

//   useEffect(() => {
//     const loadScript = () => {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAX6SEchN9tHFooLh3-FH9FP4vOpOGQVHw&libraries=places`;
//       script.async = true;
//       document.head.appendChild(script);

//       window.initMap = initializeMap;

//       script.onload = () => {
//         setLoading(false);
//         initializeMap();
//       };

//       script.onerror = () => {
//         setLoading(false);
//         console.error('Error loading Google Maps API.');
//       };
//     };

//     if (window.google && window.google.maps) {
//       initializeMap();
//     } else {
//       loadScript();
//     }

//     return () => {
//       delete window.initMap;
//     };
//   }, []);

//   const initializeMap = () => {
//     map = new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: centerLocation.lat, lng: centerLocation.lng },
//       zoom: 15,
//     });

//     directionsService = new window.google.maps.DirectionsService();
//     directionsRenderer = new window.google.maps.DirectionsRenderer({
//       map: map,
//     });

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         new window.google.maps.Marker({
//           position: userLocation,
//           map: map,
//           title: 'Your Location',
//         });

//         calculateAndDisplayRoute(userLocation);
//       },
//       (error) => {
//         console.error('Error getting user location:', error);

//         const fallbackLocation = { lat: 42.525899, lng: 27.454538 };
//         calculateAndDisplayRoute(fallbackLocation);
//       }
//     );
//   };

//   const calculateAndDisplayRoute = (userLocation) => {
//     const request = {
//       origin: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
//       destination: new window.google.maps.LatLng(centerLocation.lat, centerLocation.lng),
//       travelMode: 'DRIVING',
//     };

//     directionsService.route(request, (result, status) => {
//       if (status === 'OK') {
//         directionsRenderer.setDirections(result);
//         // console.log('Distance:', result.routes[0].legs[0].distance.text);
//         // console.log('Duration:', result.routes[0].legs[0].duration.text);
//       } else {
//         console.error('Error calculating route:', status);
//       }
//     });
//   };

//   return (
//     <div className='findus-container'>
//       {loading && <p>Loading...</p>}
//       <div id="map" style={{ height: '100vh', width: '100%' }} />
//     </div>
//   );
// };

// export default FindUs;


import React, { useEffect, useState } from 'react';

const FindUs = () => {
  const [loading, setLoading] = useState(true);
  const centerLocation = { lat: 42.525899, lng: 27.454538 };

  useEffect(() => {
    // Define the initializeMap function inside useEffect
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

    // Load the Google Maps script
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

    // Assign initializeMap to window.initMap
    window.initMap = initializeMap;

    // Load the script or initialize the map
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      loadScript();
    }

    // Clean up
    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <div className='findus-container'>
      {loading && <p>Loading...</p>}
      <div id="map" style={{ height: '100vh', width: '100%' }} />
    </div>
  );
};

export default FindUs;
