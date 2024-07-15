import { TaxSavingResult, TaxSavingSurvey } from '@/components';
import { TaxSavingSurveyContext } from '@/shared/context/survey';
import { TaxSavingScores } from '@/shared/types/survey';
import { useState } from 'react';

export function TaxSavingPage() {
  const [scores, setScores] = useState({
    s1: 0,
    s2: 0,
    s3: 0,
    annualPayAmount: 0,
    useAmount: 0,
  });
  const [step, setStep] = useState(0);

  const handleScore = (score: TaxSavingScores) => {
    setScores(score);
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <TaxSavingSurveyContext.Provider value={scores}>
      {step === 0 && (
        <TaxSavingSurvey
          handleScore={handleScore}
          handleNextStep={handleNextStep}
        />
      )}
      {step !== 0 && <TaxSavingResult />}
    </TaxSavingSurveyContext.Provider>
  );
}
