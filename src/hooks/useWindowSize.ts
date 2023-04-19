import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: global?.window?.innerWidth,
    height: global?.window?.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: global?.window?.innerWidth,
      height: global?.window?.innerHeight,
    });
  };

  useEffect(() => {
    if (!global?.window) return;

    global?.window?.addEventListener('resize', handleResize);

    // eslint-disable-next-line consistent-return
    return () => global?.window?.removeEventListener('resize', handleResize);
  }, [global?.window]);

  return windowSize;
};

export default useWindowSize;
