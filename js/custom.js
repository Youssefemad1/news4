(function() {
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        });
    }

    function updateDateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        const dateElem = document.getElementById('currentDate');
        const timeElem = document.getElementById('currentTime');
        if (dateElem) dateElem.textContent = now.toLocaleDateString('en-US', dateOptions);
        if (timeElem) timeElem.textContent = now.toLocaleTimeString('en-US', timeOptions);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    const tickerContainer = document.getElementById('newsTickerBar');
    const headlineDisplay = document.getElementById('headlineDisplay');
    const closeBtn = document.getElementById('tickerCloseBtn');
    if (tickerContainer && headlineDisplay && closeBtn) {
        const newsData = [
            'New study shows coffee might actually help you live longer.',
            "Apple's latest iOS update includes these hidden features.",
            'Global markets rally as tech stocks hit record highs.',
            "SpaceX successfully launches world's most powerful rocket."
        ];
        let currentIndex = 0;

        function rotateHeadline() {
            headlineDisplay.classList.add('exit-headline');
            headlineDisplay.classList.remove('current-headline');
            setTimeout(() => 
            {
                currentIndex = (currentIndex + 1) % newsData.length;
                headlineDisplay.textContent = newsData[currentIndex];
                headlineDisplay.classList.remove('exit-headline');
                void headlineDisplay.offsetWidth;
                headlineDisplay.classList.add('current-headline');
            }, 500);
        }

        if (newsData.length > 0) headlineDisplay.textContent = newsData[0];
        const intervalId = setInterval(rotateHeadline, 10000);
        closeBtn.addEventListener('click', () => {
            clearInterval(intervalId);
            tickerContainer.classList.add('closed');
            document.body.style.paddingBottom = '0';
        });
    }

    const searchTrigger = document.getElementById('searchTrigger');
    const searchTriggerMobile = document.getElementById('searchTriggerMobile');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchOverlay = document.getElementById('closeSearchOverlay');
    const searchInput = document.querySelector('.overlay-search-input');

    function openSearch() {
        if (!searchOverlay) return;
        searchOverlay.classList.add('active');
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 100);
    }

    if (searchOverlay && closeSearchOverlay) {
        if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
        if (searchTriggerMobile) searchTriggerMobile.addEventListener('click', openSearch);

        closeSearchOverlay.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    const socialToggleBtn = document.getElementById('socialToggleBtn');
    const socialGroup = document.getElementById('socialGroup');
    if (socialToggleBtn && socialGroup) {
        socialToggleBtn.addEventListener('click', () => {
            socialGroup.classList.toggle('active');
        });
    }

    window.changeVideo = function(imageSrc, title, author) {
        const mainImage = document.getElementById('mainVideoImage');
        const mainTitle = document.getElementById('mainVideoTitle');
        const mainAuthor = document.getElementById('mainVideoAuthor');
        if (!mainImage) return;
        mainImage.style.opacity = '0.4';
        setTimeout(() => {
            mainImage.src = imageSrc;
            if (mainTitle) mainTitle.innerText = title;
            if (mainAuthor) mainAuthor.innerHTML = `<i class="ri-user-line mr-1"></i> By ${author}`;
            mainImage.style.opacity = '0.8';
        }, 300);
    };
})();