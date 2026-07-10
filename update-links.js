const fs = require('fs');

// 1. Update idp-type.html
let idpType = fs.readFileSync('idp-type.html', 'utf-8');
idpType = idpType.replace(/manual\.html/g, 'step1-basic.html');
fs.writeFileSync('idp-type.html', idpType);

// 2. Update Steppers and CTAs
const stepper1 = `
                <div class="stepper">
                    <div class="step active"><div class="step-circle">1</div></div>
                    <div class="step-line"></div>
                    <div class="step"><div class="step-circle">2</div></div>
                    <div class="step-line"></div>
                    <div class="step"><div class="step-circle">3</div></div>
                </div>
`;
const stepper2 = `
                <div class="stepper">
                    <div class="step completed"><div class="step-circle"><i class='bx bx-check'></i></div></div>
                    <div class="step-line active-line"></div>
                    <div class="step active"><div class="step-circle">2</div></div>
                    <div class="step-line"></div>
                    <div class="step"><div class="step-circle">3</div></div>
                </div>
`;
const stepper3 = `
                <div class="stepper">
                    <div class="step completed"><div class="step-circle"><i class='bx bx-check'></i></div></div>
                    <div class="step-line active-line"></div>
                    <div class="step completed"><div class="step-circle"><i class='bx bx-check'></i></div></div>
                    <div class="step-line active-line"></div>
                    <div class="step active"><div class="step-circle">3</div></div>
                </div>
`;

// Helper to replace stepper (finds `<div class="stepper">...</div>`)
function replaceStepper(html, newStepper) {
    return html.replace(/<div class="stepper">[\s\S]*?<\/div>\s*<\/div>/, newStepper);
}

// Step 1
if (fs.existsSync('step1-basic.html')) {
    let html1 = fs.readFileSync('step1-basic.html', 'utf-8');
    html1 = html1.replace(/<div class="stepper">[\s\S]*?(?=<div class="wizard-content">)/, stepper1);
    html1 = html1.replace(/onclick="window\.location\.href='index\.html'"/, `onclick="window.location.href='idp-type.html'"`);
    html1 = html1.replace(/onclick="window\.location\.href='goals\.html'"/, `onclick="window.location.href='step2-activities.html'"`);
    html1 = html1.replace(/Next: SMART Goals/, "Next: Activities");
    fs.writeFileSync('step1-basic.html', html1);
}

// Step 2
if (fs.existsSync('step2-activities.html')) {
    let html2 = fs.readFileSync('step2-activities.html', 'utf-8');
    html2 = html2.replace(/<div class="stepper">[\s\S]*?(?=<div class="wizard-content">)/, stepper2);
    html2 = html2.replace(/onclick="window\.location\.href='manual\.html'"/, `onclick="window.location.href='step1-basic.html'"`);
    html2 = html2.replace(/onclick="window\.location\.href='activities\.html'"/, `onclick="window.location.href='step3-sharing.html'"`);
    html2 = html2.replace(/Next: Activities/, "Next: Sharing");
    fs.writeFileSync('step2-activities.html', html2);
}

// Step 3
if (fs.existsSync('step3-sharing.html')) {
    let html3 = fs.readFileSync('step3-sharing.html', 'utf-8');
    html3 = html3.replace(/<div class="stepper">[\s\S]*?(?=<div class="wizard-content">)/, stepper3);
    html3 = html3.replace(/onclick="window\.location\.href='goals\.html'"/, `onclick="window.location.href='step2-activities.html'"`);
    // Replace the "Next: Timeline" button with a Finish button
    html3 = html3.replace(/<button class="btn btn-primary btn-icon" onclick="window\.location\.href='roadmap\.html'">[\s\S]*?<\/button>/, `<button class="btn btn-primary btn-icon" onclick="alert('Plan completed!')">Complete Plan <i class='bx bx-check-circle'></i></button>`);
    fs.writeFileSync('step3-sharing.html', html3);
}

console.log("Done updating links and steppers.");
