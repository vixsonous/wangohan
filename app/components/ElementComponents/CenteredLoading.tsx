import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export default function CenteredLoading({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div className="w-full flex justify-center items-center py-6">
      <CircleNotch className="animate-spin" size={size || 20} />
    </div>
  );
}
