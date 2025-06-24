import { useEffect } from "react";
import { PublicHeader } from "../components/PublicHeader";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import { useAuth } from "../AuthContext";

export const HomePage = () => {
  const { logout } = useAuth();


  useEffect(() => {
    logout();
  }, []);


  return (
    <div className="home-page">
      <PublicHeader />
      <main>
        <section className="brand-section">
          <div className="container">
            <div className="brand-logo">
              <div className="logo-container">
                <img
                  src="src\assets\BigLogo.png"
                  alt="Green On Logo"
                  className="logo-image"
                ></img>
              </div>
              <p className="brand-tagline">
                SOLUCIÓN DE CONSULTORÍA DE SOSTENIBILIDAD
              </p>
            </div>
          </div>
        </section>
        <Hero />
        <Mission />
      </main>
      <Footer />
    </div>
  );
};
