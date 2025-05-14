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
  asset: 'TIGER 미국S&P500' | 'KODEX 미국나스닥100' | 'TIGER 미국배당다우존스' | 'PLUS 고배당주' | 'TIGER 유로스탁스50(합성 H)' | 'TIGER 차이나HSCEI' | 'TIGER 미국채10년선물' | 'WON 대한민국국고채액티브' | 'KODEX 장기종합채권(AA-이상)액티브' | 'ACE KRX금현물' | 'TIGER 리츠부동산인프라',
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
