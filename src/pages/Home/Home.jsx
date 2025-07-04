import React from 'react';
import Banner from '../../HomeSection/Banner';
import HowItWorks from '../../HomeSection/HowItWorks ';
import ServicesSection from '../../HomeSection/ServicesSection';
import MarqueeSection from '../../HomeSection/MarqueeSection';
import FeatureSection from '../../HomeSection/FeatureSection';

const Home = () => {
    return (
        <>
        <Banner/>
        <HowItWorks/>
        <ServicesSection/>
        <MarqueeSection/>
        <FeatureSection/>
        </>
    );
};

export default Home;