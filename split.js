const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

const prefixMatch = html.match(/([\s\S]*?)<main class="content-area">\s*/);
const suffixMatch = html.match(/\s*<\/main>([\s\S]*)/);

if (!prefixMatch || !suffixMatch) {
    console.error("Could not find main tags");
    process.exit(1);
}

const prefix = prefixMatch[1] + '<main class="content-area">\n';
const suffix = '\n</main>' + suffixMatch[1];

// Extract steps using regex
const steps = [
    { id: 'step-selection', filename: 'index.html' },
    { id: 'step-idp-type', filename: 'idp-type.html' },
    { id: 'step-ai-chat', filename: 'ai-chat.html' },
    { id: 'step-manual', filename: 'manual.html' },
    { id: 'step-goals', filename: 'goals.html' },
    { id: 'step-activities', filename: 'activities.html' },
    { id: 'step-roadmap', filename: 'roadmap.html' }
];

const stepContents = {};
for (const step of steps) {
    // This regex looks for `<div id="step-..."` and captures until the next step or `</main>`
    const regex = new RegExp(`<div id="${step.id}"[\\s\\S]*?(?=<div id="step-|<\/main>)`);
    const match = html.match(regex);
    if (match) {
        stepContents[step.id] = match[0];
    }
}

// Function to fix links in the HTML content
function fixLinks(content) {
    return content
        .replace(/onclick="document\.getElementById\('[^']+'\)\.style\.display='none'; document\.getElementById\('step-idp-type'\)\.style\.display='[^']+'(?:;)*"/g, 'onclick="window.location.href=\'idp-type.html\'"')
        .replace(/onclick="document\.getElementById\('[^']+'\)\.style\.display='none'; document\.getElementById\('step-ai-chat'\)\.style\.display='[^']+'(?:;)*"/g, 'onclick="window.location.href=\'ai-chat.html\'"')
        .replace(/onclick="document\.getElementById\('[^']+'\)\.style\.display='none'; document\.getElementById\('step-manual'\)\.style\.display='[^']+'(?:;)*"/g, 'onclick="window.location.href=\'manual.html\'"')
        .replace(/onclick="document\.getElementById\('[^']+'\)\.style\.display='none'; document\.getElementById\('step-goals'\)\.style\.display='[^']+'(?:;)*"/g, 'onclick="window.location.href=\'goals.html\'"')
        .replace(/onclick="document\.getElementById\('[^']+'\)\.style\.display='none'; document\.getElementById\('step-activities'\)\.style\.display='[^']+'(?:;)*"/g, 'onclick="window.location.href=\'activities.html\'"')
        .replace(/onclick="document\.getElementById\('[^']+'\)\.style\.display='none'; document\.getElementById\('step-roadmap'\)\.style\.display='[^']+'(?:;)*"/g, 'onclick="window.location.href=\'roadmap.html\'"')
        .replace(/onclick="document\.getElementById\('[^']+'\)\.style\.display='none'; document\.getElementById\('step-selection'\)\.style\.display='[^']+'(?:;)*"/g, 'onclick="window.location.href=\'index.html\'"');
}

for (const step of steps) {
    let content = stepContents[step.id];
    if (!content) continue;

    // Change display: none to block/flex where appropriate
    content = content.replace(/style="display:\s*none;?"/, `style="display: ${step.id === 'step-ai-chat' ? 'flex' : 'block'};"`);
    
    // Fix links
    content = fixLinks(content);

    // Add back button for idp-type
    if (step.id === 'step-idp-type') {
        content = content.replace(/<div class="welcome-card">/, `<a href="index.html" class="back-link"><i class='bx bx-left-arrow-alt'></i> Back to Selection</a>\n                <div class="welcome-card">`);
        content = content.replace('welcome-full-wrapper', 'welcome-full-wrapper" style="padding-top: 24px;');
    }
    
    if (step.id === 'step-ai-chat') {
        content = content.replace(/<div class="chat-main">/, `<a href="idp-type.html" class="back-link" style="margin-left: 24px; margin-top: 24px;"><i class='bx bx-left-arrow-alt'></i> Back</a>\n                <div class="chat-main">`);
    }

    const fullHtml = prefix + content + suffix;
    fs.writeFileSync(step.filename, fullHtml);
    console.log(`Wrote ${step.filename}`);
}
