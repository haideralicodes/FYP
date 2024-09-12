import React, { useState, useEffect } from 'react';
import { FaHome, FaDollarSign, FaChartPie, FaRocket, FaUsersCog, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import StoreSetup from './StoreSetup';
import logo from '../assets/logo.png';

const sidebarItems = [
  { icon: <FaHome />, label: 'Home', hasArrow: false },
  { icon: <FaRocket />, label: 'Website', component: 'StoreSetup', hasArrow: false },
  { icon: <FaDollarSign />, label: 'Set Payment', hasArrow: true },
  // { icon: <FaChartPie />, label: 'Analytics', hasArrow: false },
  { icon: <FaUsersCog />, label: 'Social Account', hasArrow: true },
  { icon: <FaEnvelope />, label: 'Posters', hasArrow: true },
];

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login page
          return;
        }

        const response = await fetch('http://localhost:4000/api/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token'); // Clear the token
            navigate('/login'); // Redirect to login page
          } else {
            const errorData = await response.json();
            console.error('Error fetching user data:', errorData.message);
          }
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleItemClick = (component) => {
    setActiveComponent(component);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">

        {sidebarItems.map((item, index) => (
          <div
            className="sidebar-item"
            key={index}
            onClick={() => handleItemClick(item.component)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.hasArrow && <IoIosArrowForward className="arrow-icon" />}
          </div>
        ))}

        {user && (
          <div className="user-profile">
            <img
              src={
                user.profilePic
                  ? `http://localhost:4000/uploads/${user.profilePic}`
                  : 'https://via.placeholder.com/80'
              }
              className="profile-pic"
            />
            <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>
          </div>
        )}

        <div className="sidebar-item logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Log Out</span>
        </div>
      </div>

      <div>
        {activeComponent === 'StoreSetup' && <StoreSetup />}
      </div>
    </div>
  );
};

export default Sidebar;