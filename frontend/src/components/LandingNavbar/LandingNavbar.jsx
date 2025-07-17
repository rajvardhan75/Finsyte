import React from 'react';
import Dock from './Dock';

import { VscHome } from 'react-icons/vsc';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiMoney } from 'react-icons/bi';

const LandingNavbar = () => {
  const items = [
    {
      icon: <VscHome size={18} color='white'/>,
      label: 'Home',
    },
    {
      icon: <MdMiscellaneousServices size={18} color='white' />,
      label: 'Services',
    },
    {
      icon: <BiMoney size={18} color='white' />,
      label: 'Pricing',
    },
    {
      icon: <FaRegAddressCard size={18} color='white' />,
      label: 'About Us',
    },
    
  ];

  return (
    <Dock
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={75}
    />
  );
};

export default LandingNavbar;
