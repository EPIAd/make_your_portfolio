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

export const payDataOptions = (
  asset: '선택' | 'ACWI' | 'EWY' | 'QQQ' | 'SPY'
) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: `${asset} 적립 투자 시, 투자기간별 누적 금액`,
    },
  },
});
