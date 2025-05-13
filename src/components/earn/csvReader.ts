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
  return assets.map((item: ReturnRateAsset) => {
    // 값이 문자열이고 '%' 문자가 포함되어 있는 경우
    if (typeof item[asset] === 'string' && item[asset].includes('%')) {
      return Number(item[asset].replace('%', '')) / 100;
    }
    // 그렇지 않은 경우 (이미 소수점 형태의 퍼센트)
    return Number(item[asset]) / 100;
  });
};

export const getMbtiData = (mbti: string) => {
  const result: Record<string, number> = {};
  mbtiAssets.forEach((entry: Record<string, string>) => {
    const keys = Object.keys(entry);
    // 모든 MBTI 타입(ISTJ, ISTP 등)에서 해당 코드를 찾음
    const key = keys.find((item) => item.includes(`_${mbti}`)) || keys[1];
    // % 제거하고 숫자로 변환
    result[entry.date] = Number(entry[key].replace('%', ''));
  });
  return result;
};
