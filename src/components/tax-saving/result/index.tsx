import styles from './result.module.css';

export function TaxSavingResult() {
  return (
    <section className={styles.container}>
      <h1 className={`title ${styles['title']}`}>최적 절세</h1>
      <div className={styles['wrapper']}>
        <div className={styles['result-wrapper']}>
          <div className={styles.section}>
            <p className={styles['title']}>ISA</p>
            <div className={styles['chart']}></div>
          </div>
          <div className={styles.section}>
            <p className={styles['title']}> 연금저축+IRP </p>
            <div className={styles['chart']}></div>
          </div>
          <div className={styles.section}>
            <p className={styles['title']}> 일반예금 </p>
            <div className={styles['chart']}></div>
          </div>
        </div>
        <div className={styles['result-wrapper']}>
          <div className={`${styles.section} ${styles.contents}`}>
            ISA 절세 효과
          </div>
          <div className={`${styles.section} ${styles.contents}`}>
            연금저축+IRP 절세 효과
          </div>
          <div className={`${styles.section} ${styles.contents}`}>없음</div>
        </div>
      </div>
    </section>
  );
}
