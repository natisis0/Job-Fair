export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="space-y-6">
        <div className="relative mx-auto h-48 w-48">
          <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-100/50" />
          <div className="relative flex h-full w-full items-center justify-center text-9xl font-black tracking-tighter text-cyan-500/20">
            404
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Oops! Page not found
          </h1>
          <p className="mx-auto max-w-md text-slate-500">
            We couldn&apos;t find the corner of the fair you are looking for. It
            might have ended or is yet to begin.
          </p>
        </div>
      </div>
    </div>
  );
}
