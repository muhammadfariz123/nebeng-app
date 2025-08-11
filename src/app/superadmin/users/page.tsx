'use client'

import { useEffect, useState } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserRound } from 'lucide-react'

type UserType = 'Superadmin' | 'Admin' | 'Finance' | 'Customer' | 'Driver'

interface UserData {
  id: number
  username: string
  email: string
  user_type: UserType
  banned: boolean
  created_at: string
  profile_name: string
  telephone: string
  region: string
}

export default function SuperadminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([])

  // Simulasi fetch dari backend
  useEffect(() => {
    // Ganti dengan fetch API ke backend-mu (GET /api/users)
    const dummyData: UserData[] = [
      {
        id: 1,
        username: 'superadmin1',
        email: 'super@nebeng.com',
        user_type: 'Superadmin',
        banned: false,
        created_at: '2024-01-01',
        profile_name: 'Dina Utami',
        telephone: '-',
        region: '-',
      },
      {
        id: 2,
        username: 'admin_jkt',
        email: 'admin@jakarta.com',
        user_type: 'Admin',
        banned: false,
        created_at: '2024-03-11',
        profile_name: 'Budi Siregar',
        telephone: '082212312312',
        region: 'DKI Jakarta - Jakarta Pusat - Tanah Abang',
      },
      {
        id: 3,
        username: 'joko_driver',
        email: 'joko@driver.com',
        user_type: 'Driver',
        banned: false,
        created_at: '2025-04-10',
        profile_name: 'Joko Santoso',
        telephone: '081234567890',
        region: 'Jawa Barat - Bandung - Cibiru',
      },
    ]
    setUsers(dummyData)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <UserRound className="text-primary w-6 h-6" /> Kelola Pengguna
      </h1>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Wilayah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.user_type}</Badge>
                  </TableCell>
                  <TableCell>{user.profile_name}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>{user.region}</TableCell>
                  <TableCell>
                    {user.banned ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : (
                      <Badge variant="default">Aktif</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
