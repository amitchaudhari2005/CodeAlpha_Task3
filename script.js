const placeholderImages = [
    { id: 1, class: 'placeholder-1', title: 'Mountain Sunset', category: 'nature', date: 'Today', tags: ['nature', 'mountain', 'sunset'] },
    { id: 2, class: 'placeholder-2', title: 'Modern Building', category: 'architecture', date: 'Yesterday', tags: ['architecture', 'modern', 'building'] },
    { id: 3, class: 'placeholder-3', title: 'Abstract Art', category: 'art', date: '2 days ago', tags: ['art', 'abstract', 'green'] },
    { id: 4, class: 'placeholder-4', title: 'Beach Sunset', category: 'travel', date: 'Last week', tags: ['travel', 'beach', 'sunset'] },
    { id: 5, class: 'placeholder-5', title: 'City Skyline', category: 'architecture', date: 'Last week', tags: ['architecture', 'city', 'skyline'] },
    { id: 6, class: 'placeholder-6', title: 'Portrait', category: 'people', date: '2 weeks ago', tags: ['people', 'portrait'] },
    { id: 7, class: 'placeholder-7', title: 'Autumn Forest', category: 'nature', date: 'Last month', tags: ['nature', 'forest', 'autumn'] },
    { id: 8, class: 'placeholder-8', title: 'Spring Meadow', category: 'nature', date: 'Last month', tags: ['nature', 'spring', 'meadow'] },
    { id: 9, class: 'placeholder-9', title: 'Ocean View', category: 'travel', date: '2 months ago', tags: ['travel', 'ocean'] }
];

const gridView = document.getElementById('grid-view');
const masonryView = document.getElementById('masonry-view');
const carouselView = document.getElementById('carousel-view');
const gridViewBtn = document.getElementById('grid-view-btn');
const masonryViewBtn = document.getElementById('masonry-view-btn');
const carouselViewBtn = document.getElementById('carousel-view-btn');
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const cameraBtn = document.getElementById('camera-btn');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDate = document.getElementById('lightbox-date');
const closeLightbox = document.getElementById('close-lightbox');
const prevImage = document.getElementById('prev-image');
const nextImage = document.getElementById('next-image');
const lightboxLikeBtn = document.getElementById('lightbox-like-btn');
const lightboxShareBtn = document.getElementById('lightbox-share-btn');
const shareModal = document.getElementById('share-modal');
const closeShare = document.getElementById('close-share');
const cameraModal = document.getElementById('camera-modal');
const closeCamera = document.getElementById('close-camera');
const cameraFeed = document.getElementById('camera-feed');
const takePhoto = document.getElementById('take-photo');
const switchCamera = document.getElementById('switch-camera');

let currentImageIndex = 0;
let userImages = [];

function initGallery() {
    placeholderImages.forEach(image => addImageToGallery(image));
}

function addImageToGallery(image) {
    const gridItem = createGalleryItem(image, 'grid');
    const masonryItem = createGalleryItem(image, 'masonry');
    const carouselItem = createGalleryItem(image, 'carousel');

    [gridItem, masonryItem, carouselItem].forEach(item => item.classList.add('fade-in'));

    gridView.appendChild(gridItem);
    masonryView.appendChild(masonryItem);
    carouselView.appendChild(carouselItem);

    setTimeout(() => {
        gridItem.classList.remove('fade-in');
        masonryItem.classList.remove('fade-in');
        carouselItem.classList.remove('fade-in');
    }, 600);
}

