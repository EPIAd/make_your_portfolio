import assets from './asset-return-rate.csv';
import mbtiAssets from './mbti.csv';

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
  return assets.map((item: ReturnRateAsset) =>
    Number(item[asset].replace('%', '')) / 100
  );
};

export const getMbtiData = (mbti: string) => {
  const result: Record<string, number> = {};
  mbtiAssets.forEach((entry: Record<string, string>) => {
    const keys = Object.keys(entry);
    const key = keys.find((item) => item.includes(mbti)) || keys[1];
    result[entry.date] = Number(entry[key].replace('%', ''));
  });
  return result;
};
