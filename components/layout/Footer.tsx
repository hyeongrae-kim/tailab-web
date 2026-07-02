import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__cols">
          <div>
            <div className="footer__brand">TAILAB</div>
            <p className="footer__desc">
              Trustworthy AI Lab
              <br />
              경북대학교 영어영문학과
            </p>
          </div>
          <div>
            <div className="footer__heading">바로가기</div>
            <div className="footer__list">
              <Link href="/research" className="footer__link">
                연구
              </Link>
              <Link href="/publications" className="footer__link">
                논문
              </Link>
              <Link href="/members" className="footer__link">
                구성원
              </Link>
            </div>
          </div>
          <div>
            <div className="footer__heading">연락처</div>
            <div className="footer__list footer__list--plain">
              <span>inow3555@knu.ac.kr</span>
              <span>Office: 대학원동 508호</span>
              <span>Lab: 인문한국진흥관 408호</span>
            </div>
          </div>
        </div>
        <div className="footer__copy">
          © 2026 TAILAB · Trustworthy AI Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
