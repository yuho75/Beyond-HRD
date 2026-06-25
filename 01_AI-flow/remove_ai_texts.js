const fs = require('fs');

const adminPage = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\admin\\page.tsx';
let adminPageContent = fs.readFileSync(adminPage, 'utf8');
adminPageContent = adminPageContent.replace(/AI-FLOW 관리 \(사이트 A\)/g, '콘텐츠 피드 관리');
adminPageContent = adminPageContent.replace(/AI-ROOT 관리 \(사이트 B\)/g, 'LMS 코스 관리');
fs.writeFileSync(adminPage, adminPageContent, 'utf8');

const adminUsers = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\admin\\users\\page.tsx';
let adminUsersContent = fs.readFileSync(adminUsers, 'utf8');
adminUsersContent = adminUsersContent.replace(/AI-FLOW 관리/g, '콘텐츠 피드 관리');
adminUsersContent = adminUsersContent.replace(/AI-ROOT 관리/g, 'LMS 코스 관리');
adminUsersContent = adminUsersContent.replace(/AI-flow와 AI-root의 /g, '');
adminUsersContent = adminUsersContent.replace(/\[AI-FLOW\] /g, '');
adminUsersContent = adminUsersContent.replace(/\[AI-ROOT\] /g, '');
fs.writeFileSync(adminUsers, adminUsersContent, 'utf8');

const adminEditor = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\admin\\editor\\page.tsx';
let adminEditorContent = fs.readFileSync(adminEditor, 'utf8');
adminEditorContent = adminEditorContent.replace(/AI-FLOW 관리/g, '콘텐츠 피드 관리');
adminEditorContent = adminEditorContent.replace(/AI-ROOT 관리/g, 'LMS 코스 관리');
adminEditorContent = adminEditorContent.replace(/AI-flow/g, 'AIditor');
adminEditorContent = adminEditorContent.replace(/AI-root/g, 'AIditor');
fs.writeFileSync(adminEditor, adminEditorContent, 'utf8');

const mypage = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\page.tsx';
let mypageContent = fs.readFileSync(mypage, 'utf8');
mypageContent = mypageContent.replace(/'AI-FLOW'/g, "'AIditor'");
mypageContent = mypageContent.replace(/'AI-ROOT'/g, "'AIditor'");
fs.writeFileSync(mypage, mypageContent, 'utf8');

const mypageVault = 'c:\\NB\\01_Beyond_HRD\\01_AI-flow\\src\\app\\mypage\\vault\\page.tsx';
let mypageVaultContent = fs.readFileSync(mypageVault, 'utf8');
mypageVaultContent = mypageVaultContent.replace(/'AI-FLOW'/g, "'AIditor'");
mypageVaultContent = mypageVaultContent.replace(/'AI-ROOT'/g, "'AIditor'");
fs.writeFileSync(mypageVault, mypageVaultContent, 'utf8');
