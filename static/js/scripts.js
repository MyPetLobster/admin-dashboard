// Sidebar link hover effect
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
sidebarLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        const icon = link.querySelector('svg');
        icon.style.stroke = 'white';
        icon.style.strokeWidth = '4';
        if (icon.classList.contains('do-fill')) {
            icon.style.fill = 'white';
        }
        const text = link.querySelector('p');
        text.style.color = 'white';
    });
    link.addEventListener('mouseout', () => {
        const icon = link.querySelector('svg');
        icon.style.stroke = 'rgb(28, 43, 52)';
        icon.style.strokeWidth = '3';
        if (icon.style.fill) {
            icon.style.fill = 'rgb(28, 43, 52)';
        }
        const text = link.querySelector('p');
        text.style.color = 'rgb(28, 43, 52)';
    });
});

// Sidebar collapse effect
const heroImg = document.querySelector('.logo-image');
heroImg.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed-sidebar');
    const sidebarText = document.querySelectorAll('.sidebar ul li p');
    sidebarText.forEach(text => {
        text.classList.toggle('collapsed-text');
    });
    const logo = document.querySelector('.hero-container');
    logo.classList.toggle('collapsed-logo');
});

// Sidebar current page identifier
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebarLinks.forEach(otherLink => {
            otherLink.parentElement.classList.remove('current-page');
        });
        link.parentElement.classList.add('current-page');
    });
});


// Logo hover effect
const logoDiv = document.querySelector('.hero-container');
const logo = document.querySelector('.logo-image');
logoDiv.addEventListener('mouseover', () => {
    logo.src = 'static/images/cory-logo-v2-white.png';
});
logoDiv.addEventListener('mouseout', () => {
    logo.src = 'static/images/cory-logo-v2-darkblue.png';
});


// Search bar effects
const searchInput = document.querySelector('.text-input');
searchInput.addEventListener('focus', () => {
    searchInput.classList.add('dark-text');
    searchInput.parentElement.style.backgroundColor = '#778d97';
    searchInput.parentElement.style.border = '1px solid #1c2b34';
    searchInput.previousElementSibling.style.fill = '#1c2b34';
    searchInput.previousElementSibling.style.stroke = '#1c2b34';
});
searchInput.addEventListener('blur', () => {
    searchInput.classList.remove('dark-text');
    searchInput.parentElement.style.backgroundColor = '#c5d0db';
    searchInput.parentElement.style.border = '1px solid #778d97';
    searchInput.previousElementSibling.style.fill = '#778d97';
    searchInput.previousElementSibling.style.stroke = '#778d97';

});


// Project card effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const datePara = card.querySelector('.project-card-title p');
    const dataParaTextContent = datePara.textContent;
    card.addEventListener('mouseover', () => {
        const colorThief = new ColorThief();
        const image = card.querySelector('.project-card-image-div img');
        const color = colorThief.getColor(image);
        const invertedColor = invertColor(...color);
        const imageDiv = card.querySelector('.project-card-image-div');
        imageDiv.style.transform = 'translateY(0)';
        datePara.style.color = invertedColor;
        datePara.style.background = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6)`;
        datePara.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.3)';
        datePara.textContent = 'View Project';
        datePara.style.zIndex = '2';
        datePara.style.cursor = 'pointer';
        datePara.addEventListener('mouseover', () => {
            datePara.style.fontWeight = 'bold';
        });
        datePara.addEventListener('mouseout', () => {
            datePara.style.fontWeight = 'normal';
        });
        datePara.addEventListener('click', () => {
            const projectLink = card.querySelector('.project-link-hidden').textContent;
            window.open(projectLink, '_blank');
        });
    });
    card.addEventListener('mouseout', () => {
        const imageDiv = card.querySelector('.project-card-image-div');
        imageDiv.style.transform = 'translateY(-100%)';
        datePara.style.background = 'transparent';
        datePara.style.boxShadow = 'none';
        datePara.textContent = dataParaTextContent;
        datePara.style.zIndex = '0';
        datePara.style.cursor = 'default';
        datePara.style.color = 'rgb(28, 43, 52)';
        datePara.removeEventListener('click', () => {});
        datePara.removeEventListener('mouseover', () => {});
        datePara.removeEventListener('mouseout', () => {});
    });

    // Mobile project card effects
    let imageDisplayed = false;
    const imageDiv = card.querySelector('.project-card-image-div');

    card.addEventListener('touchstart', (e) => {
        e.preventDefault();

        if (!imageDisplayed) {
            imageDiv.style.transform = 'translateY(0)';
            datePara.style.background = 'rgba(0, 0, 0, 0.6)';
            datePara.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.3)';
            datePara.textContent = 'View Project';
            datePara.style.zIndex = '2';
            datePara.style.cursor = 'pointer';
            datePara.addEventListener('click', openProjectLink);
        } else {
            imageDiv.style.transform = 'translateY(-100%)';
            datePara.style.background = 'transparent';
            datePara.style.boxShadow = 'none';
            datePara.textContent = dataParaTextContent;
            datePara.style.zIndex = '0';
            datePara.style.cursor = 'default';
            datePara.style.color = 'rgb(28, 43, 52)';
            datePara.removeEventListener('click', openProjectLink);
        }

        imageDisplayed = !imageDisplayed;
    });

    // Retrieve project link from hidden html element and open it in a new tab
    function openProjectLink() {
        const projectLink = card.querySelector('.project-link-hidden').textContent;
        window.open(projectLink, '_blank');
    }
});

// Invert the color of a given RGB(A) color
function invertColor() {
    // Extract RGB(A) values from arguments, validate input
    const rgbValues = Array.from(arguments).join(',').match(/(-?[0-9\.]+)/g);
    if (!rgbValues || rgbValues.length < 3 || rgbValues.length > 4) {
        throw new Error('Invalid color input');
    }

    // Invert RGB values
    const inverted = rgbValues.map((value, index) => {
        if (index < 3) {
            return 255 - value;
        } else { 
            return Math.max(0, Math.min(1, 1 - value));
        }
    });

    // Return RGB string
    const colorType = inverted.length === 3 ? 'rgb' : 'rgba';
    return `${colorType}(${inverted.join(', ')})`;
}


// Mobile styling
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 1200) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('collapsed-sidebar');
        const sidebarText = document.querySelectorAll('.sidebar ul li p');
        sidebarText.forEach(text => {
            text.classList.add('collapsed-text');
        });
        const logo = document.querySelector('.hero-container');
        logo.classList.add('collapsed-logo');
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 1200) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('collapsed-sidebar');
        const sidebarText = document.querySelectorAll('.sidebar ul li p');
        sidebarText.forEach(text => {
            text.classList.add('collapsed-text');
        });
        const logo = document.querySelector('.hero-container');
        logo.classList.add('collapsed-logo');
    } else {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('collapsed-sidebar');
        const sidebarText = document.querySelectorAll('.sidebar ul li p');
        sidebarText.forEach(text => {
            text.classList.remove('collapsed-text');
        });
        const logo = document.querySelector('.hero-container');
        logo.classList.remove('collapsed-logo');
    }
});