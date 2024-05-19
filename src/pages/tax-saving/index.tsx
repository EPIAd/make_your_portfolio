import { TaxSavingResult, TaxSavingSurvey } from '@/components';
import { TaxSavingSurveyContext } from '@/shared/context/survey';
import { TaxSavingScores } from '@/shared/types/survey';
import { useState } from 'react';

export function TaxSavingPage() {
  const [scores, setScores] = useState({ s1: 0, s2: 0, s3: 0 });
  const [step, setStep] = useState(0);

  const handleScore = (score: Partial<TaxSavingScores>) => {
    setScores((prev) => ({
      s1: prev.s1 + (score?.s1 || 0),
      s2: prev.s2 + (score?.s2 || 0),
      s3: prev.s3 + (score?.s3 || 0),
    }));
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  console.log(scores);
  // score > 200: 국내투자형ISA
  // score [114, 124]: 농어민형ISA
  // score [111, 112, 113, 122, 123]: 서민형ISA
  // score [115, 125]: 일반형ISA

  // score 3번 아니오 아니면 IRP
  // 전부 연금저축
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
