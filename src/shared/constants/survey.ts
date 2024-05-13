/** 투자 설문 */
export const INVEST_SURVEY: Array<{
  title: string;
  answers: Array<{ s1?: number; s2?: number; s3?: number; s4?: number; s5?: number; label: string }>;
}> = [
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '금' },
      { s1: 10, label: '비트코인' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '미국 국채' },
      { s1: 10, label: '테슬라' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '금' },
      { s1: 10, label: '유가' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: 'S&P500' },
      { s1: 10, s5: 1, label: '나스닥' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '예금(적금)' },
      { s1: 10, s5: 1, label: '삼성전자' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '코카콜라' },
      { s1: 10, s5: 1, label: '아마존' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '인텔' },
      { s1: 10, s5: 1, label: '넷플릭스' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '신한지주' },
      { s1: 10, s5: 1, label: '카카오' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '반도체 테마' },
      { s1: 10, s5: 1, label: '2차전지 테마' },
    ],
  },
  {
    title: '둘 중 하나만 투자한다면?',
    answers: [
      { s1: 0, label: '한국 3년 만기 국고채' },
      { s1: 10, label: '브라질 3년 만기 국채' },
    ],
  },
  {
    title: '채권 투자시 둘 중 하나를 고른다면?',
    answers: [
      { s2: 0, label: '이미지1' },
      { s2: 1, label: '이미지2' },
    ],
  },
  {
    title: '채권 투자시 둘 중 하나를 고른다면?',
    answers: [
      { s2: 0, label: '이미지1' },
      { s2: 1, label: '이미지2' },
    ],
  },
  {
    title: '채권 투자시 둘 중 하나를 고른다면?',
    answers: [
      { s2: 0, label: '이미지1' },
      { s2: 1, label: '이미지2' },
    ],
  },
  {
    title: '채권 투자시 둘 중 하나를 고른다면?',
    answers: [
      { s2: 0, label: '이미지1' },
      { s2: 1, label: '이미지2' },
    ],
  },
  {
    title: '주식 자산 중 투자하고 싶은 지역은?',
    answers: [
      { s3: 0, label: '글로벌' },
      { s3: 1, label: '한국' },
      { s3: 2, label: '미국' },
      { s3: 3, label: '중국' },
      { s3: 4, label: '유럽' },
    ],
  },
  {
    title: '추가적으로 투자하고 싶은 대체자산은?',
    answers: [
      { s4: 0, label: '금' },
      { s4: 1, label: '부동산' },
      { s4: 2, label: '원유' },
      { s4: 3, label: '비트코인' },
    ],
  },
];

export const SURVEY_LENGTH = INVEST_SURVEY.length;
