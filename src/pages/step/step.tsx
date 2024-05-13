import { INVEST_SURVEY, SURVEY_LENGTH } from '@/shared/constants/survey';
import styles from './step.module.css';
import { Scores } from '@/shared/types/survey';

type StepProps = {
  currStep: number;
  handleStep: () => void;
  handleScores: (score: Partial<Scores>) => void;
};
type Answer = (typeof INVEST_SURVEY)[number]['answers'][number];

export const Step = ({ currStep, handleStep, handleScores }: StepProps) => {
  const { title, answers } = INVEST_SURVEY[currStep - 1];

  const onClickAnswer = (answer: Answer) => {
    handleScores(answer);
    handleStep();
  };

  return (
    <section>
      <div className={styles['status-bar']}>
        <div className={styles['status']} style={{ width: `${(currStep / SURVEY_LENGTH) * 100}%` }}></div>
      </div>
      <div className={`${styles['box']} ${styles['q']}`}>
        {currStep}. {title}
      </div>
      <ul className={styles['answer']}>
        {answers.map((answer) => (
          <li key={answer.label} className={`${styles['box']} ${styles['a']}`} onClick={() => onClickAnswer(answer)}>
            {answer.label}
          </li>
        ))}
      </ul>
    </section>
  );
};
