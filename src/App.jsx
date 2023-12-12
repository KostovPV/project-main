import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import { useEffect, useState } from "react";
import { db } from "./firebase/config";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

// import all page
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FindUs from "./pages/FindUs/FindUs";
import Create from "./pages/Create/Creat";
import Details from "./pages/Details/Details";
import Edit from "./pages/Edit/Edit";

import List from "./pages/List/List";
import Packages from "./pages/Packages/Packages";

import Profile from "./pages/Profile/Prifile";


import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthGuard from "./components/guards/authGuard";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [visitCount, setVisitCount] = useState(0);
  
  // useEffect(() => {
  //   if (user && authIsReady) { // Only proceed if user is logged in and auth is ready
  //     const fetchAndUpdateVisitCount = async () => {
  //       const visitDocRef = doc(db, "visits", "visitorCount");
  
  //       const visitDoc = await getDoc(visitDocRef);
  //       let isNewVisit = false;
  
  //       if (visitDoc.exists()) {
  //         // Check if the current user has visited before
  //         isNewVisit = !(visitDoc.data().usersVisited?.includes(user.uid));
          
  //         if (isNewVisit) {
  //           // Update the visit count and mark this user as having visited
  //           await updateDoc(visitDocRef, {
  //             count: visitDoc.data().count + 1,
  //             usersVisited: [...(visitDoc.data().usersVisited || []), user.uid]
  //           });
  //         }
  
  //         // Update the local state regardless of whether it's a new visit
  //         setVisitCount(visitDoc.data().count + (isNewVisit ? 1 : 0));
  //       } else {
  //         // Create the document if it doesn't exist
  //         await setDoc(visitDocRef, { count: 1, usersVisited: [user.uid] });
  //         setVisitCount(1);
  //       }
  //     };
  
  //     fetchAndUpdateVisitCount();
  //   }
  // }, [user, authIsReady]); // Dependency array includes user and authIsReady
  
  useEffect(() => {
    const fetchVisitCount = async () => {
      const visitDocRef = doc(db, "visits", "visitorCount");
  
      try {
        const visitDoc = await getDoc(visitDocRef);
        if (visitDoc.exists()) {
          return visitDoc.data().count; // Return the current count
        } else {
          // Create the document if it doesn't exist
          await setDoc(visitDocRef, { count: 1 });
          return 1;
        }
      } catch (error) {
        console.error("Error fetching visit count:", error);
        return 0;
      }
    };
  
    const updateVisitCount = async () => {
      const currentCount = await fetchVisitCount();
      setVisitCount(currentCount); // Update state immediately with the fetched count
  
      if (user && authIsReady && !sessionStorage.getItem("hasVisited")) {
        const visitDocRef = doc(db, "visits", "visitorCount");
        await updateDoc(visitDocRef, {
          count: currentCount + 1
        });
        sessionStorage.setItem("hasVisited", "true");
        setVisitCount(currentCount + 1); // Update state again with the incremented count
      }
    };
  
    updateVisitCount();
  }, [user, authIsReady]);
  
  
  console.log(authIsReady);

  return (
    <>
      <div className="site-wrap" id="home-section">
        <div className="appRenderPreview">
          {authIsReady && (
            <BrowserRouter>
              <Header />
              <Routes>
                <>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/about" element={<AuthGuard><About /></AuthGuard>}></Route>
                  <Route path="/packages" element={<AuthGuard><Packages /></AuthGuard>}></Route>

                  <Route path="/findus" element={<FindUs />}></Route>
                  <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>}></Route>
                  <Route path="/create" element={<AuthGuard><Create /></AuthGuard>}></Route>
                  <Route path="/list" element={<AuthGuard><List /></AuthGuard>}></Route>
                  <Route path="/list/:id" element={<AuthGuard><Details /></AuthGuard>}></Route>
                  <Route path="/list/:id/edit" element={<AuthGuard><Edit /></AuthGuard>}></Route>
                </>
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                ></Route>
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                ></Route>
              </Routes>
            </BrowserRouter>
          )}
        </div>

        <Footer visitCount={visitCount}  />
      </div>
    </>
  );
}

export default App;
