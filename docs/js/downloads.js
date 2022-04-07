const link = document.querySelector('#download-link');
const btn = document.querySelector('#download-btn');

link.addEventListener('click', (e) => {
    e.preventDefault();
    downloadUsers();
})

btn.addEventListener('click', () => alert('good btn'))

function downloadUsers(){
    setTimeout(() => {
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', './../../export-telechargements.csv');
        downloadLink.setAttribute('download', 'utilisateurs.csv');
        document.querySelector('body').appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
    }, 2000);
}
