const fs = require('fs');
const path = require('path');

const filePaths = [
  'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\page.tsx',
  'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\growth\\page.tsx',
  'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\settings\\page.tsx',
  'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\vault\\page.tsx'
];

filePaths.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace text-black with text-white when used with bg-[#f97316]
  content = content.replace(/bg-\[#f97316\] text-black/g, 'bg-[#f97316] text-white');

  fs.writeFileSync(file, content, 'utf8');
});
