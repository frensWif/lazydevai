
"use client";

export default function ProjectPreview() {
  return (
    <div className="flex items-center justify-center h-full bg-muted/20 p-4">
      <div className="w-full max-w-2xl p-4 rounded-lg bg-background border shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Hello, LazyDev AI!</h1>
        <p className="mb-4">This is a preview of your application.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <h2 className="text-lg font-semibold mb-2">Feature 1</h2>
            <p className="text-sm">A sample feature of your application.</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <h2 className="text-lg font-semibold mb-2">Feature 2</h2>
            <p className="text-sm">Another sample feature of your application.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
