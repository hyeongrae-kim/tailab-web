import GridBackground from './GridBackground';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  children?: React.ReactNode; // 설명 (강조 span 등 포함 가능)
}

export default function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <GridBackground />
      <div className="page-header__inner">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="page-header__title">{title}</h1>
        {children ? <p className="page-header__desc">{children}</p> : null}
      </div>
    </header>
  );
}
