import { INVEST_SURVEY, SURVEY_LENGTH } from '@/shared/constants/survey';
import styles from './step.module.css';
import { Answers, InvestScores } from '@/shared/types/survey';
import { useRef, useState, useEffect } from 'react';

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

  // Mobile hover fix: Force blur on all buttons after any touch interaction
  useEffect(() => {
    // Detect if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // Add a class to body to identify touch devices
      document.body.classList.add('is-touch-device');
      
      // Force immediate style reset on any touch
      const handleTouch = () => {
        // Get all interactive elements
        const interactiveElements = document.querySelectorAll('button, [role="button"], .a');
        
        interactiveElements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.blur();
            // Remove focus outline
            element.style.outline = 'none';
          }
        });
      };
      
      // Add touch listeners
      document.addEventListener('touchstart', handleTouch, { passive: true });
      document.addEventListener('touchend', handleTouch, { passive: true });
      
      return () => {
        document.removeEventListener('touchstart', handleTouch);
        document.removeEventListener('touchend', handleTouch);
      };
    }
  }, []);

  const onClickAnswer = (answer: Answers) => {
    if (disabled) return;
    
    setDisabled(true);

    // Immediately blur the clicked element to prevent focus persistence
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Start fade-out animation
    setTimeout(() => {
      if (answerRef.current) {
        answerRef.current.classList.remove(styles['fade-in']);
        answerRef.current.classList.add(styles['fade-out']);
      }
      if (questionRef.current) {
        questionRef.current.classList.remove(styles['fade-in']);
        questionRef.current.classList.add(styles['fade-out']);
      }
    }, 100); // Slightly faster initial delay

    const resetButtonStyles = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((btn) => {
        btn.blur();
        // Force remove any hover-related classes or states
        btn.classList.remove('focus', 'hover', 'active');
        // Reset any inline styles that might have been applied
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.style.transform = '';
        btn.style.boxShadow = '';
        btn.style.opacity = '';
      });
    };

    // Handle step transition
    setTimeout(() => {
      handleScores(answer);
      handleStep();
      resetButtonStyles();
      
      // Reset animations for next question
      setTimeout(() => {
        if (answerRef.current) {
          answerRef.current.classList.remove(styles['fade-out']);
          answerRef.current.classList.add(styles['fade-in']);
        }
        if (questionRef.current) {
          questionRef.current.classList.remove(styles['fade-out']);
          questionRef.current.classList.add(styles['fade-in']);
        }
        setDisabled(false);
      }, 100);
    }, 600); // Slightly faster transition
  };

  const progressPercentage = (currStep / SURVEY_LENGTH) * 100;

  return (
    <section>
      <div className={styles['status-bar']}>
        <div
          className={styles['status']}
          style={{ 
            width: `${progressPercentage}%`,
            transition: 'width 0.3s ease-in-out' // Smooth progress animation
          }}
          role="progressbar"
          aria-valuenow={currStep}
          aria-valuemin={1}
          aria-valuemax={SURVEY_LENGTH}
          aria-label={`Question ${currStep} of ${SURVEY_LENGTH}`}
        />
      </div>

      <div 
        className={`${styles['box']} ${styles['q']} ${styles['fade-in']}`} 
        ref={questionRef}
      >
        <span className={styles['question-number']}>{currStep}.</span> {title}
        
        {type === 'image' && (
          <div className={styles['image-box']}>
            <div className={styles['buttons']}>
              {answers.map((answer, i) => (
                <button
                  type='button'
                  key={answer.label}
                  onClick={() => onClickAnswer(answer)}
                  disabled={disabled}
                  aria-label={`Select ${answer.label}`}
                  className={i === 0 ? styles['left-btn'] : styles['right-btn']}
                >
                  {answer.label}
                </button>
              ))}
            </div>
            {currSurvey.image && (
              <img 
                className={styles['img']} 
                src={currSurvey.image} 
                alt={`Illustration for question ${currStep}`}
                loading="lazy"
              />
            )}
          </div>
        )}
      </div>

      {type === 'text' && (
        <ul 
          className={`${styles['answer']} ${styles['fade-in']}`} 
          ref={answerRef}
          role="list"
        >
          {answers.map((answer, i) => (
            <li
              key={answer.label}
              className={`${styles['box']} ${styles['a']}`}
              onClick={() => onClickAnswer(answer)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClickAnswer(answer);
                }
              }}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Option ${i + 1}: ${answer.label}`}
              aria-disabled={disabled}
            >
              <span className={styles['answer-number']}>{i + 1})</span> {answer.label}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
