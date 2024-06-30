export const comparedDataOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '전략별 누적 수익률 비교',
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (value: string | number) {
          return `${value}%`;
        },
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
      text: `${asset} 적립식 투자 시뮬레이션`,
    },
  },
});
