document.addEventListener('DOMContentLoaded', function() {
    const subscribeButton = document.getElementById('subscribeButton');
    let subscribed = false;

    subscribeButton.addEventListener('click', function() {
        subscribed = !subscribed; // Toggle subscription status
        if (subscribed) {
            subscribeButton.textContent = 'Subscribed';
            subscribeButton.style.backgroundColor = 'green';
        } else {
            subscribeButton.textContent = 'Subscribe';
            subscribeButton.style.backgroundColor = '#00ff00';
        }
    });
});