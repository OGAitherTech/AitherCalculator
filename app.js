const displayEl=document.getElementById('display'),expressionEl=document.getElementById('expression'),historyEl=document.getElementById('history'),settingsModal=document.getElementById('settingsModal'),scientificEl=document.getElementById('scientific'),toastEl=document.getElementById('toast');
let current='0', previous=null, operator=null, waiting=false, expression='';
let history=JSON.parse(localStorage.getItem('aitherCalculatorHistory')||'[]');
const settings=JSON.parse(localStorage.getItem('aitherCalculatorSettings')||'{"scientific":false,"dark":true,"haptic":true}');
function save(){localStorage.setItem('aitherCalculatorHistory',JSON.stringify(history));localStorage.setItem('aitherCalculatorSettings',JSON.stringify(settings))}
function vibrate(){if(settings.haptic&&navigator.vibrate)navigator.vibrate(8)}
function render(){displayEl.textContent=current;expressionEl.textContent=expression;renderHistory()}
function inputNumber(n){vibrate();if(waiting){current=n;waiting=false}else current=current==='0'?n:current+n;render()}
function decimal(){vibrate();if(waiting){current='0.';waiting=false}else if(!current.includes('.'))current+='.';render()}
function clear(){vibrate();current='0';previous=null;operator=null;waiting=false;expression='';render()}
function backspace(){vibrate();if(waiting)return;current=current.length>1?current.slice(0,-1):'0';render()}
function setOperator(op){vibrate();const value=Number(current);if(previous!==null&&operator&&!waiting)calculate();previous=Number(current);operator=op;waiting=true;expression=`${format(previous)} ${op}`;render()}
function calculate(){if(previous===null||!operator)return;const a=previous,b=Number(current);let result;switch(operator){case '+':result=a+b;break;case '−':result=a-b;break;case '×':result=a*b;break;case '÷':result=b===0?NaN:a/b;break}const shown=`${format(a)} ${operator} ${format(b)}`;current=Number.isFinite(result)?String(round(result)):'Error';history.unshift({expression:shown,result:current});history=history.slice(0,30);previous=null;operator=null;waiting=true;expression=shown;save();render();vibrate()}
function percent(){current=String(round(Number(current)/100));render()}
function sign(){current=String(-Number(current));render()}
function round(n){return Number.parseFloat(Number(n).toPrecision(12))}
function format(n){return Number(n).toLocaleString('en-US',{maximumFractionDigits:10})}
function scientific(fn){vibrate();const n=Number(current);let r;switch(fn){case'sin':r=Math.sin(n*Math.PI/180);break;case'cos':r=Math.cos(n*Math.PI/180);break;case'tan':r=Math.tan(n*Math.PI/180);break;case'sqrt':r=Math.sqrt(n);break;case'square':r=n*n;break;case'log':r=Math.log10(n);break;case'ln':r=Math.log(n);break}current=Number.isFinite(r)?String(round(r)):'Error';expression=`${fn}(${format(n)})`;history.unshift({expression,result:current});history=history.slice(0,30);save();render()}
function constant(name){if(name==='pi'){current=String(Math.PI);waiting=false;expression='π';render()}}
function renderHistory(){if(!history.length){historyEl.className='history-empty';historyEl.textContent='Your calculations will appear here.';return}historyEl.className='history';historyEl.innerHTML=history.map((x,i)=>`<div class="history-item" data-history="${i}"><div class="history-expression">${escapeHtml(x.expression)}</div><div class="history-result">${escapeHtml(x.result)}</div></div>`).join('')}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function showToast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toastEl.classList.remove('show'),1800)}
document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.action,v=btn.dataset.value;if(a==='number')inputNumber(v);else if(a==='decimal')decimal();else if(a==='clear')clear();else if(a==='backspace')backspace();else if(a==='operator')setOperator(v);else if(a==='equals')calculate();else if(a==='percent')percent();else if(a==='sign')sign();else if(a==='function')scientific(v);else if(a==='constant')constant(v)}));
historyEl.addEventListener('click',e=>{const item=e.target.closest('[data-history]');if(!item)return;const h=history[Number(item.dataset.history)];current=h.result;expression=h.expression;previous=null;operator=null;waiting=true;render()});
document.getElementById('clearHistory').onclick=()=>{history=[];save();render();showToast('History cleared')};
document.getElementById('settingsBtn').onclick=()=>settingsModal.classList.remove('hidden');document.getElementById('closeSettings').onclick=()=>settingsModal.classList.add('hidden');settingsModal.addEventListener('click',e=>{if(e.target===settingsModal)settingsModal.classList.add('hidden')});
const scientificToggle=document.getElementById('scientificToggle'),darkToggle=document.getElementById('darkToggle'),hapticToggle=document.getElementById('hapticToggle');scientificToggle.checked=settings.scientific;darkToggle.checked=settings.dark;hapticToggle.checked=settings.haptic;scientificEl.classList.toggle('hidden',!settings.scientific);document.body.classList.toggle('light',!settings.dark);
scientificToggle.onchange=()=>{settings.scientific=scientificToggle.checked;scientificEl.classList.toggle('hidden',!settings.scientific);save()};darkToggle.onchange=()=>{settings.dark=darkToggle.checked;document.body.classList.toggle('light',!settings.dark);save()};hapticToggle.onchange=()=>{settings.haptic=hapticToggle.checked;save()};
document.getElementById('forceUpdate').onclick=()=>{settingsModal.classList.add('hidden');showToast('Aither Calculator is up to date');setTimeout(()=>location.reload(),500)};
document.addEventListener('keydown',e=>{if(/^[0-9]$/.test(e.key))inputNumber(e.key);else if(e.key==='.')decimal();else if(e.key==='Enter'||e.key==='=')calculate();else if(['+','-','*','/'].includes(e.key)){setOperator(e.key==='*'?'×':e.key==='/'?'÷':e.key==='-'?'−':'+')}else if(e.key==='Escape')clear();else if(e.key==='Backspace')backspace();});
render();
