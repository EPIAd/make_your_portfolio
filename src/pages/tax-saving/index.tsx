import dayjs from "dayjs";
import styles from "./index.module.css";
import { Radio } from "@/components";

const DATE_FORMAT = "YYYY년 MM월 DD일";
const _19_YEARS_AGO = dayjs().subtract(19, "year").format(DATE_FORMAT);
const _15_YEARS_AGO = dayjs().subtract(15, "year").format(DATE_FORMAT);
const BIRTH_ANSWERS = [
  `${_19_YEARS_AGO} 이전`,
  `${_19_YEARS_AGO} ~ ${_15_YEARS_AGO} 사이`,
  `${_15_YEARS_AGO} 이후`,
] as const;

const INCOME_ANSWERS = [
  "아니오",
  "연간 근로소득 5,000만원 이하",
  "연간 종합소득 3,800만원 이하",
  "연간 농어업소득 3,800만원 이하",
  "소득 종류별 위 금액 이상",
] as const;

export function TaxSavingPage() {
  return (
    <section className={styles["container"]}>
      <h1 className={`title ${styles["title"]}`}>절세 MBTI</h1>
      <div className={styles["survey-wrapper"]}>
        <div className={styles.question}>
          <p className={styles.title}>
            1. 최근 3년 이내에 금융소득종합과세 대상자였나요?
          </p>
          <div className={styles.answer}>
            {["네", "아니오"].map((item) => (
              <Radio
                id={item}
                name="answer-1"
                value={item}
                htmlFor={item}
                label={item}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>2. 생일이 언제이신가요?</p>
          <div className={styles.answer}>
            {BIRTH_ANSWERS.map((item) => (
              <Radio
                id={item}
                name="answer-2"
                value={item}
                htmlFor={item}
                label={item}
              />
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>3. 정기적인 소득이 있으신가요?</p>
          <div className={styles.answer}>
            {INCOME_ANSWERS.map((item) => (
              <Radio
                id={item}
                name="answer-3"
                value={item}
                htmlFor={item}
                label={item}
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
            />
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>5. 연간 납입금액은?</p>
          <div className={styles.input}>
            <input type="text" placeholder="(최대 10억원)" />
            <span>만원</span>
          </div>
        </div>
        <div className={styles.question}>
          <p className={styles.title}>
            6. 연 납입액 중, 55세 이후 사용할 금액은?
          </p>
          <div className={styles.input}>
            <input type="text" />
            <span>만원</span>
          </div>
        </div>
      </div>
    </section>
  );
}
