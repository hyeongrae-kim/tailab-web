import { badgeClass } from '@/lib/format';

interface BadgeProps {
  solid: boolean; // true = 강조(검정), false = 일반(회색)
  children: React.ReactNode;
}

export default function Badge({ solid, children }: BadgeProps) {
  return <span className={badgeClass(solid)}>{children}</span>;
}
