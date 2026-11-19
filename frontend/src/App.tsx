import Signin from "./Signin.tsx";
import Signup from "./Signup.tsx";
import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./HomePage.tsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
