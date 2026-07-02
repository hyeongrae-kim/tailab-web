// NOTION_TOKEN 이 없을 때 사용하는 폴백 콘텐츠.
// 마이그레이션 직후/로컬 개발에서 사이트가 비지 않도록, 기존 프로토타입 데이터를 그대로 옮겨둔다.
import type {
  News,
  Publication,
  Member,
  ResearchArea,
  Project,
  CvEntry,
  Professor,
} from './types';

export const sampleNews: News[] = [
  { id: 'n1', date: '2026.06.12', category: 'award', title: 'NeurIPS 2026 Oral 발표 선정', description: '추론 능력 평가 프레임워크 연구가 NeurIPS 2026 구두 발표(Oral)로 채택되었습니다.' },
  { id: 'n2', date: '2026.05.28', category: 'notice', title: '2026 하반기 대학원생 모집', description: '석·박사 과정 연구원을 모집합니다. 지원 자격과 절차는 지원 페이지를 참고해 주세요.' },
  { id: 'n3', date: '2026.05.10', category: 'talk', title: '초청 세미나: 인간-AI 협력적 의사결정', description: '협력적 의사결정 시스템을 주제로 공개 세미나를 진행했습니다. 많은 분들이 참석해 주셨습니다.' },
  { id: 'n4', date: '2026.04.22', category: 'paper', title: 'ICML 2026 논문 2편 게재', description: '불확실성 추정 및 데이터 효율 학습 관련 연구 두 편이 ICML 2026에 채택되었습니다.' },
  { id: 'n5', date: '2026.03.15', category: 'award', title: '이수민 연구원, 우수 연구상 수상', description: '한국인공지능학회 춘계 학술대회에서 우수 연구상을 수상했습니다.' },
  { id: 'n6', date: '2026.02.20', category: 'notice', title: '연구실 이전 안내', description: '연구실이 공학관 4호관 512호로 이전했습니다.' },
  { id: 'n7', date: '2026.01.30', category: 'talk', title: '신년 연구 워크숍 개최', description: '2026년 연구 방향을 공유하는 내부 워크숍을 진행했습니다.' },
];

export const samplePublications: Publication[] = [
  { id: 'p1', year: 2026, title: 'Measuring Compositional Reasoning in Large Language Models', authors: 'J. Kim, S. Lee, H. Park', venue: 'NeurIPS 2026 (Oral)', category: 'intl', featured: true },
  { id: 'p2', year: 2026, title: 'Calibrated Uncertainty for Long-form Generation', authors: 'H. Park, J. Kim', venue: 'ICML 2026', category: 'intl' },
  { id: 'p3', year: 2026, title: '대규모 언어모델의 한국어 추론 능력 평가', authors: '최민재, 김지훈', venue: '한국정보과학회 학술발표회 (KCC 2026)', category: 'domestic' },
  { id: 'p4', year: 2025, title: 'Human-Aligned Reward Modeling for Collaborative Agents', authors: 'S. Lee, J. Kim, M. Choi', venue: 'ICML 2025', category: 'intl', featured: true },
  { id: 'p5', year: 2025, title: 'Robust Uncertainty Estimation under Distribution Shift', authors: 'H. Park, J. Kim', venue: 'ICLR 2025', category: 'intl', featured: true },
  { id: 'p6', year: 2025, title: '신뢰 보정을 위한 인간-AI 상호작용 프레임워크', authors: '이수민, 김지훈', venue: '한국인공지능학회 논문지', category: 'domestic' },
  { id: 'p7', year: 2024, title: 'Calibrated Confidence for Sequence Generation', authors: 'J. Kim, M. Choi', venue: 'ACL 2024', category: 'intl' },
  { id: 'p8', year: 2024, title: 'Data-Efficient Fine-tuning via Active Sampling', authors: 'D. Cho, J. Kim', venue: 'EMNLP 2024', category: 'intl' },
  { id: 'p9', year: 2024, title: '불확실성 추정 기반 능동학습 기법', authors: '박현우, 김지훈', venue: '정보과학회논문지', category: 'domestic' },
  { id: 'p10', year: 2023, title: 'Trust Calibration in Human-AI Decision Making', authors: 'J. Kim, S. Lee', venue: 'CHI 2023', category: 'intl' },
  { id: 'p11', year: 2023, title: 'Probing Reasoning Failures in Language Models', authors: 'S. Lee, J. Kim', venue: 'ACL 2023 (Findings)', category: 'intl' },
  { id: 'p12', year: 2023, title: '협력적 의사결정을 위한 설명 가능 인터페이스', authors: '정유진, 김지훈', venue: 'HCI Korea 2023', category: 'domestic' },
];

