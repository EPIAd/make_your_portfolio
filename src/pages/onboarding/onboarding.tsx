import Clock from '@/assets/onboarding/clock.png';
import styles from './onboarding.module.css';

export const Onboarding = () => {
  return (
    <div>
      <section className={styles['welcome']}>
        <div className={styles['title-box']}>
          <span className={styles['p-tit']}>ETF Platform Innovator</span>
          <h1 className={styles['title']}>My Best Tax Investment</h1>
          <h3 className={styles['sec-tit']}>
            나에게 꼭 맞는
            <br />
            최적의 절세 납입 순서
          </h3>
          <img src={Clock} alt='time-logo' className={styles['time-logo']} width={30} height={30} />
          <div className={styles['time']}>소요 시간 : 1분 내외</div>
        </div>
        <hr className={styles['w-line']} />
        <p className={styles['w-line']}>
          <span id='p-tit'>이 테스트로 당신은...</span>
          <br />
          당신의 소득과 상황에 맞는 절세 방법을 확인할 수 있습니다.
          <br />
          테스트 결과를 가이드라인으로 활용해 보세요. <br /> <br />
          <br />
          <div className={styles['link']}>
            <span>{`->`}</span>
            <a href='https://etfdiy.imweb.me/39' target='_blank'>{`<절세 계좌 종류 알아보러 가기>`}</a>
            <span>{`<-`}</span>
          </div>
        </p>
        <hr className={styles['w-line']} />
        <div className={styles['name-input']}>
          <input type='text' placeholder='이름' autoFocus />
        </div>
        <div className={styles['gender-input']}>
          <div className={styles['input-label']}>성별</div>
          <input type='radio' id='male' name='gender' value='male' checked />
          <label htmlFor='male'>남성</label>
          <input type='radio' id='female' name='gender' value='female' />
          <label htmlFor='female'>여성</label>
        </div>
        <div className={styles['age-input']}>
          <div className={styles['input-label']}>나이</div>
          <select>
            <option value='under20'>20세 미만</option>
            <option value='20s'>20~30대</option>
            <option value='40s'>40~50대</option>
            <option value='over60'>60세 이상</option>
          </select>
        </div>
        <p className={`${styles['check-name']} ${styles['warning']}`}></p>
        <div className={styles['start-wrap']}>
          <button className={styles['start']}>시 작</button>
        </div>
      </section>
    </div>
  );
};
