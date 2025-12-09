import React from 'react';
import SEO from 'Components/Seo/Seo';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Welcome to the React + Vite Starter Template" 
        url="https://yourdomain.com/" 
      />
      <div className="text-center py-20" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-4">React + Vite Template</h1>
        <p className="text-lg text-gray-600">Production ready architecture with SEO, Routing, and Tailwind CSS.</p>
        <p className="mt-4 text-sm text-gray-400">Edit src/Pages/Home/Home.jsx to start building.</p>
      </div>
    </>
  );
};
export default Home;