import styles from './calc.module.css';

export const Calc = () => {
  return (
    <section id='calc'>
      <div className={styles['calc-bar']}>
        CALCULATING
        <div className={styles['calc']}></div>
      </div>
      <p className='wait'>잠시 기다려주세요...</p>
    </section>
  );
};
