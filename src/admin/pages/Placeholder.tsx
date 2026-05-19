export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
        <p className="text-stone-500 text-sm">This section is currently under development.</p>
      </div>
      <div className="h-96 bg-white rounded-3xl border border-stone-100 shadow-sm flex flex-col items-center justify-center space-y-4 text-stone-300">
        <div className="h-20 w-20 rounded-full border-4 border-current animate-pulse" />
        <p className="font-bold uppercase tracking-widest text-sm">Coming Soon</p>
      </div>
    </div>
  );
}
