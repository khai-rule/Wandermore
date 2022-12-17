import * as React from 'react';
import HeroLayout from './HeroLayout';

const backgroundImage =
  'https://kinfolkmagprod.wpenginepowered.com/wp-content/uploads/2021/11/01_Mirbach_HiRes_sRGB-2048x1384.jpg';

export default function ProductHero() {
  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
      }}
    >
    </HeroLayout>
  );
}