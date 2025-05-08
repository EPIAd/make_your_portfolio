@@ -1,5 +1,8 @@
import { useEffect, useState } from "react";
import styles from "./result.module.css";

/* 기존 코드 주석 처리
import { InvestSurveyContext } from '@/shared/context/survey';
import styles from './result.module.css';
import { InvestScores } from '@/shared/types/survey';
import { useContext } from 'react';
import { getMbtiLink } from './csvReader';
@@ -38,6 +41,7 @@ export const Result = () => {
  const handleClickLink = () => {
    window.open(link);
  };
  return (
    <section className={styles['result']}>
      <div className={styles['result-box']}>
@@ -59,3 +63,61 @@ export const Result = () => {
    </section>
  );
};
*/

const ResultPage = ({ userType }: { userType: string }) => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/product-list.csv") // CSV 파일 불러오기
      .then(response => response.text())
      .then(text => {
        const rows = text.split("\n").slice(1); // 첫 줄(헤더) 제외

        rows.forEach(row => {
          const columns = row.split(",");
          if (columns.length >= 4) {  // 최소 4개 컬럼이 있어야 함
            const type = columns[1].trim(); // 두 번째 컬럼 = 유형(userType)
            const url = columns[columns.length - 1].trim(); // 마지막 컬럼 = redirect_url

            if (type === userType) {
              setRedirectUrl(url);
            }
          }
        });
      })
      .catch(error => console.error("CSV 파일 로드 실패:", error));
  }, [userType]);

  const handleClickLink = () => {
    if (redirectUrl) {
      window.open(redirectUrl, "_blank"); // 새 창에서 열기
    } else {
      alert("해당 유형에 대한 결과 페이지가 없습니다.");
    }
  };

  return (
    <section className={styles["result"]}>
      <div className={styles["result-box"]}>
        <hr className={styles["w-line"]} />
        <div className={styles["title"]}>
          당신의 투자 MBTI 결과와 추천 포트폴리오를 찾았습니다.
          <p className={styles["sub"]}>▼ 아래 버튼을 클릭하세요 ▼</p>
        </div>

        <button className={styles["result-button"]} onClick={handleClickLink}>
          결과 보러 가기
        </button>

        <p className={styles["caution"]}>
          {`위 성과 차트는 주식, 채권, 대체자산으로 구성된 포트폴리오의 성과입니다.\n본 결과가 본인의 투자성향을 완벽하게 알려주진 못할 수 있습니다.\n결과를 토대로 본인의 투자성향에 적합한 최적의 포트폴리오를 만들어 보세요.\n당신의 성공적인 투자를 기원합니다!\n`}
        </p>
        <span className={styles["p-tit"]}>EPI, ETF Platform Innovator</span>
        <hr className={styles["w-line"]} />
      </div>
    </section>
  );
};

export default ResultPage;
