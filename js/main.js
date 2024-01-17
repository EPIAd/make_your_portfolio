const header = document.getElementById('header');
const footer = document.getElementById('footer');
const qna = document.getElementById('qna');
const u_name = document.querySelector('input[type=text]');
const wrap = document.getElementById('wrap');
const tabletMQL = window.matchMedia("all and (min-width: 768px)");
const pcMQL = window.matchMedia("all and (min-width: 1024px)");
const ENDPOINT = 6;
const select = [];
let qIdx = -1;

const goTo = (dest) => {
  let elem;
  let elemTop;
  if (dest === 'artist') {
    elem = document.getElementById('intro-box');
  } else {
    elem = document.getElementById('share-box');
  }
  elemTop = window.pageYOffset + elem.getBoundingClientRect().top;
  if (pcMQL.matches) {
    elemTop -= 150;
  } else if (tabletMQL.matches) {
    elemTop -= 115;
  } else {
    elemTop -= 60;
  }
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: elemTop
  });
}
const goArtist = () => goTo('artist');
const goShare = () => goTo('share');

const copy = () => {
  const tmp = document.createElement('textarea');
  document.body.appendChild(tmp);
  tmp.value = url;
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}

const calcScore = () => {
  let point = 0;
  for (let i = 0; i < ENDPOINT; i++) {
    point += qnaList[i].a[select[i]].score;
  }
  return point;
}

const calcScore2 = () => {
  let point2 = 0;
  for (let i = 0; i < ENDPOINT; i++) {
    point2 += qnaList[i].a[select[i]].score2;
  }
  return point2;
}

const calcScore3 = () => {
  let point3 = 0;
  for (let i = 0; i < ENDPOINT; i++) {
    point3 += qnaList[i].a[select[i]].score3;
  }
  return point3;
}

const calcScore4 = () => {
  let point4 = 0;
  for (let i = 0; i < ENDPOINT; i++) {
    point4 += qnaList[i].a[select[i]].score4;
  }
  return point4;
}

const calcScore5 = () => {
  let point5 = 0;
  for (let i = 0; i < ENDPOINT; i++) {
    point5 += qnaList[i].a[select[i]].score5;
  }
  return point5;
}

const sortResult = (point) => {
  let num = 0;
  if (point == 0) {
    num = 0;
  } else if (point == 1) {
    num = 1;
  } else if (point == 11) {
    num = 2;
  } else if (point == 21) {
    num = 3;
  } else if (point == 31) {
    num = 4;
  } else if (point == 41) {
    num = 5;
  } else if (point == 51) {
    num = 6;
  } else if (point == 100) {
    num = 7;
  } else if (point == 101) {
    num = 8;
  } else if (point == 111) {
    num = 9;
  } else if (point == 121) {
    num = 10;
  } else if (point == 131) {
    num = 11;
  } else if (point == 141) {
    num = 12;
  } else {
    num = 3;
  }
  return num;
}

const sortResult2 = (point2) => {
  let num2 = 1;
  if (point2 == 0) {
    num2 = 1;
  } else if (point2 == 1) {
    num2 = 2;
  } else if (point2 == 2) {
    num2 = 3;
  } else if (point2 == 3) {
    num2 = 4;
  } else {
    num2 = 5;
  }
  return num2;
}

const sortResult3 = (point3) => {
  let num3 = 1;
  if (point3 == 0) {
    num3 = 1;
  } else if (point3 == 1) {
    num3 = 2;
  } else if (point3 == 2) {
    num3 = 3;
  } else if (point3 == 3) {
    num3 = 4;
  } else {
    num3 = 5;
  }
  return num3;
}

const sortResult4 = (point4) => {
  let num4 = 1;
  if (point4 == 0) {
    num4 = 1;
  } else if (point4 == 1) {
    num4 = 2;
  } else if (point4 == 2) {
    num4 = 3;
  } else {
    num4 = 4;
  }
  return num4;
}

const sortResult5 = (point5) => {
  let num5 = 1;
  if (point5 <= 3) {
    num5 = 1;
  } else {
    num5 = 2;
  }
  return num5;
}

