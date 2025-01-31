const Label = ({
  children,
  htmlFor,
  label,
}: {
  children: React.ReactElement;
  htmlFor?: string;
  label: string;
}) => {
  return (
    <label htmlFor={htmlFor} className="mt-4 flex flex-col gap-2">
      <span className="text-lg font-bold">{label}</span>
      {children}
    </label>
  );
};

export default Label;
