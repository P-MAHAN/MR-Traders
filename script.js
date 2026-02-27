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

    document.getElementById('applyVisualizer').addEventListener('click', () => {
        alert(`Applying ${activeColour.name} to the virtual room!`);
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

    // =========================================================
    // AI PAINT VISUALIZER  –  TensorFlow.js + DeepLab v2
    // Runs entirely in-browser, no backend required.
    // =========================================================
    (() => {
        // --- DOM elements -------------------------------------------
        const roomBtns = document.querySelectorAll('.room-btn');
        const baseImage = document.getElementById('baseImage');
        const canvas = document.getElementById('visualizerCanvas');
        const ctx = canvas.getContext('2d');
        const opacitySlider = document.getElementById('opacitySlider');
        const resetBtn = document.getElementById('resetVisualizer');
        const compareBtn = document.getElementById('toggleComparison');
        const downloadBtn = document.getElementById('downloadDesign');
        const overlay = document.getElementById('loadingOverlay');
        const overlayMsg = document.getElementById('loadingMessage');

        // --- State --------------------------------------------------
        let model = null;   // cached DeepLab model (loaded once)
        let segMap = null;   // Uint8Array – class ID per pixel
        let origImgData = null;   // ImageData of the raw (resized) image
        let paintedImgData = null;  // ImageData with colour applied
        let selectedColor = null;   // hex string e.g. "#a34560"
        let isPainted = false;
        let isComparing = false;
        let currentRoom = 'living';

        // ADE20K class IDs that represent "wall" regions.
        // DeepLab (trained on ADE20K): class 0 = wall, class 4 = ceiling.
        // We paint class 0 (wall) and optionally class 9 (wall panel / painted surface).
        const WALL_CLASSES = new Set([0, 9]);

        // --- Helpers ------------------------------------------------
        const showOverlay = (msg) => {
            overlay.classList.remove('hidden');
            overlayMsg.textContent = msg;
        };
        const hideOverlay = () => overlay.classList.add('hidden');

        const hexToRgb = (hex) => {
            const n = parseInt(hex.replace('#', ''), 16);
            return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
        };

        // --- Load model (once, cached) ------------------------------
        const ensureModel = async () => {
            if (model) return model;
            showOverlay('Loading AI model weights… (approx. 10MB)');
            try {
                // v0.2.x signature: deeplab.load({ base, quantizationBytes })
                model = await deeplab.load({ base: 'ade20k', quantizationBytes: 2 });
            } catch (err) {
                console.error('DeepLab load error:', err);
                hideOverlay();
                let errMsg = 'Failed to load AI model.\n\n';
                if (window.location.protocol === 'file:') {
                    errMsg += '⚠️ You are opening this file locally (file:///). Browser security blocks AI features on local files.\n\n👉 PLEASE USE A LOCAL WEB SERVER (e.g. Live Server in VS Code) to run the visualizer.';
                } else {
                    errMsg += 'Check your internet connection and try refreshing.';
                }
                alert(errMsg);
                throw err;
            }
            return model;
        };

        // --- Load image as a Blob URL so canvas.getImageData() works ---
        // file:/// pages mark canvas as 'tainted' if images are loaded via <img src>,
        // but if we load the image data via fetch+createObjectURL the canvas stays clean.
        // NOTE: fetch() itself often fails on file:/// in modern browsers (CORS).
        const loadImageAsCORSSafe = (src) => new Promise((resolve, reject) => {
            fetch(src)
                .then(r => r.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    const img = new Image();
                    img.onload = () => resolve({ img, blobUrl });
                    img.onerror = () => { URL.revokeObjectURL(blobUrl); reject(new Error('Image decode failed')); };
                    img.src = blobUrl;
                })
                .catch(err => {
                    console.warn('Fetch failed (likely file:///), falling back to direct load:', err);
                    // Fallback to direct load (will likely result in tainted canvas if file:///)
                    const img = new Image();
                    img.onload = () => resolve({ img, blobUrl: src });
                    img.onerror = reject;
                    img.src = src;
                });
        });

        // --- Resize image to ≤ 513 px (DeepLab native size) --------
        const getResizedCanvas = (img, maxW = 513) => {
            const ratio = Math.min(1, maxW / img.naturalWidth);
            const w = Math.round(img.naturalWidth * ratio);
            const h = Math.round(img.naturalHeight * ratio);
            const oc = document.createElement('canvas');
            oc.width = w; oc.height = h;
            oc.getContext('2d').drawImage(img, 0, 0, w, h);
            return oc;
        };

        // --- Run AI segmentation ------------------------------------
        const runSegmentation = async () => {
            showOverlay('Detecting wall areas with AI…');
            try {
                const imageSrc = `visualizer_${currentRoom}.png`;
                const { img: safeImg, blobUrl } = await loadImageAsCORSSafe(imageSrc);
                baseImage.src = blobUrl;

                const resizedCanvas = getResizedCanvas(safeImg);
                const W = resizedCanvas.width;
                const H = resizedCanvas.height;
                const rCtx = resizedCanvas.getContext('2d');

                // Check for tainted canvas (common on file:///)
                try {
                    origImgData = rCtx.getImageData(0, 0, W, H);
                } catch (e) {
                    console.error('Canvas tainted:', e);
                    hideOverlay();
                    if (window.location.protocol === 'file:') {
                        alert('⚠️ Local File Restriction:\n\nBrowser security blocks AI segmentation when opening files directly (file:///).\n\nTo use the Paint Visualizer, please run this project on a local web server (e.g. click "Go Live" in VS Code).');
                    }
                    throw e;
                }


                // Run DeepLab segmentation
                const tensor = tf.browser.fromPixels(resizedCanvas);
                const result = await model.segment(tensor);
                tensor.dispose();
                segMap = result.segmentationMap; // Uint8Array, length = W*H


                // Size the canvas to match (CSS scales it to fill the container)
                canvas.width = W;
                canvas.height = H;

                // ----- Fallback: if WALL_CLASSES cover < 5% of pixels,
                //       use the most-common background class instead.
                const classCounts = {};
                for (let i = 0; i < segMap.length; i++) {
                    classCounts[segMap[i]] = (classCounts[segMap[i]] || 0) + 1;
                }
                const wallPixels = [...WALL_CLASSES].reduce((s, c) => s + (classCounts[c] || 0), 0);
                if (wallPixels / segMap.length < 0.05) {
                    // Pick the largest class that isn't floor(3), plant(5), furniture(7,15,19)
                    const skipClasses = new Set([3, 5, 7, 15, 19]);
                    const best = Object.entries(classCounts)
                        .filter(([c]) => !skipClasses.has(Number(c)))
                        .sort((a, b) => b[1] - a[1])[0];
                    if (best) WALL_CLASSES.add(Number(best[0]));
                }

                // Draw the original (unpainted) frame into canvas
                ctx.putImageData(origImgData, 0, 0);
                paintedImgData = null;
                isPainted = false;
                hideOverlay();
            } catch (err) {
                console.error('Segmentation error:', err);
                hideOverlay();
                alert('Wall detection failed. The image may have a CORS issue – try selecting a different room.');
            }
        };

        // --- Apply paint to wall pixels only ------------------------
        const applyPaint = (hex, opacity) => {
            if (!origImgData || !segMap) return;
            const { r: pr, g: pg, b: pb } = hexToRgb(hex);
            const src = origImgData.data;
            const out = new Uint8ClampedArray(src.length);
            const total = segMap.length;

            for (let i = 0; i < total; i++) {
                const si = i * 4;
                if (WALL_CLASSES.has(segMap[i])) {
                    // Blend: preserve texture/shadows by mixing with original
                    out[si] = Math.round(src[si] * (1 - opacity) + pr * opacity);
                    out[si + 1] = Math.round(src[si + 1] * (1 - opacity) + pg * opacity);
                    out[si + 2] = Math.round(src[si + 2] * (1 - opacity) + pb * opacity);
                    out[si + 3] = src[si + 3]; // keep original alpha
                } else {
                    out[si] = src[si];
                    out[si + 1] = src[si + 1];
                    out[si + 2] = src[si + 2];
                    out[si + 3] = src[si + 3];
                }
            }
            paintedImgData = new ImageData(out, canvas.width, canvas.height);
            ctx.putImageData(paintedImgData, 0, 0);
            isPainted = true;
        };

        // --- Room selector -------------------------------------------
        roomBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                roomBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentRoom = btn.dataset.room;
                selectedColor = null;
                isPainted = false;
                isComparing = false;
                compareBtn.textContent = 'Compare: OFF';
                baseImage.src = `visualizer_${currentRoom}.png`;

                baseImage.onload = async () => {
                    await ensureModel();
                    await runSegmentation();
                };
                // Handle cached images (already loaded before onload fires)
                if (baseImage.complete && baseImage.naturalWidth > 0) {
                    await ensureModel();
                    await runSegmentation();
                }
            });
        });

        // --- Opacity slider (re-blends only, no new inference) -------
        opacitySlider.addEventListener('input', (e) => {
            if (selectedColor && segMap) {
                applyPaint(selectedColor, parseFloat(e.target.value));
            }
        });

        // --- Global entry point (called by colour-collection modal) --
        window.applyColorToVisualizer = async (hex) => {
            await ensureModel();
            if (!segMap) await runSegmentation();
            selectedColor = hex;
            isComparing = false;
            compareBtn.textContent = 'Compare: OFF';
            applyPaint(hex, parseFloat(opacitySlider.value));
            document.getElementById('visualizer').scrollIntoView({ behavior: 'smooth' });
        };

        // --- Reset button --------------------------------------------
        resetBtn.addEventListener('click', () => {
            selectedColor = null;
            isPainted = false;
            isComparing = false;
            paintedImgData = null;
            opacitySlider.value = 0.6;
            compareBtn.textContent = 'Compare: OFF';
            if (origImgData) ctx.putImageData(origImgData, 0, 0);
        });

        // --- Compare toggle ------------------------------------------
        compareBtn.addEventListener('click', () => {
            isComparing = !isComparing;
            if (isComparing) {
                // Show original (before paint)
                if (origImgData) ctx.putImageData(origImgData, 0, 0);
                compareBtn.textContent = 'Compare: ON';
            } else {
                // Show painted version
                if (paintedImgData) {
                    ctx.putImageData(paintedImgData, 0, 0);
                } else if (origImgData) {
                    ctx.putImageData(origImgData, 0, 0);
                }
                compareBtn.textContent = 'Compare: OFF';
            }
        });

        // --- Download button -----------------------------------------
        downloadBtn.addEventListener('click', () => {
            if (!isPainted) {
                alert('Please apply a colour first before downloading your design!');
                return;
            }
            const link = document.createElement('a');
            link.download = `MR-Traders-Design-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });

        // --- Modal "Apply in Visualizer" button ----------------------
        document.getElementById('applyVisualizer').addEventListener('click', async () => {
            if (activeColour) {
                await applyColorToVisualizer(activeColour.hex);
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // --- Initial page load: load model + segment first room ------
        window.addEventListener('load', async () => {
            await ensureModel();
            if (baseImage.complete && baseImage.naturalWidth > 0) {
                await runSegmentation();
            } else {
                baseImage.onload = async () => await runSegmentation();
            }
        });
    })();





    // --- Palette localStorage persistence ---
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