const goResult = () => {
  if (pcMQL.matches) {
    console.log('PC');
    wrap.style.marginTop = '150px';
  } else if (tabletMQL.matches) {
    console.log('tablet');
    wrap.style.marginTop = '115px';
  }

  const result = document.getElementById('result');
  const point = calcScore();
  const point2 = calcScore2();
  const point3 = calcScore3();
  const point4 = calcScore4();
  const point5 = calcScore5();
  const grade = sortResult(point);
  const grade2 = sortResult2(point2);
  const grade3 = sortResult3(point3);
  const grade1 = 5 - (grade + 1);
  const grade4 = sortResult4(point4);
  const grade5 = sortResult5(point5);
  const grade2_2 = grade2 - 1;
  const grade3_2 = grade3 - 1;
  const grade4_2 = grade4 - 1;
  const grade5_2 = grade5 - 1;
  const pTitle = document.querySelector('.p');
  const res_point = document.querySelector('.point');
  const pin = document.querySelector('.pin');
  const img_url = 'img/' + grade3 + '-' + grade2 + '-' + grade4 + '-' + grade1 + '.png';
  const img2_url = 'img/MBTI.png';
  const res_img = document.createElement('img');
  const res_img_div = document.querySelector('.art');
  const animal = document.querySelector('.result');
  const desc = document.querySelector('.res');
  const hyungu = document.querySelector('.hyungu');
  const desc2 = document.querySelector('.res');
  const desc_1 = document.querySelector('.res');
  const desc_2 = document.querySelector('.res');
  const desc_3 = document.querySelector('.res');
  const res_img2 = document.createElement('img');

  
  res_img.alt = infoList[grade].name
  res_img.title = infoList[grade].name
  animal.innerHTML = infoList[grade].name  
  desc.innerHTML = infoList[grade].name2
  res_img2.src = img2_url;
  res_img2.alt = infoList[grade].name + infoList5[grade5_2].name + infoList2[grade2_2].name + infoList4[grade4_2].name;
  res_img2.title = infoList[grade].name + infoList5[grade5_2].name + infoList2[grade2_2].name + infoList4[grade4_2].name;

 
  setTimeout(() => {
    header.style.display = 'block';
    footer.style.display = 'block';
    result.style.display = 'block';
    header.style.animation =
      'fade-in 0.3s forwards';
    footer.style.animation =
      'fade-in 0.3s forwards';
    result.style.animation =
      'going-up 0.5s, ' +
      'fade-in 0.5s forwards';
  }, 600);

}

const end = () => {
  qna.style.animation = '';
  const interval = setInterval(() => {
    qna.style.opacity -= 0.1;
    qna.style.transform = 'translateY(-1px)';
  }, 50);
  setTimeout(() => clearTimeout(interval), 500);
  setTimeout(() => qna.style.display = 'none', 500);
  setTimeout(() => {
    const calc = document.getElementById('calc');
    calc.style.display = 'block';
    calc.style.animation =
      'going-up 0.5s forwards, ' +
      'fade-in 0.5s forwards';
  }, 700);
  setTimeout(() => {
    calc.style.animation = '';
    calc.style.animation =
      'going-left 0.4s forwards, ' +
      'fade-out 0.4s forwards';
    setTimeout(() => {
      calc.style.display = 'none';
      goResult();
    }, 400);
  }, 9000);
}

const addAnswer = (answerTxt, idx) => {
  const answer = document.createElement('button');
  const a = document.querySelector('.answer');
  answer.className += 'a box';
  answer.innerHTML = answerTxt;
  answer.addEventListener('click', () => {
    const parent = answer.parentNode;
    const children = parent.childNodes;
    for (let i in children) {
      children[i].disabled = true;
    }
    parent.classList.add('fade-out-5-4');
    setTimeout(() => {
      select[qIdx] = idx;
      a.innerHTML = '';
      parent.classList.remove('fade-out-5-4');
      goNext();
    }, 800);
  });

  setTimeout(() => answer.style.animation =
    'going-down 0.25s forwards, fade-in 0.25s forwards', 50);
  a.appendChild(answer);
}


const goNext = () => {
  if (qIdx++ === qnaList.length - 1) {
    end();
    return;
  }

  const status = document.querySelector('.status');
  const qNum = qnaList[qIdx];
  const q = document.querySelector('.q');

  status.style.width = (100/ENDPOINT * (qIdx + 1)) + '%';
  q.innerHTML = qNum.q;
  qna.style.animation =
    'fade-in 0.3s ease-in-out 0.4s forwards, ' +
    'going-down 0.3s ease-in-out 0.4s forwards';

  setTimeout(() => {
    const endIdx = qNum.a.length - 1;
    for (let i in qNum.a) {
      addAnswer(qNum.a[i].answer, i);
    }
    qna.style.opacity = 1;
  }, 700);
}

const begin = () => {
  const welcome = document.getElementById('welcome');
  header.style.animation =
    'going-up 0.4s forwards, ' +
    'fade-out 0.4s forwards';
  footer.style.animation =
    'going-down 0.4s forwards, ' +
    'fade-out 0.4s forwards';
  setTimeout(() => welcome.style.animation =
    'going-up 0.4s ease-in-out forwards, ' +
    'fade-out 0.4s ease-in-out forwards', 500);
  setTimeout(() => {
    header.style.display = 'none';
    footer.style.display = 'none';
    welcome.style.display = 'none';
    qna.style.display = 'block';
    if (pcMQL.matches) {
      console.log('PC');
      wrap.style.marginTop = '50px';
    } else if (tabletMQL.matches) {
      console.log('tablet');
      wrap.style.marginTop = '30px';
    }
    goNext();
  }, 1000);
}

const load = () => {
  const msg = document.querySelector('.check-name');
  const start_btn = document.querySelector('.start');

  u_name.addEventListener('blur', () => {
    try {
      if (u_name.value.length < 1) {
        throw '이름을 입력하고 시작해 주세요.';
      }
      msg.innerHTML = '';
    } catch (err) {
      msg.innerHTML = err;
    }
  });

  start_btn.addEventListener('click', () => {
    try {
      if (u_name.value.length < 1) {
        throw '이름을 입력하고 시작해 주세요.';
      }
      msg.innerHTML = '';
      start_btn.disabled = true;
      begin();
    } catch (err) {
      msg.innerHTML = err;
    }
  });

}

window.onload = load();
