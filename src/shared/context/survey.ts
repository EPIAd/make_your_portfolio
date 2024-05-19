import { createContext } from 'react';
import { Scores } from '../types/survey';

export const InvestSurveyContext = createContext<Scores | null>(null);
