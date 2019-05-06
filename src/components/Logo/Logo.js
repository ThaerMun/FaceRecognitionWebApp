import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import bulb from './bulb.png';

const Logo = () => {
    return (
     <div>
         <Tilt className="Tilt br2 shadow-2 ma2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
         <div className="Tilt-inner"><img src = {bulb} alt = 'logo' /></div>
         </Tilt>
     </div>
    )
} 

export default Logo;