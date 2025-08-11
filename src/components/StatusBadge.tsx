type StatusBadgeProps = {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  let style = 'bg-gray-100 text-gray-600'

  if (status === 'Terverifikasi') {
    style = 'bg-green-100 text-green-700'
  } else if (status === 'Terblokir') {
    style = 'bg-red-100 text-red-600'
  }

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-md ${style}`}>
      {status}
    </span>
  )
}
