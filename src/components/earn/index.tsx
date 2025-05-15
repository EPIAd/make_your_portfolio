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
import { comparedDataOptions, payDataOptions, useDarkMode } from './chart';
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

// Constants
const AMOUNT_MAX = 2000;
const YEAR_MAX = 50;
const MAX_RETURN_RATE = 1;

const SAVING = [
  { label: '한국 예금: 금리 5%', value: 0.05 },
  { label: '해외 예금: 금리 6%', value: 0.06 },
] as const;

type Saving = (typeof SAVING)[number];

const ASSET_LIST = [
  '선택', 
  'TIGER 미국S&P500', 
  'KODEX 미국나스닥100', 
  'TIGER 미국배당다우존스', 
  'PLUS 고배당주', 
  'TIGER 유로스탁스50(합성 H)', 
  'TIGER 차이나HSCEI', 
  'TIGER 미국채10년선물', 
  'WON 대한민국국고채액티브', 
  'KODEX 장기종합채권(AA-이상)액티브', 
  'ACE KRX금현물', 
  'TIGER 리츠부동산인프라'
] as const;

type Asset = (typeof ASSET_LIST)[number];

const NUMBER_CODE_REGEX = /^\d{4}$/;

// Utility functions for calculations
/**
 * Calculate annualized return rate from daily return rates
 */
const calcAverageReturn = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  // Calculate geometric mean from daily data
  const geometricMean = Math.pow(
    values.reduce((acc, curr) => acc * (1 + curr / 100), 1), 
    1 / values.length
  ) - 1;

  // Annualize the daily average (252 trading days)
  const annualizedReturn = Math.pow(1 + geometricMean, 252) - 1;
  return Math.min(annualizedReturn, MAX_RETURN_RATE);
};

/**
 * Calculate accumulated investment amount over years with given annual return rate
 */
const calcAccumulatedAmount = (
  annualAmount: number, 
  years: number, 
  annualReturnRate: number
): number[] => {
  let accumulatedAmount = 0;
  let totalInvested = 0;
  
  return Array(years)
    .fill(0)
    .map(() => {
      accumulatedAmount = (accumulatedAmount + annualAmount) * (1 + annualReturnRate);
      totalInvested += annualAmount;
      return accumulatedAmount;
    });
};

/**
 * Calculate accumulated investment with monthly contributions and combined return rate
 */
const calcAccumulatedAmountMonthly = (
  annualAmount: number,
  years: number,
  combinedReturnRate: number
): number[] => {
  const monthlyAmount = annualAmount / 12;
  const monthlyReturn = combinedReturnRate / 12;
  let accumulatedAmount = 0;

  return Array(years * 12)
    .fill(0)
    .reduce((acc: number[], _, i) => {
      accumulatedAmount = (accumulatedAmount + monthlyAmount) * (1 + monthlyReturn);

      // Only record at year end
      if ((i + 1) % 12 === 0) {
        return [...acc, accumulatedAmount];
      }
      return acc;
    }, []);
};

/**
 * Calculate lump sum investment results (investing entire amount at beginning)
 */
const calcLumpSumInvestment = (
  initialAmount: number,
  years: number,
  annualReturnRate: number
): number[] => {
  let amount = initialAmount;
  return Array(years)
    .fill(0)
    .map(() => {
      amount *= (1 + annualReturnRate);
      return amount;
    });
};

/**
 * Convert accumulated amounts to percentage returns
 * relative to the total invested amount
 */
const convertToPercentageReturns = (
  accumulatedAmounts: number[],
  annualAmount: number
): number[] => {
  return accumulatedAmounts.map((amount, index) => {
    const totalInvested = annualAmount * (index + 1);
    return ((amount / totalInvested) - 1) * 100;
  });
};

/**
 * Calculate year-by-year investment returns with split allocation strategy
 */
const calcSplitReturnRate = (depositRate: number, investmentRate: number): number => {
  return (depositRate + investmentRate) / 2;
};

