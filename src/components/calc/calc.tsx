import styles from './calc.module.css';

export const Calc = () => {
  return (
    <div className={styles['calc']}>
      <div className={styles['calc-bar']}>
        <p>CALCULATING</p>
        <div className={styles['calc']}></div>
      </div>
      <p className={styles['wait']}>잠시 기다려주세요...</p>
    </div>
  );
};
