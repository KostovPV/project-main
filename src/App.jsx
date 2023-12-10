import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

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
        
        <Footer />
      </div>
    </>
  );
}

export default App;
