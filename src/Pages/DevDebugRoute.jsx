import { Link } from 'react-router-dom';

export default function DebugRoutes() {
  const routes = [
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register (Normal)' },
    { path: '/register/test-token-123', label: 'Register (With Invite)' },
    { path: '/2fa?tempToken=test-temp-token', label: '2FA Verification' },
    { path: '/invite', label: 'Send Invite' },
    { path: '/', label: 'Back to Debug Home (this page)' },
  ];

  return (
    <div>
      <h2>📄 Debug Navigation</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}