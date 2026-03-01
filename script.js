document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animated hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const speed = 200; // Lower is faster

                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 1.0 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Dynamic Open/Closed Status ---
    function updateStatus() {
        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');

        // India Timezone Adjustment (IST is UTC+5:30)
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour + currentMinute / 60;

        const openTime = 8.5; // 8:30 AM
        const closeTime = 21.0; // 9:00 PM

        if (currentTime >= openTime && currentTime < closeTime) {
            dot.className = 'status-dot open';
            text.innerText = 'Open Now';
            text.style.color = '#2ecc71';
        } else {
            dot.className = 'status-dot closed';
            text.innerText = 'Closed Now';
            text.style.color = '#e74c3c';
        }
    }
    updateStatus();
    setInterval(updateStatus, 60000); // Update every minute

    // --- Form Validation & Submission ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation feedback
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (name && phone) {
            formStatus.innerText = 'Sending...';
            formStatus.style.color = 'var(--primary-color)';

            // Simulate form submission delay
            setTimeout(() => {
                formStatus.innerText = 'Thank you! Your request has been sent successfully.';
                formStatus.style.color = '#2ecc71';
                contactForm.reset();
            }, 1500);
        }
    });

    // --- Smooth Scroll for CTA Buttons ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Colour Collection Logic ---
    const colours = [
        { id: 1, name: "Regal Maroon", hex: "#800000", tags: ["trending", "dark", "interior"] },
        { id: 2, name: "Crimson Tide", hex: "#DC143C", tags: ["trending", "dark", "exterior"] },
        { id: 3, name: "Pearl White", hex: "#FDFDFD", tags: ["light", "interior"] },
        { id: 4, name: "Ivory Silk", hex: "#FFFFF0", tags: ["light", "interior"] },
        { id: 5, name: "Royal Gold", hex: "#FFD700", tags: ["trending", "interior"] },
        { id: 6, name: "Midnight Blue", hex: "#191970", tags: ["dark", "exterior"] },
        { id: 7, name: "Sky Breeze", hex: "#87CEEB", tags: ["light", "interior"] },
        { id: 8, name: "Forest Green", hex: "#228B22", tags: ["dark", "exterior"] },
        { id: 9, name: "Sandy Shore", hex: "#F4A460", tags: ["light", "exterior"] },
        { id: 10, name: "Terracotta", hex: "#E2725B", tags: ["trending", "exterior"] },
        { id: 11, name: "Soft Lilac", hex: "#E6E6FA", tags: ["light", "interior"] },
        { id: 12, name: "Slate Grey", hex: "#708090", tags: ["dark", "exterior"] },
        { id: 13, name: "Ocean Teal", hex: "#008080", tags: ["trending", "interior"] },
        { id: 14, name: "Warm Honey", hex: "#FFB000", tags: ["trending", "interior"] },
        { id: 15, name: "Cool Mint", hex: "#F5FFFA", tags: ["light", "interior"] },
        { id: 16, name: "Charcoal", hex: "#36454F", tags: ["dark", "exterior"] },
        { id: 17, name: "Dusty Rose", hex: "#DCAE96", tags: ["light", "interior"] },
        { id: 18, name: "Azure Mist", hex: "#F0FFFF", tags: ["light", "interior"] },
        { id: 19, name: "Burgundy", hex: "#800020", tags: ["dark", "interior"] },
        { id: 20, name: "Ochre Earth", hex: "#CC7722", tags: ["trending", "exterior"] },
        { id: 21, name: "Olive Grove", hex: "#808000", tags: ["dark", "exterior"] },
        { id: 22, name: "Beige Bliss", hex: "#F5F5DC", tags: ["light", "interior"] },
        { id: 23, name: "Plum Deep", hex: "#673147", tags: ["dark", "interior"] },
        { id: 24, name: "Coral Spark", hex: "#FF7F50", tags: ["trending", "interior"] },
        { id: 25, name: "Mist Grey", hex: "#DCDCDC", tags: ["light", "interior"] },
        { id: 26, name: "Deep Navy", hex: "#000080", tags: ["dark", "exterior"] },
        { id: 27, name: "Apricot", hex: "#FBCEB1", tags: ["light", "interior"] },
        { id: 28, name: "Sage", hex: "#BCB88A", tags: ["light", "exterior"] },
        { id: 29, name: "Espresso", hex: "#3E2723", tags: ["dark", "interior"] },
        { id: 30, name: "Turquoise", hex: "#40E0D0", tags: ["trending", "interior"] },
        { id: 31, name: "Garnet Red", hex: "#730800", tags: ["dark", "interior"] },
        { id: 32, name: "Salmon", hex: "#FA8072", tags: ["trending", "interior"] },
        { id: 33, name: "Lavender", hex: "#967BB6", tags: ["light", "interior"] },
        { id: 34, name: "Pine", hex: "#01796F", tags: ["dark", "exterior"] },
        { id: 35, name: "Cream", hex: "#FFFDD0", tags: ["light", "interior"] },
        { id: 36, name: "Saffron", hex: "#F4C430", tags: ["trending", "interior"] },
        { id: 37, name: "Mauve", hex: "#E0B0FF", tags: ["light", "interior"] },
        { id: 38, name: "Rust", hex: "#B7410E", tags: ["dark", "exterior"] },
        { id: 39, name: "Vanilla", hex: "#F3E5AB", tags: ["light", "interior"] },
        { id: 40, name: "Cobalt", hex: "#0047AB", tags: ["trending", "exterior"] },
    ];

    let userPalette = [];
    const colourGrid = document.getElementById('colourGrid');
    const colourSearch = document.getElementById('colourSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const paletteList = document.getElementById('paletteList');
    const clearPaletteBtn = document.getElementById('clearPalette');
    const modal = document.getElementById('colourModal');
    const closeModal = document.querySelector('.close-modal');
    let activeColour = null;

    // Render Colour Grid
    function renderColours(filter = 'all', search = '') {
        colourGrid.innerHTML = '';
        const filteredColours = colours.filter(c => {
            const matchesFilter = filter === 'all' || c.tags.includes(filter);
            const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        filteredColours.forEach(c => {
            const card = document.createElement('div');
            card.className = 'colour-card';
            card.innerHTML = `
                <div class="colour-swatch" style="background-color: ${c.hex}"></div>
                <div class="colour-info-overlay">
                    <span>${c.name}</span>
                    <span>${c.hex}</span>
                </div>
            `;
            card.addEventListener('click', () => openModal(c));
            colourGrid.appendChild(card);
        });
    }

    // Modal Logic
    function openModal(colour) {
        activeColour = colour;
        document.getElementById('modalPreview').style.backgroundColor = colour.hex;
        document.getElementById('modalName').innerText = colour.name;
        document.getElementById('modalHex').innerText = colour.hex;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Palette Management
    function updatePaletteUI() {
        paletteList.innerHTML = '';
        if (userPalette.length === 0) {
            paletteList.innerHTML = '<p class="empty-msg">No colours added yet.</p>';
            return;
        }

        userPalette.forEach((c, index) => {
            const item = document.createElement('div');
            item.className = 'palette-item';
            item.innerHTML = `
                <div class="swatch-sm" style="background-color: ${c.hex}"></div>
                <div class="name">${c.name}</div>
                <button class="remove-btn" onclick="removeFromPalette(${index})"><i class="fas fa-times"></i></button>
            `;
            paletteList.appendChild(item);
        });
    }

    window.addToPalette = (colour) => {
        if (!userPalette.find(c => c.id === colour.id)) {
            userPalette.push(colour);
            updatePaletteUI();
        }
    };

    window.removeFromPalette = (index) => {
        userPalette.splice(index, 1);
        updatePaletteUI();
    };

    clearPaletteBtn.addEventListener('click', () => {
        userPalette = [];
        updatePaletteUI();
    });

    document.getElementById('addToPaletteModal').addEventListener('click', () => {
        if (activeColour) {
            addToPalette(activeColour);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });



    // Controls Logic
    colourSearch.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderColours(activeFilter, e.target.value);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderColours(btn.dataset.filter, colourSearch.value);
        });
    });


    function savePalette() {
        localStorage.setItem('mrtraders_palette', JSON.stringify(userPalette));
    }

    function loadPalette() {
        const saved = localStorage.getItem('mrtraders_palette');
        if (saved) {
            userPalette = JSON.parse(saved);
            updatePaletteUI();
        }
    }

    // Wrap the existing palette push/splice to save
    const originalAddToPalette = window.addToPalette;
    window.addToPalette = (colour) => {
        if (!userPalette.find(c => c.id === colour.id)) {
            userPalette.push(colour);
            updatePaletteUI();
            savePalette();
        }
    };

    const originalRemoveFromPalette = window.removeFromPalette;
    window.removeFromPalette = (index) => {
        userPalette.splice(index, 1);
        updatePaletteUI();
        savePalette();
    };

    clearPaletteBtn.addEventListener('click', () => {
        userPalette = [];
        updatePaletteUI();
        savePalette();
    });

    loadPalette();

    // Initial Render
    renderColours();
});
