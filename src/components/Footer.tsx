
import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-16 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-tight">
              <span>The</span>
              <span className="text-primary">Boolean</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              A modern agency providing software development services and tech-based news and blogs.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/storytelling" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Storytelling
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Bikes
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Gadgets
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Software
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <MapPin size={16} className="mr-2 text-muted-foreground mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Boolean Street, Tech City, 10001
                </span>
              </li>
              <li className="flex items-center text-sm">
                <Phone size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-sm">
                <Mail size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                <a href="mailto:contact@theboolean.com" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@theboolean.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-10">
          <NewsletterSignup />
        </div>
        <div className="border-t border-border/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} TheBoolean. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
