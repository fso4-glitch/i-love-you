const opening=document.getElementById('opening');
const story=document.getElementById('story');
const chapters=[...document.querySelectorAll('.chapter')];
const progressBar=document.getElementById('progressBar');
const progressLabel=document.getElementById('progressLabel');
const letterScene=document.getElementById('letterScene');
const envelope=document.getElementById('envelope');
const letter=document.getElementById('letter');
let step=0;
let holdTimer=null;

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
function unlockNext(chapterIndex,selector,activeClass){
  const items=[...chapters[chapterIndex].querySelectorAll(selector)];
  items.forEach(function(item){
    item.onclick=function(){
      if(item.classList.contains(activeClass))return;
      item.classList.add(activeClass);
      burst(8,item);
      if(items.every(function(x){return x.classList.contains(activeClass)})){
        const next=chapters[chapterIndex].querySelector('.next-button');
        next.disabled=false;
        next.classList.remove('locked');
      }
    };
  });
}
function burst(total,origin){
  const rect=origin?origin.getBoundingClientRect():null;
  for(let i=0;i<total;i++){
    setTimeout(function(){
      const h=document.createElement('span');
      h.className='heart-pop';
      h.textContent=i%3?'♥':'✦';
      h.style.left=(rect?rect.left+rect.width/2:innerWidth*.5)+'px';
      h.style.top=(rect?rect.top+rect.height/2:innerHeight*.52)+'px';
      h.style.fontSize=(12+Math.random()*22)+'px';
      h.style.setProperty('--x',(Math.random()*300-150)+'px');
      h.style.setProperty('--y',(-80-Math.random()*280)+'px');
      h.style.setProperty('--r',(Math.random()*240-120)+'deg');
      document.body.appendChild(h);
      setTimeout(function(){h.remove()},1800);
    },i*34);
  }
}
document.getElementById('startButton').onclick=function(){
  opening.classList.add('hide');
  burst(20,this);
  setTimeout(function(){
    story.classList.add('open');
    story.setAttribute('aria-hidden','false');
    setStep(0);
  },620);
};
document.querySelectorAll('.next-button:not(.final-trigger)').forEach(function(button){
  button.onclick=function(){
    if(button.disabled)return;
    burst(12,button);
    if(step<chapters.length-1)setTimeout(function(){setStep(step+1)},260);
  };
});
unlockNext(0,'.secret-note','revealed');
unlockNext(1,'.detail-item','revealed');
unlockNext(2,'.certainties button','opened');

const holdButton=document.querySelector('.hold-button');
function startHold(event){
  event.preventDefault();
  holdButton.classList.add('holding');
  holdTimer=setTimeout(openFinalScene,1750);
}
function cancelHold(){
  clearTimeout(holdTimer);
  holdTimer=null;
  holdButton.classList.remove('holding');
}
holdButton.addEventListener('pointerdown',startHold);
holdButton.addEventListener('pointerup',cancelHold);
holdButton.addEventListener('pointerleave',cancelHold);
holdButton.addEventListener('pointercancel',cancelHold);
holdButton.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&!holdTimer)startHold(e)});
holdButton.addEventListener('keyup',function(e){if(e.key==='Enter'||e.key===' ')cancelHold()});

function openFinalScene(){
  clearTimeout(holdTimer);
  holdTimer=null;
  holdButton.classList.remove('holding');
  chapters[3].classList.remove('active');
  document.querySelector('.progress-nav').style.display='none';
  letterScene.classList.add('show');
  burst(36,holdButton);
  window.scrollTo({top:0,behavior:'smooth'});
}
function openEnvelope(){
  if(envelope.classList.contains('open'))return;
  envelope.classList.add('open');
  document.getElementById('envelopeTip').textContent='Essa carta é todinha pra vc ♡';
  burst(30,envelope);
  setTimeout(function(){
    envelope.style.display='none';
    document.getElementById('envelopeTip').style.display='none';
    letter.classList.add('show');
    burst(45,letter);
    setTimeout(function(){
      document.querySelector('.final-message').classList.add('show');
    },1100);
  },1050);
}
envelope.addEventListener('click',openEnvelope);
envelope.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')openEnvelope()});
document.getElementById('replayButton').onclick=function(){location.reload()};
createStars();
setInterval(petal,650);
