import styles from './result.module.css';
import { Bar } from 'react-chartjs-2';
import {
  chartOptions,
  makeISADataset,
  makeDepositDataset,
  makeIRPDataset,
} from './chart';
import 'chart.js/auto';
import { useContext } from 'react';
import { TaxSavingSurveyContext } from '@/shared/context/survey';
import { calcB1, calcISA, calcISAEffect } from './calc';

const makeData = <T extends NonNullable<unknown>>({
  labels,
  datasets,
}: {
  labels: string[];
  datasets: T;
}) => ({
  labels,
  datasets,
});

export function TaxSavingResult() {
  const scores = useContext(TaxSavingSurveyContext);

  const M = scores?.annualPayAmount || 0;
  const P = scores?.useAmount || 0;
  const ISA = calcISA(scores);
  const A = ISA ? 2000 : 0;
  const B = 1800;
  const ISAEffect = calcISAEffect(scores);
  const _a = M - P;
  const a = A < _a ? A : _a;
  const [b1, b2, _r2] = calcB1(P);
  const r2 = A > a ? _r2 : _r2 - (A - a);
  const r1 = A < _a ? _a - A : 0;
  const R = r1 + r2;

  const yMax = Math.max(A, B, R);

  return (
    <section className={styles.container}>
      <h1 className={`title ${styles['title']}`}>최적 절세</h1>
      <div className={styles['wrapper']}>
        <div className={styles['result-wrapper']}>
          <div className={styles.section}>
            <p className={styles['title']}>ISA</p>
            <div className={styles['chart']}>
              <Bar
                options={chartOptions(yMax)}
                data={makeData({
                  labels: ['ISA'],
                  datasets: makeISADataset(a, A),
                })}
              />
            </div>
          </div>
          <div className={styles.section}>
            <p className={styles['title']}>연금저축+IRP</p>
            <div className={styles['chart']}>
              <Bar
                options={chartOptions(yMax)}
                data={makeData({
                  labels: ['연금저축+IRP'],
                  datasets: makeIRPDataset(b1, b2, B),
                })}
              />
            </div>
          </div>
          <div className={`${styles.section} ${styles['chart-gap']}`}>
            <p className={styles['title']}>일반예금</p>
            <div className={styles['chart']}>
              <Bar
                options={chartOptions(yMax)}
                data={makeData({
                  labels: ['일반예금'],
                  datasets: makeDepositDataset(R),
                })}
              />
            </div>
          </div>
        </div>
        <div className={styles['result-table']}>
          <div className={`${styles['row']} ${styles['header']}`}>
            <div className={styles['title']}>최대납입금액</div>
            <div>{A.toLocaleString()}만원</div>
            <div>{B.toLocaleString()}만원</div>
            <div>제한 없음</div>
          </div>
          <div className={styles['row']}>
            <div className={styles['title']}>추천납입금액</div>
            <div>ISA {a.toLocaleString()}만원</div>
            <div>{`연금저축: ${b1}만원\nIRP: ${b2}만원`}</div>
            <div>예금 : {(r1 + r2).toLocaleString()}만원</div>
          </div>
          <div className={styles['row']}>
            <div className={styles['title']}>절세효과</div>
            <div className={`${styles['contents']} ${styles['highlight']}`}>
              {ISAEffect}
            </div>
            <div className={`${styles['contents']} ${styles['highlight']}`}>
              {(b1 + b2).toLocaleString()}만원에 대한 세액공제 13.2%~16.5%
            </div>
            <div>없음</div>
          </div>
        </div>
      </div>
    </section>
  );
}
