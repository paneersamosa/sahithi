
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
    const filterContainer = document.getElementById('play-filter');
    if (!filterContainer) return;

    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    console.log('Filter container found:', filterContainer);
    console.log('Filter buttons:', filterButtons);
    console.log('Gallery items:', galleryItems);

    const handleFilter = (selectedTag) => {
        console.log('Selected tag:', selectedTag);

        galleryItems.forEach(item => {
            const itemTags = item.getAttribute('data-tags').toLowerCase().split(',');
            console.log('Item tags:', itemTags);

            if (selectedTag === 'show-all' || itemTags.includes(selectedTag)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        filterButtons.forEach(button => button.classList.remove('active'));
        const activeButton = filterContainer.querySelector(`.filter-btn[data-tag="${selectedTag}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTag = button.getAttribute('data-tag');
            handleFilter(selectedTag);
        });
    });

    const showAllButton = filterContainer.querySelector('#show-all-btn');
    if (showAllButton) {
        showAllButton.addEventListener('click', () => {
            galleryItems.forEach(item => {
                item.style.display = '';
            });

            filterButtons.forEach(button => button.classList.remove('active'));
            showAllButton.classList.add('active');
        });
    }
});


