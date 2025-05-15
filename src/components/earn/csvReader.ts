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

export const getMbtiReturnRate = (mbtiCode: string) => {
  // 4자리 코드가 아니면 빈 배열 반환
  if (!/^\d{4}$/.test(mbtiCode)) {
    return [];
  }

  return mbtiAssets.map((entry: Record<string, string>) => {
    const keys = Object.keys(entry);
    // 모든 MBTI 타입에서 해당 코드를 포함하는 키 찾기 (예: ISTJ_2011, ENFP_2011 등)
    const matchingKeys = keys.filter(key => key.endsWith(`_${mbtiCode}`));
    
    if (matchingKeys.length > 0) {
      // 모든 해당 MBTI 타입의 평균값 계산
      let sum = 0;
      let validCount = 0;
      
      for (const key of matchingKeys) {
        const valueStr = entry[key];
        if (valueStr) {
          // '%' 문자가 있으면 제거
          const cleanValue = typeof valueStr === 'string' && valueStr.includes('%') 
            ? Number(valueStr.replace('%', '')) 
            : Number(valueStr);
            
          if (!isNaN(cleanValue)) {
            sum += cleanValue;
            validCount++;
          }
        }
      }
      
      return validCount > 0 ? sum / validCount : 0;
    }
    
    return 0; // 일치하는 코드가 없으면 0 반환
  });
};
