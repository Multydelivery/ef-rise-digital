export default function Footer() {
  return (
    <footer className="border-t-2 border-purple-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-12 text-sm md:flex-row md:items-center md:justify-between">
        <div className="font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          © {new Date().getFullYear()} E&F Rise Digital
        </div>
        <div className="text-gray-600 font-semibold">Web • Google • Social • AI Automation</div>
      </div>
    </footer>
  );
}