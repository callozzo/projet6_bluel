document.addEventListener('DOMContentLoaded', function() { 
    let modal = document.getElementById('modal1');
    let openModal = document.querySelector('.modal-button')

    openModal.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = 'flex';
    });

    window.addEventListener('click', function(event) {
        if(event.target ===modal) {
            modal.style.display = 'none';
        }
    })
})