import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-md">
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <div className="mr-6">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex ml-auto space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-gray-300 hover:text-white text-base font-medium px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>

          {/* Logout Button */}
          {authStatus && (
            <div className="ml-4">
              <LogoutBtn />
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
