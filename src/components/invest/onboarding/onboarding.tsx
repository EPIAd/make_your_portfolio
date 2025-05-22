import Clock from '@/assets/onboarding/clock.png';
import styles from './onboarding.module.css';
import { Fragment, useState } from 'react';
import { AGE, GENDER } from '@/shared/constants/inputs';
import { AgeValues, GenderValues } from '@/shared/types/input';

type OnboardingProps = {
  name: string;
  gender: GenderValues;
  age: AgeValues;
  handleName: (name: string) => void;
  handleGender: (gender: GenderValues) => void;
  handleAge: (age: AgeValues) => void;
  handleStep: () => void;
};

export const Onboarding = ({
  name,
  gender,
  age,
  handleName,
  handleGender,
  handleAge,
  handleStep,
}: OnboardingProps) => {
  const [error, setError] = useState(false);
  
  const onClickStart = () => {
    if (!name) {
      setError(true);
      return;
    }
    handleStep();
  };

  return (
    <section className={styles['welcome']}>
      <div className={styles['title-box']}>
        <h1 className={styles['title']}>Make Your Portfolio</h1>
        <h3 className={styles['sec-tit']}>
          투자 MBTI
          <br />
          나만의 포트폴리오 만들기
        </h3>
        <img
          src={Clock}
          alt='time-logo'
          className={styles['time-logo']}
          width={30}
          height={30}
        />
        <div className={styles['time']}>소요 시간: 3분 내외</div>
      </div>
      <hr className={styles['w-line']} />
      <div className={styles['desc']}>
        <span className={styles['p-tit']}>이 테스트로 당신은...</span>
        <br />
        당신의 투자성향에 맞는 포트폴리오를 만들 수 있습니다.
        <br />
        투자 시작 전 본인의 위험성향, 목표 수익률을 인지하는 것은
        <br />
        성공적인 투자를 위해 필수적입니다.
        <br />
        테스트 결과를 투자 가이드라인으로 활용해 보세요. <br /> <br />
        ※ 질문에서의 자산 선택은 위험성향 분석 과정으로
        <br /> 포트폴리오 구성과는 무관합니다.
        <br />
        <br />
        <div className={styles['link']}>
          <span>{`->`}</span>
          <a
            href='https://epiadvisor.com/55'
            target='_blank'
            rel='noopener noreferrer'
          >{`<투자 MBTI 알아보러 가기>`}</a>
          <span>{`<-`}</span>
        </div>
      </div>
      <hr className={styles['w-line']} />
      <div className={styles['name-input']}>
        <input
          type='text'
          placeholder='이름'
          autoFocus
          value={name}
          onChange={(e) => {
            handleName(e.target.value);
            if (error) setError(false); // Clear error when user starts typing
          }}
        />
      </div>
      <div className={styles['gender-input']}>
        <div className={styles['input-label']}>성별</div>
        {GENDER.map((item) => (
          <Fragment key={item.value}>
            <input
              type='radio'
              id={item.value}
              name='gender'
              value={item.value}
              checked={gender === item.value}
              onChange={(e) => handleGender(e.target.value as GenderValues)}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </Fragment>
        ))}
      </div>
      <div className={styles['age-input']}>
        <div className={styles['input-label']}>나이</div>
        <select
          value={age}
          onChange={(e) => handleAge(e.target.value as AgeValues)}
        >
          {AGE.map((ageOption) => (
            <option key={ageOption.value} value={ageOption.value}>
              {ageOption.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className={`${styles['check-name']} ${styles['warning']}`}>
          이름을 입력하고 시작해 주세요.
        </p>
      )}
      <div className={styles['start-wrap']}>
        <button className={styles['start']} onClick={onClickStart}>
          시 작
        </button>
      </div>
    </section>
  );
};
