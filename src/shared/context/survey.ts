import { createContext } from 'react';
import { Scores } from '../types/survey';

export const SurveyContext = createContext<Scores | null>(null);
