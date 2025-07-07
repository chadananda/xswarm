document.addEventListener("DOMContentLoaded",()=>{const $=document.querySelector(".terminal-content"),E=JSON.parse($.getAttribute("data-scenarios")),L=JSON.parse($.getAttribute("data-scenario-ids")),I=$.getAttribute("data-current-scenario");let x=L.indexOf(I);x===-1&&(x=0);function k(t){const c=document.querySelector(".terminal-lines"),n=t.phases.find(s=>s.type==="terminal");n&&n.items.forEach(s=>{if(s.type==="command"){const e=document.createElement("div");e.className="terminal-line",e.setAttribute("data-delay",s.delay),e.style.display="none",s.noType?e.innerHTML=`
              <span class="terminal-prompt">${s.prompt}</span>
              <span class="terminal-command">${s.text}</span>
            `:e.innerHTML=`
              <span class="terminal-prompt">${s.prompt}</span>
              <span class="terminal-command">
                <span class="typing-animation" data-text="${s.text}" data-duration="${s.duration}" style="opacity: 0;"></span>
              </span>
            `,c.appendChild(e)}else if(s.type==="loading"){const e=document.createElement("div");e.className="terminal-line loading-line",e.setAttribute("data-delay",s.delay),e.innerHTML=`<span class="terminal-loading">${s.text}</span>`,c.appendChild(e)}else if(s.type==="ascii"){const e=document.createElement("div");e.className="ascii-explosion",e.setAttribute("data-delay",s.delay),s.frames.forEach((o,a)=>{const l=document.createElement("pre");l.className=`explosion-frame frame-${a+1}`,a>0&&(l.style.display="none"),l.textContent=o,e.appendChild(l)}),c.appendChild(e)}else if(s.type==="success"){const e=document.createElement("div");e.className="terminal-line success-line",e.setAttribute("data-delay",s.delay),e.innerHTML=`<span class="terminal-success">${s.text}</span>`,c.appendChild(e)}else if(s.type==="finalPrompt"){const e=document.createElement("div");e.className="terminal-line",e.setAttribute("data-delay",s.delay),e.innerHTML=`
            <span class="terminal-prompt">$</span>
            <span class="terminal-cursor-blink">_</span>
          `,c.appendChild(e)}})}function D(t){const c=document.querySelector(".chat-interface"),n=t.phases.find(a=>a.type==="chat");if(!n)return;const s=`
        <div class="chat-stats-header">
          <div class="stats-row">
            <span class="stat-label">PROJECT:</span> <span class="stat-value">${n.stats.project}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FILES:</span> <span class="stat-value">${n.stats.files}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FUNCTIONS:</span> <span class="stat-value">${n.stats.functions}</span>
          </div>
          <div class="stats-row">
            <span class="stat-label">AGENTS:</span> <span class="stat-value">${n.stats.agents}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">CONTEXT:</span> <span class="stat-value">${n.stats.context}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">MODE:</span> <span class="stat-value">${n.stats.mode}</span>
          </div>
        </div>
        
        <div class="chat-scroll-container">
          <div class="chat-container">
            <div class="chat-header">
              <span class="chat-title">${n.chatTitle}</span>
              <span class="chat-status">● Connected</span>
            </div>
            <div class="chat-content-area"></div>
          </div>
        </div>
      `;c.innerHTML=s;const e=c.querySelector(".chat-content-area");let o=null;n.messages.forEach((a,l)=>{if(a.type==="agent"){const i=w(a,t.agents[a.agent]);i.style.display="none",o===a.agent&&i.classList.add("same-agent"),o=a.agent,e.appendChild(i)}else if(a.type==="user"){const i=P(a);i.style.display="none",o="user",e.appendChild(i)}else if(a.type==="thinking"){const i=j(a,t.agents[a.agent]);i.style.display="none",e.appendChild(i)}else if(a.type==="agentsJoining"){const i=O(a.agents);i.style.display="none",o=null,e.appendChild(i)}else if(a.type==="multipart"){const i=J(a,t.agents[a.agent]);i.style.display="none",o===a.agent&&i.classList.add("same-agent"),o=a.agent,e.appendChild(i)}else if(a.type==="planningAnnouncement"){const i=F(a,t.agents[a.agent]);i.style.display="none",o=null,e.appendChild(i)}else if(a.type==="planningStages"){const i=R(a.stages);i.style.display="none",o=null,e.appendChild(i)}else if(a.type==="branchCreation"){const i=G(a,t.agents[a.agent]);i.style.display="none",o=null,e.appendChild(i)}else if(a.type==="dashboardLink"){const i=U(a,t.agents[a.agent]);i.style.display="none",o=null,e.appendChild(i)}else if(a.type==="progressIndicator"){const i=B(a,t.agents[a.agent]);i.style.display="none",o=null,e.appendChild(i)}})}function w(t,c){const n=document.createElement("div");return n.className="chat-message-line",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor" style="display: none;"></span>
      `,n}function P(t){const c=document.createElement("div");return c.className="chat-message-line user-message",c.innerHTML=`
        <span class="chat-user-indicator">[You]</span>
        <span class="chat-text typing-animation-chat user-typing" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor user-cursor"></span>
      `,c}function j(t,c){const n=document.createElement("div");return n.className="chat-message-line",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="thinking-indicator">${t.text}</span>
      `,n}function O(t){const c=document.createElement("div");return c.className="agents-joining",t.forEach(n=>{const s=document.createElement("div");s.className="agent-join-notification",s.style.display="none",s.innerHTML=`<span class="join-indicator">→</span> ${n} has joined the conversation`,c.appendChild(s)}),c}function J(t,c){const n=document.createElement("div");return n.className="chat-message-line",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          ${t.parts.map((s,e)=>`<span class="typing-animation-chat" data-text="${s.text}" data-duration="${s.duration}"${e>0?' style="display: none;"':""}></span>`).join("")}
        </span>
        <span class="chat-cursor"></span>
      `,n}function F(t,c){const n=document.createElement("div");return n.className="chat-message-line planning-announcement",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,n}function R(t){const c=document.createElement("div");return c.className="planning-stages",t.forEach(n=>{const s=document.createElement("div");s.className="planning-stage-notification",s.style.display="none",s.setAttribute("data-stage-delay",n.delay),s.innerHTML=`
          <span class="stage-indicator">☐</span> 
          <span class="stage-text">${n.text}</span>
        `,c.appendChild(s)}),c}function G(t,c){const n=document.createElement("div");return n.className="chat-message-line branch-creation",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          <span class="typing-animation-chat" data-text="Creating branch: " data-duration="0.5"></span>
          <span class="typing-animation-chat branch-name" data-text="${t.branchName}" data-duration="0.5"></span>
          <span class="typing-animation-chat" data-text="..." data-duration="0.3"></span>
        </span>
        <span class="chat-cursor"></span>
      `,n}function U(t,c){const n=document.createElement("div");return n.className="chat-message-line dashboard-link",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat dashboard-url" data-text="${t.url}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,n}function B(t,c){const n=document.createElement("div");return n.className="chat-message-line progress-indicator",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">${t.text}<span class="progress-dots"></span></span>
      `,n}function M(t){document.querySelector(".terminal-lines").innerHTML=`
        <div class="terminal-line initial-prompt">
          <span class="terminal-prompt">$</span>
          <span class="initial-cursor"></span>
        </div>
      `,document.querySelector(".chat-interface").innerHTML="";const c=document.querySelector(".terminal-title");c&&(c.textContent=E[t].terminalTitle),k(E[t]),D(E[t])}M(L[x]);const N=document.querySelectorAll("[data-delay]");document.querySelector(".terminal-lines");const C=document.querySelector(".initial-prompt");document.querySelectorAll(".typing-animation, .typing-animation-chat").forEach(t=>{t.textContent=""});let g=null;const W=()=>{g||(g=new(window.AudioContext||window.webkitAudioContext),window.audioContext=g)};function q(){if(!g)return;const t=g.createOscillator(),c=g.createGain();t.connect(c),c.connect(g.destination),t.frequency.value=800+Math.random()*400,c.gain.value=.02,t.start(),t.stop(g.currentTime+.01)}document.addEventListener("click",W,{once:!0});function X(){N.forEach(o=>{o.style.display="none",o.classList.remove("animate"),o.style.opacity="0";const a=o.querySelector(".typing-animation");a&&(a.classList.remove("active"),a.style.borderRight="2px solid var(--terminal-green)",a.textContent="");const l=o.querySelector(".typing-animation-chat");l&&(l.classList.remove("active"),l.classList.remove("typed"),l.textContent="")});const t=document.querySelector(".explosion-frame.frame-1"),c=document.querySelector(".explosion-frame.frame-2");t&&(t.style.display="block"),c&&(c.style.display="none"),C&&(C.style.display="block",C.style.opacity="1");const n=document.querySelector(".terminal-lines");n&&(n.style.display="block",n.style.opacity="1");const s=document.querySelector(".chat-interface");s&&(s.classList.remove("active"),s.querySelectorAll(".typing-animation-chat").forEach(o=>{o.textContent="",o.classList.remove("typed")}));const e=document.querySelector(".branch-creation-section");if(e){e.style.display="none",e.style.opacity="0";const o=e.querySelector(".branch-status"),a=e.querySelector(".building-animation"),l=e.querySelector(".dashboard-link");o&&(o.style.display="none"),a&&(a.style.display="none"),l&&(l.style.display="none")}}function H(){X(),N.forEach(t=>{const c=parseInt(t.getAttribute("data-delay")||"0");setTimeout(()=>{c===2e3&&C&&(C.style.display="none"),t.style.display="block",t.style.opacity="1",t.classList.add("animate");const n=t.querySelector(".typing-animation");if(n){let s=function(){if(l<e.length){n.textContent+=e[l],window.audioContext&&q();const i=e[l],u=[".",",",":",";","!","?"].includes(i);l++,u&&l<e.length?setTimeout(s,a+300+Math.random()*200):l<e.length?setTimeout(s,a):setTimeout(()=>{n.style.borderRight="none"},200)}};const e=n.getAttribute("data-text")||"",o=n.getAttribute("data-duration")||"2.5",a=parseFloat(o)*1e3/e.length;n.style.opacity="1",n.classList.add("active"),n.textContent="";let l=0;s()}if(t.classList.contains("ascii-explosion")&&setTimeout(()=>{const s=t.querySelector(".frame-1"),e=t.querySelector(".frame-2");s&&(s.style.display="none"),e&&(e.style.display="block")},300),t.classList.contains("terminal-chat-section")&&setTimeout(()=>{const s=t.querySelector(".typing-animation-chat");s&&s.classList.add("active")},500),t.classList.contains("chat-interface")){t.classList.add("active");const s=document.querySelector(".terminal-lines");s&&(s.style.transition="opacity 0.3s ease-out",s.style.opacity="0",setTimeout(()=>{s.style.display="none"},300)),setTimeout(()=>{const e=t.querySelector(".chat-content-area"),o=e?e.querySelectorAll(".chat-message-line, .agents-joining, .planning-stages"):[];let a=0;console.log("Chat messages found:",o.length,"in",e),o.forEach((i,u)=>{i.style.display="none",i.style.opacity="0"}),setTimeout(()=>{l()},500);function l(){if(a>=o.length){setTimeout(()=>{x=(x+1)%L.length,M(L[x]),H()},3e4);return}const i=o[a];i.style.display="block",i.style.opacity="1";const u=t.querySelector(".chat-scroll-container")||e;u&&setTimeout(()=>{u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},100);const T=i.querySelectorAll(".typing-animation-chat:not(.typed)");if(T.length>0)if(T.length>1){let y=function(){if(r<T.length){let f=function(){if(v<h.length){p.textContent+=h[v],window.audioContext&&q();const A=h[v],Y=[".",",",":",";","!","?"].includes(A);v++,Y&&v<h.length?setTimeout(f,S+300+Math.random()*200):v<h.length?setTimeout(f,S):(r++,setTimeout(y,300))}};const p=T[r],h=p.getAttribute("data-text")||"",b=p.getAttribute("data-duration")||"0.4",S=parseFloat(b)*1e3/h.length;p.style.display==="none"&&(p.style.display="inline"),p.classList.add("active"),p.classList.add("typed"),p.textContent="";let v=0;f()}else m&&clearInterval(m),d&&(d.style.display="none"),a++,setTimeout(l,1500)},r=0;const d=i.querySelector(".chat-cursor");d&&(d.style.display="inline-block");let m=setInterval(()=>{u&&u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},500);y()}else{let y=function(){if(h<d.length){r.textContent+=d[h],window.audioContext&&q();const S=d[h],v=[".",",",":",";","!","?"].includes(S);if(h++,v&&h<d.length)setTimeout(y,f+300+Math.random()*200);else if(h<d.length)setTimeout(y,f);else{b&&clearInterval(b),p&&(p.style.display="none"),a++;const A=i.classList.contains("user-message")?2e3:1500;setTimeout(l,A)}}};const r=T[0],d=r.getAttribute("data-text")||"",m=r.getAttribute("data-duration")||"2",f=parseFloat(m)*1e3/d.length;r.classList.add("active"),r.classList.add("typed"),r.textContent="";const p=i.querySelector(".chat-cursor");p&&(p.style.display="inline-block");let h=0,b=null;u&&(b=setInterval(()=>{u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},500)),y()}else if(i.querySelector(".thinking-indicator"))a++,setTimeout(l,2500);else if(i.classList.contains("agents-joining")){let y=function(){d<r.length?(r[d].style.display="block",r[d].style.opacity="1",d++,setTimeout(y,200)):(a++,setTimeout(l,1500))};const r=i.querySelectorAll(".agent-join-notification");let d=0;y()}else if(i.classList.contains("planning-stages")){let y=function(){if(d<r.length){const m=r[d];m.style.display="block",m.style.opacity="1",u&&u.scrollTo({top:u.scrollHeight,behavior:"smooth"});const f=m.getAttribute("data-stage-delay")||"2500";setTimeout(()=>{const p=m.querySelector(".stage-indicator");p&&(p.textContent="☑",m.classList.add("completed")),d++,d<r.length?y():(a++,setTimeout(l,1e3))},parseInt(f))}else a++,setTimeout(l,1e3)};const r=i.querySelectorAll(".planning-stage-notification");let d=0;y()}else if(i.classList.contains("progress-indicator")){const y=i.querySelector(".progress-dots");if(y){let r=0;setInterval(()=>{r=(r+1)%4,y.textContent=".".repeat(r)},500)}a++,setTimeout(l,5e3)}else a++,setTimeout(l,1e3)}},100)}},c)})}H()});
