'use client'

import TransactionTable from './components/TransactionTable'
import FilterPanel from './components/FilterPanel'

export default function SuperadminTransactionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Transaksi</h1>
      <FilterPanel />
      <div className="mt-6">
        <TransactionTable />
      </div>
    </div>
  )
}
