import React from 'react';
import SEO from 'Components/Seo/Seo';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Welcome to Digiopt Starter Kit" 
        url="https://yourdomain.com/" 
      />
      <div className="text-center py-20" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-4">React + Vite Starter</h1>
        <p>Production ready architecture.</p>
      </div>
    </>
  );
};
export default Home;