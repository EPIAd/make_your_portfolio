import { TaxSavingScores } from '@/shared/types/survey';

// 절세 MBTI 결과 계산식
export const calcISA = (scores: TaxSavingScores | null) => {
  if (!scores) return;
  const { s1, s2, s3 } = scores;
  // 금융소득종합과세 대상자일경우 ISA
  if (s1 === 200) {
    if (s2 === 10) return '국내투자형ISA';
    else if (s2 === 20 && s3 !== 1) return '국내투자형ISA';
    else if (s2 === 30) return '';
  }

  if (s2 === 10 || (s2 === 20 && s3 !== 1)) {
    return ['서민형ISA', '서민형ISA', '서민형ISA', '농어민형ISA', '일반형ISA'][
      s3 - 1
    ];
  } else {
    return '';
  }
};

export const calcISAEffect = (scores: TaxSavingScores | null) => {
  if (!scores) return;
  const { s1, s2, s3 } = scores;
  const total = s1 + s2 + s3;
  if ((s1 === 100 && s2 === 10) || (s1 === 100 && s2 === 20 && s3 !== 1)) {
    return '최대 400만원 비과세, 이후 9.9%저율 분리과세';
  }
  if ((s1 === 200 && s2 === 10) || (s1 === 200 && s2 === 20 && s3 !== 1)) {
    return '미정';
  }
  if ([221, 121].includes(total)) {
    return '없음';
  }
  return '';
};

export const calcB1 = (useAmount: number) => {
  if (useAmount <= 600) {
    return [useAmount, 0, 0];
  } else if (useAmount <= 900) {
    return [600, useAmount - 600, 0];
  } else if (useAmount <= 1800) {
    return [useAmount - 300, 300, 0];
  } else {
    return [1500, 300, useAmount - 1800];
  }
};
