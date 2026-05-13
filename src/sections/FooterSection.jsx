function FooterSection() {
  return (
    // Simple footer with quick navigation links.
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-[min(980px,95%)] flex-col items-center justify-between gap-3 text-sm text-slate-400 md:flex-row">
        <p>All Rights Reserved </p>
        <div className="flex gap-5">
          <a href="#hero" className="transition hover:text-white">
            ADVENTTRA
          </a>
          {/* <a href="#contact" className="transition hover:text-white">
            Privacy Policy
          </a> */}
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
