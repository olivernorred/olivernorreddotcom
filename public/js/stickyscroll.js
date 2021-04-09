// const workcontainer = document.querySelector("#portfoliosticky")
// const content = document.querySelector("#content")
// const foot = document.querySelector("#footer")

// window.addEventListener("load", ()=>{
// 	content.style.height = `${workcontainer.scrollWidth}px`;
// })

// window.addEventListener("scroll", ()=> {
// 	workcontainer.scrollTo(-content.getBoundingClientRect().top, 0);
// })



const spaceHolder = document.querySelector('#content');
const horizontal = document.querySelector('#portfoliogrid');
spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

function calcDynamicHeight(ref) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const objectWidth = ref.scrollWidth;
  return objectWidth - vw + vh + 48; // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
}

window.addEventListener('scroll', () => {
  const sticky = document.querySelector('#portfoliosticky');
  horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`;
});

window.addEventListener('resize', () => {
  spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
});