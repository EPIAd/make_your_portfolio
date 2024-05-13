import styles from './result.module.css';
import { SurveyContext } from '@/hooks/useContext';
import { Scores } from '@/shared/types/survey';
import { useContext, useEffect } from 'react';

export const Result = () => {
  const scores = useContext(SurveyContext);

  const calcResult = (scores: Scores | null) => {
    if (!scores) return '';
    const { s1, s2, s3, s4, s5 } = scores;

    const ie = s1 < 50 ? 'I' : 'E';
    const sn = s3 % 2 ? 'N' : 'S';
    const tf = s2 < 3 ? 'T' : 'F';
    const jp = s4 < 2 ? 'J' : 'P';

    const mbti = `${ie}${sn}${tf}${jp}`;
    const s1Result = calcS1Result(s1);
    const s2Result = s2 <= 1 ? 1 : s2;
    const code = `${s1Result}${s3}${s2Result}${s4 + 1}`;
    return `${mbti}-${code}`;
  };

  const calcS1Result = (score: number) => {
    if (score <= 10) return 1;
    else if (score <= 49) return 2;
    else if (score <= 89) return 3;
    else return 4;
  };

  const result = calcResult(scores);

  return (
    <section className={styles['result']}>
      <div className={styles['result-box']}>
        <hr className={styles['w-line']} />
        <div className={styles['title']}>
          당신의 투자 MBTI와 포트폴리오를 확인하려면?
          <p className={styles['sub']}>▼ 아래 클릭 ▼</p>
        </div>
        {/* TODO: 임시 결과 삭제 */}
        <p style={{ color: 'white' }}>임시 결과 확인: {result}</p>
        <button className={styles['result-button']}>결과 보러 가기</button>

        <p className={styles['caution']}>
          {`위 성과 차트는 주식, 채권, 대체자산으로 구성된 포트폴리오의 성과입니다.\n본 결과가 본인의 투자성향을 완벽하게 알려주진 못할 수 있습니다.\n결과를 토대로 본인의 투자성향에 적합한 최적의 포트폴리오를 만들어 보세요.\n당신의 성공적인 투자를 기원합니다!\n`}
        </p>
        <span className={styles['p-tit']}>EPI, ETF Platform Innovator</span>
        <hr className={styles['w-line']} />
      </div>
    </section>
  );
};
