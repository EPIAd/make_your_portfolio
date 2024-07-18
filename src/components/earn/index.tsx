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

  // MBTI 포트폴리오 적립식투자 차트
  const calcCumulativeDataset = (amount: number, values: number[]) => {
    let accumulativeAmount = 0;
    return values.reduce((acc: number[], curr, i) => {
      const rate = curr / 100;
      accumulativeAmount = (accumulativeAmount + amount) * (1 + rate);
      return [...acc, (accumulativeAmount / (amount * (i + 1)) - 1) * 100];
    }, []);
  };

  // MBTI 포트폴리오 일시납투자 차트
  const calcInvestDataset = (values: number[]) => {
    let totalRate = 1;
    return values.reduce((acc: number[], curr) => {
      const rate = 1 + curr / 100;
      totalRate *= rate;
      return [...acc, (totalRate - 1) * 100];
    }, []);
  };

  // 두 번째 누적 금액 차트
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

  const calcAccumulatedAmountHalfDatasets = (amount: number, year: number) => {
    let accumulatedAmount = 0;
    const halfAverageReturn = averageReturn / 2;

    return Array(year)
      .fill(0)
      .reduce((acc: number[], _, i) => {
        accumulatedAmount += amount;
        const assetReturn =
          assetsReturnRateValues[i % assetsReturnRateValues.length] / 2;
        accumulatedAmount *= 1 + (halfAverageReturn + assetReturn) / 100;
        return [...acc, accumulatedAmount];
      }, []);
  };

  // 예금 + 투자 차트
  const calcInvestmentSplitDataset = (annualRate: number, values: number[]) => {
    const monthlyDepositRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;

    // 월별 납입금
    const monthlyInvestment = 1;

    // 누적 수익금 계산을 위한 초기 설정
    let cumulativeReturn = 0;
    let cumulativeInvestment = 0;
    const cumulativeReturns: number[] = [];

    for (let i = 0; i < values.length; i++) {
      const investmentReturnDecimal = values[i] / 100;
      const combinedReturn =
        0.5 * investmentReturnDecimal + 0.5 * monthlyDepositRate;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cumulativeInvestment += monthlyInvestment; // 매달 1씩 납입
      cumulativeReturn =
        (cumulativeReturn + monthlyInvestment) * (1 + combinedReturn);
      cumulativeReturns.push(cumulativeReturn);
    }

    // 수익률 계산
    const returns = cumulativeReturns.map((value, i) =>
      Number(((value / (i + 1)) * 100 - 100).toFixed(1))
    );

    return returns;
  };

  const payDataset = calcAccumulatedAmountDatasets(amount, year);
  const lastPayData = payDataset[payDataset.length - 1];
  const finalAmount = +lastPayData?.toFixed();

  // 적립 투자 시, 투자 기간에 따른 누적 금액 차트 데이터
  const payData = {
    labels: yearList,
    datasets: [
      {
        label: `${selectedAsset} 자산에 100% 투자`,
        data: payDataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `${saving?.label.split(':')[0]}과 ${selectedAsset}에 5:5 투자`,
        data: calcAccumulatedAmountHalfDatasets(amount, year),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // 적립식 투자의 누적수익률 비교 차트 데이터
  const comparedData = {
    labels: dates,
    datasets: [
      {
        label: `${
          saving?.label?.split(':')[0]
        } 50% + ${selectedAsset} 적립식 투자`,
        data: saving?.value
          ? calcInvestmentSplitDataset(saving.value, assetsReturnRateValues)
          : [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'MBTI 포트폴리오 적립식투자',
        data: calcCumulativeDataset(amount / 12, mbtiValues),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'MBTI 포트폴리오 일시납투자',
        data: calcInvestDataset(mbtiValues),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <section className={styles['container']}>
      <h1 className={`title ${styles['title']}`}>모으기 MBTI</h1>
      <div className={styles['wrapper']}>
        <div className={`${styles['question']} ${styles['column']}`}>
          <div className={styles['title']}>
            <label className={styles['label']} htmlFor='amount'>
              1년간 납입할 금액이 얼마인가요?
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
            step={100}
            style={{
              background: `linear-gradient(to right, #65b9fd 0%, #65b9fd ${amountGradientValue}%, #ececec ${amountGradientValue}%, #ececec 100%)`,
            }}
          />
          <div className={styles['amount-bar']}>
            <span>0만원</span>
            <span>{AMOUNT_MAX.toLocaleString()}만원</span>
          </div>
        </div>
        <div className={`${styles['question']} ${styles['column']}`}>
          <div className={styles['title']}>
            <label className={styles['label']} htmlFor='year'>
              몇 년간 납입하실 계획인가요?{' '}
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
            step={5}
            style={{
              background: `linear-gradient(to right, #65b9fd 0%, #65b9fd ${yearGradientValue}%, #ececec ${yearGradientValue}%, #ececec 100%)`,
            }}
          />
          <div className={styles['amount-bar']}>
            {Array.from({ length: YEAR_MAX / 5 + 1 }, (_, i) => i * 5).map(
              (year) => (
                <span>{year}년</span>
              )
            )}
          </div>
        </div>
        <div className={`${styles['question']} ${styles['column']}`}>
          <label className={styles['label']}>
            어떤 예금을 선택하고 싶으세요?
          </label>

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
        <div className={`${styles['question']} ${styles['column']}`}>
          <label className={styles['label']}>
            {`투자 자산을 고른다면 어떤 것을 고르시겠어요?`}
          </label>
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
        <div className={`${styles['question']} ${styles['column']}`}>
          <label className={styles['label']}>
            투자 MBTI의 네 자리 숫자 코드를 입력해주세요
          </label>
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
          <div className={`${styles['question']} ${styles['desc']}`}>
            <div>
              {`${amount?.toLocaleString()}만원을 ${year}년간\n${
                saving?.label.split(':')[0]
              }과 ${selectedAsset}에 5:5로 적립 투자하면\n${finalAmount?.toLocaleString()}만원이 모입니다.`}
            </div>
          </div>
          <div className={styles['graph']}>
            <Line options={payDataOptions(selectedAsset)} data={payData} />
            <div className={`${styles['question']} ${styles['desc']}`}>
              <p className={styles['desc-title']}>
                비교할만한 모으기 전략 3가지
              </p>
              {`1) ${
                saving.label.split(':')[0]
              } 50% 저축 + ${selectedAsset} 50% 적립식 투자하는 경우\n2) MBTI 포트폴리오에 따라 적립식으로 투자하는  경우\n3) MBTI 포트폴리오에 따라 목돈을 일시에 투자하는 경우`}
            </div>
            <Line
              height={100}
              options={comparedDataOptions}
              data={comparedData}
            />
          </div>
        </>
      )}
    </section>
  );
}
