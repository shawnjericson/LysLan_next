const fs = require('fs');
const path = require('path');

const folderToCheck = './src/components';
const outputFile = './seo-check-report.md';

const imageTagRegex = /<Image([^>]*)\/>/g;
const backgroundDivRegex = /<div[^>]+backgroundImage[^>]+>/g;

const checkAlt = props => /alt\s*=/.test(props);
const checkLoading = props => /loading\s*=\s*["']lazy["']/.test(props);
const checkPriority = props => /priority\s*=\s*{?\s*true\s*}?/.test(props);

let report = `# 🧾 Báo cáo kiểm tra SEO hình ảnh\n\n> Ngày kiểm tra: ${new Date().toLocaleString()}\n\n`;

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.relative('.', filePath);
    let foundIssues = false;

    const matches = [...content.matchAll(imageTagRegex)];
    const bgDivs = [...content.matchAll(backgroundDivRegex)];

    if (matches.length === 0 && bgDivs.length === 0) return;

    report += `## 📄 File: \`${fileName}\`\n`;

    if (matches.length > 0) {
        report += `- Tìm thấy **${matches.length}** thẻ \`<Image />\`\n`;

        matches.forEach((match, i) => {
            const props = match[1];
            let issues = [];

            if (!checkAlt(props)) issues.push('❌ Thiếu `alt`');
            if (!checkPriority(props) && !checkLoading(props)) issues.push('❌ Thiếu `loading="lazy"` hoặc `priority`');

            if (issues.length > 0) {
                foundIssues = true;
                report += `  - Ảnh ${i + 1}: ${issues.join(', ')}\n`;
            }
        });
    }

    if (bgDivs.length > 0) {
        let divCounter = 0;
        bgDivs.forEach(divMatch => {
            divCounter++;
            const divCode = divMatch[0];
            const hasLabel = /aria-label\s*=/.test(divCode) || divCode.includes('sr-only');

            if (!hasLabel) {
                foundIssues = true;
                report += `- ❌ \`<div>\` ${divCounter} dùng \`backgroundImage\` nhưng **không có** \`aria-label\` hoặc \`.sr-only\`\n`;
            } else {
                report += `- ✅ \`<div>\` ${divCounter} có mô tả thay thế.\n`;
            }
        });
    }

    if (!foundIssues) {
        report += `- ✅ Không phát hiện lỗi.\n`;
    }

    report += `\n`;
}

function walkDir(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (/\.(js|jsx|tsx)$/.test(file)) {
            checkFile(fullPath);
        }
    });
}

// Bắt đầu kiểm tra
console.log(`🚀 Bắt đầu kiểm tra SEO hình ảnh trong thư mục: ${folderToCheck}`);
walkDir(folderToCheck);

// Xuất ra file
fs.writeFileSync(outputFile, report, 'utf8');
console.log(`✅ Đã xuất báo cáo vào: ${outputFile}`);
