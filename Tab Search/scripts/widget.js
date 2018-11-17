
document.onload = function() {
    console.log('as');
    document.getElementById('tab-search-input').focus();

};

window.addEventListener('message', function(event) {
    console.log(event);
});
