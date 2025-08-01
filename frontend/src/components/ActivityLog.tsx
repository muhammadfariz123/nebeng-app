'use client'

export function ActivityLog() {
  const logs = [
    {
      no: 1,
      tanggal: '14 Juni 2024',
      waktu: '14.14',
      aktivitas: 'Membuka blokir akun mitra user “Talan Septimus”'
    },
    {
      no: 2,
      tanggal: '14 Juni 2024',
      waktu: '13.49',
      aktivitas: 'Memverifikasi akun mitra user “Gustavo Kenter”'
    },
    {
      no: 3,
      tanggal: '14 Juni 2024',
      waktu: '13.49',
      aktivitas: 'Memverifikasi akun mitra user “Gustavo Kenter”'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="text-base font-semibold text-[#1B1E27] mb-4">Aktivitas Terakhir</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="text-[#6B7280] text-left text-xs font-medium border-b border-gray-200">
              <th className="w-6 py-2">No</th>
              <th className="w-32 py-2">Tanggal</th>
              <th className="w-20 py-2">Waktu</th>
              <th className="py-2">Aktivitas</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.no} className="text-sm text-[#1B1E27] border-b border-gray-100">
                <td className="py-3">{log.no}</td>
                <td className="py-3">{log.tanggal}</td>
                <td className="py-3">{log.waktu}</td>
                <td className="py-3">{log.aktivitas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
