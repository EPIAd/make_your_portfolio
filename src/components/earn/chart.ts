export const comparedDataOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '적립식 투자의 누적수익률 비교',
    },
  },
};

export const payDataOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '적립 투자 시, 투자 기간에 따른 누적 금액',
    },
  },
};
