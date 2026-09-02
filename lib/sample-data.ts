// NOTION_TOKEN 이 없을 때 사용하는 폴백 콘텐츠이자 scripts/migrate-draft.ts 의 시딩 원본.
// 내용은 draft.xlsx(교수님 확정안) 기준.
import type {
  News,
  Publication,
  Member,
  ResearchArea,
  Project,
  CvEntry,
  Professor,
  SiteCopy,
} from './types';

export const sampleNews: News[] = [
  { id: 'n1', date: '2026.09.02', category: 'notice', title: 'TAILAB 홈페이지 개설', description: 'TAILAB(Trustworthy AI Lab) 공식 홈페이지가 개설되었습니다. 연구실의 연구, 구성원, 논문 소식을 이곳에서 전해드립니다.' },
];

export const samplePublications: Publication[] = [
  { id: 'p1', year: 2026, authors: 'Changwon Ok*, EunKyeong Lee*, Hyeongju Ju, Jungseob Lee, Dongsuk Oh', title: 'Towards Enhancing Natural Language Inference for Identifying Erroneous Outputs in Data-to-Text Generation', venue: 'Knowledge-Based Systems', linkUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0950705126006878' },
  { id: 'p2', year: 2026, authors: 'Seungyoon Lee, Minhyuk Kim, Seongtae Hong, Youngjoon Jang, Dongsuk Oh, Heuiseok Lim', title: 'CLEAR: Cross-Lingual Enhancement in Alignment via Reverse-training', venue: 'ACL 2026', linkUrl: 'https://aclanthology.org/2026.acl-long.13/' },
  { id: 'p3', year: 2026, authors: 'Hyeongju Ju*, EunKyeong Lee*, Junyoung Kang*, JaKyoung Kim, Dongsuk Oh', title: 'Truth Is Better Generated than Annotated: Hierarchical Prompt Engineering and Adaptive Evaluation for Reliable Synthetic Knowledge Dialogues', venue: 'Applied Sciences', linkUrl: 'https://www.mdpi.com/2076-3417/16/3/1387' },
  { id: 'p4', year: 2025, authors: 'Eunsong Lee, Hyein Do, Minsu Kim, Dongsuk Oh', title: 'Knowing the Words, Missing the Meaning: Evaluating LLMs’ Cultural Understanding Through Sino-Korean Words and Four-Character Idioms', venue: 'Applied Sciences', linkUrl: 'https://doi.org/10.3390/app15137561' },
  { id: 'p5', year: 2025, authors: 'Yejin Kim*, Dongsuk Oh*, H. Howie Huang', title: 'SynCSE: Syntax Graph-based Contrastive Learning of Sentence Embeddings', venue: 'Expert Systems with Applications', linkUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0957417425016689' },
  { id: 'p6', year: 2025, authors: 'Sungeun Kim, Dongsuk Oh', title: 'Evaluating Creativity: Can LLMs Be Good Evaluators in Creative Writing Tasks?', venue: 'Applied Sciences', linkUrl: 'https://doi.org/10.3390/app15062971' },
  { id: 'p7', year: 2025, authors: 'Dongryul Oh, Sujin Kang, Heejin Kim, Dongsuk Oh', title: 'Enhancing Small Language Models for Graph Tasks Through Graph Encoder Integration', venue: 'Applied Sciences', linkUrl: 'https://doi.org/10.3390/app15052418' },
  { id: 'p8', year: 2025, authors: 'Changwon Ok*, EunKyeong Lee*, Dongsuk Oh', title: 'Synthetic Paths to Integral Truth: Mitigating Hallucinations Caused by Confirmation Bias with Synthetic Data', venue: 'COLING 2025', linkUrl: 'https://aclanthology.org/2025.coling-main.347/' },
  { id: 'p9', year: 2024, authors: 'Dongsuk Oh, Jonghyeon Moon, Kyoungtae Park, Wonjun Kim*, Seungho Yoo*, Hyungwoo Lee*, Jiho Yoo*', title: 'GCN-assisted Attention-guided UNet for Automated Retinal OCT Segmentation', venue: 'Expert Systems with Applications', linkUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0957417424004858' },
  { id: 'p10', year: 2022, authors: 'Dongsuk Oh*, Yejin Kim*, Hodong Lee, H. Howie Huang, Heuiseok Lim', title: 'Don’t Judge a Language Model by Its Last Layer: Contrastive Learning with Layer-Wise Attention Pooling', venue: 'COLING 2022', linkUrl: 'https://aclanthology.org/2022.coling-1.405/' },
  { id: 'p11', year: 2022, authors: 'Dongsuk Oh*, Jungwoo Lim*, Heuiseok Lim', title: 'Neuro-Symbolic Word Embedding Using Textual and Knowledge Graph Information', venue: 'Applied Sciences', linkUrl: 'https://www.mdpi.com/2076-3417/12/19/9424' },
  { id: 'p12', year: 2022, authors: 'Dongsuk Oh*, Jungwoo Lim*, Kinam Park, Heuiseok Lim', title: 'Semantic Representation Using Sub-Symbolic Knowledge in Commonsense Reasoning', venue: 'Applied Sciences', linkUrl: 'https://www.mdpi.com/2076-3417/12/18/9202' },
  { id: 'p13', year: 2022, authors: 'Seungwon Jeong*, Dongsuk Oh*, Kinam Park, Heuiseok Lim', title: 'Considering Commonsense in Solving QA: Reading Comprehension with Semantic Search and Continual Learning', venue: 'Applied Sciences', linkUrl: 'https://www.mdpi.com/2076-3417/12/9/4099' },
  { id: 'p14', year: 2022, authors: 'Jaehyung Seo, Dongsuk Oh, Sugyeong Eo, Chanjun Park, Kisu Yang, Hyeonseok Moon, Kinam Park, Heuiseok Lim', title: 'PU-GEN: Enhancing Generative Commonsense Reasoning for Language Models with Human-Centered Knowledge', venue: 'Knowledge-Based Systems', linkUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0950705122009546' },
  { id: 'p15', year: 2022, authors: 'Yoonna Jang*, Jungwoo Lim*, Yuna Hur*, Dongsuk Oh, Suhyune Son, Yeonsoo Lee, Donghoon Shin, Seungryong Kim, Heuiseok Lim', title: 'Call for Customized Conversation: Customized Conversation Grounding Persona and Knowledge', venue: 'AAAI 2022', linkUrl: 'https://ojs.aaai.org/index.php/AAAI/article/view/21326' },
  { id: 'p16', year: 2021, authors: 'Sunjae Kwon*, Dongsuk Oh*, Youngjoong Ko', title: 'Word Sense Disambiguation Based on Context Selection Using Knowledge-Based Word Similarity', venue: 'Information Processing & Management', linkUrl: 'https://www.sciencedirect.com/science/article/abs/pii/S0306457321000558' },
  { id: 'p17', year: 2021, authors: 'Taesun Whang*, Dongyub Lee*, Dongsuk Oh, Chanhee Lee, Kijong Han, Dong-hun Lee, Saebyeok Lee', title: 'Do Response Selection Models Really Know What’s Next? Utterance Manipulation Strategies for Multi-turn Response Selection', venue: 'AAAI 2021', linkUrl: 'https://ojs.aaai.org/index.php/AAAI/article/view/17653' },
  { id: 'p18', year: 2020, authors: 'Jungwoo Lim*, Dongsuk Oh*, Yoonna Jang, Kisu Yang, Heuiseok Lim', title: 'I Know What You Asked: Graph Path Learning Using AMR for Commonsense Reasoning', venue: 'COLING 2020', linkUrl: 'https://aclanthology.org/2020.coling-main.222/' },
  { id: 'p19', year: 2020, authors: 'Taesun Whang, Dongyub Lee, Chanhee Lee, Kisu Yang, Dongsuk Oh, Heuiseok Lim', title: 'An Effective Domain Adaptive Post-Training Method for BERT in Response Selection', venue: 'INTERSPEECH 2020', linkUrl: 'https://www.isca-archive.org/interspeech_2020/whang20_interspeech.html' },
  { id: 'p20', year: 2019, authors: 'Heejung Jwa, Dongsuk Oh, Kinam Park, Jang Mook Kang, Heuiseok Lim', title: 'exBAKE: Automatic Fake News Detection Model Based on Bidirectional Encoder Representations from Transformers (BERT)', venue: 'Applied Sciences', linkUrl: 'https://www.mdpi.com/2076-3417/9/19/4062' },
  { id: 'p21', year: 2018, authors: 'Dongsuk Oh*, Sunjae Kwon*, Kyungsun Kim, Youngjoong Ko', title: 'Word Sense Disambiguation Based on Word Similarity Calculation Using Word Vector Representation from a Knowledge-Based Graph', venue: 'COLING 2018', linkUrl: 'https://aclanthology.org/C18-1229/' },
];

// 교수(오동석)는 Professor DB 에서 온다. 여기는 그 외 구성원.
export const sampleMembers: Member[] = [
  { id: 'm1', name: '김자경', nameEn: 'Jakyoung Kim', role: '연구교수', roleEn: 'Research Professor', category: 'research-professor', order: 1 },
  { id: 'm2', name: '김성은', nameEn: 'Sungeun Kim', role: '연구교수', roleEn: 'Research Professor', category: 'research-professor', order: 2, homepage: 'https://sites.google.com/view/emilysungeunkim/home', email: 'emilysungeunkim@gmail.com' },
  { id: 'm3', name: '이은송', nameEn: 'Eunsong Lee', role: '박사과정', roleEn: 'Ph.D. Student', category: 'phd', order: 1 },
  { id: 'm4', name: '이만유', nameEn: 'Manyu Lee', role: '박사과정', roleEn: 'Ph.D. Student', category: 'phd', order: 2 },
  { id: 'm5', name: '이승호', nameEn: 'Seungho Lee', role: '석사과정', roleEn: 'M.S. Student', category: 'ms', order: 1 },
  { id: 'm6', name: '강준영', nameEn: 'Junyoung Kang', role: '석사과정', roleEn: 'M.S. Student', category: 'ms', order: 2 },
  { id: 'm7', name: '김형래', nameEn: 'Hyeongrae Kim', role: '연구원', roleEn: 'Researcher', category: 'researcher', order: 1 },
];

export const sampleResearchAreas: ResearchArea[] = [
  { id: 'r1', no: '01', title: 'Human-Governed · 인간이 통제하는 AI', subtitle: 'Humans define the goals, boundaries, and final decisions.', description: '인간이 인공지능의 목표와 경계를 정하고, 결과의 근거를 확인하며, 필요할 때 개입·수정·중단할 수 있는 기술을 연구합니다.', tags: ['Controllability', 'Oversight', 'Intervention'] },
  { id: 'r2', no: '02', title: 'Human-Grounded · 인간에 기반한 AI', subtitle: 'AI grounded in human language, knowledge, cognition, and context.', description: '인간의 언어, 지식, 인지 과정과 사회적 맥락을 학습에 반영하여 사람의 의도와 환경을 더 정확하게 이해하는 인공지능을 개발합니다.', tags: ['Language', 'Knowledge', 'Cognition'] },
  { id: 'r3', no: '03', title: 'Human-Beneficial · 사람과 환경에\n도움이 되는 AI', subtitle: 'AI that creates measurable value for people and society.', description: '기술 자체의 발전에 머무르지 않고 의료·교육·복지·문화·공공정책 등 현실의 문제를 개선하며 사회적으로 긍정적인 가치를 만드는 인공지능을 지향합니다.', tags: ['Medical', 'Education', 'Public'] },
];

export const sampleProjects: Project[] = [
  { id: 'pr1', role: 'pi', funder: 'KT', field: 'Trustworthy LLM', title: '2023년 Large AI 신뢰성 검증 알고리즘 연구 개발', description: '대규모언어모델의 환각과 신뢰성 문제를 검증하기 위한 알고리즘 및 평가 기술을 개발합니다.' },
  { id: 'pr2', role: 'co', funder: '한국연구재단', field: 'Digital Humanities & Creative AX', title: '인간과 협업하는 딥러닝 기반 AI 소설 생성 융합 연구', description: '인간 작가와 AI가 협업하여 소설을 생성하고, 창작 주체·창의성·서사 품질을 함께 탐구합니다.' },
  { id: 'pr3', role: 'co', funder: '한국연구재단', field: 'Human & Social AX', title: '고령층 대상 생애사 프로그램 개발과 효능 검증 및 인공지능 생애사 프로그램의 융합적 기반 기술 개발', description: '고령층의 생애 경험을 기록하고 상호작용하는 프로그램에 인공지능을 결합하여 정서적·사회적 가치를 높입니다.' },
  { id: 'pr4', role: 'co', funder: '대구광역시 교육발전특구', field: 'Education AX', title: 'AI·디지털 융합 교육 혁신 플랫폼 사업', description: 'AI와 디지털 기술을 교육 현장에 적용하여 교수·학습 경험과 지역 교육 혁신을 지원합니다.' },
  { id: 'pr5', role: 'co', funder: '한국연구재단', field: 'Public/Social & Causal AX', title: '거대언어모델 기반 지역생활자본의 인과적 해석 및 시각화를 통한 지방소멸 정책 분석 프레임워크 개발', description: '지역생활자본과 인구변화의 관계를 LLM, 지식그래프와 인과적 분석으로 연결하여 정책 근거와 개입 경로를 설명합니다.' },
  { id: 'pr6', role: 'pi', funder: '뉴다이브', field: 'Medical & Health AX', title: '다중모달 LLM 기반 자폐·사회적 의사소통 장애 아동용 맞춤형 상호작용 피드백 시스템 개발', description: '다양한 상호작용 신호를 분석하여 자폐·사회적 의사소통 장애 아동에게 개인화된 피드백을 제공하는 다중모달 LLM 시스템을 개발합니다.' },
];

export const sampleProfessor: Professor = {
  name: '오동석',
  nameEn: 'Dongsuk Oh, Ph.D.',
  position: '지도교수 · 조교수 (Principal Investigator)',
  dept: '경북대학교 영어영문학과',
  email: 'inow3555@knu.ac.kr',
  office: '대학원동 508호',
  phone: '',
  bioLead: '자연어처리와 의미론을 중심으로 Trustworthy AI와 Neural-Symbolic AI를 연구합니다.',
  bio: '오동석 교수는 경북대학교 영어영문학과 조교수로 재직하며 자연어처리와 의미론을 중심으로 Trustworthy AI와 Neural-Symbolic AI를 연구합니다. 최근에는 LLM 환각 탐지와 완화, 지식그래프 기반 추론, 인간 중심 언어모델, 의료·다중모달 AI 및 인과적 정책 분석을 수행하고 있습니다. 산업계의 대화·검색 솔루션 개발 경험과 대규모언어모델 신뢰성 연구 경험을 바탕으로 기초 AI 연구와 실제 환경의 AX를 연결하고 있습니다.',
  interests: ['Trustworthy AI', 'Neural-Symbolic AI', 'Natural Language Processing', 'Semantics', 'Large Language Models', 'Knowledge Graph', 'Human-Centered AI'],
  scholarUrl: 'https://scholar.google.com/citations?hl=ko&user=ZYAxHnwAAAAJ',
};

export const sampleCvEntries: CvEntry[] = [
  { id: 'e1', kind: 'education', years: '2023', label: '공학박사, 컴퓨터학과', org: '고려대학교' },
  { id: 'e2', kind: 'education', years: '2016', label: '공학석사, 컴퓨터공학과', org: '서강대학교' },
  { id: 'e3', kind: 'education', years: '2014', label: '공학사, 정보통신공학과', org: '충북대학교' },
  { id: 'x1', kind: 'experience', years: '2023–현재', label: '조교수', org: '경북대학교' },
  { id: 'x2', kind: 'experience', years: '2023', label: 'AI Researcher, Large AI Alignment Project', org: 'KT' },
  { id: 'x3', kind: 'experience', years: '2019–2020', label: 'AI Researcher, Human-Inspired AI Research', org: '고려대학교' },
  { id: 'x4', kind: 'experience', years: '2018–2019', label: 'NLP Engineer', org: 'NHN' },
  { id: 'x5', kind: 'experience', years: '2016–2018', label: 'NLP Engineer', org: 'Diquest' },
];

export const sampleSiteCopy: SiteCopy[] = [
  // About
  { key: 'about.hero', heading: '인간이 이해하고 통제하며, 더 나은 세상을 만드는 AI', body: 'Trustworthy AI를 중심으로 인간의 언어·지식·인지에 기반한 인공지능을 연구합니다.', en: 'Human-Governed AI for a Better World' },
  { key: 'about.intro', heading: 'TAILAB 소개', body: 'TAILAB은 자연어처리와 의미론을 기반으로 신뢰할 수 있는 인공지능을 연구합니다. 높은 성능만을 추구하는 것이 아니라, 인공지능의 판단 근거와 작동 범위를 사람이 이해하고 필요한 순간에 개입할 수 있도록 설계합니다. 이를 통해 의료, 교육, 디지털인문학, 공공·사회 문제 등 사람들의 실제 환경에 안전하고 유익하게 적용되는 올바른 인공지능을 만드는 것을 목표로 합니다.', en: 'Trustworthy, Human-Grounded, and Socially Beneficial AI' },
  { key: 'about.philosophy', heading: 'Trustworthy AI\n연구 철학', body: '우리가 지향하는 Trustworthy AI는 단순히 오류가 적은 모델이 아닙니다. 인간이 목표를 설정하고, 판단 과정을 점검하며, 결과를 수정하거나 중단할 수 있는 인간 주도형 인공지능입니다.\n인공지능이 사람을 대체하거나 사람이 모델에 일방적으로 적응하게 하기보다, 인간의 언어·인지·사회적 가치에 근거하여 사람의 능력을 확장하고 더 나은 환경을 만드는 연구를 수행합니다.', en: '인공지능은 사람이 이해하고 통제하며, 책임을 물을 수 있어야 합니다.' },
  { key: 'about.pi', heading: 'Principal Investigator / Assistant Professor', body: 'Ph.D., Korea University · M.S., Sogang University' },
  // Institute
  { key: 'institute.center', heading: '디지털인문공학연구소', en: 'Digital Humanities Engineering Center', body: '디지털인문공학연구소는 계산 방법론과 인문학적 탐구를 연결하여\n디지털인문학과 인공지능의 융합 연구를 수행합니다.' },
  { key: 'institute.director', heading: 'AI Research Hub Director · 오동석', body: '오동석 교수는 디지털인문공학연구소 AI Research Hub Director를 맡아 연구소의 인공지능 연구를 이끌고 있습니다.' },
  { key: 'institute.direction', heading: '연구방향', body: 'Trustworthy AI와 대규모언어모델 정렬을 중심으로 사실성, 편향 완화, 설명가능성과 안전성을 연구합니다. 이를 Medical AI, Education AI, Cognitively-Inspired AI 및 디지털인문학 융합 연구로 확장합니다.' },
  { key: 'institute.site', heading: '연구소 홈페이지', body: '연구소의 연구와 프로젝트는 공식 홈페이지에서 확인할 수 있습니다.', link: 'https://www.digihumeng.org/' },
  // Apply
  { key: 'apply.contact', heading: 'Contact', body: '연구 협력, 학생 연구 참여 및 기타 문의를 환영합니다.', link: 'mailto:inow3555@knu.ac.kr' },
];
