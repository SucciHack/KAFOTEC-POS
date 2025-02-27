'use client'
import React from 'react';

const Loader = () => {
  return (
    <div className='bg-white h-screen w-screen fixed top-0 left-0 z-50 flex justify-center items-center'>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
