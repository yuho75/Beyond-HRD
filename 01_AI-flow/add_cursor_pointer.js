const fs = require('fs');
const path = require('path');

const filePaths = [
  'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\settings\\page.tsx',
  'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\vault\\page.tsx'
];

filePaths.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(
    '<button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold transition-all">',
    '<button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold transition-all cursor-pointer">'
  );

  content = content.replace(
    'className="transition-colors"',
    'className="transition-colors cursor-pointer"'
  );

  content = content.replace(
    '<button className="flex items-center gap-2 text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors">',
    '<button className="flex items-center gap-2 text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors cursor-pointer">'
  );

  content = content.replace(
    'className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === \'bookmarks\' ? "bg-[#f97316] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"}`}',
    'className={`px-6 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === \'bookmarks\' ? "bg-[#f97316] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"}`}'
  );

  content = content.replace(
    'className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === \'history\' ? "bg-[#f97316] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"}`}',
    'className={`px-6 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === \'history\' ? "bg-[#f97316] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"}`}'
  );

  content = content.replace(
    'className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all shrink-0 ${filter === cat ? "bg-gray-100 border-white/20 text-gray-900" : "bg-transparent border-gray-200 text-gray-500 hover:border-gray-300"}`}',
    'className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all shrink-0 cursor-pointer ${filter === cat ? "bg-gray-100 border-white/20 text-gray-900" : "bg-transparent border-gray-200 text-gray-500 hover:border-gray-300"}`}'
  );

  // We should do a global replace for the READ button in case there are multiple
  content = content.replace(
    /<button className="text-\[10px\] text-\[#f97316\] font-bold flex items-center gap-1 hover:underline">/g,
    '<button className="text-[10px] text-[#f97316] font-bold flex items-center gap-1 hover:underline cursor-pointer">'
  );

  fs.writeFileSync(file, content, 'utf8');
});
