export const comparedDataOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '전략별 누적 수익률 비교',
      color: 'rgb(33, 53, 71)',
      font: {
        weight: 'bold',
        size: 20,
        family: 'Jeju Gothic',
      },
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
      color: 'rgb(33, 53, 71)',
      font: {
        weight: 'bold',
        size: 20,
        family: 'Jeju Gothic',
      },
    },
  },
});
