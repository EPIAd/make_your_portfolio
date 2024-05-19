import { useState } from 'react';
import { Onboarding, Result, Step } from '@/components';
import { AGE, GENDER } from '@/shared/constants/inputs';
import { AgeValues, GenderValues } from '@/shared/types/input';
import { Scores } from '@/shared/types/survey';
import { SURVEY_LENGTH } from '@/shared/constants/survey';
import { InvestSurveyContext } from '@/shared/context/survey';

const TEST_STEP: { [key: number]: string } = { 0: 'ONBOARDING', 1: 'STEP' };

export function InvestPage() {
  const [step, setStep] = useState<number>(0);

  const [name, setName] = useState('');
  const [gender, setGender] = useState<GenderValues>(GENDER[0].value);
  const [age, setAge] = useState<AgeValues>(AGE[0].value);

  const handleName = (name: string) => setName(name);
  const handleGender = (gender: GenderValues) => setGender(gender);
  const handleAge = (age: AgeValues) => setAge(age);
  const handleStep = () => setStep((prev) => prev + 1);

  const [scores, setScores] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 });

  const handleScores = (score: Partial<Scores>) => {
    setScores((prev) => ({
      s1: prev.s1 + (score?.s1 || 0),
      s2: prev.s2 + (score?.s2 || 0),
      s3: prev.s3 + (score?.s3 || 0),
      s4: prev.s4 + (score?.s4 || 0),
      s5: prev.s5 + (score?.s5 || 0),
    }));
  };

  return (
    <InvestSurveyContext.Provider value={scores}>
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
      {TEST_STEP[step] !== 'ONBOARDING' && step <= SURVEY_LENGTH && (
        <Step
          currStep={step}
          handleStep={handleStep}
          handleScores={handleScores}
        />
      )}
      {step > SURVEY_LENGTH && <Result />}
    </InvestSurveyContext.Provider>
  );
}
