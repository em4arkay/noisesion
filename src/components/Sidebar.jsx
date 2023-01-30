import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiOutlineMap, 
  HiOutlineHome, 
  HiOutlineMenu, 
  HiOutlineLocationMarker, 
  HiOutlineUserGroup,
  HiOutlineGlobe, 
} from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { tuning } from '../assets';

const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlineLocationMarker },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts Global', to: '/top-charts', icon: HiOutlineGlobe },
  { name: 'Top Charts by Country', to: '/top-country', icon: HiOutlineMap },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium font-dmsans text-white hover:text-lightblue"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-black">
        <img src={tuning} alt="tuning" className="h-14 object-contain" />
        <p className='text-blue font-dmsans font-semibold text-center text-3xl'>noisesion</p>
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-grey backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={tuning} alt="tuning" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
