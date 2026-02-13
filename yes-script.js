let musicPlaying=false
let music=document.getElementById('bg-music')

window.onload=()=>{
    music.play().then(()=>musicPlaying=true)
    launchConfetti()
    initSlider()
    initLoveTimer()
}

function toggleMusic(){
    if(musicPlaying){
        music.pause();musicPlaying=false
    }else{
        music.play();musicPlaying=true
    }
}

function launchConfetti(){
    confetti({particleCount:120,spread:100,origin:{x:0.5,y:0.4}})
}

function initSlider(){
    const slides=document.querySelectorAll('.mem-slide')
    let i=0
    setInterval(()=>{
        slides[i].classList.remove('active')
        i=(i+1)%slides.length
        slides[i].classList.add('active')
    },3000)
}

function initLoveTimer(){
    const startDate=new Date("2023-01-01") // GANTI TANGGAL JADIAN
    setInterval(()=>{
        const now=new Date()
        const diff=now-startDate
        const days=Math.floor(diff/(1000*60*60*24))
        document.getElementById('loveTime').innerText=`${days} days together 💕`
    },1000)
}
