const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function resolveFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('<<<<<<< HEAD')) return;
    
    // Regex to match the conflict blocks and keep only HEAD
    // Format:
    //     // [HEAD content]
    // 
    
    let resolvedContent = content.replace(/<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [^\r\n]*/g, '$1');
    
    fs.writeFileSync(filePath, resolvedContent, 'utf8');
    console.log('Resolved: ' + filePath);
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
        
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else {
            resolveFile(fullPath);
        }
    }
}

// SubProjectGrid was manually resolved, we don't want to break it if it somehow still had markers (it doesn't).
processDirectory(path.join(__dirname));
