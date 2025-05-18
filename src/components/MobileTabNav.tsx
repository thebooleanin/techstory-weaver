import { Home, FileText, BookOpen, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Articles', path: '/articles', icon: FileText },
  { name: 'Stories', path: '/storytelling', icon: BookOpen },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const MobileTabNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex justify-around items-center h-16 md:hidden shadow-t">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.name}
            to={tab.path}
            className={`flex flex-col items-center justify-center flex-1 h-full px-2 py-1 text-xs font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-6 w-6 mb-1" />
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileTabNav;
