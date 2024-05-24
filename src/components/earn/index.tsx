import { useState } from 'react';
import styles from './earn.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

const AMOUNT_MAX = 2000;
const YEAR_MAX = 50;

const SAVING = [
  { label: '한국 예금: 금리 5%', value: '0.05' },
  { label: '해외 예금: 금리 6%', value: '0.06' },
] as const;

type Saving = Pick<(typeof SAVING)[number], 'value'>['value'];

const ASSET_LIST = ['선택', 'ACWI', 'EWY', 'QQQ', 'SPY'] as const;
const NUMBER_CODE_REGEX = /^\d{4}$/;
const dates = [
  '2010-01-16',
  '2010-02-16',
  '2010-03-16',
  '2010-04-16',
  '2010-05-16',
  '2010-06-16',
  '2010-07-16',
  '2010-08-16',
  '2010-09-16',
  '2010-10-16',
  '2010-11-16',
  '2010-12-16',
  '2011-01-16',
  '2011-02-16',
  '2011-03-16',
  '2011-04-16',
  '2011-05-16',
  '2011-06-16',
  '2011-07-16',
  '2011-08-16',
  '2011-09-16',
  '2011-10-16',
  '2011-11-16',
  '2011-12-16',
  '2012-01-16',
  '2012-02-16',
  '2012-03-16',
  '2012-04-16',
  '2012-05-16',
  '2012-06-16',
  '2012-07-16',
  '2012-08-16',
  '2012-09-16',
  '2012-10-16',
  '2012-11-16',
  '2012-12-16',
  '2013-01-16',
  '2013-02-16',
  '2013-03-16',
  '2013-04-16',
  '2013-05-16',
  '2013-06-16',
  '2013-07-16',
  '2013-08-16',
  '2013-09-16',
  '2013-10-16',
  '2013-11-16',
  '2013-12-16',
  '2014-01-16',
  '2014-02-16',
  '2014-03-16',
  '2014-04-16',
  '2014-05-16',
  '2014-06-16',
  '2014-07-16',
  '2014-08-16',
  '2014-09-16',
  '2014-10-16',
  '2014-11-16',
  '2014-12-16',
  '2015-01-16',
  '2015-02-16',
  '2015-03-16',
  '2015-04-16',
  '2015-05-16',
  '2015-06-16',
  '2015-07-16',
  '2015-08-16',
  '2015-09-16',
  '2015-10-16',
  '2015-11-16',
  '2015-12-16',
  '2016-01-16',
  '2016-02-16',
  '2016-03-16',
  '2016-04-16',
  '2016-05-16',
  '2016-06-16',
  '2016-07-16',
  '2016-08-16',
  '2016-09-16',
  '2016-10-16',
  '2016-11-16',
  '2016-12-16',
  '2017-01-16',
  '2017-02-16',
  '2017-03-16',
  '2017-04-16',
  '2017-05-16',
  '2017-06-16',
  '2017-07-16',
  '2017-08-16',
  '2017-09-16',
  '2017-10-16',
  '2017-11-16',
  '2017-12-16',
  '2018-01-16',
  '2018-02-16',
  '2018-03-16',
  '2018-04-16',
  '2018-05-16',
  '2018-06-16',
  '2018-07-16',
  '2018-08-16',
  '2018-09-16',
  '2018-10-16',
  '2018-11-16',
  '2018-12-16',
  '2019-01-16',
  '2019-02-16',
  '2019-03-16',
  '2019-04-16',
  '2019-05-16',
  '2019-06-16',
  '2019-07-16',
  '2019-08-16',
  '2019-09-16',
  '2019-10-16',
  '2019-11-16',
  '2019-12-16',
  '2020-01-16',
  '2020-02-16',
  '2020-03-16',
  '2020-04-16',
  '2020-05-16',
  '2020-06-16',
  '2020-07-16',
  '2020-08-16',
  '2020-09-16',
  '2020-10-16',
  '2020-11-16',
  '2020-12-16',
  '2021-01-16',
  '2021-02-16',
  '2021-03-16',
  '2021-04-16',
  '2021-05-16',
  '2021-06-16',
  '2021-07-16',
  '2021-08-16',
  '2021-09-16',
  '2021-10-16',
  '2021-11-16',
  '2021-12-16',
  '2022-01-16',
  '2022-02-16',
  '2022-03-16',
  '2022-04-16',
  '2022-05-16',
  '2022-06-16',
  '2022-07-16',
  '2022-08-16',
  '2022-09-16',
  '2022-10-16',
  '2022-11-16',
  '2022-12-16',
  '2023-01-16',
  '2023-02-16',
  '2023-03-16',
  '2023-04-16',
  '2023-05-16',
  '2023-06-16',
  '2023-07-16',
  '2023-08-16',
  '2023-09-16',
  '2023-10-16',
  '2023-11-16',
  '2023-12-16',
  '2024-01-16',
  '2024-02-16',
  '2024-03-16',
  '2024-04-16',
];