export const sampleMembers: Member[] = [
  { id: 'm1', name: '이수진', role: 'Postdoctoral Researcher', note: '추론 능력 평가', category: 'postdoc', order: 1 },
  { id: 'm2', name: 'Daniel Cho', role: 'Postdoctoral Researcher', note: '불확실성 추정', category: 'postdoc', order: 2 },
  { id: 'm3', name: '이수민', role: '박사과정 (4년차)', note: '강화학습 · 정렬', category: 'phd', order: 1 },
  { id: 'm4', name: '박현우', role: '박사과정 (3년차)', note: '불확실성 추정', category: 'phd', order: 2 },
  { id: 'm5', name: '정유진', role: '박사과정 (2년차)', note: '인간-AI 협력', category: 'phd', order: 3 },
  { id: 'm6', name: '최민재', role: '석사과정 (2년차)', note: '언어모델 평가', category: 'ms', order: 1 },
  { id: 'm7', name: '한지우', role: '석사과정 (1년차)', note: '신뢰 보정', category: 'ms', order: 2 },
  { id: 'm8', name: '오세훈', role: '석사과정 (1년차)', note: '데이터 효율 학습', category: 'ms', order: 3 },
  { id: 'm9', name: '김다은', role: '학부연구생', note: '인지과학 협력', category: 'undergrad', order: 1 },
  { id: 'm10', name: '윤서연', role: '학부연구생', note: '시각화 도구', category: 'undergrad', order: 2 },
  { id: 'm11', name: 'M. Tanaka', role: '객원연구원', note: 'Kyoto Univ. · 협력 연구', category: 'visiting', order: 1 },
  { id: 'm12', name: '강도윤', role: 'Ph.D. 2024', note: '現 Google DeepMind', category: 'alumni', order: 1 },
  { id: 'm13', name: '서지호', role: 'Ph.D. 2023', note: '現 NAVER Cloud AI', category: 'alumni', order: 2 },
  { id: 'm14', name: '문가람', role: 'M.S. 2022', note: '現 Kakao Brain', category: 'alumni', order: 3 },
];

export const sampleResearchAreas: ResearchArea[] = [
  { id: 'r1', no: '01', title: '대규모 언어모델의 추론 능력', description: '언어모델이 복합적·구성적 추론을 어떻게 수행하고 실패하는지 분석하고, 이를 정량적으로 평가하는 벤치마크와 방법론을 개발합니다.', tags: ['Reasoning', 'Evaluation', 'LLM'] },
  { id: 'r2', no: '02', title: '불확실성 추정과 신뢰 보정', description: '모델이 자신의 예측에 대해 얼마나 확신하는지를 정확히 표현하도록 보정하여, 분포 변화 상황에서도 신뢰할 수 있는 판단을 가능하게 합니다.', tags: ['Uncertainty', 'Calibration', 'Robustness'] },
  { id: 'r3', no: '03', title: '인간-AI 협력적 의사결정', description: '인간과 AI가 함께 의사결정을 내리는 상황에서, 신뢰의 형성과 보정, 설명 가능한 인터페이스를 인지과학적 관점에서 연구합니다.', tags: ['Human-AI', 'HCI', 'Trust'] },
  { id: 'r4', no: '04', title: '데이터 효율적 학습', description: '제한된 데이터와 연산 자원에서도 강건하게 학습하는 능동학습·미세조정 기법을 연구하여 실용적 배포를 지원합니다.', tags: ['Active Learning', 'Fine-tuning', 'Efficiency'] },
];

