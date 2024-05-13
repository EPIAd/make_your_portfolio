import styles from './step.module.css';

type StepProps = {
  title: string;
  answers: string[];
  currStep: number;
};
export const Step = ({ title, answers, currStep }: StepProps) => {
  return (
    <section>
      <div className={styles['status-bar']}>
        <div className={styles['status']} style={{ width: `${(currStep / 6) * 100}%` }}></div>
      </div>
      <div className={`${styles['box']} ${styles['q']}`}>{title}</div>
      <ul className={styles['answer']}>
        {answers.map((answer) => (
          <li key={answer} className={`${styles['box']} ${styles['a']}`}>
            {answer}
          </li>
        ))}
      </ul>
    </section>
  );
};
