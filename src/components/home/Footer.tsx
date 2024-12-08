import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">About Us</h3>
            <p className="text-sm">
              Providing quality healthcare services with modern technology and experienced professionals.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("/about")} className="hover:text-white">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/contact")} className="hover:text-white">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/help")} className="hover:text-white">
                  Help & Support
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Appointments</li>
              <li>Emergency Care</li>
              <li>Online Consultation</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@hospital.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Healthcare Ave</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 Hospital Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};