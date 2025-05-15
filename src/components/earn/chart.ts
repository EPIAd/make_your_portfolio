import { useEffect, useState } from 'react';

// Function to detect dark mode preference
export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode;
};

export const comparedDataOptions = (width: number, isDarkMode: boolean) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: isDarkMode ? '#f5f5f5' : 'rgb(33, 53, 71)', // Text color based on mode
      }
    },
    title: {
      display: true,
      text: '전략별 누적 수익률 비교',
      color: isDarkMode ? '#f5f5f5' : 'rgb(33, 53, 71)', // Text color based on mode
      font: {
        size: 20,
        family: 'Jeju Gothic',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: isDarkMode ? '#f0f0f0' : '#666', // X-axis label color
      },
      grid: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', // Grid line color
      }
    },
    y: {
      ticks: {
        color: isDarkMode ? '#f0f0f0' : '#666', // Y-axis label color
        callback: function (value: string | number) {
          return `${value}%`;
        },
      },
      grid: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', // Grid line color
      }
    },
  },
  maintainAspectRatio: true,
  aspectRatio: width > 768 ? 2 : 1,
});

export const payDataOptions = (
  asset: 'TIGER 미국S&P500' | 'KODEX 미국나스닥100' | 'TIGER 미국배당다우존스' | 'PLUS 고배당주' | 'TIGER 유로스탁스50(합성 H)' | 'TIGER 차이나HSCEI' | 'TIGER 미국채10년선물' | 'WON 대한민국국고채액티브' | 'KODEX 장기종합채권(AA-이상)액티브' | 'ACE KRX금현물' | 'TIGER 리츠부동산인프라',
  width: number,
  isDarkMode: boolean
) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: isDarkMode ? '#f5f5f5' : 'rgb(33, 53, 71)', // Text color based on mode
      }
    },
    title: {
      display: true,
      text: `${asset} 적립식 투자 시뮬레이션`,
      color: isDarkMode ? '#f5f5f5' : 'rgb(33, 53, 71)', // Text color based on mode
      font: {
        size: 20,
        family: 'Jeju Gothic',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: isDarkMode ? '#f0f0f0' : '#666', // X-axis label color
      },
      grid: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', // Grid line color
      }
    },
    y: {
      ticks: {
        color: isDarkMode ? '#f0f0f0' : '#666', // Y-axis label color
      },
      grid: {
        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', // Grid line color
      }
    },
  },
  maintainAspectRatio: true,
  aspectRatio: width > 768 ? 2 : 1,
});
