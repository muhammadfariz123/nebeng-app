'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRound, Trash2, Edit } from 'lucide-react';

type UserType = 'Superadmin' | 'Admin' | 'Finance' | 'Customer' | 'Driver';

interface UserData {
  id: number;
  username: string;
  email: string;
  user_type: UserType;
  banned: boolean;
  created_at: string;
}

export default function SuperadminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get<UserData[]>('http://localhost:3001/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Gagal mengambil data pengguna');
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Yakin mau hapus user ini?')) return;
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      toast.success('User berhasil dihapus');
      fetchUsers();
    } catch (err) {
      toast.error('Gagal menghapus user');
    }
  };

  const updateUser = async (id: number, banned: boolean) => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, { banned: !banned });
      toast.success('Status user diperbarui');
      fetchUsers();
    } catch (err) {
      toast.error('Gagal update user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <Toaster />
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
                <TableHead>Status</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead>Aksi</TableHead>
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
                  <TableCell>
                    <Badge
                      variant={user.banned ? 'destructive' : 'default'}
                      onClick={() => updateUser(user.id, user.banned)}
                      className="cursor-pointer"
                    >
                      {user.banned ? 'Banned' : 'Aktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateUser(user.id, user.banned)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
