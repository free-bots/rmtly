import {useEffect, useRef} from 'react';

export const usePrevious = (value: any): any | undefined => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
