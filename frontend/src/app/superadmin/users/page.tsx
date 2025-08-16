'use client';

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import { Edit, Trash2, KeyRound, Plus, UserRound } from 'lucide-react';

type UserType = 'Superadmin' | 'Admin' | 'Finance' | 'Customer' | 'Driver';

interface UserData {
  id: number;
  username: string;
  email: string;
  user_type: UserType;
  banned: boolean;
  created_at: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function SuperadminUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  // State modal Create
  const [openCreate, setOpenCreate] = useState(false);
  const [cEmail, setCEmail] = useState('');
  const [cUsername, setCUsername] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [cRole, setCRole] = useState<UserType>('Customer');
  const [cBanned, setCBanned] = useState(false);

  // State modal Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [eId, setEId] = useState<number | null>(null);
  const [eEmail, setEEmail] = useState('');
  const [eUsername, setEUsername] = useState('');
  const [eRole, setERole] = useState<UserType>('Customer');
  const [eBanned, setEBanned] = useState(false);

  // State modal Password
  const [openPass, setOpenPass] = useState(false);
  const [pId, setPId] = useState<number | null>(null);
  const [pPassword, setPPassword] = useState('');

  const roleOptions: UserType[] = useMemo(
    () => ['Superadmin', 'Admin', 'Finance', 'Customer', 'Driver'],
    []
  );

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get<UserData[]>(`${API}/users`);
      setUsers(res.data);
    } catch (e) {
      toast.error('Gagal mengambil data pengguna');
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleCreate = async () => {
    if (!cEmail || !cUsername || !cPassword) {
      toast.error('Lengkapi Email, Username, dan Password');
      return;
    }
    try {
      await axios.post(`${API}/users`, {
        email: cEmail,
        username: cUsername,
        password: cPassword,
        user_type: cRole,
        banned: cBanned,
      });
      toast.success('User berhasil ditambahkan');
      setOpenCreate(false);
      setCEmail(''); setCUsername(''); setCPassword(''); setCRole('Customer'); setCBanned(false);
      fetchUsers();
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Gagal menambah user';
      toast.error(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  // OPEN EDIT
  const openEditModal = (u: UserData) => {
    setEId(u.id);
    setEEmail(u.email);
    setEUsername(u.username);
    setERole(u.user_type);
    setEBanned(u.banned);
    setOpenEdit(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!eId) return;
    try {
      await axios.put(`${API}/users/${eId}`, {
        email: eEmail,
        username: eUsername,
        user_type: eRole,
        banned: eBanned,
      });
      toast.success('User berhasil diupdate');
      setOpenEdit(false);
      fetchUsers();
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Gagal update user';
      toast.error(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  // OPEN PASSWORD
  const openPasswordModal = (u: UserData) => {
    setPId(u.id);
    setPPassword('');
    setOpenPass(true);
  };

  // UPDATE PASSWORD
  const handleChangePassword = async () => {
    if (!pId || !pPassword) {
      toast.error('Password tidak boleh kosong');
      return;
    }
    try {
      await axios.patch(`${API}/users/${pId}/password`, { password: pPassword });
      toast.success('Password diperbarui');
      setOpenPass(false);
    } catch (e) {
      toast.error('Gagal update password');
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if (!confirm('Yakin mau menghapus user ini?')) return;
    try {
      await axios.delete(`${API}/users/${id}`);
      toast.success('User dihapus');
      fetchUsers();
    } catch (e) {
      toast.error('Gagal menghapus user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <Toaster />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserRound className="text-primary w-6 h-6" /> Kelola Pengguna
        </h1>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Tambah User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna</DialogTitle>
              <DialogDescription>Masukkan data pengguna baru.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-2">
              <div className="grid gap-1">
                <Label>Email</Label>
                <Input value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="email@domain.com" />
              </div>
              <div className="grid gap-1">
                <Label>Username</Label>
                <Input value={cUsername} onChange={(e) => setCUsername(e.target.value)} placeholder="username" />
              </div>
              <div className="grid gap-1">
                <Label>Password</Label>
                <Input type="password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} placeholder="••••••" />
              </div>
              <div className="grid gap-1">
                <Label>Tipe</Label>
                <Select value={cRole} onValueChange={(v: UserType) => setCRole(v)}>
                  <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                  <SelectContent>
                    {roleOptions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Checkbox id="cbanned" checked={cBanned} onCheckedChange={(v) => setCBanned(Boolean(v))} />
                <Label htmlFor="cbanned">Banned?</Label>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Batal</Button>
              </DialogClose>
              <Button onClick={handleCreate}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u, i) => (
                <TableRow key={u.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell><Badge variant="outline">{u.user_type}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={u.banned ? 'destructive' : 'default'}>
                      {u.banned ? 'Banned' : 'Aktif'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      {/* Edit */}
                      <Button size="sm" variant="outline" onClick={() => openEditModal(u)}>
                        <Edit className="w-4 h-4" />
                      </Button>

                      {/* Ganti Password */}
                      <Button size="sm" variant="secondary" onClick={() => openPasswordModal(u)}>
                        <KeyRound className="w-4 h-4" />
                      </Button>

                      {/* Delete */}
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(u.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {!loading && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    Belum ada data pengguna.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Edit */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Pengguna</DialogTitle>
            <DialogDescription>Ubah data pengguna.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <div className="grid gap-1">
              <Label>Email</Label>
              <Input value={eEmail} onChange={(e) => setEEmail(e.target.value)} />
            </div>
            <div className="grid gap-1">
              <Label>Username</Label>
              <Input value={eUsername} onChange={(e) => setEUsername(e.target.value)} />
            </div>
            <div className="grid gap-1">
              <Label>Tipe</Label>
              <Select value={eRole} onValueChange={(v: UserType) => setERole(v)}>
                <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                <SelectContent>
                  {roleOptions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Checkbox id="ebanned" checked={eBanned} onCheckedChange={(v) => setEBanned(Boolean(v))} />
              <Label htmlFor="ebanned">Banned?</Label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button onClick={handleUpdate}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Ganti Password */}
      <Dialog open={openPass} onOpenChange={setOpenPass}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Ganti Password</DialogTitle>
            <DialogDescription>Masukkan password baru.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <div className="grid gap-1">
              <Label>Password Baru</Label>
              <Input type="password" value={pPassword} onChange={(e) => setPPassword(e.target.value)} placeholder="••••••" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button onClick={handleChangePassword}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
