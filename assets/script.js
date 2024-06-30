
// NAVBAR ANIMATIONS
function updateNavbarHeight() {
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight + 20;
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
}

window.addEventListener('load', updateNavbarHeight);
window.addEventListener('resize', updateNavbarHeight);

$(document).ready(function() {
    var activeLink = localStorage.getItem('activeNavLink');
    if (activeLink) {
        $('.nav-link').removeClass('active');
        $(`.nav-link[href='${activeLink}']`).addClass('active');
    }

    $('.nav-link').on('click', function(event) {
        event.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        
        localStorage.setItem('activeNavLink', $(this).attr('href'));

        window.location.href = $(this).attr('href');
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (window.scrollY > 50) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('navbar-solid');
        navLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.style.color = 'var(--knight-purple)';
            }
        });
    } else {
        navbar.classList.remove('navbar-solid');
        navbar.classList.add('navbar-transparent');
        navLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.style.color = '';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.href;

    const workPageUrl = '/work';

    function removeActiveClass() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.style.color = '';
        });
    }

    if (currentUrl.includes(workPageUrl) && currentUrl !== window.location.origin + workPageUrl) {
        removeActiveClass();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            setTimeout(() => {
                window.location.href = this.href;
            }, 100);
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-solid');
            navLinks.forEach(link => {
                if (!link.classList.contains('active')) {
                    link.style.color = 'var(--knight-purple)';
                }
            });
        } else {
            navbar.classList.remove('navbar-solid');
            navbar.classList.add('navbar-transparent');
            navLinks.forEach(link => {
                if (!link.classList.contains('active')) {
                    link.style.color = '';
                }
            });
        }
    });
});


//PROGRESS BAR
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const progressBar = document.getElementById('progress-bar');
    const progressLinks = document.querySelectorAll('.progress-link');
    const mobileSections = document.getElementById('mobile-sections');
    const currentSection = document.getElementById('current-section');
    const expandedSections = document.getElementById('expanded-sections');
    const offset = 200;

    function updateProgressBar(section) {
        const sectionHeight = section.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollBottom = scrollTop + window.innerHeight;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + sectionHeight;

        if (scrollBottom >= sectionBottom) {
            const index = Array.from(sections).indexOf(section);
            const totalSections = sections.length;
            const percentage = ((index + 1) / totalSections) * 100;
            progressBar.style.width = percentage + '%';
            progressBar.style.transition = 'width 1.5s ease';

            progressLinks.forEach(link => link.classList.remove('active'));
            if (progressLinks[index]) {
                progressLinks[index].classList.add('active');
                // Update the current-section div with the current section title
                currentSection.textContent = progressLinks[index].textContent;
            }
        }
    }

    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            updateProgressBar(section);
        });
    });

    document.querySelectorAll('.progress-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Initial update to set the current section title for mobile
    if (sections.length > 0) {
        updateProgressBar(sections[0]);
    }

    // Toggle function for current section title click
    currentSection.addEventListener('click', () => {
        mobileSections.classList.toggle('expanded');
    });
});

// FILTER BY TAG ON WORK PAGE
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.card');

    const handleFilter = (selectedTag) => {
        projects.forEach(project => {
            const projectTags = project.getAttribute('data-tags').toLowerCase();

            if (selectedTag === 'show-all' || projectTags.includes(selectedTag)) {
                project.style.display = '';
            } else {
                project.style.display = 'none';
            }
        });

        filterButtons.forEach(button => button.classList.remove('active'));

        document.querySelector(`.filter-btn[data-tag="${selectedTag}"]`).classList.add('active');
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTag = button.getAttribute('data-tag');
            handleFilter(selectedTag);
        });
    });

    const showAllButton = document.getElementById('show-all-btn');
    if (showAllButton) {
        showAllButton.addEventListener('click', () => {
            projects.forEach(project => {
                project.style.display = '';
            });

            filterButtons.forEach(button => button.classList.remove('active'));
            showAllButton.classList.add('active');
        });
    }
});

// FILTER ON PLAY GALLERY
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gallery = document.querySelector('.gallery');

    // Initialize Masonry
    const masonry = new Masonry(gallery, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item', // Adjust this selector as per your layout
        percentPosition: true
    });

    // Function to handle filtering
    const handleFilter = (selectedTag) => {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            const tags = item.getAttribute('data-tags').split(',');
            const isVisible = selectedTag === 'show-all' || tags.includes(selectedTag);

            item.style.display = isVisible ? '' : 'none';
        });

        // Layout Masonry after filtering
        masonry.layout();
    };

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTag = button.getAttribute('data-tag');
            handleFilter(selectedTag);
        });
    });

    // Layout Masonry on initial load
    masonry.layout();
});

// COLLAPSIBLE NAVBAR
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });

    // Close the menu when a link is clicked (optional)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarLinks.classList.remove('active');
        });
    });
});

// ABOUT PAGE CAROUSEL
document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');

        let currentIndex = 0;

        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    });
});
