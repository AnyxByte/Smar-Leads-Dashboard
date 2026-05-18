export default function Footer() {
  return (
    <footer className="flex items-center justify-between py-4 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      <span className="text-xs text-zinc-400 dark:text-zinc-500">
        © 2026 LeadFlow.
      </span>

      <div className="flex gap-4">
        <a
          href="https://github.com/AnyxByte/Smar-Leads-Dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          Github
        </a>
      </div>
    </footer>
  );
}
