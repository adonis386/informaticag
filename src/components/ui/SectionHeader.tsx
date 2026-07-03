interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  className?: string;
}

const SectionHeader = ({ label, title, subtitle, dark = false, className = '' }: SectionHeaderProps) => (
  <div className={`mb-16 md:mb-24 ${className}`}>
    <p
      className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-roboto text-brand-accent"
    >
      {label}
    </p>
    <h2
      className={`font-tektur text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight ${
        dark ? 'text-white' : 'text-neutral-950'
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={`mt-6 text-lg md:text-xl max-w-2xl leading-relaxed font-roboto ${
          dark ? 'text-neutral-400' : 'text-neutral-500'
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
