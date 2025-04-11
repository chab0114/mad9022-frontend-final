import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/holycrap.png";
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img className={styles.logoImage} src={logo} alt="logo" />{" "}
          <h1 className={styles.logoName}>HolyCrap</h1>
        </div>
        <nav className={styles.nav}>
          <div className={styles.primaryLinks}>
            <Link className={styles.link} to="/">
              Home
            </Link>
            <Link className={styles.link} to="/about">
              About
            </Link>
          </div>
          
          <div className={styles.actionLinks}>
            <Link className={styles.actionLink} to="/offer">
              <button className={styles.actionButton}>Offer Crap</button>
            </Link>
            <Link className={styles.actionLink} to="/mine">
              <button className={styles.actionButton}>My Crap</button>
            </Link>
            <Link to={{ pathname: "/login" }}>
              <button className={styles.loginButton}>Login</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;