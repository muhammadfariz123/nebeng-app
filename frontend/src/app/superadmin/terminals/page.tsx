import TerminalForm from "@/components/superadmin/terminals/TerminalForm";
import TerminalTable from "@/components/superadmin/terminals/TerminalTable";

export default function TerminalPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Kelola Terminal</h1>
      <TerminalForm />
      <TerminalTable />
    </div>
  );
}
