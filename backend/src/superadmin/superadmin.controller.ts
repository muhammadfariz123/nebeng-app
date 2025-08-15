import { Controller, Get } from '@nestjs/common';

@Controller('superadmin')
export class SuperadminController {
  @Get('dashboard')
  getDashboardData() {
    // Data ini nanti dari DB, tapi untuk contoh ambil statis dulu
    return {
      stats: {
        users: 3,
        terminals: 4,
        transactions: 9,
        totalCommission: 80000,
      },
      recentTransactions: [
        {
          id: 'TX001',
          customer: 'Andi Wijaya',
          amount: 50000,
          date: '2025-07-31',
          status: 'Diterima',
        },
        {
          id: 'TX002',
          customer: 'Siti Nurhaliza',
          amount: 120000,
          date: '2025-07-30',
          status: 'Pending',
        },
        {
          id: 'TX003',
          customer: 'Budi Santoso',
          amount: 75000,
          date: '2025-07-30',
          status: 'Diterima',
        },
      ],
    };
  }
}
