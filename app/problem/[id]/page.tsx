import { ProblemWorkspace } from "@/components/workspace/ProblemWorkspace";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function ProblemPage({ params }: Props) {
  return (
    <main className="space-y-6 pb-10">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="text-amber-300">
          홈
        </Link>
        <span>/</span>
        <span>문제 {params.id}</span>
      </div>
      <ProblemWorkspace phaseId={params.id} />
    </main>
  );
}
