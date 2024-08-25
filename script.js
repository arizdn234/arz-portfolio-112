window.addEventListener('load', () => {
    let allTab = document.querySelectorAll('.tab');
    let allproject = document.querySelectorAll('.project');

    // Remove active class from all tabs
    const removeActive = () => allTab.forEach(tab => {
        tab.classList.remove('tab-active');
    });

    // Add click event listeners to all tabs
    allTab.forEach(tab => {
        tab.addEventListener('click', event => {
            removeActive();
            tab.classList.add('tab-active');

            let filterName = event.target.getAttribute('data-name');
            allproject.forEach(project => {
                let projectName = project.getAttribute('data-name');
                if (projectName === filterName || filterName === 'star') {
                    project.style.display = 'block';
                    project.style.display = 'flex'; // Adjust based on your design
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Initial load: only display projects that match the default tab ('star')
    let defaultTab = document.querySelector('.tab-active').getAttribute('data-name');
    allproject.forEach(project => {
        let projectName = project.getAttribute('data-name');
        if (projectName === defaultTab || defaultTab === 'star') {
            project.style.display = 'block';
            project.style.display = 'flex'; // Adjust based on your design
        } else {
            project.style.display = 'none';
        }
    });
});


// nav scroll
window.addEventListener('scroll',()=>{
    let nav = document.querySelector('nav');

    nav.classList.toggle('nav-scroll', window.scrollY > 0);
});

// Randomizer
function randomizer(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// typed text js
// document.addEventListener('DOMContentLoaded', function() {
//     let typed = new Typed('.typed-text', {
//         strings: ['Front End', 'Web Design'],
//         typeSpeed: 100,
//         backSpeed: 50,
//         backDelay: 1000,
//         loop: true,
//     });
// });

// menu (mobile view)
const menuButton = document.querySelector('.menu-button');
const menuBar = document.querySelector('.menu-bar');
const menuIcon = menuButton.querySelector('i');

menuButton.addEventListener('click', function() {
    menuBar.classList.toggle('menu-none');
    menuButton.classList.toggle('menu-btn-none');
    
    if (menuBar.classList.contains('menu-none')) {
        menuIcon.classList.remove('fa-chevron-down');
        menuIcon.classList.add('fa-chevron-up');
    } else {
        menuIcon.classList.remove('fa-chevron-up');
        menuIcon.classList.add('fa-chevron-down');
    }
});

// theme
const themeToggleButton = document.querySelector('.theme-toggle-button');
const bodyElement = document.body;
const themeIcon = themeToggleButton.querySelector('i');

themeToggleButton.addEventListener('click', function() {
    bodyElement.classList.toggle('dark-theme');
    bodyElement.classList.toggle('light-theme');

    if (bodyElement.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleButton.prepend(themeIcon);
});

// Transition handler
function applyTransition(element, effect, callback, delay = 0) {
    element.classList.add(effect.out);
    setTimeout(() => {
        callback();
        element.classList.remove(effect.out);
        element.classList.add(effect.in);

        setTimeout(() => {
            element.classList.remove(effect.in);
        }, 500);
    }, 500 + delay);
}


// effect list
const effects = {
    fade: { in: "fade-in", out: "fade-out" },
    slide: { in: "slide-in", out: "slide-out" },
    slideX: { out: 'slide-out-left', in: 'slide-in-right' },
    slideY: { out: 'slide-out-up', in: 'slide-in-down' },
    zoom: { in: "zoom-in", out: "zoom-out" }
};

// Define the removeActive function
const removeActive = () => {
    let allTab = document.querySelectorAll('.tab');
    allTab.forEach(tab => {
        tab.classList.remove('tab-active');
    });
};

// Language loader
document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");
    
    let isExpanded = false;
    const toggleButton = document.getElementById("toggle-button");
    const aboutTextContainer = document.querySelector(".about-text-container .about-text");

    // Load and update content based on the selected language
    function loadContent(lang) {
        fetch(`locales/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                updateNavbar(data.navbar)
                updateHeader(data.header)
                updateAboutSection(data.about)
                updateSkillsSection(data.skills)
                applyTransition(document.querySelector("#Portfolio"), effects.fade, () => updatePortfolio(data.portfolio));
                applyTransition(document.querySelector("#Contact"), effects.fade, () => updateContactSection(data.contact));
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    // Update the Navbar
    function updateNavbar(navbar) {
        const navLinks = document.querySelectorAll("nav .nav-links li a");
        navLinks.forEach((link, index) => {
            applyTransition(link, effects.slideX, () => {
                link.innerText = navbar.links[index].text;
            }, index * 100);
        });

        const languageSelector = document.querySelector("nav #language-selector");
        applyTransition(languageSelector, effects.zoom, () => {
            const languageOptions = languageSelector.querySelectorAll("option");
            
            languageOptions.forEach((option, index) => {
                option.innerText = navbar.languageSelector.options[index].text;
            });
        }, 600);

    }

    // Update the Header
    function updateHeader(header) {
        applyTransition(document.querySelector(".header-left h1"), effects.slideY, () => {
            document.querySelector(".header-left h1").innerText = header.greeting;
        }, 0);

        applyTransition(document.querySelector(".header-left p"), effects.fade, () => {
            document.querySelector(".header-left p").innerText = header.description;
        }, 100);
        
        applyTransition(document.querySelectorAll(".header-left a")[0], effects.slideX, () => {
            document.querySelectorAll(".header-left a")[0].innerText = header.buttons[0].text;
        }, 250);
    
        applyTransition(document.querySelectorAll(".header-left a")[1], effects.slideX, () => {
            document.querySelectorAll(".header-left a")[1].innerText = header.buttons[1].text;
        }, 300);
    }

    // Update the About Section
    function updateAboutSection(about) {
        applyTransition(document.querySelector("#About h2"), effects.fade, () => {
            document.querySelector("#About h2").innerText = about.title;
        });
    
        const aboutCards = document.querySelectorAll(".about-card");
        aboutCards.forEach((card, index) => {
            applyTransition(card.querySelector("span i"), effects.fade, () => {
                card.querySelector("span i").className = about.cards[index].icon;
            }, index * 100);
    
            applyTransition(card.querySelector("h5"), effects.fade, () => {
                card.querySelector("h5").innerText = about.cards[index].title;
            }, index * 100 + 100);
    
            applyTransition(card.querySelector("small"), effects.fade, () => {
                card.querySelector("small").innerText = about.cards[index].description;
            }, index * 100 + 200);
        });
        
        applyTransition(document.querySelector(".about-container h3 ~ *"), effects.fade, () => {
            initializeToggleButton(about.paragraphs, about.paragraphs.slice(0, 2), about.expandButton);
        }, aboutCards.length * 100 + 300);

        applyTransition(document.querySelector(".about-container h3"), effects.fade, () => {
            document.querySelector(".about-container h3").innerText = about.subtitle;
        }, aboutCards.length * 100 + 300);

        applyTransition(document.querySelector(".about-container a:nth-of-type(1)"), effects.zoom, () => {
            document.querySelector(".about-container a:nth-of-type(1)").innerText = about.ctaButton.text;
        }, aboutCards.length * 100 + 300);
    }    

    // Initialize Toggle Button for the About Section
    function initializeToggleButton(paragraphs, visibleParagraphs, expandButton) {
        isExpanded = false;
        renderAboutText(paragraphs, visibleParagraphs, expandButton);

        toggleButton.onclick = () => toggleAboutText(paragraphs, visibleParagraphs, expandButton);
    }

    function renderAboutText(paragraphs, visibleParagraphs, expandButton) {
        aboutTextContainer.innerHTML = '';
        const paragraphsToShow = isExpanded ? paragraphs : visibleParagraphs;
        
        paragraphsToShow.forEach(paragraph => {
            const p = document.createElement('p');
            p.innerText = paragraph;
            aboutTextContainer.appendChild(p);
        });

        toggleButton.innerText = isExpanded 
            ? expandButton.expandFalse 
            : expandButton.expandTrue;
    }

    function toggleAboutText(paragraphs, visibleParagraphs, expandButton) {
        isExpanded = !isExpanded;
        renderAboutText(paragraphs, visibleParagraphs, expandButton);
    }

    // Update the Skills Section with Transitions
    function updateSkillsSection(skills) {
        applyTransition(document.querySelector("#Skills h2"), effects.fade, () => {
            document.querySelector("#Skills h2").innerText = skills.title;
        });

        applyTransition(document.querySelector("#Skills .skills-container .skills-right h3"), effects.fade, () => {
            document.querySelector("#Skills .skills-container .skills-right h3").innerText = skills.right.subtitle;
        }, 100);

        const skillsCards = document.querySelectorAll(".skills-left .skill-card");
        skillsCards.forEach((card, index) => {
            applyTransition(card.querySelector("span i"), effects.fade, () => {
                card.querySelector("span i").className = skills.left.cards[index].icon;
            }, index * 100);

            applyTransition(card.querySelector("h5"), effects.fade, () => {
                card.querySelector("h5").innerText = skills.left.cards[index].title;
            }, index * 100 + 100);

            applyTransition(card.querySelector("small"), effects.fade, () => {
                card.querySelector("small").innerText = skills.left.cards[index].description;
            }, index * 100 + 200);
        });

        const skillsRight = document.querySelector(".skills-right .skill-btn-container");
        skillsRight.innerHTML = "";

        skills.right.skillBtn.forEach((skill) => {
            const skillElement = document.createElement("h5");
            skillElement.className = "btn btn-white skill-btn";
            
            const iconElement = document.createElement("i");
            iconElement.className = skill.icon;
            skillElement.appendChild(iconElement);
            
            skillElement.innerHTML += skill.title;
            skillsRight.appendChild(skillElement);

            // applyTransition(skillElement, effects.fade, () => {}, randomizer(0, 1000));
        });
    }

    // Update the Portfolio Section
    function updatePortfolio(portfolio) {
        const portfolioSection = document.querySelector("#Portfolio");
        
        // Update title
        applyTransition(portfolioSection.querySelector("h2"), effects.fade, () => {
            portfolioSection.querySelector("h2").innerText = portfolio.title;
        });
        
        // Update description
        applyTransition(portfolioSection.querySelector("p"), effects.fade, () => {
            portfolioSection.querySelector("p").innerText = portfolio.description;
        }, 100);
        
        // Update tabs
        const tabsContainer = portfolioSection.querySelector(".portfolio-tabs");
        tabsContainer.innerHTML = "";
        
        portfolio.tabs.forEach((tab, index) => {
            const tabElement = document.createElement("div");
            tabElement.className = `tab btn btn-sm btn-white ${tab.class || ""}`;
            tabElement.dataset.name = tab.name;
            tabElement.innerText = tab.text;
            
            // Add event listener to each tab
            tabElement.addEventListener('click', (event) => {
                removeActive();
                tabElement.classList.add('tab-active');
                
                let filterName = event.target.getAttribute('data-name');
                allproject.forEach(project => {
                    let projectName = project.getAttribute('data-name');
                    if (projectName === filterName || filterName === 'star') {
                        project.style.display = 'flex';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
            
            applyTransition(tabElement, effects.slideY, () => {
                tabsContainer.appendChild(tabElement);
            }, index * 100);
        });
        
        // Update projects
        const projectsContainer = portfolioSection.querySelector(".portfolio-projects");
        projectsContainer.innerHTML = ""; // Clear existing projects
        
        portfolio.projects.forEach((project, index) => {
            const projectCard = document.createElement("div");
            projectCard.className = `project card`;
            projectCard.dataset.name = project.name;
            
            // Project image
            const imgElement = document.createElement("img");
            imgElement.src = project.image;
            imgElement.alt = project.title;
            projectCard.appendChild(imgElement);
            
            // Project title
            const titleElement = document.createElement("h4");
            titleElement.innerText = project.title;
            projectCard.appendChild(titleElement);
            
            // Project description
            const descElement = document.createElement("p");
            descElement.innerText = project.description;
            projectCard.appendChild(descElement);
            
            // Project action buttons
            const actionContainer = document.createElement("div");
            actionContainer.className = "project-action";
            project.links.forEach(link => {
                const linkElement = document.createElement("a");
                linkElement.href = link.href;
                linkElement.className = link.class;
                linkElement.target = `_blank`;
                linkElement.innerText = link.text;
                actionContainer.appendChild(linkElement);
            });
            projectCard.appendChild(actionContainer);
            
            applyTransition(projectCard, effects.fade, () => {
                projectsContainer.appendChild(projectCard);
            }, index * 200);
        });
    
        // Reinitialize allTab and allproject after updating portfolio
        let allTab = document.querySelectorAll('.tab');
        let allproject = document.querySelectorAll('.project');
    
        // Reattach event listeners
        allTab.forEach(tab => {
            tab.addEventListener('click', (event) => {
                tab.classList.add('tab-active');
                
                let filterName = event.target.getAttribute('data-name');
                allproject.forEach(project => {
                    let projectName = project.getAttribute('data-name');
                    if (projectName === filterName || filterName === 'star') {
                        project.style.display = 'flex';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }    
    
    // Update the Contact Section
    function updateContactSection(contact) {
        document.querySelector("#Contact h2").innerText = contact.title;
        document.querySelector("#Contact p").innerText = contact.description;
    
        const form = document.querySelector("#Contact form");
        form.innerHTML = '';
    
        // Create input elements
        contact.form.inputs.forEach(inputData => {
            const inputElement = document.createElement('input');
            inputElement.type = inputData.type;
            inputElement.placeholder = inputData.placeholder;
            inputElement.name = inputData.name;
            if (inputData.required) {
                inputElement.required = true;
            }
            applyTransition(inputElement, effects.fade, () => {
                form.appendChild(inputElement);
            });
        });
    
        // Create textarea element
        const textareaElement = document.createElement('textarea');
        textareaElement.placeholder = contact.form.textarea.placeholder;
        textareaElement.name = contact.form.textarea.name;
        if (contact.form.textarea.required) {
            textareaElement.required = true;
        }
        applyTransition(textareaElement, effects.fade, () => {
            form.appendChild(textareaElement);
        });
    
        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = contact.form.submitButton.class;
        submitButton.innerText = contact.form.submitButton.text;
        applyTransition(submitButton, effects.fade, () => {
            form.appendChild(submitButton);
        });
    }    

    // Initialize the language selector
    languageSelector.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        loadContent(selectedLang);
    });

    // Load default language
    loadContent("en-EN");
});
