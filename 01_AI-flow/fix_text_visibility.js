const fs = require('fs');

const pageFile = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

pageContent = pageContent.replace(
  '<p className="text-xs text-orange-200/60 leading-relaxed">',
  '<p className="text-xs text-gray-700 leading-relaxed">'
);
pageContent = pageContent.replace(
  '<span className="text-orange-400 font-bold">15% 더 많은</span>',
  '<span className="text-[#f97316] font-bold">15% 더 많은</span>'
);

fs.writeFileSync(pageFile, pageContent, 'utf8');

const growthFile = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\growth\\page.tsx';
let growthContent = fs.readFileSync(growthFile, 'utf8');

growthContent = growthContent.replace(
  '<p className="text-xs text-gray-300 leading-relaxed">',
  '<p className="text-xs text-gray-700 leading-relaxed">'
);

fs.writeFileSync(growthFile, growthContent, 'utf8');
