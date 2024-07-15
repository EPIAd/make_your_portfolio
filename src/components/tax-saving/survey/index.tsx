import dayjs from 'dayjs';
import styles from './index.module.css';
import { Radio } from '@/components';
import { useState } from 'react';
import { TaxSavingScores } from '@/shared/types/survey';

const DATE_FORMAT = 'YYYY년 MM월 DD일';
const _19_YEARS_AGO = dayjs().subtract(19, 'year').format(DATE_FORMAT);
const _15_YEARS_AGO = dayjs().subtract(15, 'year').format(DATE_FORMAT);

const SUBJECT_ANSWERS = [
  { value: '200', label: '네' },
  { value: '100', label: '아니오' },
] as const;
type YesNo = Pick<(typeof SUBJECT_ANSWERS)[number], 'value'>['value'];

const BIRTH_ANSWERS = [
  { value: '10', label: `${_19_YEARS_AGO} 이전` },
  { value: '20', label: `${_19_YEARS_AGO} ~ ${_15_YEARS_AGO} 사이` },
  { value: '30', label: `${_15_YEARS_AGO} 이후` },
] as const;
type Birth = Pick<(typeof BIRTH_ANSWERS)[number], 'value'>['value'];

const INCOME_ANSWERS = [
  { value: '1', label: '아니오' },
  { value: '2', label: '연간 근로소득 5,000만원 이하' },
  { value: '3', label: '연간 종합소득 3,800만원 이하' },
  { value: '4', label: '연간 농어업소득 3,800만원 이하' },
  { value: '5', label: '소득 종류별 위 금액 이상' },
] as const;
type Income = Pick<(typeof INCOME_ANSWERS)[number], 'value'>['value'];

const NUMBER_AMOUNT_REGEX = /^\d*$/gm;
const NUMBER_CODE_REGEX = /^\d{4}$/;

type TaxSavingSurveyProps = {
  handleScore: (score: TaxSavingScores) => void;
  handleNextStep: () => void;
};
export function TaxSavingSurvey({
  handleScore,
  handleNextStep,
}: TaxSavingSurveyProps) {
  const [yesNoAnswer, setYesNoAnswer] = useState<YesNo | 0>(0);
  const [birthAnswer, setBirthAnswer] = useState<Birth | 0>(0);
  const [incomeAnswer, setIncomeAnswer] = useState<Income | 0>(0);
  const [numberCode, setNumberCode] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [useAmount, setUseAmount] = useState('');
  const isPayAmountOver = Number(payAmount.replaceAll(',', '')) > 100000;
  const isUseAmountOver =
    Number(payAmount.replaceAll(',', '')) <
    Number(useAmount.replaceAll(',', ''));
  const isNumberCodeWrong = !NUMBER_CODE_REGEX.test(numberCode);

  const isValid =
    !!yesNoAnswer &&
    !!birthAnswer &&
    !!incomeAnswer &&
    !isNumberCodeWrong &&
    payAmount &&
    useAmount &&
    !isPayAmountOver &&
    !isUseAmountOver;

  const change = (input: string) => {
    const inputValue = input.replaceAll(',', '');
    const extractedNumbers = parseInt(
      inputValue.match(NUMBER_AMOUNT_REGEX)?.join('') || ''
    );
    const value = Number.isNaN(extractedNumbers) ? null : extractedNumbers;
    return value ? value.toLocaleString() : '';
  };

  const handleNext = () => {
    handleScore({
      s1: +yesNoAnswer,
      s2: +birthAnswer,
      s3: +incomeAnswer,
      annualPayAmount: +payAmount.replaceAll(',', ''),
      useAmount: +useAmount.replaceAll(',', ''),
    });
    handleNextStep();
  };

  return (
    <section className={styles['container']}>
      <h1 className={`title ${styles['title']}`}>절세 MBTI</h1>
      <div className={styles['survey-wrapper']}>
        <div className={styles.question}>
          <p className={styles.title}>
            1. 최근 3년 이내에 금융소득종합과세 대상자였나요?
          </p>
          <div className={styles.answer}>
            {SUBJECT_ANSWERS.map((item) => (
              <Radio
                key={item.value}
                id={item.value}
                name='answer-1'
                value={item.value}
                htmlFor={item.value}
                label={item.label}
                checked={yesNoAnswer === item.value}
                onChange={(e) => setYesNoAnswer(e.target.value as YesNo)}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>2. 생일이 언제이신가요?</p>
          <div className={styles.answer}>
            {BIRTH_ANSWERS.map((item) => (
              <Radio
                key={item.value}
                id={item.value}
                name='answer-2'
                value={item.value}
                htmlFor={item.value}
                label={item.label}
                checked={birthAnswer === item.value}
                onChange={(e) => setBirthAnswer(e.target.value as Birth)}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>3. 정기적인 소득이 있으신가요?</p>
          <div className={styles.answer}>
            {INCOME_ANSWERS.map((item) => (
              <Radio
                key={item.value}
                id={item.value}
                name='answer-3'
                value={item.value}
                htmlFor={item.value}
                label={item.label}
                checked={incomeAnswer === item.value}
                onChange={(e) => setIncomeAnswer(e.target.value as Income)}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>
            4. 당신의 투자 MBTI 숫자 4자리 코드를 입력해주세요.
          </p>
          <div className={styles.answer}>
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
            </div>
            {numberCode && isNumberCodeWrong && (
              <span className={styles['error-message']}>
                네 자리 숫자를 입력해 주세요.
              </span>
            )}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>
            5. 절세 관련 투자상품에 대한 연간 납입금액은?
          </p>
          <div>
            <div
              className={`${styles.input} ${
                isPayAmountOver ? styles.error : ''
              }`}
            >
              <input
                type='text'
                placeholder='(최대 10억원)'
                value={payAmount}
                onChange={(e) => {
                  const numValue = change(e.target.value);
                  setPayAmount(numValue);
                }}
              />
              <span>만원</span>
            </div>
            {isPayAmountOver && (
              <span className={styles['error-message']}>
                최대 10억원 제한입니다.
              </span>
            )}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>
            6. 연 납입액 중, 55세 이후 사용할 금액은?
          </p>
          <div>
            <div
              className={`${styles.input} ${
                isUseAmountOver ? styles.error : ''
              }`}
            >
              <input
                type='text'
                value={useAmount}
                onChange={(e) => {
                  const numValue = change(e.target.value);
                  setUseAmount(numValue);
                }}
              />
              <span>만원</span>
            </div>
            {isUseAmountOver && (
              <span className={styles['error-message']}>
                연간 납입금액을 초과합니다.
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        className={`big-button ${styles['result-button']}`}
        onClick={handleNext}
        disabled={!isValid}
      >
        결과 보기
      </button>
    </section>
  );
}
