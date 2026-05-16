
export default function Footer() {
  return (
    <footer className="flex items-center justify-between py-4 border-t border-zinc-200">
      <span className="text-xs text-zinc-400">
        © 2026 LeadFlow. Built with MERN + TypeScript.
      </span>
      <div className="flex gap-4">
        {["GitHub", "Docs", "Contact"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}