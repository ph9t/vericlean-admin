import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Header from "./components/Header";
import Task from "./pages/Task";
// import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";

const App = () => {
  return (
    <>
      <Router>
        <HelmetProvider>
          {/* <div className="container"> */}
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Page404 />} />
              <Route path="/task" element={<Task />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          {/* </div> */}
        </HelmetProvider>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
