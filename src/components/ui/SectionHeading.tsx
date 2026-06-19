"use client";

interface SectionHeadingProps {
  number: string;
  title: string;
  highlight: string;
  subtitle?: string;
}

export default function SectionHeading({
  number,
  title,
  highlight,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <span className="section-number">{number}</span>
      <h2 className="section-heading">
        {title ? (
          <>
            {title} <span>{highlight}</span>
          </>
        ) : (
          <span>{highlight}</span>
        )}
      </h2>
      {subtitle && <p className="section-subheading !mb-0">{subtitle}</p>}
      <div className="tech-divider mt-6 max-w-xs" />
    </div>
  );
}
