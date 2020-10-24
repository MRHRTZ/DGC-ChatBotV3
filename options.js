module.exports = options = (headless, start) => {
    // const chromePath = {
    //     win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows 32 bit
    //     win64: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', // Windows 64 bit
    //     linuxChrome: '/usr/bin/google-chrome-stable', // Linux - Chrome
    //     linuxChromium: '/usr/bin/chromium-browser', // Linux - Chromium
    //     darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // MacOS
    // }

    // if (fs.existsSync(chromePath.win32)) {
    //     execPath = chromePath.win32
    // } else if (fs.existsSync(chromePath.win64)) {
    //     execPath = chromePath.win64
    // } else if (fs.existsSync(chromePath.linuxChrome)) {
    //     execPath = chromePath.linuxChrome
    // } else if (fs.existsSync(chromePath.linuxChromium)) {
    //     execPath = chromePath.linuxChromium
    // } else if (process.platform === 'darwin') {
    //     execPath = chromePath.darwin
    // } else {
    //     console.error(new Error('Google Chrome Is Not Installed'))
    //     process.exit(1)
    // }

     const options = {
 
  // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          useChrome: true,
          restartOnCrash: start,
          headless:false,
          throwErrorOnTosBlock:true,
          qrTimeout:0,   //set to 0 to wait forever for a qr scan
          authTimeout:0, //set to 0 to wait forever for connection to phone
          killProcessOnBrowserClose: true,
          autoRefresh:true, //default to true
          safeMode: true,
          disableSpins: true,
          viewport: {
            // width: 1920,
            height: 1200
          },
          defaultViewport: null
    }
    return options
}