// import { Calc } from './calc';
import styles from './result.module.css';
import Band from '@/assets/result/band.png';
import Facebook from '@/assets/result/facebook.svg';
import Naver from '@/assets/result/naver.png';
import Twitter from '@/assets/result/twitter.svg';

export const Result = () => {
  const url = 'https://epiadvisor.github.io/TaxMbti2/';
  const title = '[성향테스트] 나의 투자 MBTI ';
  const hash = '%23투자MBTI %233투자성향테스트 %23성향테스트 ';

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}${hash}`,
      'facebooksharedialog',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
    );
  };
  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${title}%0A${hash}%0A${url}`,
      'twittersharedialog',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
    );
  };
  const shareNaver = () => {
    window.open(
      `http://share.naver.com/web/shareView.nhn?url=${url}&title=${title}`,
      'naversharedialog',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
  };
  const shareBand = () => {
    window.open(
      `https://band.us/plugin/share?url=${url}&title=${title}`,
      'naversharedialog',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    );
  };

  // TODO: 링크 복사
  const copy = () => {
    // const tmp = document.createElement('textarea');
    // document.body.appendChild(tmp);
    // tmp.value = url;
    // tmp.select();
    // document.execCommand('copy');
    // document.body.removeChild(tmp);
  };

  return (
    <section className={styles['result']}>
      <div className={styles['result-box']}>
        <div className={styles['title']}>{`추천 절세 계좌는 … \n국내투자형ISA, 연금저축`}</div>
        <div
          className={styles['desc']}
        >{`최적 납입단계는 연금저축(600만원)\n→국내투자형ISA(4,000만원)\n→연금저축(1200만원)`}</div>
      </div>
      <div className={styles['link']}>
        <a href='https://etfdiy.imweb.me/47/?idx=1896' target='_blank'>
          더 자세한 팁과 설명은 <span>여기를</span> 클릭하세요
        </a>
      </div>
      <hr className={styles['w-line']} />
      <p className={styles['share']}>친구들과 공유하기</p>
      <div className={styles['hash']}>#절세 #IRP,연금저축,ISA #절세 투자</div>
      <div className={styles['share-box']}>
        <a onClick={shareTwitter} target='_blank' title='트위터에 공유하기'>
          <img width={30} height={30} src={Twitter} alt='share to twitter' />
        </a>
        <a onClick={shareFacebook} target='_blank' title='페이스북에 공유하기'>
          <img width={30} height={30} src={Facebook} alt='share to facebook' />
        </a>
        <a onClick={shareNaver} target='_blank' title='네이버에 공유하기'>
          <img width={30} height={30} src={Naver} alt='share to naver' />
        </a>
        <a onClick={shareBand} target='_blank' title='네이버 밴드에 공유하기'>
          <img width={30} height={30} src={Band} alt='share to band' />
        </a>
      </div>
      <button onClick={copy} className={styles['btn']}>
        링크 복사하기
      </button>
      <hr className={styles['w-line']} />
      <div className={styles['caution']}>
        <p>
          {`위 링크는 당신의 상황에 맞춘 절세 방식을 기반으로, 합리적인 투자 방향을 제시해줍니다.\n더욱 상세한 결과는 위 링크를 참조해 주세요!\n당신의 성공적인 투자를 기원합니다.\n\n`}
        </p>
        <span className={styles['p-tit']}>ETF Platform Innovator</span>
      </div>
      <hr className={styles['w-line']} />
    </section>
  );
};
