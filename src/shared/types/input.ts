import { AGE, GENDER } from '../constants/inputs';

export type GenderValues = Pick<(typeof GENDER)[number], 'value'>['value'];
export type AgeValues = Pick<(typeof AGE)[number], 'value'>['value'];
