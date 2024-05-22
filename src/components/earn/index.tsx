import styles from './earn.module.css';
import { useState } from 'react';

const AMOUNT_MAX = 2000;
const YEAR_MAX = 50;

const SAVING = [
  { label: '한국 예금: 금리 5%', value: 'korea' },
  { label: '해외 예금: 금리 6%', value: 'foreign' },
] as const;

const ASSET_LIST = ['선택', 'ACWI', 'EWY', 'QQQ', 'SPY'] as const;
const NUMBER_CODE_REGEX = /^\d{4}$/;

type Asset = (typeof ASSET_LIST)[number];
export function EarnSurvey() {
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const amountGradientValue = (amount / AMOUNT_MAX) * 100;
  const yearGradientValue = (year / YEAR_MAX) * 100;
  const [saving, setSaving] = useState<'korea' | 'foreign' | null>(null);
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

  return (
    <section className={styles['container']}>
      <h1 className={`title ${styles['title']}`}>적립 MBTI</h1>
      <div className={styles['wrapper']}>
        <p className={styles['result-price']}>
          최종 금액: {isValid && 'dnjs'}{' '}
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
    </section>
  );
}
