const fs = require('fs-extra')

module.exports = options = (headless, start) => {
    const chromePath = {
        win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows 32 bit
        win64: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // Windows 64 bit
        linuxChrome: '/usr/bin/google-chrome-stable', // Linux - Chrome
        linuxChromium: '/usr/bin/chromium-browser', // Linux - Chromium
        darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // MacOS
    }

    if (fs.existsSync(chromePath.win32)) {
        execPath = chromePath.win32
    } else if (fs.existsSync(chromePath.win64)) {
        execPath = chromePath.win64
    } else if (fs.existsSync(chromePath.linuxChrome)) {
        execPath = chromePath.linuxChrome
    } else if (fs.existsSync(chromePath.linuxChromium)) {
        execPath = chromePath.linuxChromium
    } else if (process.platform === 'darwin') {
        execPath = chromePath.darwin
    } else {
        console.error(new Error('Google Chrome Is Not Installed'))
        process.exit(1)
    }

      const options = {
        headless: headless,
        autoRefresh: true,
        qrTimeout:0,   //set to 0 to wait forever for a qr scan
        authTimeout:0, //set to 0 to wait forever for connection to phone
        restartOnCrash: start,
        cacheEnabled: false,
        executablePath: execPath,
        useChrome: true,
        killProcessOnBrowserClose: false,
        throwErrorOnTosBlock: false,
        chromiumArgs: [
            '--disable-2d-canvas-clip-aa',
            '--disable-2d-canvas-image-chromium',
            '--disable-3d-apis',
            '--disable-accelerated-2d-canvas',
            '--disable-accelerated-jpeg-decoding',
            '--disable-accelerated-mjpeg-decode',
            '--disable-accelerated-video-decode',
            '--disable-app-list-dismiss-on-blur',
            '--disable-audio-output',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-canvas-aa',
            '--disable-client-side-phishing-detection',
            '--disable-component-extensions-with-background-pages',
            '--disable-composited-antialiasing',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-features=TranslateUI,BlinkGenPropertyTrees',
            '--disable-field-trial-config',
            '--disable-fine-grained-time-zone-detection',
            '--disable-geolocation',
            "--proxy-server='direct://'",
            '--proxy-bypass-list=*',
            '--disable-gl-extensions',
            '--disable-gpu',
            '--disable-gpu-early-init',
            '--disable-gpu-sandbox',
            '--disable-gpu-watchdog',
            '--disable-histogram-customizer',
            '--disable-in-process-stack-traces',
            '--disable-infobars',
            '--disable-ipc-flooding-protection',
            '--disable-notifications',
            '--disable-renderer-backgrounding',
            '--disable-session-crashed-bubble',
            '--disable-setuid-sandbox',
            '--disable-site-isolation-trials',
            '--disable-software-rasterizer',
            '--disable-sync',
            '--disable-threaded-animation',
            '--disable-threaded-scrolling',
            '--disable-translate',
            '--disable-webgl',
            '--disable-webgl2',
            '--enable-features=NetworkService',
            '--force-color-profile=srgb',
            '--headless',
            '--hide-scrollbars',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--ignore-gpu-blacklist',
            '--ignore-ssl-errors',
            '--log-level=3',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-crash-upload',
            '--no-default-browser-check',
            '--no-experiments',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--renderer-process-limit=1',
            '--safebrowsing-disable-auto-update',
            '--silent-debugger-extension-api',
            '--single-process',
            '--unhandled-rejections=strict',
            '--window-position=0,0'
        ]
    }
    return options
}

            // '--no-sandbox',
            // '--disable-setuid-sandbox',
            // '--aggressive-cache-discard',
            // '--disable-cache',
            // '--disable-application-cache',
            // '--disable-offline-load-stale-cache',
            // '--disk-cache-size=0'