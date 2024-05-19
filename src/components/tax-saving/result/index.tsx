import styles from './result.module.css';

export function TaxSavingResult() {
  return (
    <section className={styles.container}>
      <h1 className={`title ${styles['title']}`}>최적 절세</h1>
    </section>
  );
}
