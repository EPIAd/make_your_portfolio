import styles from './earn.module.css';
import { useState } from 'react';

const AMOUNT_MAX = 2000;
const YEAR_MAX = 50;

const SAVING = [
  { label: '한국 예금: 금리 A%', value: 'korea' },
  { label: '해외 예금: 금리 B%', value: 'foreign' },
] as const;

export function EarnPage() {
  const [amount, setAmount] = useState(0);
  const [year, setYear] = useState(0);
  const amountGradientValue = (amount / AMOUNT_MAX) * 100;
  const yearGradientValue = (year / YEAR_MAX) * 100;
  const [saving, setSaving] = useState<'korea' | 'foreign' | null>(null);

  return (
    <section className={styles['container']}>
      <h1 className={`title ${styles['title']}`}>적립 MBTI</h1>
      <div className={styles['wrapper']}>
        <p className={styles['result-price']}>최종 금액: </p>
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
          <select>
            <option>자산1</option>
            <option>자산1</option>
            <option>자산1</option>
            <option>자산1</option>
          </select>
        </div>
        <div className={`${styles['question']} ${styles['row']}`}>
          <label className={styles['label']}>투자 MBTI</label>
          <select>
            <option>MBTI1</option>
            <option>MBTI1</option>
            <option>MBTI1</option>
            <option>MBTI1</option>
          </select>
        </div>
      </div>
    </section>
  );
}
