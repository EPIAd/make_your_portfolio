import { useState } from 'react';
import styles from './App.module.css';
import { Onboarding, Step } from './pages';

export const GENDER = [
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
] as const;
export const AGE = [
  { label: '20세 미만', value: 'under20' },
  { label: '20대~30대', value: '20s' },
  { label: '40대~50대', value: '40s' },
  { label: '60세 이상', value: 'over60' },
] as const;

export type GenderValues = Pick<(typeof GENDER)[number], 'value'>['value'];
export type AgeValues = Pick<(typeof AGE)[number], 'value'>['value'];

const TEST_STEP: { [key: number]: string } = { 0: 'ONBOARDING', 1: 'STEP' };

function App() {
  const [step, setStep] = useState<number>(1);

  const [name, setName] = useState('');
  const [gender, setGender] = useState<GenderValues>(GENDER[0].value);
  const [age, setAge] = useState<AgeValues>(AGE[0].value);

  const handleName = (name: string) => setName(name);
  const handleGender = (gender: GenderValues) => setGender(gender);
  const handleAge = (age: AgeValues) => setAge(age);
  const handleStep = () => setStep((prev) => prev + 1);

  return (
    <div className={styles['wrap']}>
      {TEST_STEP[step] === 'ONBOARDING' && (
        <Onboarding
          name={name}
          gender={gender}
          age={age}
          handleName={handleName}
          handleGender={handleGender}
          handleAge={handleAge}
          handleStep={handleStep}
        />
      )}
      {TEST_STEP[step] !== 'ONBOARDING' && (
        <Step title='1. 연금 저축 계좌가 있으신가요?' answers={['있다', '없다']} currStep={step} />
      )}
    </div>
  );
}

export default App;
