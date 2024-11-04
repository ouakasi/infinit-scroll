const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

let ready = false;
let imagesLoaded = 0
let totalImages = 0;

//Unsplash API url
const count = 30;
const apiKey = "J0oVcgKNEfys8rA0dYHBUZfSCHMJBnabvcXuuTQoY50";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper function to set attribute of elements
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//Creates Elements for Link & photo, Add to the DOM
function displayPhoto() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //creat <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
            'href': photo.links.html,
            'target': '_blank'
        });

        //Create <img> element to add to the image container
        const image = document.createElement('img');
        setAttribute(image, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        });

        //Event listener to check when each image is loaded
        image.addEventListener('load', imageLoaded);
        //put <img> inside the <a> element
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash Api

async function getPhotos() {
    try {
        ready = true;
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhoto();
    } catch (error) {
        console.log("ERROR",error);
        
    }
}

//Check to see if window scrolls near bottom, load new images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && ready){
        ready = false;
        getPhotos();
        
        
    }
})
//Load data

getPhotos();
