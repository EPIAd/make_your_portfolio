import assets from './asset-return-rate.csv';
import mbtiAssets from './mbti.csv';

type ReturnRateAsset = {
  date: string;
  'TIGER 미국S&P500': string;
  'KODEX 미국나스닥100': string;
  'TIGER 미국배당다우존스': string;
  'PLUS 고배당주': string;
  'TIGER 유로스탁스50(합성 H)': string;
  'TIGER 차이나HSCEI': string;
  'TIGER 미국채10년선물': string;
  'WON 대한민국국고채액티브': string;
  'KODEX 장기종합채권(AA-이상)액티브': string;
  'ACE KRX금현물': string;
  'TIGER 리츠부동산인프라': string
};

export const getReturnRateDate = () => {
  return assets.map((item: ReturnRateAsset) => item.date);
};

export const getReturnRate = (asset: 'TIGER 미국S&P500' | 'KODEX 미국나스닥100' | 'TIGER 미국배당다우존스' | 'PLUS 고배당주' | 'TIGER 유로스탁스50(합성 H)' | 'TIGER 차이나HSCEI' | 'TIGER 미국채10년선물' | 'WON 대한민국국고채액티브' | 'KODEX 장기종합채권(AA-이상)액티브' | 'ACE KRX금현물' | 'TIGER 리츠부동산인프라') => {
  return assets.map((item: ReturnRateAsset) => {
    // 값이 문자열이고 '%' 문자가 포함되어 있는 경우
    if (typeof item[asset] === 'string' && item[asset].includes('%')) {
      return Number(item[asset].replace('%', ''));
    }
    // 그렇지 않은 경우 (이미 소수점 형태의 퍼센트)
    return Number(item[asset]);
  });
};

export const getMbtiData = (mbti: string) => {
  return mbtiAssets.map((entry: Record<string, string>) => {
    const keys = Object.keys(entry);
    const matchingKeys = keys.filter(item => item.includes(`_${mbti}`));
    
    if (matchingKeys.length > 0) {
      // Option 1: Use the first matching key (what you were doing before)
      const key = matchingKeys[0];
      return Number(entry[key].replace('%', ''));
      
      // Option 2: Average of all matching keys (if you want to combine multiple MBTI profiles)
      // let sum = matchingKeys.reduce((acc, key) => acc + Number(entry[key].replace('%', '')), 0);
      // return sum / matchingKeys.length;
    }
    return 0; // Default if no matching MBTI code found
  });
};
