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

// language loader
document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");
    const aboutTextContainer = document.querySelector(".about-text");
    const toggleButton = document.getElementById("toggle-button");

    let isExpanded = false;
    
    function loadContent(lang) {
        fetch(`locales/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                // Navbar
                // document.querySelector("nav .logo").innerText = data.navbar.logo;
                document.querySelector("nav .nav-links li:nth-child(1) a").innerText = data.navbar.links[0].text;
                document.querySelector("nav .nav-links li:nth-child(2) a").innerText = data.navbar.links[1].text;
                document.querySelector("nav .nav-links li:nth-child(3) a").innerText = data.navbar.links[2].text;
                document.querySelector("nav .nav-links li:nth-child(4) a").innerText = data.navbar.links[3].text;
                document.querySelector("nav .nav-links li:nth-child(5) a").innerText = data.navbar.links[4].text;
                document.querySelector("nav #language-selector option:nth-child(1)").innerText = data.navbar.languageSelector.options[0].text;
                document.querySelector("nav #language-selector option:nth-child(2)").innerText = data.navbar.languageSelector.options[1].text;
                
                // Header
                document.querySelector(".header-left h1").innerText = data.header.greeting;
                document.querySelector(".header-left p").innerText = data.header.description;
                
                document.querySelector(".header-left a:nth-of-type(1)").innerText = data.header.buttons[0].text;
                document.querySelector(".header-left a:nth-of-type(2)").innerText = data.header.buttons[1].text;

                // About Section
                document.querySelector("#About h2").innerText = data.about.title;
                
                // Cards
                const aboutCards = document.querySelectorAll(".about-card");
                for (let i = 0; i < aboutCards.length; i++) {
                    aboutCards[i].querySelector("span i").className = data.about.cards[i].icon;
                    aboutCards[i].querySelector("h5").innerText = data.about.cards[i].title;
                    aboutCards[i].querySelector("small").innerText = data.about.cards[i].description;
                }
                
                // About Section
                document.querySelector(".about-container h3").innerText = data.about.subtitle;
                
                // Clear existing paragraphs
                aboutTextContainer.innerHTML = '';

                const paragraphs = data.about.paragraphs;
                const visibleParagraphs = paragraphs.slice(0, 2);

                // Add visible paragraphs
                visibleParagraphs.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.innerText = paragraph;
                    aboutTextContainer.appendChild(p);
                });

                // Toggle Button Logic
                toggleButton.innerText = data.about.expandButton.expandFalse;
                toggleButton.addEventListener("click", () => {
                    aboutTextContainer.innerHTML = '';
                    if (isExpanded) {
                        visibleParagraphs.forEach(paragraph => {
                            const p = document.createElement('p');
                            p.innerText = paragraph;
                            aboutTextContainer.appendChild(p);
                        });
                        toggleButton.innerText = data.about.expandButton.expandFalse;
                    } else {
                        paragraphs.forEach(paragraph => {
                            const p = document.createElement('p');
                            p.innerText = paragraph;
                            aboutTextContainer.appendChild(p);
                        });
                        toggleButton.innerText = data.about.expandButton.expandTrue;
                    }
                    isExpanded = !isExpanded;
                });

                document.querySelector(".about-container a:nth-of-type(1)").innerText = data.about.ctaButton.text;
                
                // Skills
                document.querySelector("#Skills h2").innerText = data.skills.title;
                document.querySelector("#Skills .skills-container .skills-right h3").innerText = data.skills.right.subtitle;
                // skillsCards
                const skillsCards = document.querySelectorAll(".skills-left .skill-card");
                skillsCards.forEach((skillsCard, index) => {
                    skillsCard.querySelector("span i").className = data.skills.left.cards[index].icon;
                    skillsCard.querySelector("h5").innerText = data.skills.left.cards[index].title;
                    skillsCard.querySelector("small").innerText = data.skills.left.cards[index].description;
                });
                // skillsBtn
                const skillsRight = document.querySelector(".skills-right .skill-btn-container");
                data.skills.right.skillBtn.forEach(skill => {
                    // console.log(skill);
                    const skillElement = document.createElement("h5");
                    skillElement.className = "btn btn-white skill-btn";

                    const iconElement = document.createElement("i");
                    iconElement.className = skill.icon;

                    skillElement.appendChild(iconElement);
                    skillElement.innerHTML += skill.title;

                    skillsRight.appendChild(skillElement);
                });
                

            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    languageSelector.addEventListener("change", (e) => {
        const selectedLang = e.target.value;
        loadContent(selectedLang);
    });

    // Load default language
    loadContent("en-EN");
});
