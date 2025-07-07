document.addEventListener("DOMContentLoaded",()=>{const S=document.querySelector(".terminal-content"),$=JSON.parse(S.getAttribute("data-scenarios")),b=JSON.parse(S.getAttribute("data-scenario-ids")),H=S.getAttribute("data-current-scenario");let x=b.indexOf(H);x===-1&&(x=0);function I(t){const c=document.querySelector(".terminal-lines"),a=t.phases.find(e=>e.type==="terminal");a&&a.items.forEach(e=>{if(e.type==="command"){const n=document.createElement("div");n.className="terminal-line",n.setAttribute("data-delay",e.delay),n.style.display="none",e.noType?n.innerHTML=`
              <span class="terminal-prompt">${e.prompt}</span>
              <span class="terminal-command">${e.text}</span>
            `:n.innerHTML=`
              <span class="terminal-prompt">${e.prompt}</span>
              <span class="terminal-command">
                <span class="typing-animation" data-text="${e.text}" data-duration="${e.duration}" style="opacity: 0;"></span>
              </span>
            `,c.appendChild(n)}else if(e.type==="loading"){const n=document.createElement("div");n.className="terminal-line loading-line",n.setAttribute("data-delay",e.delay),n.innerHTML=`<span class="terminal-loading">${e.text}</span>`,c.appendChild(n)}else if(e.type==="ascii"){const n=document.createElement("div");n.className="ascii-explosion",n.setAttribute("data-delay",e.delay),e.frames.forEach((o,s)=>{const l=document.createElement("pre");l.className=`explosion-frame frame-${s+1}`,s>0&&(l.style.display="none"),l.textContent=o,n.appendChild(l)}),c.appendChild(n)}else if(e.type==="success"){const n=document.createElement("div");n.className="terminal-line success-line",n.setAttribute("data-delay",e.delay),n.innerHTML=`<span class="terminal-success">${e.text}</span>`,c.appendChild(n)}else if(e.type==="finalPrompt"){const n=document.createElement("div");n.className="terminal-line",n.setAttribute("data-delay",e.delay),n.innerHTML=`
            <span class="terminal-prompt">$</span>
            <span class="terminal-cursor-blink">_</span>
          `,c.appendChild(n)}})}function k(t){const c=document.querySelector(".chat-interface"),a=t.phases.find(s=>s.type==="chat");if(!a)return;const e=`
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
      `;c.innerHTML=e;const n=c.querySelector(".chat-content-area");let o=null;a.messages.forEach((s,l)=>{if(s.type==="agent"){const i=D(s,t.agents[s.agent]);l>0&&(i.style.display="none"),o===s.agent&&i.classList.add("same-agent"),o=s.agent,n.appendChild(i)}else if(s.type==="user"){const i=w(s);i.style.display="none",o="user",n.appendChild(i)}else if(s.type==="thinking"){const i=P(s,t.agents[s.agent]);i.style.display="none",n.appendChild(i)}else if(s.type==="agentsJoining"){const i=j(s.agents);i.style.display="none",o=null,n.appendChild(i)}else if(s.type==="multipart"){const i=O(s,t.agents[s.agent]);i.style.display="none",o===s.agent&&i.classList.add("same-agent"),o=s.agent,n.appendChild(i)}else if(s.type==="planningAnnouncement"){const i=J(s,t.agents[s.agent]);i.style.display="none",o=null,n.appendChild(i)}else if(s.type==="planningStages"){const i=F(s.stages);i.style.display="none",o=null,n.appendChild(i)}else if(s.type==="branchCreation"){const i=R(s,t.agents[s.agent]);i.style.display="none",o=null,n.appendChild(i)}else if(s.type==="dashboardLink"){const i=G(s,t.agents[s.agent]);i.style.display="none",o=null,n.appendChild(i)}else if(s.type==="progressIndicator"){const i=U(s,t.agents[s.agent]);i.style.display="none",o=null,n.appendChild(i)}})}function D(t,c){const a=document.createElement("div");return a.className="chat-message-line",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor" style="display: none;"></span>
      `,a}function w(t){const c=document.createElement("div");return c.className="chat-message-line user-message",c.innerHTML=`
        <span class="chat-user-indicator">[You]</span>
        <span class="chat-text typing-animation-chat user-typing" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor user-cursor"></span>
      `,c}function P(t,c){const a=document.createElement("div");return a.className="chat-message-line",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="thinking-indicator">${t.text}</span>
      `,a}function j(t){const c=document.createElement("div");return c.className="agents-joining",t.forEach(a=>{const e=document.createElement("div");e.className="agent-join-notification",e.style.display="none",e.innerHTML=`<span class="join-indicator">→</span> ${a} has joined the conversation`,c.appendChild(e)}),c}function O(t,c){const a=document.createElement("div");return a.className="chat-message-line",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          ${t.parts.map((e,n)=>`<span class="typing-animation-chat" data-text="${e.text}" data-duration="${e.duration}"${n>0?' style="display: none;"':""}></span>`).join("")}
        </span>
        <span class="chat-cursor"></span>
      `,a}function J(t,c){const a=document.createElement("div");return a.className="chat-message-line planning-announcement",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,a}function F(t){const c=document.createElement("div");return c.className="planning-stages",t.forEach(a=>{const e=document.createElement("div");e.className="planning-stage-notification",e.style.display="none",e.setAttribute("data-stage-delay",a.delay),e.innerHTML=`
          <span class="stage-indicator">☐</span> 
          <span class="stage-text">${a.text}</span>
        `,c.appendChild(e)}),c}function R(t,c){const a=document.createElement("div");return a.className="chat-message-line branch-creation",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          <span class="typing-animation-chat" data-text="Creating branch: " data-duration="0.5"></span>
          <span class="typing-animation-chat branch-name" data-text="${t.branchName}" data-duration="0.5"></span>
          <span class="typing-animation-chat" data-text="..." data-duration="0.3"></span>
        </span>
        <span class="chat-cursor"></span>
      `,a}function G(t,c){const a=document.createElement("div");return a.className="chat-message-line dashboard-link",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat dashboard-url" data-text="${t.url}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,a}function U(t,c){const a=document.createElement("div");return a.className="chat-message-line progress-indicator",a.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">${t.text}<span class="progress-dots"></span></span>
      `,a}function A(t){document.querySelector(".terminal-lines").innerHTML=`
        <div class="terminal-line initial-prompt">
          <span class="terminal-prompt">$</span>
          <span class="initial-cursor"></span>
        </div>
      `,document.querySelector(".chat-interface").innerHTML="";const c=document.querySelector(".terminal-title");c&&(c.textContent=$[t].terminalTitle),I($[t]),k($[t])}A(b[x]);const M=document.querySelectorAll("[data-delay]");document.querySelector(".terminal-lines");const T=document.querySelector(".initial-prompt");document.querySelectorAll(".typing-animation, .typing-animation-chat").forEach(t=>{t.textContent=""});let m=null;const B=()=>{m||(m=new(window.AudioContext||window.webkitAudioContext),window.audioContext=m)};function E(){if(!m)return;const t=m.createOscillator(),c=m.createGain();t.connect(c),c.connect(m.destination),t.frequency.value=800+Math.random()*400,c.gain.value=.02,t.start(),t.stop(m.currentTime+.01)}document.addEventListener("click",B,{once:!0});function W(){M.forEach(o=>{o.style.display="none",o.classList.remove("animate"),o.style.opacity="0";const s=o.querySelector(".typing-animation");s&&(s.classList.remove("active"),s.style.borderRight="2px solid var(--terminal-green)",s.textContent="");const l=o.querySelector(".typing-animation-chat");l&&(l.classList.remove("active"),l.classList.remove("typed"),l.textContent="")});const t=document.querySelector(".explosion-frame.frame-1"),c=document.querySelector(".explosion-frame.frame-2");t&&(t.style.display="block"),c&&(c.style.display="none"),T&&(T.style.display="block",T.style.opacity="1");const a=document.querySelector(".terminal-lines");a&&(a.style.display="block",a.style.opacity="1");const e=document.querySelector(".chat-interface");e&&(e.classList.remove("active"),e.querySelectorAll(".typing-animation-chat").forEach(o=>{o.textContent="",o.classList.remove("typed")}));const n=document.querySelector(".branch-creation-section");if(n){n.style.display="none",n.style.opacity="0";const o=n.querySelector(".branch-status"),s=n.querySelector(".building-animation"),l=n.querySelector(".dashboard-link");o&&(o.style.display="none"),s&&(s.style.display="none"),l&&(l.style.display="none")}}function N(){W(),M.forEach(t=>{const c=parseInt(t.getAttribute("data-delay")||"0");setTimeout(()=>{c===2e3&&T&&(T.style.display="none"),t.style.display="block",t.style.opacity="1",t.classList.add("animate");const a=t.querySelector(".typing-animation");if(a){let e=function(){if(l<n.length){a.textContent+=n[l],window.audioContext&&E();const i=n[l],v=[".",",",":",";","!","?"].includes(i);l++,v&&l<n.length?setTimeout(e,s+300+Math.random()*200):l<n.length?setTimeout(e,s):setTimeout(()=>{a.style.borderRight="none"},200)}};const n=a.getAttribute("data-text")||"",o=a.getAttribute("data-duration")||"2.5",s=parseFloat(o)*1e3/n.length;a.style.opacity="1",a.classList.add("active"),a.textContent="";let l=0;e()}if(t.classList.contains("ascii-explosion")&&setTimeout(()=>{const e=t.querySelector(".frame-1"),n=t.querySelector(".frame-2");e&&(e.style.display="none"),n&&(n.style.display="block")},300),t.classList.contains("terminal-chat-section")&&setTimeout(()=>{const e=t.querySelector(".typing-animation-chat");e&&e.classList.add("active")},500),t.classList.contains("chat-interface")){let e=function(){if(s>=o.length){setTimeout(()=>{x=(x+1)%b.length,A(b[x]),N()},3e4);return}const l=o[s];l.style.display="block",l.style.opacity="1";const i=t.querySelector(".chat-scroll-container");i&&setTimeout(()=>{i.scrollTo({top:i.scrollHeight,behavior:"smooth"})},100);const v=l.querySelectorAll(".typing-animation-chat:not(.typed)");if(v.length>0)if(v.length>1){let u=function(){if(r<v.length){let g=function(){if(f<y.length){p.textContent+=y[f],window.audioContext&&E();const q=y[f],X=[".",",",":",";","!","?"].includes(q);f++,X&&f<y.length?setTimeout(g,L+300+Math.random()*200):f<y.length?setTimeout(g,L):(r++,setTimeout(u,300))}};const p=v[r],y=p.getAttribute("data-text")||"",C=p.getAttribute("data-duration")||"0.4",L=parseFloat(C)*1e3/y.length;p.style.display==="none"&&(p.style.display="inline"),p.classList.add("active"),p.classList.add("typed"),p.textContent="";let f=0;g()}else h&&clearInterval(h),d&&(d.style.display="none"),s++,setTimeout(e,1500)},r=0;const d=l.querySelector(".chat-cursor");d&&(d.style.display="inline-block");let h=setInterval(()=>{i&&i.scrollTo({top:i.scrollHeight,behavior:"smooth"})},500);u()}else{let u=function(){if(y<d.length){r.textContent+=d[y],window.audioContext&&E();const L=d[y],f=[".",",",":",";","!","?"].includes(L);if(y++,f&&y<d.length)setTimeout(u,g+300+Math.random()*200);else if(y<d.length)setTimeout(u,g);else{C&&clearInterval(C),p&&(p.style.display="none"),s++;const q=l.classList.contains("user-message")?2e3:1500;setTimeout(e,q)}}};const r=v[0],d=r.getAttribute("data-text")||"",h=r.getAttribute("data-duration")||"2",g=parseFloat(h)*1e3/d.length;r.classList.add("active"),r.classList.add("typed"),r.textContent="";const p=l.querySelector(".chat-cursor");p&&(p.style.display="inline-block");let y=0,C=null;i&&(C=setInterval(()=>{i.scrollTo({top:i.scrollHeight,behavior:"smooth"})},500)),u()}else if(l.querySelector(".thinking-indicator"))s++,setTimeout(e,2500);else if(l.classList.contains("agents-joining")){let u=function(){d<r.length?(r[d].style.display="block",r[d].style.opacity="1",d++,setTimeout(u,200)):(s++,setTimeout(e,1500))};const r=l.querySelectorAll(".agent-join-notification");let d=0;u()}else if(l.classList.contains("planning-stages")){let u=function(){if(d<r.length){const h=r[d];h.style.display="block",h.style.opacity="1",i&&i.scrollTo({top:i.scrollHeight,behavior:"smooth"});const g=h.getAttribute("data-stage-delay")||"2500";setTimeout(()=>{const p=h.querySelector(".stage-indicator");p&&(p.textContent="☑",h.classList.add("completed")),d++,d<r.length?u():(s++,setTimeout(e,1e3))},parseInt(g))}else s++,setTimeout(e,1e3)};const r=l.querySelectorAll(".planning-stage-notification");let d=0;u()}else if(l.classList.contains("progress-indicator")){const u=l.querySelector(".progress-dots");if(u){let r=0;setInterval(()=>{r=(r+1)%4,u.textContent=".".repeat(r)},500)}s++,setTimeout(e,5e3)}else s++,setTimeout(e,1e3)};t.classList.add("active");const n=document.querySelector(".terminal-lines");n&&(n.style.transition="opacity 0.3s ease-out",n.style.opacity="0",setTimeout(()=>{n.style.display="none"},300));const o=t.querySelectorAll(".chat-message-line, .agents-joining, .planning-stages");let s=0;o.forEach((l,i)=>{i>0&&(l.style.display="none",l.style.opacity="0")}),setTimeout(e,1500)}},c)})}N()});
