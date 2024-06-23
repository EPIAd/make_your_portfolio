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
  scales: {
    y: {
      ticks: {
        callback: (value: number) => `${value}%`,
      },
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
