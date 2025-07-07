document.addEventListener("DOMContentLoaded",()=>{const $=document.querySelector(".terminal-content"),E=JSON.parse($.getAttribute("data-scenarios")),L=JSON.parse($.getAttribute("data-scenario-ids")),I=$.getAttribute("data-current-scenario");let x=L.indexOf(I);x===-1&&(x=0);function k(t){const c=document.querySelector(".terminal-lines"),a=t.phases.find(e=>e.type==="terminal");a&&a.items.forEach(e=>{if(e.type==="command"){const n=document.createElement("div");n.className="terminal-line",n.setAttribute("data-delay",e.delay),n.style.display="none",e.noType?n.innerHTML=`
              <span class="terminal-prompt">${e.prompt}</span>
              <span class="terminal-command">${e.text}</span>
            `:n.innerHTML=`
              <span class="terminal-prompt">${e.prompt}</span>
              <span class="terminal-command">
                <span class="typing-animation" data-text="${e.text}" data-duration="${e.duration}" style="opacity: 0;"></span>
              </span>
            `,c.appendChild(n)}else if(e.type==="loading"){const n=document.createElement("div");n.className="terminal-line loading-line",n.setAttribute("data-delay",e.delay),n.innerHTML=`<span class="terminal-loading">${e.text}</span>`,c.appendChild(n)}else if(e.type==="ascii"){const n=document.createElement("div");n.className="ascii-explosion",n.setAttribute("data-delay",e.delay),e.frames.forEach((l,s)=>{const o=document.createElement("pre");o.className=`explosion-frame frame-${s+1}`,s>0&&(o.style.display="none"),o.textContent=l,n.appendChild(o)}),c.appendChild(n)}else if(e.type==="success"){const n=document.createElement("div");n.className="terminal-line success-line",n.setAttribute("data-delay",e.delay),n.innerHTML=`<span class="terminal-success">${e.text}</span>`,c.appendChild(n)}else if(e.type==="finalPrompt"){const n=document.createElement("div");n.className="terminal-line",n.setAttribute("data-delay",e.delay),n.innerHTML=`
            <span class="terminal-prompt">$</span>
            <span class="terminal-cursor-blink">_</span>
          `,c.appendChild(n)}})}function D(t){const c=document.querySelector(".chat-interface"),a=t.phases.find(s=>s.type==="chat");if(!a)return;const e=`
        <div class="chat-stats-header">
          <div class="stats-row">
            <span class="stat-label">PROJECT:</span> <span class="stat-value">${a.stats.project}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FILES:</span> <span class="stat-value">${a.stats.files}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FUNCTIONS:</span> <span class="stat-value">${a.stats.functions}</span>
          </div>
          <div class="stats-row">
            <span class="stat-label">AGENTS:</span> <span class="stat-value">${a.stats.agents}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">CONTEXT:</span> <span class="stat-value">${a.stats.context}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">MODE:</span> <span class="stat-value">${a.stats.mode}</span>
          </div>
        </div>
        
        <div class="chat-scroll-container">
          <div class="chat-container">
            <div class="chat-header">
              <span class="chat-title">${a.chatTitle}</span>
              <span class="chat-status">● Connected</span>
            </div>
            <div class="chat-content-area"></div>
          </div>
        </div>
      `;c.innerHTML=e;const n=c.querySelector(".chat-content-area");let l=null;a.messages.forEach((s,o)=>{if(s.type==="agent"){const i=w(s,t.agents[s.agent]);o>0&&(i.style.display="none"),l===s.agent&&i.classList.add("same-agent"),l=s.agent,n.appendChild(i)}else if(s.type==="user"){const i=P(s);i.style.display="none",l="user",n.appendChild(i)}else if(s.type==="thinking"){const i=j(s,t.agents[s.agent]);i.style.display="none",n.appendChild(i)}else if(s.type==="agentsJoining"){const i=O(s.agents);i.style.display="none",l=null,n.appendChild(i)}else if(s.type==="multipart"){const i=J(s,t.agents[s.agent]);i.style.display="none",l===s.agent&&i.classList.add("same-agent"),l=s.agent,n.appendChild(i)}else if(s.type==="planningAnnouncement"){const i=F(s,t.agents[s.agent]);i.style.display="none",l=null,n.appendChild(i)}else if(s.type==="planningStages"){const i=R(s.stages);i.style.display="none",l=null,n.appendChild(i)}else if(s.type==="branchCreation"){const i=G(s,t.agents[s.agent]);i.style.display="none",l=null,n.appendChild(i)}else if(s.type==="dashboardLink"){const i=U(s,t.agents[s.agent]);i.style.display="none",l=null,n.appendChild(i)}else if(s.type==="progressIndicator"){const i=B(s,t.agents[s.agent]);i.style.display="none",l=null,n.appendChild(i)}})}function w(t,c){const a=document.createElement("div");return a.className="chat-message-line",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor" style="display: none;"></span>
      `,a}function P(t){const c=document.createElement("div");return c.className="chat-message-line user-message",c.innerHTML=`
        <span class="chat-user-indicator">[You]</span>
        <span class="chat-text typing-animation-chat user-typing" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor user-cursor"></span>
      `,c}function j(t,c){const a=document.createElement("div");return a.className="chat-message-line",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="thinking-indicator">${t.text}</span>
      `,a}function O(t){const c=document.createElement("div");return c.className="agents-joining",t.forEach(a=>{const e=document.createElement("div");e.className="agent-join-notification",e.style.display="none",e.innerHTML=`<span class="join-indicator">→</span> ${a} has joined the conversation`,c.appendChild(e)}),c}function J(t,c){const a=document.createElement("div");return a.className="chat-message-line",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          ${t.parts.map((e,n)=>`<span class="typing-animation-chat" data-text="${e.text}" data-duration="${e.duration}"${n>0?' style="display: none;"':""}></span>`).join("")}
        </span>
        <span class="chat-cursor"></span>
      `,a}function F(t,c){const a=document.createElement("div");return a.className="chat-message-line planning-announcement",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,a}function R(t){const c=document.createElement("div");return c.className="planning-stages",t.forEach(a=>{const e=document.createElement("div");e.className="planning-stage-notification",e.style.display="none",e.setAttribute("data-stage-delay",a.delay),e.innerHTML=`
          <span class="stage-indicator">☐</span> 
          <span class="stage-text">${a.text}</span>
        `,c.appendChild(e)}),c}function G(t,c){const a=document.createElement("div");return a.className="chat-message-line branch-creation",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          <span class="typing-animation-chat" data-text="Creating branch: " data-duration="0.5"></span>
          <span class="typing-animation-chat branch-name" data-text="${t.branchName}" data-duration="0.5"></span>
          <span class="typing-animation-chat" data-text="..." data-duration="0.3"></span>
        </span>
        <span class="chat-cursor"></span>
      `,a}function U(t,c){const a=document.createElement("div");return a.className="chat-message-line dashboard-link",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat dashboard-url" data-text="${t.url}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,a}function B(t,c){const a=document.createElement("div");return a.className="chat-message-line progress-indicator",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">${t.text}<span class="progress-dots"></span></span>
      `,a}function M(t){document.querySelector(".terminal-lines").innerHTML=`
        <div class="terminal-line initial-prompt">
          <span class="terminal-prompt">$</span>
          <span class="initial-cursor"></span>
        </div>
      `,document.querySelector(".chat-interface").innerHTML="";const c=document.querySelector(".terminal-title");c&&(c.textContent=E[t].terminalTitle),k(E[t]),D(E[t])}M(L[x]);const N=document.querySelectorAll("[data-delay]");document.querySelector(".terminal-lines");const C=document.querySelector(".initial-prompt");document.querySelectorAll(".typing-animation, .typing-animation-chat").forEach(t=>{t.textContent=""});let g=null;const W=()=>{g||(g=new(window.AudioContext||window.webkitAudioContext),window.audioContext=g)};function q(){if(!g)return;const t=g.createOscillator(),c=g.createGain();t.connect(c),c.connect(g.destination),t.frequency.value=800+Math.random()*400,c.gain.value=.02,t.start(),t.stop(g.currentTime+.01)}document.addEventListener("click",W,{once:!0});function X(){N.forEach(l=>{l.style.display="none",l.classList.remove("animate"),l.style.opacity="0";const s=l.querySelector(".typing-animation");s&&(s.classList.remove("active"),s.style.borderRight="2px solid var(--terminal-green)",s.textContent="");const o=l.querySelector(".typing-animation-chat");o&&(o.classList.remove("active"),o.classList.remove("typed"),o.textContent="")});const t=document.querySelector(".explosion-frame.frame-1"),c=document.querySelector(".explosion-frame.frame-2");t&&(t.style.display="block"),c&&(c.style.display="none"),C&&(C.style.display="block",C.style.opacity="1");const a=document.querySelector(".terminal-lines");a&&(a.style.display="block",a.style.opacity="1");const e=document.querySelector(".chat-interface");e&&(e.classList.remove("active"),e.querySelectorAll(".typing-animation-chat").forEach(l=>{l.textContent="",l.classList.remove("typed")}));const n=document.querySelector(".branch-creation-section");if(n){n.style.display="none",n.style.opacity="0";const l=n.querySelector(".branch-status"),s=n.querySelector(".building-animation"),o=n.querySelector(".dashboard-link");l&&(l.style.display="none"),s&&(s.style.display="none"),o&&(o.style.display="none")}}function H(){X(),N.forEach(t=>{const c=parseInt(t.getAttribute("data-delay")||"0");setTimeout(()=>{c===2e3&&C&&(C.style.display="none"),t.style.display="block",t.style.opacity="1",t.classList.add("animate");const a=t.querySelector(".typing-animation");if(a){let e=function(){if(o<n.length){a.textContent+=n[o],window.audioContext&&q();const i=n[o],u=[".",",",":",";","!","?"].includes(i);o++,u&&o<n.length?setTimeout(e,s+300+Math.random()*200):o<n.length?setTimeout(e,s):setTimeout(()=>{a.style.borderRight="none"},200)}};const n=a.getAttribute("data-text")||"",l=a.getAttribute("data-duration")||"2.5",s=parseFloat(l)*1e3/n.length;a.style.opacity="1",a.classList.add("active"),a.textContent="";let o=0;e()}if(t.classList.contains("ascii-explosion")&&setTimeout(()=>{const e=t.querySelector(".frame-1"),n=t.querySelector(".frame-2");e&&(e.style.display="none"),n&&(n.style.display="block")},300),t.classList.contains("terminal-chat-section")&&setTimeout(()=>{const e=t.querySelector(".typing-animation-chat");e&&e.classList.add("active")},500),t.classList.contains("chat-interface")){let e=function(){if(o>=s.length){setTimeout(()=>{x=(x+1)%L.length,M(L[x]),H()},3e4);return}const i=s[o];i.style.display="block",i.style.opacity="1";const u=t.querySelector(".chat-scroll-container")||l;u&&setTimeout(()=>{u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},100);const T=i.querySelectorAll(".typing-animation-chat:not(.typed)");if(T.length>0)if(T.length>1){let y=function(){if(r<T.length){let f=function(){if(v<h.length){p.textContent+=h[v],window.audioContext&&q();const A=h[v],Y=[".",",",":",";","!","?"].includes(A);v++,Y&&v<h.length?setTimeout(f,S+300+Math.random()*200):v<h.length?setTimeout(f,S):(r++,setTimeout(y,300))}};const p=T[r],h=p.getAttribute("data-text")||"",b=p.getAttribute("data-duration")||"0.4",S=parseFloat(b)*1e3/h.length;p.style.display==="none"&&(p.style.display="inline"),p.classList.add("active"),p.classList.add("typed"),p.textContent="";let v=0;f()}else m&&clearInterval(m),d&&(d.style.display="none"),o++,setTimeout(e,1500)},r=0;const d=i.querySelector(".chat-cursor");d&&(d.style.display="inline-block");let m=setInterval(()=>{u&&u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},500);y()}else{let y=function(){if(h<d.length){r.textContent+=d[h],window.audioContext&&q();const S=d[h],v=[".",",",":",";","!","?"].includes(S);if(h++,v&&h<d.length)setTimeout(y,f+300+Math.random()*200);else if(h<d.length)setTimeout(y,f);else{b&&clearInterval(b),p&&(p.style.display="none"),o++;const A=i.classList.contains("user-message")?2e3:1500;setTimeout(e,A)}}};const r=T[0],d=r.getAttribute("data-text")||"",m=r.getAttribute("data-duration")||"2",f=parseFloat(m)*1e3/d.length;r.classList.add("active"),r.classList.add("typed"),r.textContent="";const p=i.querySelector(".chat-cursor");p&&(p.style.display="inline-block");let h=0,b=null;u&&(b=setInterval(()=>{u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},500)),y()}else if(i.querySelector(".thinking-indicator"))o++,setTimeout(e,2500);else if(i.classList.contains("agents-joining")){let y=function(){d<r.length?(r[d].style.display="block",r[d].style.opacity="1",d++,setTimeout(y,200)):(o++,setTimeout(e,1500))};const r=i.querySelectorAll(".agent-join-notification");let d=0;y()}else if(i.classList.contains("planning-stages")){let y=function(){if(d<r.length){const m=r[d];m.style.display="block",m.style.opacity="1",u&&u.scrollTo({top:u.scrollHeight,behavior:"smooth"});const f=m.getAttribute("data-stage-delay")||"2500";setTimeout(()=>{const p=m.querySelector(".stage-indicator");p&&(p.textContent="☑",m.classList.add("completed")),d++,d<r.length?y():(o++,setTimeout(e,1e3))},parseInt(f))}else o++,setTimeout(e,1e3)};const r=i.querySelectorAll(".planning-stage-notification");let d=0;y()}else if(i.classList.contains("progress-indicator")){const y=i.querySelector(".progress-dots");if(y){let r=0;setInterval(()=>{r=(r+1)%4,y.textContent=".".repeat(r)},500)}o++,setTimeout(e,5e3)}else o++,setTimeout(e,1e3)};t.classList.add("active");const n=document.querySelector(".terminal-lines");n&&(n.style.transition="opacity 0.3s ease-out",n.style.opacity="0",setTimeout(()=>{n.style.display="none"},300));const l=t.querySelector(".chat-content-area"),s=l?l.querySelectorAll(".chat-message-line, .agents-joining, .planning-stages"):[];let o=0;console.log("Chat messages found:",s.length),s.forEach((i,u)=>{i.style.display="none",i.style.opacity="0"}),setTimeout(()=>{e()},500),setTimeout(e,1500)}},c)})}H()});
