interface BadgeStatusProps {
  status: string;
}

export default function BadgeStatus({ status }: BadgeStatusProps) {
  const isVerified = status.toLowerCase() === 'terverifikasi';

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        isVerified
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}
    >
      {status}
    </span>
  );
}
