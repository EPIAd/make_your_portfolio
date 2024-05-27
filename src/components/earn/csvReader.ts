import assets from './asset-return-rate.csv';

type ReturnRateAsset = {
  date: string;
  ACWI: string;
  EWY: string;
  QQQ: string;
  SPY: string;
};

export const getReturnRateDate = () => {
  return assets.map((item: ReturnRateAsset) => item.date);
};

export const getReturnRate = (asset: 'ACWI' | 'EWY' | 'QQQ' | 'SPY') => {
  return assets.map((item: ReturnRateAsset) => Number(item[asset]));
};
