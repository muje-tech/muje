document.addEventListener('DOMContentLoaded', function() {
    // ... (Authentication, Upload, and Display Logic) ...
    // Video Player Integration using Video.js
    function initVideoPlayer(videoElement) {
        videojs(videoElement, {
            controls: true,
            preload: 'auto',
            fluid: true,
        });
    }

    // Example: After adding a video item
    const videoItem = document.createElement('div');
    videoItem.classList.add('video-item');
    videoItem.innerHTML = `
        <h3>${title}</h3>
        <video class="video-js vjs-default-skin" controls src="${videoURL}"></video>
        <div class="video-details">
            <p>${description}</p>
            <p>Category: ${category}</p>
            <button class="like-button">Like</button> <span class="like-count">0</span>
        </div>
        <div class="comments-section">
            <textarea placeholder="Add a comment"></textarea>
            <button class="comment-button">Comment</button>
            <div class="comments"></div>
        </div>
    `;
    videoList.appendChild(videoItem);
    initVideoPlayer(videoItem.querySelector('video')); // Initialize Video.js
    // ... (Comments, Likes, and other logic) ...
});