const values = [
  0.0, 0.0, 5.7, 2.26, -7.65, -0.39, -2.58, 2.82, 4.72, 6.13, -1.38, 4.37, 4.14,
  2.28, -7.2, 7.12, -0.23, -3.73, 3.21, -9.54, -1.25, 1.04, -1.14, -2.59, 4.71,
  7.82, 2.84, -3.58, -5.72, 0.93, 1.34, 5.6, 4.57, -1.19, -4.9, 5.71, 4.0, 1.87,
  1.82, 0.0, 4.55, -3.49, 2.61, 0.54, 2.88, 2.32, 2.97, -1.62, 3.39, -0.51,
  -0.93, 2.85, 1.58, 2.47, 1.87, -1.6, 1.04, -8.11, 7.53, -4.56, 2.44, 4.42,
  -1.01, 3.94, 1.16, -2.81, 0.66, -2.53, -4.74, 2.09, -0.85, -0.03, -9.99, 1.22,
  7.78, 2.71, -1.11, -0.59, 4.52, 2.44, -2.18, 0.31, 0.02, 3.14, 2.38, 2.9,
  1.73, -1.5, 4.63, 1.19, 1.8, 0.66, 2.1, 2.19, 0.6, 2.1, 5.28, -1.6, -0.3,
  -1.47, 1.27, 0.19, -0.36, -0.45, 1.73, -3.02, -2.36, -4.3, 1.66, 5.19, 2.2,
  2.8, -2.08, 0.33, 3.83, -4.54, 4.37, 0.24, 3.84, 2.67, 3.29, 0.43, -30.21,
  16.13, 2.62, 10.58, 3.65, 4.14, 1.15, 1.66, 5.59, 3.66, 2.93, 4.72, -0.88,
  4.19, -0.6, 2.26, 0.38, 2.62, 0.16, -0.15, 3.47, -2.27, 0.72, -3.08, -4.34,
  0.26, -8.51, -6.89, 2.74, 10.07, -9.4, -7.62, 12.1, -1.61, 5.62, 1.39, -3.76,
  5.46, -0.77, 5.97, 1.67, -3.37, 1.51, -2.3, 3.1, 4.61, 0.54, 4.6, 2.5, -1.94,
];

type Asset = (typeof ASSET_LIST)[number];

