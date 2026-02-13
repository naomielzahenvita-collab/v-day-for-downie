const gifStages = [
    "https://media.tenor.com/mbsKdEmx9V0AAAAj/bubu-cute-bubu-adorable.gif",
    "https://media1.tenor.com/m/ngqLF_od33QAAAAC/bubu-bubu-cute.gif",
    "https://media1.tenor.com/m/9fscv__vkukAAAAC/dudu-bubu-dudu-bubu-love.gif",
    "https://media.tenor.com/qjKNkZZlF-4AAAAi/bubu-dudu-sseeyall.gif",
    "https://media.tenor.com/VfTJk4K1NWkAAAAi/mimibubu.gif",
    "https://media.tenor.com/Eg9AvPQstIUAAAAi/bubu-bubu-sad.gif",
    "https://media.tenor.com/qL8VaSflxn0AAAAi/choco.gif",
    "https://media.tenor.com/0Xr-5-SbieQAAAAi/bubududu-panda.gif"
]

const noMessages = [
    "Moh",
    "Tenanee 🤔",
    "hiks 🥺",
    "Kok emoh sih, sedih...",
    "sedih banget loch... 😢",
    "Please??? 💔",
    "kok ngonoo...",
    "kesempatan terakhir 😭",
    "wlek 😜"
]

const yesTeasePokes = [
    "pencet moh sek... pintar to aku 😏",
    "cepet pencet moh ogk 👀",
    "ish 😈",
    "awass koe 😏"
]

/* ===== FOTO 7 MEMORY ===== */
const lovePhotos = [
    "1.jpeg",
    "2.png",
    "3.jpeg",
    "5.jpeg",
    "6.jpeg",
    "7.jpeg",
    "8.jpeg"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

/* ================= MUSIC ================= */

music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
    musicPlaying = true
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
        musicPlaying = true
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

/* ================= YES LOGIC ================= */

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }

    showLoveSlideshow()   // 🎞️ 7 FOTO CINEMATIC
    setTimeout(() => {
        window.location.href = 'yes.html'
    }, 9000) // setelah slideshow selesai
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

/* ================= NO LOGIC ================= */

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}

/* ================= 7 FOTO CINEMATIC ================= */

function showLoveSlideshow() {
    const frame = document.createElement("div")
    frame.id = "love-frame"

    Object.assign(frame.style, {
        position: "fixed",
        bottom: "90px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "200px",
        height: "280px",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
        zIndex: "999",
        background: "#000",
        border: "4px solid #ff4d6d"
    })

    const img = document.createElement("img")
    img.style.width = "100%"
    img.style.height = "100%"
    img.style.objectFit = "cover"
    img.style.opacity = "0"
    img.style.transition = "0.8s ease"

    frame.appendChild(img)
    document.body.appendChild(frame)

    let index = 0

    function showNext() {
        img.style.opacity = "0"
        setTimeout(() => {
            img.src = lovePhotos[index]
            img.style.opacity = "1"
            index++
            if (index < lovePhotos.length) {
                setTimeout(showNext, 1100)
            }
        }, 300)
    }

    showNext()
}