export function EarnSurvey() {
  // State variables
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const [saving, setSaving] = useState<Saving | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset>('선택');
  const [numberCode, setNumberCode] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  
  // Derived state
  const isDarkMode = useDarkMode();
  const amountGradientValue = (amount / AMOUNT_MAX) * 100;
  const yearGradientValue = (year / YEAR_MAX) * 100;
  const isNumberCodeWrong = !NUMBER_CODE_REGEX.test(numberCode);
  const yearList = Array(year).fill(0).map((_, i) => dayjs().year() + i);
  
  const isValid =
    amount > 0 &&
    year > 0 &&
    saving !== null &&
    selectedAsset !== '선택' &&
    numberCode &&
    !isNumberCodeWrong;

  // Data preparation
  const dates: string[] = getReturnRateDate();
  
  // Get asset return rates and calculate average
  const assetReturnRates = selectedAsset !== '선택' ? getReturnRate(selectedAsset) : [];
  const assetAverageReturn = calcAverageReturn(assetReturnRates);
  
  // Get MBTI portfolio data and calculate average
  const mbtiData: Record<string, number> = numberCode && !isNumberCodeWrong ? getMbtiData(numberCode) : {};
  const mbtiValues = dates.map((date: string) => mbtiData[date] || 0);
  const mbtiAverageReturn = calcAverageReturn(mbtiValues);

  // Calculate investment outcomes
  const asset100Dataset = calcAccumulatedAmount(amount, year, assetAverageReturn);
  
  // Calculate 50/50 split investment (savings + asset)
  const combinedReturnRate = saving ? calcSplitReturnRate(saving.value, assetAverageReturn) : 0;
  const asset50SavingDataset = calcAccumulatedAmountMonthly(amount, year, combinedReturnRate);
  
  // Calculate MBTI portfolio investment - regular contributions
  const mbti100Dataset = calcAccumulatedAmount(amount, year, mbtiAverageReturn);
  
  // Calculate MBTI portfolio with lump sum investment (all invested at the start)
  const mbtiLumpSumDataset = calcLumpSumInvestment(amount * year, year, mbtiAverageReturn);
  
  // For percentage comparisons
  const asset100ReturnPercent = convertToPercentageReturns(asset100Dataset, amount);
  const asset50SavingReturnPercent = convertToPercentageReturns(asset50SavingDataset, amount);
  const mbti100ReturnPercent = convertToPercentageReturns(mbti100Dataset, amount);

  // Determine final amount for display
  const finalAmount = asset50SavingDataset.length > 0 
    ? Math.round(asset50SavingDataset[asset50SavingDataset.length - 1]) 
    : 0;

  // Chart data for investment amount comparison (absolute values)
  const amountComparisonData = {
    labels: yearList,
    datasets: [
      {
        label: `${selectedAsset} 자산에 100% 투자`,
        data: asset100Dataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `${saving?.label.split(':')[0] || ''} + ${selectedAsset}에 5:5 투자`,
        data: asset50SavingDataset,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
  
  // Chart data for strategy comparison (percentage returns)
  const strategyComparisonData = {
    labels: yearList,
    datasets: [
      {
        label: `${saving?.label?.split(':')[0] || ''} 50% + ${selectedAsset} 50% 투자`,
        data: asset50SavingReturnPercent,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'MBTI 포트폴리오 100% 투자',
        data: mbti100ReturnPercent,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'MBTI 포트폴리오 (목돈 일시납)',
        // For lump sum, percentage calculation needs to be different
        data: mbtiLumpSumDataset.map((val, i) => ((val / (amount * year)) - 1) * 100),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles['container']}>
      <h1 className={`title ${styles['title']}`}>모으기 MBTI</h1>
      
      {/* Input form */}
      <div className={styles['wrapper']}>
        {/* Annual investment amount */}
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
        
        {/* Investment period in years */}
        <div className={`${styles['question']} ${styles['column']}`}>
          <div className={styles['title']}>
            <label className={styles['label']} htmlFor='year'>
              몇 년간 납입하실 계획인가요?
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
                <span key={year}>{year}년</span>
              )
            )}
          </div>
        </div>
        
        {/* Deposit options */}
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
        
        {/* Asset selection */}
        <div className={`${styles['question']} ${styles['column']}`}>
          <label className={styles['label']}>
            투자 자산을 고른다면 어떤 것을 고르시겠어요?
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
        
        {/* MBTI code input */}
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
              placeholder='(아직 없다면 "0000"을 입력해주세요)'
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

      {/* Results and charts */}
      {isValid && (
        <>
          {/* Summary of results */}
          <div className={`${styles['question']} ${styles['desc']}`}>
            <div>
              {`${amount?.toLocaleString()}만원을 ${year}년간\n${
                saving?.label.split(':')[0]
              }과 ${selectedAsset}에 5:5로 적립 투자하면\n${finalAmount?.toLocaleString()}만원이 모입니다.`}
            </div>
          </div>
          
          {/* Charts */}
          <div className={styles['graph']}>
            {/* Investment amount chart */}
            <Line
              options={payDataOptions(selectedAsset, width, isDarkMode)}
              data={amountComparisonData}
            />
            
            {/* Strategy comparison description */}
            <div className={`${styles['question']} ${styles['desc']}`}>
              <p className={styles['desc-title']}>
                비교할만한 모으기 전략 3가지
              </p>
              {`1) ${
                saving.label.split(':')[0]
              } 50% 저축 + ${selectedAsset} 50% 적립식 투자하는 경우\n2) MBTI 포트폴리오에 따라 적립식으로 투자하는 경우\n3) MBTI 포트폴리오에 따라 목돈을 일시에 투자하는 경우`}
            </div>
            
            {/* Strategy comparison chart */}
            <Line 
              options={comparedDataOptions(width, isDarkMode)} 
              data={strategyComparisonData} 
            />
          </div>
        </>
      )}
    </section>
  );
}