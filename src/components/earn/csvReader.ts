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

type MbtiAsset = {
  date: string;
  [key: string]: string; // 모든 MBTI_CODE 컬럼을 위한 동적 필드
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
  // 4자리 숫자 코드만 받도록 합니다
  if (!/^\d{4}$/.test(mbtiCode)) {
    return [];
  }

  // 각 MBTI 타입에 대한 접두사 리스트
  const mbtiPrefixes = [
    'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
    'INTJ', 'INTP', 'INFJ', 'INFP',
    'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
    'ENTJ', 'ENTP', 'ENFJ', 'ENFP'
  ];
  
  // 모든 MBTI 타입에 대해 해당 코드의 값을 검색하여 배열로 반환
  return mbtiAssets.map((item: MbtiAsset) => {
    // 각 MBTI 타입에 대한 해당 코드 열 찾기
    for (const prefix of mbtiPrefixes) {
      const columnName = `${prefix}_${mbtiCode}`;
      if (item[columnName]) {
        // 값이 있으면 변환하여 반환
        return item[columnName].includes('%')
          ? Number(item[columnName].replace('%', ''))
          : Number(item[columnName]);
      }
    }
    // 일치하는 열을 찾지 못한 경우 0 반환
    return 0;
  });
};