let musicPlaying = false
let music = null
let fadeInterval = null

window.addEventListener('load', () => {
    launchConfettiSoft()
    initMusic()
})

/* ================= MUSIC CINEMATIC ================= */

function initMusic() {
    music = document.getElementById('bg-music')
    music.volume = 0
    music.loop = true   // infinite loop cinematic

    // try autoplay
    const playPromise = music.play()

    if (playPromise !== undefined) {
        playPromise.then(() => {
            musicPlaying = true
            fadeInMusic()
            updateIcon()
        }).catch(() => {
            // fallback click
            document.body.addEventListener('click', startMusicOnce, { once: true })
        })
    }
}

function startMusicOnce() {
    if (!musicPlaying) {
        music.play()
        musicPlaying = true
        fadeInMusic()
        updateIcon()
    }
}

function fadeInMusic() {
    clearInterval(fadeInterval)
    fadeInterval = setInterval(() => {
        if (music.volume < 0.3) {
            music.volume = Math.min(music.volume + 0.02, 0.3)
        } else {
            clearInterval(fadeInterval)
        }
    }, 120)
}

function fadeOutMusic() {
    clearInterval(fadeInterval)
    fadeInterval = setInterval(() => {
        if (music.volume > 0) {
            music.volume = Math.max(music.volume - 0.02, 0)
        } else {
            music.pause()
            clearInterval(fadeInterval)
        }
    }, 120)
}

function toggleMusic() {
    if (!music) return

    if (musicPlaying) {
        fadeOutMusic()
        musicPlaying = false
    } else {
        music.play()
        fadeInMusic()
        musicPlaying = true
    }

    updateIcon()
}

function updateIcon() {
    document.getElementById('music-toggle').textContent = musicPlaying ? '🔊' : '🔇'
}

/* ================= CONFETTI SOFT ROMANTIC ================= */

function launchConfettiSoft() {
    const colors = ['#ffb6c1', '#ff69b4', '#ff1493', '#ffc0cb', '#fff0f5']
    const duration = 9000
    const end = Date.now() + duration

    // soft intro burst
    confetti({
        particleCount: 80,
        spread: 90,
        origin: { x: 0.5, y: 0.35 },
        colors
    })

    // floating romantic mode
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 8,
            angle: 90,
            spread: 60,
            origin: { x: Math.random(), y: 1 },
            colors
        })
    }, 400)
}
