import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/time.png"
        alt="time logo"
        className="w-8 h-6 mr-3 animate-spin"
      />
    </div>
  );
};

export default Loader;