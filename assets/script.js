
// NAVBAR ANIMATIONS
function updateNavbarHeight() {
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight + 20;
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
}

window.addEventListener('load', updateNavbarHeight);
window.addEventListener('resize', updateNavbarHeight);

$(document).ready(function() {
    // Set active class based on local storage
    var activeLink = localStorage.getItem('activeNavLink');
    if (activeLink) {
        $('.nav-link').removeClass('active');
        $(`.nav-link[href='${activeLink}']`).addClass('active');
    }

    $('.nav-link').on('click', function(event) {
        event.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        
        // Store the active link in local storage
        localStorage.setItem('activeNavLink', $(this).attr('href'));

        // Navigate to the new page
        window.location.href = $(this).attr('href');
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link'); // Select all nav links

    if (window.scrollY > 50) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('navbar-solid');
        navLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.style.color = 'var(--knight-purple)'; // Change color when navbar is solid
            }
        });
    } else {
        navbar.classList.remove('navbar-solid');
        navbar.classList.add('navbar-transparent');
        navLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.style.color = ''; // Reset color when navbar is transparent
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.href;

    // Define the base URL of the work page
    const workPageUrl = '/work';

    // Function to remove active class from nav links
    function removeActiveClass() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.style.color = ''; // Reset the color if needed
        });
    }

    // Check if the current URL contains the work page URL and is not exactly the work page
    if (currentUrl.includes(workPageUrl) && currentUrl !== window.location.origin + workPageUrl) {
        removeActiveClass();
    }

    // Event listener for nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            navLinks.forEach(link => link.classList.remove('active')); // Remove active class from all links
            this.classList.add('active'); // Add active class to the clicked link
            setTimeout(() => {
                window.location.href = this.href;
            }, 100);
        });
    });

    // Scroll event to change nav link color when navbar is solid
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-solid');
            navLinks.forEach(link => {
                if (!link.classList.contains('active')) {
                    link.style.color = 'var(--knight-purple)'; // Change color when navbar is solid
                }
            });
        } else {
            navbar.classList.remove('navbar-solid');
            navbar.classList.add('navbar-transparent');
            navLinks.forEach(link => {
                if (!link.classList.contains('active')) {
                    link.style.color = ''; // Reset color when navbar is transparent
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
    const offset = 200; // Buffer in pixels

    // Function to update progress bar based on scroll position in section
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
            progressBar.style.transition = 'width 1.5s ease'; // Transition effect

            // Highlight the current progress link
            progressLinks.forEach(link => link.classList.remove('active'));
            if (progressLinks[index]) {
                progressLinks[index].classList.add('active');
            }
        }
    }

    // Event listener for scroll to update progress bar
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            updateProgressBar(section);
        });
    });

    // Smooth scrolling for progress links with offset
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
});

// FILTER BY TAG ON WORK PAGE
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.card');

    // Function to handle filtering based on selected tag
    const handleFilter = (selectedTag) => {
        projects.forEach(project => {
            const projectTags = project.getAttribute('data-tags').toLowerCase();

            // Display the project if it contains the selected tag or if "SHOW ALL" is selected
            if (selectedTag === 'show-all' || projectTags.includes(selectedTag)) {
                project.style.display = ''; // Reset to default
            } else {
                project.style.display = 'none'; // Hide the project
            }
        });

        // Remove active class from all filter buttons
        filterButtons.forEach(button => button.classList.remove('active'));

        // Add active class to the clicked filter button
        document.querySelector(`.filter-btn[data-tag="${selectedTag}"]`).classList.add('active');
    };

    // Event listener for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTag = button.getAttribute('data-tag');

            // Handle filtering based on selected tag
            handleFilter(selectedTag);
        });
    });

    // Event listener for "SHOW ALL" button
    const showAllButton = document.getElementById('show-all-btn');
    if (showAllButton) {
        showAllButton.addEventListener('click', () => {
            // Handle filtering to show all projects
            projects.forEach(project => {
                project.style.display = ''; // Reset to default for all projects
            });

            // Remove active class from all filter buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            showAllButton.classList.add('active');
        });
    }
});