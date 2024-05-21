import { INVEST_SURVEY, SURVEY_LENGTH } from '@/shared/constants/survey';
import styles from './step.module.css';
import { Answers, InvestScores } from '@/shared/types/survey';

type StepProps = {
  currStep: number;
  handleStep: () => void;
  handleScores: (score: Partial<InvestScores>) => void;
};

export const Step = ({ currStep, handleStep, handleScores }: StepProps) => {
  const currSurvey = INVEST_SURVEY[currStep - 1];
  const { title, type, answers } = currSurvey;

  const onClickAnswer = (answer: Answers) => {
    handleScores(answer);
    handleStep();
  };

  return (
    <section>
      <div className={styles['status-bar']}>
        <div
          className={styles['status']}
          style={{ width: `${(currStep / SURVEY_LENGTH) * 100}%` }}
        ></div>
      </div>
      <div className={`${styles['box']} ${styles['q']}`}>
        {currStep}. {title}
        {type === 'image' && (
          <div className={styles['image-box']}>
            <div className={styles['buttons']}>
              {answers.map((answer) => (
                <button
                  type='button'
                  key={answer.label}
                  onClick={() => onClickAnswer(answer)}
                >
                  {answer.label}
                </button>
              ))}
            </div>
            <img className={styles['img']} src={currSurvey.image} alt='image' />
          </div>
        )}
      </div>
      <ul className={styles['answer']}>
        {type === 'text' &&
          answers.map((answer, i) => (
            <li
              key={answer.label}
              className={`${styles['box']} ${styles['a']}`}
              onClick={() => onClickAnswer(answer)}
            >
              {`${i + 1}) ${answer.label}`}
            </li>
          ))}
      </ul>
    </section>
  );
};
