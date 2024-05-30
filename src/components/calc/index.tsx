import { useEffect, useState } from 'react';
import { Calc as CalcComponent } from './calc';

export const CalcResult = ({
  component: Component,
}: {
  component: React.ComponentType;
}) => {
  const [isShowCalc, setIsShowCalc] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowCalc(false);
    }, 8000);
  }, []);

  if (isShowCalc) return <CalcComponent />;
  return <Component />;
};
