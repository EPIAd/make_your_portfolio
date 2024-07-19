export const comparedDataOptions = (width: number) => ({
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
  maintainAspectRatio: true,
  aspectRatio: width > 768 ? 2 : 1,
});

export const payDataOptions = (
  asset: '선택' | 'ACWI' | 'EWY' | 'QQQ' | 'SPY',
  width: number
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
        size: 20,
        family: 'Jeju Gothic',
      },
    },
  },
  maintainAspectRatio: true,
  aspectRatio: width > 768 ? 2 : 1,
});
