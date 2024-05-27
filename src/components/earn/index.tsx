import { useEffect, useState } from 'react';
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
import dayjs from 'dayjs';
import { comparedDataOptions, payDataOptions } from './chart';
import { getMbtiData, getReturnRate, getReturnRateDate } from './csvReader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AMOUNT_MAX = 2000;
const YEAR_MAX = 50;

const SAVING = [
  { label: '한국 예금: 금리 5%', value: 5 },
  { label: '해외 예금: 금리 6%', value: 6 },
] as const;

type Saving = (typeof SAVING)[number];

const ASSET_LIST = ['선택', 'ACWI', 'EWY', 'QQQ', 'SPY'] as const;
const NUMBER_CODE_REGEX = /^\d{4}$/;
const dates = getReturnRateDate();

type Asset = (typeof ASSET_LIST)[number];

const calcAverageReturn = (dates: string[], values: number[]) => {
  const startDate = dayjs(dates[0]);
  const endDate = dayjs(dates[dates.length - 1]);
  const diffMonth = endDate.diff(startDate, 'day') / 365;

  const totalReturns = values.reduce((acc, curr) => acc + curr, 0);
  return totalReturns / diffMonth;
};

export function EarnSurvey() {
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const amountGradientValue = (amount / AMOUNT_MAX) * 100;
  const yearGradientValue = (year / YEAR_MAX) * 100;
  const [saving, setSaving] = useState<Saving | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset>('선택');
  const [numberCode, setNumberCode] = useState('');
  const isNumberCodeWrong = !NUMBER_CODE_REGEX.test(numberCode);

  const assetsReturnRateValues =
    selectedAsset !== '선택' ? getReturnRate(selectedAsset) : [];
  const mbtiData =
    numberCode && !isNumberCodeWrong ? getMbtiData(numberCode) : {};

  const mbtiValues = Object.values(mbtiData).map(Number);

  const averageReturn = calcAverageReturn(dates, assetsReturnRateValues);

  const yearList = Array(year)
    .fill(0)
    .map((_, i) => dayjs().year() + i);

  const isValid =
    amount > 0 &&
    year > 0 &&
    saving &&
    selectedAsset !== '선택' &&
    numberCode &&
    !isNumberCodeWrong;

  // 적립 차트
  const calcCumulativeDataset = (amount: number, values: number[]) => {
    let accumulativeAmount = 0;
    return values.reduce((acc: number[], curr, i) => {
      const rate = curr / 100;
      accumulativeAmount = (accumulativeAmount + amount) * (1 + rate);
      return [...acc, (accumulativeAmount / (amount * (i + 1)) - 1) * 100];
    }, []);
  };

  // 투자 차트
  const calcInvestDataset = (values: number[]) => {
    let totalRate = 1;
    return values.reduce((acc: number[], curr) => {
      const rate = 1 + curr / 100;
      totalRate *= rate;
      return [...acc, (totalRate - 1) * 100];
    }, []);
  };

  const calcAccumulatedAmountDatasets = (amount: number, year: number) => {
    let accumulatedAmount = 0;
    return Array(year)
      .fill(0)
      .reduce((acc: number[]) => {
        accumulatedAmount += amount;
        accumulatedAmount *= 1 + averageReturn / 100;
        return [...acc, accumulatedAmount];
      }, []);
  };

  const calcCumulativeReturns = (
    yearlyDeposit: number,
    annualInterestRate: number
  ) => {
    const monthlyRate = annualInterestRate / 12 / 100; // 월 이자율
    const totalMonths = dates.length;
    let cumulativeBalance = 0; // 누적 잔고

    return Array(totalMonths)
      .fill(0)
      .reduce((acc: number[], _, i) => {
        cumulativeBalance += yearlyDeposit;
        cumulativeBalance *= 1 + monthlyRate;
        const accumulateRate =
          (cumulativeBalance - yearlyDeposit * Math.ceil(i + 1 / 12)) /
          (yearlyDeposit * Math.ceil(i + 1 / 12));

        return [...acc, accumulateRate * 100];
      }, []);
  };

  const calcInvestmentSplitDataset = (
    amount: number,
    annualRate: number,
    values: number[]
  ) => {
    const deposit = calcCumulativeReturns(amount / 12 / 2, annualRate);
    const invest = calcInvestDataset(values);

    if (!(deposit.length === invest.length)) {
      return [];
    }
    return deposit.map((value, idx) => value + invest[idx]);
  };

  const payDataset = calcAccumulatedAmountDatasets(amount, year);
  const lastPayData = payDataset[payDataset.length - 1];
  const finalAmount = +lastPayData?.toFixed();

  // 적립 투자 시, 투자 기간에 따른 누적 금액 차트 데이터
  const payData = {
    labels: yearList,
    datasets: [
      {
        label: '누적 금액',
        data: payDataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // 적립식 투자의 누적수익률 비교 차트 데이터
  const comparedData = {
    labels: dates,
    datasets: [
      {
        label: '정기 납입 누적수익률',
        data: calcCumulativeDataset(amount / 12, mbtiValues),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '누적수익률',
        data: calcInvestDataset(mbtiValues),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: `${saving?.label} + ${selectedAsset}`,
        data: saving?.value
          ? calcInvestmentSplitDataset(
              amount,
              saving.value,
              assetsReturnRateValues
            )
          : [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <section className={styles['container']}>
      <h1 className={`title ${styles['title']}`}>적립 MBTI</h1>
      <div className={styles['wrapper']}>
        <p className={styles['result-price']}>
          {isValid &&
            !Number.isNaN(finalAmount) &&
            `최종 금액: ${finalAmount?.toLocaleString()}만원`}
        </p>
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
                  item.value === saving?.value ? styles['selected'] : ''
                }`}
                onClick={() => setSaving(item)}
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
      {isValid && (
        <>
          <Line options={comparedDataOptions} data={comparedData} />
          <Line options={payDataOptions} data={payData} />
        </>
      )}
    </section>
  );
}
