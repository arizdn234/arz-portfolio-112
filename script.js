window.addEventListener('load',()=>{
    let allTab = document.querySelectorAll('.tab');
    let allproject = document.querySelectorAll('.project');


    // remove tab active
    const removeActive =()=> allTab.forEach(tab=>{
        tab.classList.remove('tab-active');
    })

    allTab.forEach(tab=>{
        // add tab active
        tab.addEventListener('click',(event)=>{
            removeActive();
            tab.classList.add('tab-active');
        
        
            let filterName = event.target.getAttribute('data-name');

            allproject.forEach(project=>{
                let projectName = project.getAttribute('data-name');
                if ((projectName == filterName) || filterName == 'All'){
                    project.style.display = 'block';
                    project.style.display = 'flex'; 
                    project.style.gap = '0.8rem';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});

// nav scroll
window.addEventListener('scroll',()=>{
    let nav = document.querySelector('nav');

    nav.classList.toggle('nav-scroll', window.scrollY > 0);
});

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

// menu bar
let menuBar = document.querySelector('.menu-bar');
let menuButton = document.querySelector('.menu-button');

menuButton.addEventListener('click',()=>{
    menuBar.classList.toggle('menu-none')
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
                applyTransition(document.querySelector("#Skills"), effects.fade, () => updateSkillsSection(data.skills));
                applyTransition(document.querySelector("#Portfolio"), effects.fade, () => updatePortfolio(data.portfolio));
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

    // Update the Skills Section
    function updateSkillsSection(skills) {
        document.querySelector("#Skills h2").innerText = skills.title;
        document.querySelector("#Skills .skills-container .skills-right h3").innerText = skills.right.subtitle;

        const skillsCards = document.querySelectorAll(".skills-left .skill-card");
        skillsCards.forEach((card, index) => {
            card.querySelector("span i").className = skills.left.cards[index].icon;
            card.querySelector("h5").innerText = skills.left.cards[index].title;
            card.querySelector("small").innerText = skills.left.cards[index].description;
        });

        const skillsRight = document.querySelector(".skills-right .skill-btn-container");
        skillsRight.innerHTML = "";
        skills.right.skillBtn.forEach(skill => {
            const skillElement = document.createElement("h5");
            skillElement.className = "btn btn-white skill-btn";
            const iconElement = document.createElement("i");
            iconElement.className = skill.icon;
            skillElement.appendChild(iconElement);
            skillElement.innerHTML += skill.title;
            skillsRight.appendChild(skillElement);
        });
    }

    // Update the Portfolio Section
    function updatePortfolio(portfolio) {
        document.querySelector("#Portfolio h2").innerText = portfolio.title;
        document.querySelector("#Portfolio p").innerText = portfolio.description;
    }

    // Initialize the language selector
    languageSelector.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        loadContent(selectedLang);
    });

    // Load default language
    loadContent("en-EN");
});
