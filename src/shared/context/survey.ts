import { createContext } from 'react';
import { InvestScores, TaxSavingScores } from '../types/survey';

export const InvestSurveyContext = createContext<InvestScores | null>(null);
export const TaxSavingSurveyContext = createContext<TaxSavingScores | null>(
  null
);