export function EarnSurvey() {
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const amountGradientValue = (amount / AMOUNT_MAX) * 100;
  const yearGradientValue = (year / YEAR_MAX) * 100;
  const [saving, setSaving] = useState<Saving | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset>('선택');
  const [numberCode, setNumberCode] = useState('');
  const isNumberCodeWrong = !NUMBER_CODE_REGEX.test(numberCode);

  const isValid =
    amount > 0 &&
    year > 0 &&
    saving &&
    selectedAsset !== '선택' &&
    numberCode &&
    !isNumberCodeWrong;

  // 적립 차트
  const calcCumulativeDataset = (amount: number) => {
    let accumulativeAmount = 0;
    return values.reduce((acc: number[], curr, i) => {
      const rate = curr / 100;
      accumulativeAmount = (accumulativeAmount + amount) * (1 + rate);
      return [...acc, (accumulativeAmount / (amount * (i + 1)) - 1) * 100];
    }, []);
  };

  // 투자 차트
  const calcInvestDataset = () => {
    return values.reduce((acc: number[], curr) => {
      const last = acc.length > 0 ? acc[acc.length - 1] : 0;
      return [...acc, last + curr];
    }, []);
  };

  const calcMonthlyDeposit = (
    monthlyDeposit: number,
    annualInterestRate: number,
    months: number
  ): number[] => {
    const monthlyInterestRate = annualInterestRate / 12;
    return Array(months)
      .fill(0)
      .reduce(
        (acc, _, i) => {
          const prev = acc[acc.length - 1];
          const futureValue = Number(
            monthlyDeposit * Math.pow(1 + monthlyInterestRate, months - i)
          );
          return [...acc, prev + futureValue];
        },
        [0]
      );
  };

  const totalFutureValue = calcMonthlyDeposit(
    amount / 12,
    Number(saving),
    year * 12
  );
  console.log(totalFutureValue);

  const calcInvestmentSplitDataset = (amount: number) => {
    const deposit = calcMonthlyDeposit(
      amount / 12 / 2,
      Number(saving),
      year * 12
    );
    const invest = calcInvestDataset((amount * year) / 2);

    return deposit.map((value, idx) => value + invest[idx]);
  };

  const data = {
    labels: dates,
    datasets: [
      {
        label: '적립',
        data: calcCumulativeDataset(amount / 12),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '투자',
        data: calcInvestDataset(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '반반',
        data: calcInvestmentSplitDataset(amount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <section className={styles['container']}>
      <h1 className={`title ${styles['title']}`}>적립 MBTI</h1>
      <div className={styles['wrapper']}>
        <p className={styles['result-price']}>최종 금액:</p>
        <div className={`${styles['question']} ${styles['column']}`}>
          <div className={styles['title']}>
            <label className={styles['label']} htmlFor='amount'>
              연 납입 금액
            </label>
            <p className={styles['value']}>{amount.toLocaleString()}만원</p>
          </div>
          <input
            type='range'
            id='amount'
            name='amount'
            min='0'
            max={AMOUNT_MAX}
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            style={{
              background: `linear-gradient(to right, #65b9fd 0%, #65b9fd ${amountGradientValue}%, #ececec ${amountGradientValue}%, #ececec 100%)`,
            }}
          />
        </div>
        <div className={`${styles['question']} ${styles['column']}`}>
          <div className={styles['title']}>
            <label className={styles['label']} htmlFor='year'>
              총 납입 기간
            </label>
            <p className={styles['value']}>{year}년</p>
          </div>
          <input
            type='range'
            id='year'
            name='year'
            min='0'
            max={YEAR_MAX}
            onChange={(e) => setYear(+e.target.value)}
            value={year}
            style={{
              background: `linear-gradient(to right, #65b9fd 0%, #65b9fd ${yearGradientValue}%, #ececec ${yearGradientValue}%, #ececec 100%)`,
            }}
          />
        </div>
        <div className={`${styles['question']} ${styles['row']}`}>
          <label className={styles['label']}>예금 선택</label>

          <div className={styles['radio']}>
            {SAVING.map((item) => (
              <button
                key={item.label}
                className={`${styles['button']} ${
                  item.value === saving ? styles['selected'] : ''
                }`}
                onClick={() => setSaving(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className={`${styles['question']} ${styles['row']}`}>
          <label className={styles['label']}>투자 자산</label>
          <select
            onChange={(e) => setSelectedAsset(e.target.value as Asset)}
            value={selectedAsset || ''}
          >
            {ASSET_LIST.map((item) => (
              <option key={item} value={item} disabled={item === '선택'}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={`${styles['question']} ${styles['row']}`}>
          <label className={styles['label']}>투자 MBTI</label>
          <div
            className={`${styles.input} ${
              numberCode && isNumberCodeWrong ? styles.error : ''
            }`}
          >
            <input
              type='text'
              placeholder='(아직 없다면 “0000”을 입력해주세요)'
              value={numberCode}
              onChange={(e) => setNumberCode(e.target.value)}
            />
            {numberCode && isNumberCodeWrong && (
              <span className={styles['error-message']}>
                네 자리 숫자를 입력해 주세요.
              </span>
            )}
          </div>
        </div>
      </div>
      {isValid && <Line options={options} data={data} />}
    </section>
  );
}
