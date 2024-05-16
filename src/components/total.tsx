export const Total = () => {
  const switchMode = () => {};
  const tw = () => {};
  const fb = () => {};
  const nv = () => {};
  const band = () => {};
  const copy = () => {};

  return (
    <div id='wrap'>
      <header id='header'>
        <button className='logo head' onClick={switchMode}></button>
      </header>
      <section id='welcome' className='container'>
        <div id='title-box'>
          <span id='p-tit'>ETF Platform Innovator</span>
          <h1 className='title'>My Best Tax Investment</h1>
          <h3 className='sec-tit'>
            나에게 꼭 맞는
            <br />
            최적의 절세 납입 순서
          </h3>
          <span className='time-logo'></span>
          <div>소요 시간 : 1분 내외</div>
        </div>
        <hr className='w-line' />
        <p className='w-line'>
          <span id='p-tit'>이 테스트로 당신은...</span>
          <br />
          당신의 소득과 상황에 맞는 절세 방법을 확인할 수 있습니다.
          <br />
          테스트 결과를 가이드라인으로 활용해 보세요. <br /> <br />
          <br />
          <span style={{ color: 'red' }}>{`->`}</span>
          <a
            href='https://etfdiy.imweb.me/39'
            target='_blank'
            style={{ color: 'red', textDecoration: 'underline' }}
          >{`<절세 계좌 종류 알아보러 가기>`}</a>
          <span style={{ color: 'red' }}>{`<-`}</span>
        </p>
        <hr className='w-line' />
        <div id='name-input'>
          <input type='text' placeholder='이름' autoFocus />
        </div>
        <div id='gender-input'>
          <div className='input-label'>성별</div>
          <input type='radio' id='male' name='gender' value='male' checked />
          <label htmlFor='male'>남성</label>
          <input type='radio' id='female' name='gender' value='female' />
          <label htmlFor='female'>여성</label>
        </div>
        <div id='age-input'>
          <div className='input-label'>나이</div>
          <select>
            <option value='under20'>20세 미만</option>
            <option value='20s'>20~30대</option>
            <option value='40s'>40~50대</option>
            <option value='over60'>60세 이상</option>
          </select>
        </div>
        <p className='check-name warning'></p>
        <div className='start-wrap'>
          <button className='start'>시 작</button>
        </div>
      </section>
      <section id='qna' className='container'>
        <div id='title-box'>
          <span id='p-tit'>
            ETF Platform Innovator
            <br />
            <br />
          </span>
        </div>
        <div className='status-bar'>
          <div className='status'></div>
        </div>
        <div className='q box'></div>
        <div className='answer'></div>
      </section>
      <section id='calc'>
        <div className='calc-bar'>
          CALCULATING
          <div className='calc'></div>
        </div>
        <p className='wait'>잠시 기다려주세요...</p>
      </section>
      <section id='result' className='container'>
        <div id='desc-box'>
          <div className='result title'></div>
          <div className='res desc'></div>
          <div className='hyungu'></div>
        </div>
        <div className='Link1'></div>
        <hr />
        <p>친구들과 공유하기</p>
        <div className='hash'>#절세 #IRP,연금저축,ISA #절세 투자</div>
        <div id='share-box'>
          <a onClick={tw} target='_blank' title='트위터에 공유하기'>
            <span className='tw'></span>
          </a>
          <a onClick={fb} target='_blank' title='페이스북에 공유하기'>
            <span className='fb'></span>
          </a>
          <a onClick={nv} target='_blank' title='네이버에 공유하기'>
            <span className='nv'></span>
          </a>
          <a onClick={band} target='_blank' title='네이버 밴드에 공유하기'>
            <span className='band'></span>
          </a>
        </div>
        <button onClick={copy} className='btn'>
          링크 복사하기
        </button>
        <hr />
        <div className='caution'>
          <p>
            위 링크는 당신의 상황에 맞춘 절세 방식을 기반으로, 합리적인 투자 방향을 제시해줍니다.
            <br />
            더욱 상세한 결과는 위 링크를 참조해 주세요!
            <br />
            당신의 성공적인 투자를 기원합니다.
            <br />
            <br />
          </p>
          <span id='p-tit'>ETF Platform Innovator</span>
        </div>
        <hr />
      </section>
      <footer id='footer'>
        <div>
          <a href='https://www.etfpi.com'>
            <span className='highlight'>EPI Advisor</span>
          </a>
          <br />
        </div>
        <a href='https://blog.naver.com/epiadvisor' target='_blank' title='네이버 블로그'>
          <div className='logo foot github'></div>
        </a>
        <a href='https://www.youtube.com/@epiadvisor7225' target='_blank' title='유튜브'>
          <div className='logo foot tistory'></div>
        </a>
      </footer>
    </div>
  );
};
