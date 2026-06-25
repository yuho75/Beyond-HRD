const fs = require('fs');

const headerPath = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\components\\Header.tsx';
let headerContent = fs.readFileSync(headerPath, 'utf8');

// 1. Update imports
headerContent = headerContent.replace(
  'import { Search } from "lucide-react";',
  'import { Search, Menu, X } from "lucide-react";'
);

// 2. Add state
headerContent = headerContent.replace(
  'const [showModal, setShowModal] = useState(false);',
  'const [showModal, setShowModal] = useState(false);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
);

// 3. Update right actions
const rightActionsTarget = `{/* Right: Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <Search className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-900" />
          <button className="text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer">
            Login
          </button>
          <button className="text-sm font-medium text-white bg-[#f97316] px-4 py-1.5 rounded hover:bg-[#ea580c] transition-colors shadow-sm cursor-pointer">
            Subscribe
          </button>
        </div>`;

const rightActionsReplacement = `{/* Right: Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <Search className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-900" />
          <button className="hidden md:block text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer">
            Login
          </button>
          <button className="hidden md:block text-sm font-medium text-white bg-[#f97316] px-4 py-1.5 rounded hover:bg-[#ea580c] transition-colors shadow-sm cursor-pointer">
            Subscribe
          </button>
          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>`;

headerContent = headerContent.replace(rightActionsTarget, rightActionsReplacement);

// 4. Add mobile overlay
const adminModalTarget = `{/* Admin Login Modal */}`;

const mobileMenuOverlay = `{/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col p-6 overflow-y-auto">
          <nav className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest text-gray-600 mb-10">
            <Link href="/category/commerce" onClick={() => setIsMobileMenuOpen(false)} className={\`transition-colors hover:text-[#f97316] \${pathname.includes("/commerce") ? "text-[#f97316]" : ""}\`}>Commerce</Link>
            <Link href="/category/education" onClick={() => setIsMobileMenuOpen(false)} className={\`transition-colors hover:text-[#f97316] \${pathname.includes("/education") ? "text-[#f97316]" : ""}\`}>Education</Link>
            <Link href="/category/media" onClick={() => setIsMobileMenuOpen(false)} className={\`transition-colors hover:text-[#f97316] \${pathname.includes("/media") ? "text-[#f97316]" : ""}\`}>Media</Link>
            <Link href="/category/lifestyle" onClick={() => setIsMobileMenuOpen(false)} className={\`transition-colors hover:text-[#f97316] \${pathname.includes("/lifestyle") ? "text-[#f97316]" : ""}\`}>Lifestyle</Link>
            <Link href="/category/business" onClick={() => setIsMobileMenuOpen(false)} className={\`transition-colors hover:text-[#f97316] \${pathname.includes("/business") ? "text-[#f97316]" : ""}\`}>Business</Link>
            <div className="w-12 h-[1px] bg-gray-200"></div>
            <Link href="/category/insights" onClick={() => setIsMobileMenuOpen(false)} className={\`transition-colors hover:text-[#f97316] \${pathname.includes("/insights") ? "text-[#f97316]" : ""}\`}>Insights</Link>
            <div className="w-12 h-[1px] bg-gray-200"></div>
            <Link href="/mypage" onClick={() => setIsMobileMenuOpen(false)} className={\`transition-colors text-[#059669] hover:opacity-80 \${pathname.startsWith("/mypage") ? "text-[#059669]" : ""}\`}>My Page</Link>
          </nav>

          <div className="flex flex-col gap-4 mt-auto">
            <button className="w-full text-center text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
              Login
            </button>
            <button className="w-full text-center text-sm font-medium text-white bg-[#f97316] px-4 py-3 rounded-lg hover:bg-[#ea580c] transition-colors shadow-sm">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}`;

headerContent = headerContent.replace(adminModalTarget, mobileMenuOverlay);

fs.writeFileSync(headerPath, headerContent, 'utf8');
