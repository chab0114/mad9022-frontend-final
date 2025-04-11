import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Crap from "./pages/Crap";
import Header from "./components/Header";
import Login from "./pages/Login";
import Offer from "./pages/Offer";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Crap />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/offer" element={<Offer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
