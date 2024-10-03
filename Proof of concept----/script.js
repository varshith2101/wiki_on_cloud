document.addEventListener('DOMContentLoaded', () => {
    const tableOfContents = document.querySelector('.table-of-contents');
    const hero = document.querySelector('.hero');
    const tocItems = document.querySelectorAll('.table-of-contents li');
    const sections = document.querySelectorAll('.research-content section');
    let isScrolled = false;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };


    function updateActiveSection(sectionId) {
        tocItems.forEach((item) => {
            item.classList.remove('active');
            if (item.querySelector('a').getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        let heroBottom = hero.offsetTop + hero.offsetHeight;
        heroBottom = 700;
        console.log("hello "+heroBottom);
        if (window.scrollY > heroBottom && !isScrolled) {
            isScrolled = true;
            tableOfContents.style.opacity = '1';
            animateTOCItems();
            tocItems.forEach(item => {
                item.classList.remove('visible');
            });
        } else if (window.scrollY <= heroBottom && isScrolled) {
            isScrolled = false;
            tableOfContents.style.opacity = '0';
            tocItems.forEach(item => {
                item.classList.remove('visible');
            });
        }
    });

    function animateTOCItems() {
        tocItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }

    // Smooth scrolling for table of contents links
    document.querySelectorAll('.table-of-contents a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        window.scrollTo({
            top: heroBottom,
            behavior: 'smooth'
        });
    });

    // Initialize Lucide icons
    lucide.createIcons();
});