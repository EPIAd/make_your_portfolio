import { ChartOptions } from 'chart.js';
import { Context } from 'chartjs-plugin-datalabels';
import { isMobile } from 'react-device-detect';

let delayed: number | boolean;
export const chartOptions = (yMax?: number): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: !isMobile,
      stacked: true,
    },
    y: {
      display: !isMobile,
      min: 0,
      max: isMobile ? undefined : yMax,
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      formatter: (_: unknown, context: Context) => {
        return context.dataset.data[0] !== 0 ? context.dataset.label : '';
      },
      display: true,
      color: 'white',
      anchor: 'end' as const,
      align: 'start' as const,
    },
  },
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context: {
      type: string;
      mode: string;
      dataIndex: number;
      datasetIndex: number;
    }): number => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
});

export const makeDepositDataset = (R: number) => [
  {
    label: '일반예금',
    data: [R],
    backgroundColor: 'rgb(67, 175, 226)',
  },
];
export const makeISADataset = (a: number, max: number) => [
  {
    label: `ISA`,
    data: [a],
    backgroundColor: 'rgb(255, 167, 11)',
  },
  {
    label: '최대 납입 금액',
    data: [max - a],
    backgroundColor: 'rgb(219, 219, 219)',
  },
];

export const makeIRPDataset = (b1: number, b2: number, max: number) => [
  {
    label: '연금저축',
    data: [b1],
    backgroundColor: 'rgb(255, 99, 132)',
  },
  {
    label: 'IRP',
    data: [b2],
    backgroundColor: 'rgb(75, 192, 192)',
  },
  {
    label: '최대 납입 금액',
    data: [max - b1 - b2],
    backgroundColor: 'rgb(219, 219, 219)',
  },
];
