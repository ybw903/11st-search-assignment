# 2021년 11번가 전환형 인턴(검색서비스 Frontend분야) 과제

## 실행
```sh
# Development
npm run dev 

# Production (build)
npm run prod
```

## 모듈 구조
```bash
├── src/                          - 프로젝트 폴더
│   │   
│   ├── components/               - 컴포넌트 폴더
│   │   ├── create-item/          - 메모,알람 input 컴포넌트 폴더
│   │   │   ├── index.ts      
│   │   │   └── style.css    
│   │   └── header/               - 화면상단에 계속 위치하는 헤더 컴포넌트 폴더
│   │       ├── index.ts
│   │       └── style.css    
│   │   
│   ├── imgages/                  - 사진앱에서 사용되는 이미지가 들어있는 폴더
│   │   
│   │── models/                   
│   │       ├── index.ts          - view와 로컬 저장소 사이에 발생되는 이벤트 처리  
│   │       └── local-storage.ts  - 로컬 저장소에 접근하는 파일
│   │ 
│   ├── view/                     - 앱 화면을 구성하는 클래스 폴더
│   │   ├── alarm-view/     
│   │   │   ├── index.ts      
│   │   │   └── style.css       
│   │   ├── home-view/     
│   │   │   ├── index.ts      
│   │   │   └── style.css      
│   │   ├── memo-view/       
│   │   │   ├── index.ts      
│   │   │   └── style.css    
│   │   └── photo-view/     
│   │       ├── index.ts      
│   │       └── style.css      
│   │ 
│   └── utils/            
│       └── alarm.ts              - 알람시간을 확인하는 콜백함수 파일
│ 
├── custom-evnet.ts               - 커스텀 이벤트 발생 및 리스너 정의 파일
├── image.d.ts                    - 이미지 내보내기 설정파일
├── index.html                    - 프로젝트의 html entry 파일
├── index.ts                      - 프로젝트의 ts entry 파일
├── router.ts                     - 각 앱화면 생성 및 페이지 이동 이벤트 핸들링
├── style.css                     
└── types.ts                      - 프로젝트에 사용할 커스텀 타입들을 모아둔 파일
```

## 미구현 기능
**[홈]**
 * Drag & Drop 으로 앱의 위치를 이동
 * Local Storage에 앱의 위치 저장


**[알람]**
 * 다른 앱에 있어도 알람 동작