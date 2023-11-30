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