const fs = require('fs');
const path = require('path');

const files = [
  'src/app/mypage/page.tsx',
  'src/app/mypage/growth/page.tsx',
  'src/app/mypage/settings/page.tsx',
  'src/app/mypage/vault/page.tsx'
];

files.forEach(file => {
  const filePath = path.join('c:\\NB\\01_Beyond_HRD\\01_AI-flow', file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace colors first
  content = content.replace(/#c5b3f9/g, '#f97316');
  content = content.replace(/#8a63f2/g, '#ea580c');
  content = content.replace(/purple-500/g, 'orange-500');
  content = content.replace(/purple-400/g, 'orange-400');
  content = content.replace(/indigo-600/g, 'orange-600');
  content = content.replace(/indigo-500/g, 'orange-500');
  content = content.replace(/purple-200/g, 'orange-200');

  // Remove the profile block
  // Using string replace with a known prefix
  const startStr = '<div className="p-8">';
  const navStr = '<nav className="flex flex-col gap-2">';
  
  if (content.includes(startStr) && content.includes(navStr)) {
    const startIndex = content.indexOf(startStr) + startStr.length;
    const navIndex = content.indexOf(navStr);
    
    // The content between startIndex and navIndex is the profile block and whitespace
    content = content.substring(0, startIndex) + '\n            ' + content.substring(navIndex);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});