export const sampleProjects: Project[] = [
  { id: 'pr1', type: 'national', funder: '과학기술정보통신부', title: '신뢰 가능한 대규모 언어모델의 추론 검증 기술 개발', role: '연구책임자 · 김지훈', period: '2024–2027' },
  { id: 'pr2', type: 'national', funder: '한국연구재단 (NRF)', title: '불확실성 인지 기반 인간-AI 협력 의사결정 프레임워크', role: '연구책임자 · 김지훈', period: '2023–2026' },
  { id: 'pr3', type: 'company', funder: 'NAVER Cloud', title: '한국어 언어모델의 추론 능력 평가 벤치마크 구축', role: '공동연구 · 산학협력', period: '2025–2026' },
  { id: 'pr4', type: 'company', funder: 'Samsung Research', title: '온디바이스 환경의 데이터 효율적 미세조정 기법', role: '기술 자문 · 공동연구', period: '2024–2025' },
  { id: 'pr5', type: 'company', funder: 'LG AI Research', title: '생성 모델의 신뢰 보정 및 안전성 연구', role: '공동연구', period: '2023–2024' },
];

export const samplePartners: string[] = [
  'NAVER Cloud', 'Kakao Brain', 'Samsung Research', 'LG AI Research',
  'SK Telecom', 'Google DeepMind', 'KIST', 'ETRI',
];

export const sampleProfessor: Professor = {
  name: '김지훈',
  nameEn: 'Jihoon Kim, Ph.D.',
  position: '정교수 · 책임교수 (PI)',
  dept: '○○대학교 컴퓨터공학과',
  email: 'jihoon@university.ac.kr',
  office: '공학관 4호관 510호',
  phone: '+82 2 0000 0000',
  bioLead: '신뢰할 수 있고 인간과 협력하는 인공지능을 연구합니다.',
  bio: '김지훈 교수는 기계학습과 인지과학의 접점에서 대규모 언어모델의 추론 능력, 불확실성 추정, 인간-AI 협력적 의사결정을 연구합니다. 2018년 TAILAB을 설립한 이후 NeurIPS, ICML, ICLR 등 주요 국제 학회에 다수의 연구를 발표해 왔습니다.',
  interests: ['대규모 언어모델', '추론 능력 평가', '불확실성 추정', '인간-AI 협력', '신뢰 가능한 기계학습'],
};

export const sampleCvEntries: CvEntry[] = [
  { id: 'e1', kind: 'education', years: '2009–2014', label: 'Ph.D. in Computer Science', org: 'Stanford University', detail: '지도교수: A. Researcher · 논문: Probabilistic Reasoning in Neural Models' },
  { id: 'e2', kind: 'education', years: '2007–2009', label: 'M.S. in Computer Science', org: 'KAIST', detail: '기계학습 전공' },
  { id: 'e3', kind: 'education', years: '2003–2007', label: 'B.S. in Computer Science', org: '○○대학교', detail: '최우등 졸업' },
  { id: 'x1', kind: 'experience', years: '2022–현재', label: '정교수 (Professor)', org: '○○대학교 컴퓨터공학과' },
  { id: 'x2', kind: 'experience', years: '2018–2022', label: '부교수 (Associate Professor)', org: '○○대학교 컴퓨터공학과' },
  { id: 'x3', kind: 'experience', years: '2014–2018', label: 'Research Scientist', org: 'DeepMind, London' },
  { id: 'a1', kind: 'award', years: '2025', label: '국가과학기술 젊은 연구자상' },
  { id: 'a2', kind: 'award', years: '2024', label: 'NeurIPS Outstanding Paper Award' },
  { id: 'a3', kind: 'award', years: '2021', label: '신진연구자 우수상, 한국정보과학회' },
];
