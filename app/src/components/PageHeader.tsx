interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
    </div>
  );
}
