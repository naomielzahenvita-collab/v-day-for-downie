let musicPlaying=false
const music=document.getElementById('bg-music')
music.muted=true
music.play().then(()=>{
    music.muted=false
    musicPlaying=true
})

function toggleMusic(){
    if(musicPlaying){
        music.pause();musicPlaying=false
    }else{
        music.play();musicPlaying=true
    }
}

const gifStages=[
 "https://media.tenor.com/mbsKdEmx9V0AAAAj/bubu-cute-bubu-adorable.gif",
 "https://media1.tenor.com/m/ngqLF_od33QAAAAC/bubu-bubu-cute.gif",
 "https://media.tenor.com/Eg9AvPQstIUAAAAi/bubu-bubu-sad.gif"
]

let noCount=0
const catGif=document.getElementById('cat-gif')
const yesBtn=document.getElementById('yes-btn')
const noBtn=document.getElementById('no-btn')

function handleYesClick(){
    window.location.href='yes.html'
}

function handleNoClick(){
    noCount++
    const idx=Math.min(noCount,gifStages.length-1)
    catGif.src=gifStages[idx]

    yesBtn.style.transform=`scale(${1+noCount*0.15})`

    if(noCount>=3){
        noBtn.style.position='absolute'
        noBtn.style.left=Math.random()*80+'%'
        noBtn.style.top=Math.random()*80+'%'
    }
}
