import { INVEST_SURVEY, SURVEY_LENGTH } from '@/shared/constants/survey';
import styles from './step.module.css';
import { Answers, InvestScores } from '@/shared/types/survey';
import { useRef, useState } from 'react';
import * as _ from 'lodash';

type StepProps = {
  currStep: number;
  handleStep: () => void;
  handleScores: (score: Partial<InvestScores>) => void;
};

export const Step = ({ currStep, handleStep, handleScores }: StepProps) => {
  const currSurvey = INVEST_SURVEY[currStep - 1];
  const { title, type, answers } = currSurvey;
  const [disabled, setDisabled] = useState(false);

  const answerRef = useRef<HTMLUListElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const onClickAnswer = (answer: Answers) => {
    if (disabled) return;

    setDisabled(true);
    setTimeout(() => {
      if (answerRef.current) {
        answerRef.current.classList.remove(styles['fade-in']);
        answerRef.current.classList.add(styles['fade-out']);
      }

      if (questionRef.current) {
        questionRef.current.classList.remove(styles['fade-in']);
        questionRef.current.classList.add(styles['fade-out']);
      }
    }, 500);

    setTimeout(() => {
      handleScores(answer);
      handleStep();
      if (answerRef) {
        answerRef.current?.classList.remove(styles['fade-out']);
        answerRef.current?.classList.add(styles['fade-in']);
      }
      if (questionRef) {
        questionRef.current?.classList.remove(styles['fade-out']);
        questionRef.current?.classList.add(styles['fade-in']);
      }
      setDisabled(false);
    }, 1000);
  };

  return (
    <section>
      <div className={styles['status-bar']}>
        <div
          className={styles['status']}
          style={{ width: `${(currStep / SURVEY_LENGTH) * 100}%` }}
        ></div>
      </div>
      <div className={`${styles['box']} ${styles['q']}`} ref={questionRef}>
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
      <ul className={styles['answer']} ref={answerRef}>
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
