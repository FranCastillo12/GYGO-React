import "../../styles/ServicesPage.css";
import { PublicHeader } from "../../components/PublicHeader";
import Footer from "../../components/Footer";
import { Phone, Mail, MapPin } from 'lucide-react';
export const ContactUs = () => {
    return (
        <div className="services-page">
              <PublicHeader />
              <main>
            {/* Contact Section */}
            <section className="contact-section">
              <div className="container">
                <div className="contact-content">
                  <div className="contact-info">
                    <h2 className="contact-title">¿Listo para comenzar?</h2>
                    <p className="contact-subtitle">
                      Contacta con nosotros para obtener más información sobre nuestros servicios
                    </p>
                    <div className="contact-details">
                      <div className="contact-item">
                        <Phone className="w-6 h-6" />
                        <div>
                          <h4>Teléfono</h4>
                          <p>+506 2222-3333</p>
                        </div>
                      </div>
                      <div className="contact-item">
                        <Mail className="w-6 h-6" />
                        <div>
                          <h4>Email</h4>
                          <p>info@greenon.com</p>
                        </div>
                      </div>
                      <div className="contact-item">
                        <MapPin className="w-6 h-6" />
                        <div>
                          <h4>Ubicación</h4>
                          <p>San José, Costa Rica</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-form">
                    <h3>Solicita una Consulta</h3>
                    <form>
                      <div className="form-group">
                        <input type="text" placeholder="Nombre completo" required />
                      </div>
                      <div className="form-group">
                        <input type="email" placeholder="Correo electrónico" required />
                      </div>
                      <div className="form-group">
                        <input type="tel" placeholder="Teléfono" required />
                      </div>
                      <div className="form-group">
                        <select required>
                          <option value="">Selecciona un servicio</option>
                          <option value="consultoria">Consultoría en Gestión Ambiental</option>
                          <option value="planes">Planes y Programas</option>
                          <option value="eventos">Eventos Sostenibles</option>
                          <option value="certificaciones">Certificaciones</option>
                          <option value="educacion">Educación Ambiental</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <textarea placeholder="Mensaje" rows="4" required></textarea>
                      </div>
                      <button type="submit" className="submit-btn">
                        Enviar Mensaje
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            </main>
                  <Footer />
                </div>)}