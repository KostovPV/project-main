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
import Events from "./pages/Events/Events";
import GetStarted from "./pages/GetStared/GetStarted";
import List from "./pages/List/List";
import Packages from "./pages/Packages/Packages";
import Prices from "./pages/Prices/Prices";
import Profile from "./pages/Profile/Prifile";
import Testimonials from "./pages/Testimonials/Testimonials";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/packages" element={<Packages />}></Route>
                  <Route path="/prices" element={<Prices />}></Route>
                  <Route path="/findus" element={<FindUs />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/create" element={<Create />}></Route>
                  <Route path="/list" element={<List />}></Route>
                  <Route path="/list/:id" element={<Details />}></Route>
                  <Route path="/list/:id/edit" element={<Edit />}></Route>
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
        {/* footer content */}
        <Footer />
      </div>
    </>
  );
}

export default App;
