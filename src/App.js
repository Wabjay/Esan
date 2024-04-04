import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Books from "./pages/Books";
import AdminHome from "./pages/AdminHome";
import AdminBook from "./pages/AdminBook";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config";
import Onboard from "./pages/Onboard";

function App() {
  const [user, error] = useAuthState(auth);



  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        {user ?
          <>
            <Navbar />

            <Routes>
              <Route exact path="/" element={<AdminHome />} />
              <Route exact path="/addbook" element={<CreatePost />} />
              <Route exact path="/admin" element={<AdminHome />} />
              <Route exact path="/adminlevel/:level" element={<AdminBook />} />
              <Route exact path="*" element={<AdminHome />} />
            </Routes>
          </>
          :
          <Routes>
            <Route exact path="/" element={<Onboard />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/level/:level" element={<Books />} />
            <Route exact path="*" element={<Onboard />} />
            <Route exact path="/onboard" element={<Onboard />} />
          </Routes>
        }
      </Router>
    </div>
  );
}

export default App;
