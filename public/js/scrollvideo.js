const video = document.querySelector("#dancingloop")
window.addEventListener('scroll', ()=>{
	video.pause();
	video.currentTime = (window.scrollY/500) % video.duration;
})