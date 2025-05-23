import { InvestSurveyContext } from '@/shared/context/survey';
import styles from './result.module.css';
import { InvestScores } from '@/shared/types/survey';
import { useContext } from 'react';
import { getMbtiLink } from './csvReader';

export const Result = () => {
  const scores = useContext(InvestSurveyContext);

  const calcResult = (scores: InvestScores | null) => {
    if (!scores) return '';
    
    const { s1, s2, s3, s4, s5 } = scores;
    const ie = s1 < 50 ? 'I' : 'E';
    const sn = s3 % 2 ? 'N' : 'S';
    const tf = s2 < 3 ? 'T' : 'F';
    const jp = s4 < 2 ? 'J' : 'P';
    const mbti = `${ie}${sn}${tf}${jp}`;
    
    const s5Result = s5 < 4 ? 0 : 5;
    const s1Result = calcS1Result(s1) + s5Result;
    const s2Result = (s2 <= 1 ? 1 : s2) + s5Result;
    const s3Result = s3 + s5Result;
    const s4Result = s4 + 1 + s5Result;
    const code = `${s1Result}${s3Result}${s2Result}${s4Result}`;
    
    return `${mbti}_${code}`;
  };

  const calcS1Result = (score: number) => {
    if (score <= 10) return 1;
    else if (score <= 49) return 2;
    else if (score <= 89) return 3;
    else return 4;
  };

  const result = calcResult(scores);
  const link = getMbtiLink(result);

  const handleClickLink = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  // Error handling for missing scores
  if (!scores) {
    return (
      <section className={styles['result']}>
        <div className={styles['result-box']}>
          <hr className={styles['w-line']} />
          <div className={styles['title']}>
            결과를 불러오는 중 오류가 발생했습니다.
            <p className={styles['sub']}>다시 시도해 주세요.</p>
          </div>
          <hr className={styles['w-line']} />
        </div>
      </section>
    );
  }

  return (
    <section className={styles['result']}>
      <div className={styles['result-box']}>
        <hr className={styles['w-line']} />
        <div className={styles['title']}>
          당신의 투자 MBTI 결과와 추천 포트폴리오를 찾았습니다.
          <p className={styles['sub']}>▼ 아래 클릭 ▼</p>
        </div>
        
        <button 
          className={styles['result-button']} 
          onClick={handleClickLink}
          disabled={!link}
          aria-label="투자 MBTI 결과 보러 가기"
        >
          결과 보러 가기
        </button>
        
        <div className={styles['caution']}>
          {`위 성과 차트는 주식, 채권, 대체자산으로 구성된 포트폴리오의 성과입니다.\n본 결과가 본인의 투자성향을 완벽하게 알려주진 못할 수 있습니다.\n결과를 토대로 본인의 투자성향에 적합한 최적의 포트폴리오를 만들어 보세요.\n당신의 성공적인 투자를 기원합니다!\n`}
        </div>
        
        <div className={styles['footer']}>
          <span className={styles['p-tit']}>EPI, ETF Platform Innovator</span>
        </div>
        
        <hr className={styles['w-line']} />
      </div>
    </section>
  );
};
