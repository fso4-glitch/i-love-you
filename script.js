const opening=document.getElementById('opening');
const story=document.getElementById('story');
const chapters=[...document.querySelectorAll('.chapter')];
const progressBar=document.getElementById('progressBar');
const progressLabel=document.getElementById('progressLabel');
const letterScene=document.getElementById('letterScene');
const envelope=document.getElementById('envelope');
const letter=document.getElementById('letter');
let step=0;

function createStars(){
  const sky=document.getElementById('stars');
  for(let i=0;i<90;i++){
    const star=document.createElement('i');
    star.className='star';
    star.style.left=Math.random()*100+'%';
    star.style.top=Math.random()*100+'%';
    star.style.setProperty('--d',(1.2+Math.random()*3)+'s');
    star.style.opacity=.2+Math.random()*.8;
    sky.appendChild(star);
  }
}
function petal(){
  const p=document.createElement('span');
  p.className='petal';
  p.textContent=Math.random()>.62?'♥':'✦';
  p.style.left=Math.random()*100+'vw';
  p.style.fontSize=(9+Math.random()*13)+'px';
  p.style.setProperty('--fall',(6+Math.random()*7)+'s');
  p.style.setProperty('--drift',(Math.random()*160-80)+'px');
  document.getElementById('petals').appendChild(p);
  setTimeout(function(){p.remove()},13500);
}
function setStep(index){
  step=index;
  chapters.forEach(function(chapter,i){chapter.classList.toggle('active',i===index)});
  progressLabel.textContent='Capítulo '+(index+1)+' de 4';
  progressBar.style.width=((index+1)/4*100)+'%';
  window.scrollTo({top:0,behavior:'smooth'});
}
function burst(total){
  for(let i=0;i<total;i++){
    setTimeout(function(){
      const h=document.createElement('span');
      h.className='heart-pop';
      h.textContent=i%3?'♥':'✦';
      h.style.left=(45+Math.random()*10)+'vw';
      h.style.top=(48+Math.random()*8)+'vh';
      h.style.fontSize=(12+Math.random()*22)+'px';
      h.style.setProperty('--x',(Math.random()*360-180)+'px');
      h.style.setProperty('--y',(-100-Math.random()*350)+'px');
      h.style.setProperty('--r',(Math.random()*240-120)+'deg');
      document.body.appendChild(h);
      setTimeout(function(){h.remove()},1800);
    },i*34);
  }
}
document.getElementById('startButton').onclick=function(){
  opening.classList.add('hide');
  setTimeout(function(){
    story.classList.add('open');
    story.setAttribute('aria-hidden','false');
    setStep(0);
  },620);
};
document.querySelectorAll('.next-button:not(.final-trigger)').forEach(function(button){
  button.onclick=function(){
    if(button.disabled)return;
    if(step<chapters.length-1)setStep(step+1);
  };
});
const certaintyButtons=[...document.querySelectorAll('.certainties button')];
certaintyButtons.forEach(function(button){
  button.onclick=function(){
    button.classList.add('opened');
    burst(7);
    if(certaintyButtons.every(function(item){return item.classList.contains('opened')})){
      const next=chapters[2].querySelector('.next-button');
      next.disabled=false;
      next.classList.remove('locked');
    }
  };
});
document.querySelector('.final-trigger').onclick=function(){
  chapters[3].classList.remove('active');
  document.querySelector('.progress-nav').style.display='none';
  letterScene.classList.add('show');
  burst(34);
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(function(){envelope.classList.add('open')},500);
  setTimeout(function(){
    envelope.style.display='none';
    letter.classList.add('show');
    burst(45);
  },1600);
  setTimeout(function(){
    document.querySelector('.final-message').classList.add('show');
  },2800);
};
document.getElementById('replayButton').onclick=function(){location.reload()};
createStars();
setInterval(petal,650);
