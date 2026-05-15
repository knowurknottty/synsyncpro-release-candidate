
import JSZip from 'jszip';

export class ZipService {
    static async generatePortableProject(): Promise<Blob> {
        const zip = new JSZip();

        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

        const files = [
            'index.html',
            'manifest.json',
            'sw.js',
            'metadata.json',
            'README.md',
            'LICENSE.md',
            'PROVENANCE.md',
        ];

        for (const path of files) {
            try {
                const response = await fetch(baseUrl + path);
                if (response.ok) {
                    const content = await response.text();
                    zip.file(path, content);
                }
            } catch (e) {
                console.warn(`Kernel: Failed to clone [${path}]`);
            }
        }

        const mobileBootloader = `
<!DOCTYPE html>
<html>
<head>
    <title>SynSync Provisioning</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <style>
        body { background: #0B0C15; color: white; font-family: sans-serif; text-align: center; margin: 0; padding: 40px 20px; }
        .card { background: #151621; border: 1px solid #FFB000; padding: 30px; border-radius: 20px; max-width: 400px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        h1 { color: #FFB000; font-size: 24px; margin-bottom: 10px; font-weight: 900; }
        .warning-box { background: rgba(255, 61, 0, 0.2); border: 2px solid #FF3D00; padding: 20px; border-radius: 12px; margin-bottom: 25px; display: none; text-align: left; }
        .warning-box b { color: #FF3D00; display: block; margin-bottom: 10px; }
        .btn { display: block; background: #FFB000; color: black; padding: 18px; border-radius: 12px; text-decoration: none; font-weight: 900; margin-top: 25px; text-transform: uppercase; }
        .btn-secondary { background: #232433; color: #FFB000; margin-top: 10px; border: 1px solid #FFB00033; }
        .steps { text-align: left; margin-top: 35px; font-size: 13px; color: #888; border-top: 1px solid #333; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>PROVISIONING KERNEL</h1>
        
        <div id="gsa-warning" class="warning-box">
            <b>INCOMPATIBLE APP DETECTED</b>
            You are in the "Google Search App" or a "File Previewer". This will cause a "Bad Object" error.
            <br><br>
            <b>FIX:</b> Tap the 3 dots (⋮) and select <b>"Open in Chrome"</b>.
        </div>

        <p id="main-text">Extract the archive and initialize the core system:</p>
        
        <a href="index.html" class="btn">INITIALIZE SYSTEM</a>
        <button onclick="copyPath()" class="btn btn-secondary">COPY PATH FOR CHROME</button>

        <div class="steps">
            <p>1. Open this file in <b>Chrome</b>.</p>
            <p>2. Tap <b>Initialize</b>.</p>
            <p>3. Use <b>"Add to Home Screen"</b> for permanent offline access.</p>
        </div>
    </div>

    <script>
        const isGSA = /GSA\/\d/.test(navigator.userAgent);
        if (isGSA) {
            document.getElementById('gsa-warning').style.display = 'block';
            document.getElementById('main-text').style.opacity = '0.3';
        }

        function copyPath() {
            const path = window.location.href.replace('MOBILE_BOOTLOADER.html', 'index.html');
            navigator.clipboard.writeText(path).then(() => alert('Path copied! Paste into Chrome.'));
        }
    </script>
</body>
</html>
        `;
        zip.file('MOBILE_BOOTLOADER.html', mobileBootloader);

        return await zip.generateAsync({ type: 'blob' });
    }

    static downloadBlob(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
