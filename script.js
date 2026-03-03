/* script.js */
const API_KEY = 'AIzaSyCUS3WY55emdoxiDlAx9rbIClMWpkBxsIM'; // 1. Put your key here
const player = new Plyr('#player');

// FUNCTION TO EXTRACT ID FROM URL AUTOMATICALLY
function extractId(input) {
    if (!input.includes('/')) return input;
    const regex = /\/d\/([a-zA-Z0-9_-]{25,})/;
    const match = input.match(regex);
    return match ? match[1] : input;
}

// DYNAMIC PLAYLIST LOADER
fetch('playlist.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('playlist-container');
        container.innerHTML = '';
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.tabIndex = 0; 
            div.innerText = item.title;
            
            div.onclick = () => {
                const cleanId = extractId(item.id);
                playVideo(cleanId, item.subs);
            };
            
            div.onkeydown = (e) => { if(e.key === "Enter") div.onclick(); };
            container.appendChild(div);
        });
    });

function playVideo(fileId, subsPath) {
    const videoSrc = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;
    player.source = {
        type: 'video',
        sources: [{ src: videoSrc, type: 'video/mp4' }],
        tracks: [{ kind: 'captions', label: 'English', srclang: 'en', src: subsPath, default: true }]
    };
    player.play();
}
