// HTML Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let noOfImagesLoaded = 0;
let totalImges = 0;
let photosArray = [];

// Unsplash API

import apiKey from './apiKey.js';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if image is loaded, if done then log in cosole
function imageLoaded() {
    noOfImagesLoaded++;
    if (noOfImagesLoaded === totalImges) {
        ready = true;        
    }
    if (noOfImagesLoaded >= 3) {
        loader.hidden = true;
    }
}
// Helper function to set Attributes

const setAttributes = (item, attributes) => {
    for (const key in attributes) {
        item.setAttribute(key, attributes[key])
    }
}


// Create Elements for links and Photos, add to DOM

const displayPhotos = () => {
    noOfImagesLoaded = 0;
    totalImges = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Check when each img finish loading
        img.addEventListener('load', imageLoaded);

        // Nest <img> inside <a> elememt
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // console.log(error);
    }
}

// Check to see if scrolling near bottom of page, then load more photos
document.addEventListener('scroll', () => {
    if (window.innerWidth + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();