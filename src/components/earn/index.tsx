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
  { label: '한국 예금: 금리 5%', value: 0.05 },
  { label: '해외 예금: 금리 6%', value: 0.06 },
] as const;

type Saving = (typeof SAVING)[number];

const ASSET_LIST = ['선택', 'ACWI', 'EWY', 'QQQ', 'SPY'] as const;
const NUMBER_CODE_REGEX = /^\d{4}$/;
const dates = getReturnRateDate();

type Asset = (typeof ASSET_LIST)[number];

const calcAverageReturn = (values: number[]) => {
  // 일별 데이터의 기하평균 계산
  const geometricMean = Math.pow(
    values.reduce((acc, curr) => acc * (1 + curr), 1), 
    1 / values.length
  ) - 1;

  // 일별 평균을 연율화 (252 거래일 사용)
  const annualizedReturn = Math.pow(1 + geometricMean, 252) - 1;
  return annualizedReturn;
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
  
  const mbtiDataRecord =
    numberCode && !isNumberCodeWrong ? getMbtiData(numberCode) : {};

  let averageReturn = calcAverageReturn(assetsReturnRateValues);
  const MAX_RETURN_RATE = 1;
  averageReturn = Math.min(averageReturn, MAX_RETURN_RATE);
  
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

  // 날짜 매칭 함수 - mbtiData와 assetReturnRateValues 간 공통 날짜 찾기
  const getCommonDates = (): string[] => {
    const mbtiDates = Object.keys(mbtiDataRecord);

    // MBTI 데이터 날짜와 일치하는 자산 데이터 날짜 찾기
    const matchingDates: string[] = [];
    
    mbtiDates.forEach(mbtiDate => {
      // mbtiDate(2010-01-16)의 월과 연도 가져오기
      const mbtiYearMonth = mbtiDate.substring(0, 7); // "2010-01"
      
      // 같은 월의 자산 데이터 중 16일과 가장 가까운 날짜 찾기
      const datesInSameMonth = dates.filter((assetDate: string) => {
        // undefined 체크 추가
        if (!assetDate) {
          return false;
        }

        // String.prototype.includes() 메서드 사용 - startsWith보다 유연함
        return assetDate.includes(mbtiYearMonth);
      });
      
      if (datesInSameMonth.length > 0) {
        matchingDates.push(datesInSameMonth[0]); // 해당 월의 첫 번째 날짜 사용
       }
    });
  
    return matchingDates;
  };
  
  const getFilteredValues = (allDates: string[], targetDates: string[], values: number[]): number[] => {
    return targetDates.map((date: string) => {
      const index = allDates.indexOf(date);
      return index !== -1 ? values[index] : 0;
    });
  };
  
  // 공통 날짜 가져오기
  const commonDates = getCommonDates();

  // MBTI 포트폴리오 적립식투자 차트
  const calcCumulativeDataset = (amount: number, values: number[]) => {
    let accumulativeAmount = 0;
    return values.reduce((acc: number[], curr, i) => {
      const rate = curr;
      accumulativeAmount = (accumulativeAmount + amount) * (1 + rate);
      return [...acc, (accumulativeAmount / (amount * (i + 1)) - 1) * 100];
    }, []);
  };

  // MBTI 포트폴리오 일시납투자 차트
  const calcInvestDataset = (values: number[]) => {
    let totalRate = 1;
    return values.reduce((acc: number[], curr) => {
      const rate = 1 + curr;
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
        accumulatedAmount *= 1 + averageReturn;
        return [...acc, accumulatedAmount];
      }, []);
  };

  const calcAccumulatedAmountHalfDatasets = (amount: number, year: number, savingRate: number) => {
    const monthlyAmount = amount / 12; // 월별 납입액
    let accumulatedAmount = 0;

    // 전체 투자금의 절반씩 각각 다른 수익률로 적용
    const combinedMonthlyReturn = (averageReturn + savingRate) / 2 / 12; //월 수익률
  
    return Array(year * 12) // 월별로 계산
      .fill(0)
      .reduce((acc: number[], _, i) => {
        accumulatedAmount += monthlyAmount;
        accumulatedAmount *= 1 + combinedMonthlyReturn;

        // 연도 변화 시점에만 결과 기록
        if ((i + 1) % 12 === 0)  {
          return [...acc, accumulatedAmount];
        }
        return acc;
      }, []);
  };

  // 예금 + 투자 차트
  const calcInvestmentSplitDataset = (annualRate: number, values: number[]) => {
    const monthlyDepositRate = Math.pow(1 + annualRate, 1 / 12) - 1;

    // 월별 납입금
    const monthlyInvestment = 1;

    // 누적 수익금 계산을 위한 초기 설정
    let cumulativeReturn = 0;
    let cumulativeInvestment = 0;
    const cumulativeReturns: number[] = [];

    for (let i = 0; i < values.length; i++) {
      const investmentReturnDecimal = values[i];
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
      Number(((value / (i + 1)) - 1).toFixed(1))
    );

    return returns;
  };

  // 각 데이터셋을 계산
  const asset100Dataset = calcAccumulatedAmountDatasets(amount, year);
  const asset50SavingDataset = calcAccumulatedAmountHalfDatasets(amount, year, saving?.value || 0);

  // 5:5 투자 금액을 최종 금액으로 사용
  const lastCombinedData = asset50SavingDataset[asset50SavingDataset.length - 1];
  const finalAmount = +lastCombinedData?.toFixed();

  // 적립 투자 시, 투자 기간에 따른 누적 금액 차트 데이터
  const payData = {
    labels: yearList,
    datasets: [
      {
        label: `${selectedAsset} 자산에 100% 투자`,
        data: asset100Dataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `${saving?.label.split(':')[0]}과 ${selectedAsset}에 5:5 투자`,
        data: asset50SavingDataset,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };
  
  // 필터링된 자산 수익률 (commonDates에 해당하는 것만)
  const filteredAssetValues = getFilteredValues(dates, commonDates, assetsReturnRateValues);  

  // mbtiValues와 함께 사용할 필터링된 MBTI 값
  const filteredMbtiValues: number[] = commonDates.map(date => 
    mbtiDataRecord[date] || 0
  );
  
  // 적립식 투자의 누적수익률 비교 차트 데이터
  const comparedData = {
    labels: commonDates,
    datasets: [
      {
        label: `${
          saving?.label?.split(':')[0]
        } 50% + ${selectedAsset} 적립식 투자`,
        data: saving?.value
          ? calcInvestmentSplitDataset(saving.value, filteredAssetValues)
          : [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'MBTI 포트폴리오 적립식투자',
        data: calcCumulativeDataset(amount / 12, filteredMbtiValues),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'MBTI 포트폴리오 일시납투자',
        data: calcInvestDataset(filteredMbtiValues),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

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
            <Line
              options={payDataOptions(selectedAsset, width)}
              data={payData}
            />
            <div className={`${styles['question']} ${styles['desc']}`}>
              <p className={styles['desc-title']}>
                비교할만한 모으기 전략 3가지
              </p>
              {`1) ${
                saving.label.split(':')[0]
              } 50% 저축 + ${selectedAsset} 50% 적립식 투자하는 경우\n2) MBTI 포트폴리오에 따라 적립식으로 투자하는 경우\n3) MBTI 포트폴리오에 따라 목돈을 일시에 투자하는 경우`}
            </div>
            <Line options={comparedDataOptions(width)} data={comparedData} />
          </div>
        </>
      )}
    </section>
  );
}