function createGalleryItem(image, viewType) {
    const item = document.createElement('div');
    item.tabIndex = 0;

    if (viewType === 'grid') {
        item.className = 'gallery-item';
    } else if (viewType === 'masonry') {
        item.className = 'masonry-item';
    } else if (viewType === 'carousel') {
        item.className = 'carousel-item flex-shrink-0 w-80';
    }

    item.dataset.id = image.id;
    item.dataset.category = image.category;

    const tagsHtml = image.tags
        ? `<div class="flex flex-wrap gap-1 mt-2">${image.tags.map(tag =>
            `<span class="tag-pill">${tag}</span>`).join('')}</div>`
        : '';

    let content = '';
    if (image.file) {
        content = `
            <div class="relative overflow-hidden ${viewType === 'carousel' ? 'rounded-xl' : 'rounded-lg'}">
                <img src="${image.url}" class="w-full h-full object-cover ${viewType === 'grid' ? 'aspect-square' : ''}" alt="${image.title}">
                <div class="gallery-overlay absolute inset-0 flex flex-col justify-end p-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-white font-medium">${image.title}</h3>
                            <p class="text-white text-opacity-70 text-sm">${image.category}</p>
                            ${tagsHtml}
                        </div>
                        <div class="flex gap-2">
                            <button class="like-btn p-1 text-white" aria-label="Like" tabindex="0">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="share-btn p-1 text-white" aria-label="Share" tabindex="0">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        content = `
            <div class="relative overflow-hidden ${viewType === 'carousel' ? 'rounded-xl' : 'rounded-lg'}">
                <div class="placeholder ${image.class} w-full ${viewType === 'grid' ? 'aspect-square' : 'h-64'} flex items-center justify-center">
                    <i class="fas fa-image text-white text-opacity-30 text-3xl"></i>
                </div>
                <div class="gallery-overlay absolute inset-0 flex flex-col justify-end p-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-white font-medium">${image.title}</h3>
                            <p class="text-white text-opacity-70 text-sm">${image.category}</p>
                            ${tagsHtml}
                        </div>
                        <div class="flex gap-2">
                            <button class="like-btn p-1 text-white" aria-label="Like" tabindex="0">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="share-btn p-1 text-white" aria-label="Share" tabindex="0">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    item.innerHTML = content;

    item.addEventListener('click', (e) => {
        if (e.target.closest('.like-btn') || e.target.closest('.share-btn')) return;
        openLightbox(image);
    });
    item.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !(e.target.closest('.like-btn') || e.target.closest('.share-btn'))) {
            openLightbox(image);
        }
    });

    const likeBtn = item.querySelector('.like-btn');
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(likeBtn, item);
    });

    const shareBtn = item.querySelector('.share-btn');
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openShareModal();
    });

    return item;
}

function toggleLike(button, item) {
    const icon = button.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    icon.classList.toggle('text-pink-500');
    button.setAttribute('aria-pressed', icon.classList.contains('fas'));

    if (icon.classList.contains('fas')) {
        if (item) item.classList.add('liked');
        showToast('Added to favorites!');
    } else {
        if (item) item.classList.remove('liked');
        showToast('Removed from favorites');
    }
}

function openLightbox(image) {
    const allImages = [...userImages, ...placeholderImages];
    currentImageIndex = allImages.findIndex(img => img.id === image.id);
    updateLightboxContent(image);
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        if (lightboxContent) lightboxContent.focus();
    }, 100);
}

function updateLightboxContent(image) {
    if (image.file) {
        lightboxContent.innerHTML = `
            <img src="${image.url}" class="w-full h-auto" alt="${image.title}">
        `;
    } else {
        lightboxContent.innerHTML = `
            <div class="${image.class} w-full aspect-video flex items-center justify-center">
                <i class="fas fa-image text-white text-opacity-30 text-5xl"></i>
            </div>
        `;
    }
    lightboxTitle.textContent = image.title;
    lightboxDate.textContent = image.date;
}

gridViewBtn.addEventListener('click', () => setActiveView('grid'));
masonryViewBtn.addEventListener('click', () => setActiveView('masonry'));
carouselViewBtn.addEventListener('click', () => setActiveView('carousel'));

function setActiveView(viewType) {
    gridView.classList.add('hidden');
    masonryView.classList.add('hidden');
    carouselView.classList.add('hidden');
    gridViewBtn.classList.remove('active');
    masonryViewBtn.classList.remove('active');
    carouselViewBtn.classList.remove('active');
    if (viewType === 'grid') {
        gridView.classList.remove('hidden');
        gridViewBtn.classList.add('active');
    } else if (viewType === 'masonry') {
        masonryView.classList.remove('hidden');
        masonryViewBtn.classList.add('active');
    } else if (viewType === 'carousel') {
        carouselView.classList.remove('hidden');
        carouselViewBtn.classList.add('active');
    }
}

browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleFileUpload(e.target.files));

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    handleFileUpload(e.dataTransfer.files);
});

function handleFileUpload(files) {
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) {
                showToast('Only image files are allowed');
                return;
            }
            const url = URL.createObjectURL(file);
            const image = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                file: file,
                url: url,
                title: file.name.split('.')[0],
                category: detectImageCategory(file.name),
                date: 'Just now',
                tags: generateTags(file.name)
            };
            userImages.push(image);
            addImageToGallery(image);
            showToast('Image uploaded successfully!');
        });
    }
}

function detectImageCategory(filename) {
    filename = filename.toLowerCase();
    if (filename.includes('nature') || filename.includes('landscape') || filename.includes('mountain') || filename.includes('forest')) {
        return 'nature';
    } else if (filename.includes('building') || filename.includes('architecture') || filename.includes('city') || filename.includes('urban')) {
        return 'architecture';
    } else if (filename.includes('art') || filename.includes('paint') || filename.includes('abstract')) {
        return 'art';
    } else if (filename.includes('travel') || filename.includes('vacation') || filename.includes('beach') || filename.includes('trip')) {
        return 'travel';
    } else if (filename.includes('people') || filename.includes('portrait') || filename.includes('person') || filename.includes('face')) {
        return 'people';
    } else {
        return 'other';
    }
}

function generateTags(filename) {
    const tags = [];
    filename = filename.toLowerCase();
    const category = detectImageCategory(filename);
    tags.push(category);
    if (filename.includes('sunset')) tags.push('sunset');
    if (filename.includes('beach')) tags.push('beach');
    if (filename.includes('mountain')) tags.push('mountain');
    if (filename.includes('forest')) tags.push('forest');
    if (filename.includes('city')) tags.push('city');
    if (filename.includes('portrait')) tags.push('portrait');
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    tags.push(colors[Math.floor(Math.random() * colors.length)]);
    return tags;
}

cameraBtn.addEventListener('click', openCameraModal);

function openCameraModal() {
    cameraModal.classList.remove('hidden');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                cameraFeed.srcObject = stream;
            })
            .catch(err => {
                console.error('Error accessing camera:', err);
                showToast('Could not access camera');
            });
    } else {
        showToast('Camera not supported on this device');
    }
}

closeCamera.addEventListener('click', () => {
    cameraModal.classList.add('hidden');
    if (cameraFeed.srcObject) {
        const tracks = cameraFeed.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        cameraFeed.srcObject = null;
    }
});

takePhoto.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = cameraFeed.videoWidth;
    canvas.height = cameraFeed.videoHeight;
    context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
        handleFileUpload([file]);
        closeCamera.click();
    }, 'image/jpeg');
});

prevImage.addEventListener('click', () => {
    const allImages = [...userImages, ...placeholderImages];
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    updateLightboxContent(allImages[currentImageIndex]);
});
nextImage.addEventListener('click', () => {
    const allImages = [...userImages, ...placeholderImages];
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    updateLightboxContent(allImages[currentImageIndex]);
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
});
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

lightboxLikeBtn.addEventListener('click', () => {
    toggleLike(lightboxLikeBtn);
});

lightboxShareBtn.addEventListener('click', openShareModal);

function openShareModal() {
    shareModal.classList.remove('hidden');
}
closeShare.addEventListener('click', () => {
    shareModal.classList.add('hidden');
});
shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.classList.add('hidden');
    }
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            prevImage.click();
        } else if (e.key === 'ArrowRight') {
            nextImage.click();
        }
    } else if (!shareModal.classList.contains('hidden') && e.key === 'Escape') {
        shareModal.classList.add('hidden');
    } else if (!cameraModal.classList.contains('hidden') && e.key === 'Escape') {
        closeCamera.click();
    }
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle text-green-400 mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 2500);
}

const categoryPills = document.querySelectorAll('.category-pill');
categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const category = pill.textContent.toLowerCase();
        filterGallery(category);
    });
});

function filterGallery(category) {
    const allItems = document.querySelectorAll('.gallery-item, .masonry-item, .carousel-item');
    allItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.style.display = 'none'; }, 250);
        }
    });
}

initGallery();
