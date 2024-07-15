- invest: 투자 MBTI
- tax-saving: 절세 MBTI
- earn: 모으기 MBTI

```bash
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── assets # 이미지 파일
│   │   ├── invest
│   │   │   ├── 1.png
│   │   │   ├── 2.png
│   │   │   ├── 3.png
│   │   │   └── 4.png
│   │   ├── onboarding
│   │   │   └── clock.png
│   │   └── react.svg
│   ├── components
│   │   ├── common # 공통적으로 사용하는 커스텀 컴포넌트
│   │   │   └── radio
│   │   │       ├── radio.module.css
│   │   │       └── radio.tsx
│   │   ├── index.ts
│   │   ├── invest # 투자 MBTI에서 사용하는 컴포넌트
│   │   │   ├── onboarding # 진입 페이지
│   │   │   │   ├── index.tsx
│   │   │   │   ├── onboarding.module.css
│   │   │   │   └── onboarding.tsx
│   │   │   ├── result # 결과 페이지
│   │   │   │   ├── calc.module.css
│   │   │   │   ├── calc.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── result.module.css
│   │   │   │   └── result.tsx
│   │   │   └── step # 설문 단계 페이지
│   │   │       ├── index.tsx
│   │   │       ├── step.module.css
│   │   │       └── step.tsx
│   │   ├── tax-saving # 절세 MBTI에서 사용하는 컴포넌트
│   │   │   ├── result # 결과 페이지
│   │   │   │   ├── calc.ts
│   │   │   │   ├── chart.ts
│   │   │   │   ├── index.tsx
│   │   │   │   └── result.module.css
│   │   │   └── survey # 설문 페이지
│   │   │       ├── index.module.css
│   │   │       └── index.tsx
│   │   └── wrapper # 공통적으로 사용하는 배경 컴포넌트
│   │       ├── index.tsx
│   │       └── wrapper.module.css
│   ├── index.css
│   ├── main.tsx
│   ├── pages
│   │   ├── earn # 모으기 MBTI
│   │   │   ├── earn.module.css
│   │   │   └── index.tsx
│   │   ├── index.ts
│   │   ├── invest # 투자 MBTI
│   │   │   └── index.tsx
│   │   └── tax-saving # 절세 MBTI
│   │       └── index.tsx
│   ├── reset.css
│   ├── router.tsx
│   ├── shared
│   │   ├── constants
│   │   │   ├── inputs.ts
│   │   │   └── survey.ts # 투자/절세/적립 설문 문항 목 데이터
│   │   ├── context
│   │   │   └── survey.ts
│   │   ├── styles
│   │   │   └── shared.css # 공통적으로 사용하는 스타일
│   │   └── types # 타입 정의
│   │       ├── input.ts
│   │       └── survey.ts # 설문에 사용되는 타입
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
