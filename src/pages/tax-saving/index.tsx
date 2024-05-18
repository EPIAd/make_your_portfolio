import dayjs from "dayjs";
import styles from "./index.module.css";
import { Radio } from "@/components";
import { useState } from "react";

const DATE_FORMAT = "YYYY년 MM월 DD일";
const _19_YEARS_AGO = dayjs().subtract(19, "year").format(DATE_FORMAT);
const _15_YEARS_AGO = dayjs().subtract(15, "year").format(DATE_FORMAT);

const IS_SUBJECT_ANSWERS = ["네", "아니오"] as const;
type YesNo = (typeof IS_SUBJECT_ANSWERS)[number];

const BIRTH_ANSWERS = [
  `${_19_YEARS_AGO} 이전`,
  `${_19_YEARS_AGO} ~ ${_15_YEARS_AGO} 사이`,
  `${_15_YEARS_AGO} 이후`,
] as const;
type Birth = (typeof BIRTH_ANSWERS)[number];

const INCOME_ANSWERS = [
  "아니오",
  "연간 근로소득 5,000만원 이하",
  "연간 종합소득 3,800만원 이하",
  "연간 농어업소득 3,800만원 이하",
  "소득 종류별 위 금액 이상",
] as const;
type Income = (typeof INCOME_ANSWERS)[number];

const NUMBER_AMOUNT_REGEX = /^\d*$/gm;

export function TaxSavingPage() {
  const [yesNoAnswer, setYesNoAnswer] = useState<YesNo>();
  const [birthAnswer, setBirthAnswer] = useState<Birth>();
  const [incomeAnswer, setIncomeAnswer] = useState<Income>();
  const [numberCode, setNumberCode] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [useAmount, setUseAmount] = useState("");

  console.log(
    yesNoAnswer,
    birthAnswer,
    incomeAnswer,
    numberCode,
    payAmount,
    useAmount
  );

  const change = (input: string) => {
    const inputValue = input.replaceAll(",", "");
    const extractedNumbers = parseInt(
      inputValue.match(NUMBER_AMOUNT_REGEX)?.join("") || ""
    );
    return Number.isNaN(extractedNumbers) ? null : extractedNumbers;
  };
  return (
    <section className={styles["container"]}>
      <h1 className={`title ${styles["title"]}`}>절세 MBTI</h1>
      <div className={styles["survey-wrapper"]}>
        <div className={styles.question}>
          <p className={styles.title}>
            1. 최근 3년 이내에 금융소득종합과세 대상자였나요?
          </p>
          <div className={styles.answer}>
            {IS_SUBJECT_ANSWERS.map((item) => (
              <Radio
                key={item}
                id={item}
                name="answer-1"
                value={item}
                htmlFor={item}
                label={item}
                checked={yesNoAnswer === item}
                onChange={(e) => setYesNoAnswer(e.target.value as YesNo)}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>2. 생일이 언제이신가요?</p>
          <div className={styles.answer}>
            {BIRTH_ANSWERS.map((item) => (
              <Radio
                key={item}
                id={item}
                name="answer-2"
                value={item}
                htmlFor={item}
                label={item}
                checked={birthAnswer === item}
                onChange={(e) => setBirthAnswer(e.target.value as Birth)}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>3. 정기적인 소득이 있으신가요?</p>
          <div className={styles.answer}>
            {INCOME_ANSWERS.map((item) => (
              <Radio
                key={item}
                id={item}
                name="answer-3"
                value={item}
                htmlFor={item}
                label={item}
                checked={incomeAnswer === item}
                onChange={(e) => setIncomeAnswer(e.target.value as Income)}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>
            4. 당신의 투자 MBTI 숫자 4자리 코드를 입력해주세요.
          </p>
          <div className={styles.answer}>
            <input
              type="text"
              placeholder="(아직 없다면 “0000”을 입력해주세요)"
              value={numberCode}
              onChange={(e) => setNumberCode(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>5. 연간 납입금액은?</p>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="(최대 10억원)"
              value={payAmount}
              onChange={(e) => {
                const numValue = change(e.target.value);
                setPayAmount(numValue ? numValue.toLocaleString() : "");
              }}
            />
            <span>만원</span>
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>
            6. 연 납입액 중, 55세 이후 사용할 금액은?
          </p>
          <div className={styles.input}>
            <input
              type="text"
              value={useAmount}
              onChange={(e) => {
                const numValue = change(e.target.value);
                setUseAmount(numValue ? numValue.toLocaleString() : "");
              }}
            />
            <span>만원</span>
          </div>
        </div>
      </div>
    </section>
  );
}
