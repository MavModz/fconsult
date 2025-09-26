export function loadAllCSS() {
    const cssFolder = '/css/'; // Base path in public folder

    // List of CSS files to load
    const cssFiles = [
       
        'primevue/style.css',
        
    ];

    cssFiles.forEach(file => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${cssFolder}${file}`;
        document.head.prepend(link); // Ensures CSS loads first
    });
}
