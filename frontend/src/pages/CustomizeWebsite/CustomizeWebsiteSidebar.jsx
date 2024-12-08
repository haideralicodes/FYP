import React, { useState } from 'react';
import { FaPlusCircle, FaPager, FaFileAlt } from 'react-icons/fa';
import ImageIcon from '@mui/icons-material/Image';
import './CustomizeWebsiteSidebar.css';

const sidebarItems = [
  { icon: <FaPlusCircle />, id: 'plus' },
  { icon: <FaPager />, id: 'addNewSection' },
  // { icon: <ImageIcon />, id: 'file' },
];

const CustomizeWebsiteSidebar = ({ onItemClick }) => {

  return (
    <div className="CustomizeSidebar">
      <ul className="customize-sidebar-nav">
        {sidebarItems.map((item, index) => (
          <li
            className="customize-sidebar-item"
            key={index}
            onClick={() => onItemClick(item.id)} 
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomizeWebsiteSidebar;
