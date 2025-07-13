// Manual language switching only
(function() {
    'use strict';
    
    // Get supported languages from site configuration
    const supportedLanguages = ['en', 'zh'];
    const defaultLanguage = 'en';
    
    // Get current path without language prefix
    function getPathWithoutLanguage() {
        const path = window.location.pathname;
        const langMatch = path.match(/^\/([a-z]{2})\//);
        if (langMatch && supportedLanguages.includes(langMatch[1])) {
            return path.substring(3); // Remove /xx/ prefix
        }
        return path;
    }
    
    // Expose function for manual language switching
    window.switchLanguage = function(lang) {
        if (supportedLanguages.includes(lang)) {
            localStorage.setItem('preferred-language', lang);
            const currentPath = getPathWithoutLanguage();
            let newUrl;
            
            if (lang === defaultLanguage) {
                newUrl = currentPath;
            } else {
                newUrl = '/' + lang + currentPath;
            }
            
            window.location.href = newUrl;
        }
    };
})(); 