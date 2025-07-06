document.addEventListener("DOMContentLoaded",()=>{const q=document.querySelector(".terminal-content"),$=JSON.parse(q.getAttribute("data-scenario"));function A(t){const c=document.querySelector(".terminal-lines"),s=t.phases.find(n=>n.type==="terminal");s&&s.items.forEach(n=>{if(n.type==="command"){const a=document.createElement("div");a.className="terminal-line",a.setAttribute("data-delay",n.delay),a.style.display="none",n.noType?a.innerHTML=`
              <span class="terminal-prompt">${n.prompt}</span>
              <span class="terminal-command">${n.text}</span>
            `:a.innerHTML=`
              <span class="terminal-prompt">${n.prompt}</span>
              <span class="terminal-command">
                <span class="typing-animation" data-text="${n.text}" data-duration="${n.duration}" style="opacity: 0;"></span>
              </span>
            `,c.appendChild(a)}else if(n.type==="loading"){const a=document.createElement("div");a.className="terminal-line loading-line",a.setAttribute("data-delay",n.delay),a.innerHTML=`<span class="terminal-loading">${n.text}</span>`,c.appendChild(a)}else if(n.type==="ascii"){const a=document.createElement("div");a.className="ascii-explosion",a.setAttribute("data-delay",n.delay),n.frames.forEach((i,o)=>{const e=document.createElement("pre");e.className=`explosion-frame frame-${o+1}`,o>0&&(e.style.display="none"),e.textContent=i,a.appendChild(e)}),c.appendChild(a)}else if(n.type==="success"){const a=document.createElement("div");a.className="terminal-line success-line",a.setAttribute("data-delay",n.delay),a.innerHTML=`<span class="terminal-success">${n.text}</span>`,c.appendChild(a)}else if(n.type==="finalPrompt"){const a=document.createElement("div");a.className="terminal-line",a.setAttribute("data-delay",n.delay),a.innerHTML=`
            <span class="terminal-prompt">$</span>
            <span class="terminal-cursor-blink">_</span>
          `,c.appendChild(a)}})}function M(t){const c=document.querySelector(".chat-interface"),s=t.phases.find(i=>i.type==="chat");if(!s)return;const n=`
        <div class="chat-stats-header">
          <div class="stats-row">
            <span class="stat-label">PROJECT:</span> <span class="stat-value">${s.stats.project}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FILES:</span> <span class="stat-value">${s.stats.files}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FUNCTIONS:</span> <span class="stat-value">${s.stats.functions}</span>
          </div>
          <div class="stats-row">
            <span class="stat-label">AGENTS:</span> <span class="stat-value">${s.stats.agents}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">CONTEXT:</span> <span class="stat-value">${s.stats.context}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">MODE:</span> <span class="stat-value">${s.stats.mode}</span>
          </div>
        </div>
        
        <div class="chat-scroll-container">
          <div class="chat-container">
            <div class="chat-header">
              <span class="chat-title">${s.chatTitle}</span>
              <span class="chat-status">● Connected</span>
            </div>
            <div class="chat-content-area"></div>
          </div>
        </div>
      `;c.innerHTML=n;const a=c.querySelector(".chat-content-area");s.messages.forEach((i,o)=>{if(i.type==="agent"){const e=N(i,t.agents[i.agent]);o>0&&(e.style.display="none"),a.appendChild(e)}else if(i.type==="user"){const e=D(i);e.style.display="none",a.appendChild(e)}else if(i.type==="thinking"){const e=k(i,t.agents[i.agent]);e.style.display="none",a.appendChild(e)}else if(i.type==="agentsJoining"){const e=I(i.agents);e.style.display="none",a.appendChild(e)}else if(i.type==="multipart"){const e=H(i,t.agents[i.agent]);e.style.display="none",a.appendChild(e)}else if(i.type==="planningAnnouncement"){const e=w(i,t.agents[i.agent]);e.style.display="none",a.appendChild(e)}else if(i.type==="planningStages"){const e=P(i.stages);e.style.display="none",a.appendChild(e)}else if(i.type==="branchCreation"){const e=j(i,t.agents[i.agent]);e.style.display="none",a.appendChild(e)}else if(i.type==="dashboardLink"){const e=O(i,t.agents[i.agent]);e.style.display="none",a.appendChild(e)}else if(i.type==="progressIndicator"){const e=F(i,t.agents[i.agent]);e.style.display="none",a.appendChild(e)}})}function N(t,c){const s=document.createElement("div");return s.className="chat-message-line",s.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor" style="display: none;"></span>
      `,s}function D(t){const c=document.createElement("div");return c.className="chat-message-line user-message",c.innerHTML=`
        <span class="chat-user-indicator">[You]</span>
        <span class="chat-text typing-animation-chat user-typing" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor user-cursor"></span>
      `,c}function k(t,c){const s=document.createElement("div");return s.className="chat-message-line",s.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="thinking-indicator">${t.text}</span>
      `,s}function I(t){const c=document.createElement("div");return c.className="agents-joining",t.forEach(s=>{const n=document.createElement("div");n.className="agent-join-notification",n.style.display="none",n.innerHTML=`<span class="join-indicator">→</span> ${s} has joined the conversation`,c.appendChild(n)}),c}function H(t,c){const s=document.createElement("div");return s.className="chat-message-line",s.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          ${t.parts.map((n,a)=>`<span class="typing-animation-chat" data-text="${n.text}" data-duration="${n.duration}"${a>0?' style="display: none;"':""}></span>`).join("")}
        </span>
        <span class="chat-cursor"></span>
      `,s}function w(t,c){const s=document.createElement("div");return s.className="chat-message-line planning-announcement",s.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text="${t.text}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,s}function P(t){const c=document.createElement("div");return c.className="planning-stages",t.forEach(s=>{const n=document.createElement("div");n.className="planning-stage-notification",n.style.display="none",n.setAttribute("data-stage-delay",s.delay),n.innerHTML=`
          <span class="stage-indicator">☐</span> 
          <span class="stage-text">${s.text}</span>
        `,c.appendChild(n)}),c}function j(t,c){const s=document.createElement("div");return s.className="chat-message-line branch-creation",s.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          <span class="typing-animation-chat" data-text="Creating branch: " data-duration="0.5"></span>
          <span class="typing-animation-chat branch-name" data-text="${t.branchName}" data-duration="0.5"></span>
          <span class="typing-animation-chat" data-text="..." data-duration="0.3"></span>
        </span>
        <span class="chat-cursor"></span>
      `,s}function O(t,c){const s=document.createElement("div");return s.className="chat-message-line dashboard-link",s.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat dashboard-url" data-text="${t.url}" data-duration="${t.duration}"></span>
        <span class="chat-cursor"></span>
      `,s}function F(t,c){const s=document.createElement("div");return s.className="chat-message-line progress-indicator",s.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">${t.text}<span class="progress-dots"></span></span>
      `,s}A($),M($);const S=document.querySelectorAll("[data-delay]");document.querySelector(".terminal-lines");const x=document.querySelector(".initial-prompt");document.querySelectorAll(".typing-animation, .typing-animation-chat").forEach(t=>{t.textContent=""});let m=null;const J=()=>{m||(m=new(window.AudioContext||window.webkitAudioContext),window.audioContext=m)};function b(){if(!m)return;const t=m.createOscillator(),c=m.createGain();t.connect(c),c.connect(m.destination),t.frequency.value=800+Math.random()*400,c.gain.value=.02,t.start(),t.stop(m.currentTime+.01)}document.addEventListener("click",J,{once:!0});function R(){S.forEach(i=>{i.style.display="none",i.classList.remove("animate"),i.style.opacity="0";const o=i.querySelector(".typing-animation");o&&(o.classList.remove("active"),o.style.borderRight="2px solid var(--terminal-green)",o.textContent="");const e=i.querySelector(".typing-animation-chat");e&&(e.classList.remove("active"),e.classList.remove("typed"),e.textContent="")});const t=document.querySelector(".explosion-frame.frame-1"),c=document.querySelector(".explosion-frame.frame-2");t&&(t.style.display="block"),c&&(c.style.display="none"),x&&(x.style.display="block",x.style.opacity="1");const s=document.querySelector(".terminal-lines");s&&(s.style.display="block",s.style.opacity="1");const n=document.querySelector(".chat-interface");n&&(n.classList.remove("active"),n.querySelectorAll(".typing-animation-chat").forEach(i=>{i.textContent="",i.classList.remove("typed")}));const a=document.querySelector(".branch-creation-section");if(a){a.style.display="none",a.style.opacity="0";const i=a.querySelector(".branch-status"),o=a.querySelector(".building-animation"),e=a.querySelector(".dashboard-link");i&&(i.style.display="none"),o&&(o.style.display="none"),e&&(e.style.display="none")}}function E(){R(),S.forEach(t=>{const c=parseInt(t.getAttribute("data-delay")||"0");setTimeout(()=>{c===2e3&&x&&(x.style.display="none"),t.style.display="block",t.style.opacity="1",t.classList.add("animate");const s=t.querySelector(".typing-animation");if(s){let n=function(){if(e<a.length){s.textContent+=a[e],window.audioContext&&b();const d=a[e],v=[".",",",":",";","!","?"].includes(d);e++,v&&e<a.length?setTimeout(n,o+300+Math.random()*200):e<a.length?setTimeout(n,o):setTimeout(()=>{s.style.borderRight="none"},200)}};const a=s.getAttribute("data-text")||"",i=s.getAttribute("data-duration")||"2.5",o=parseFloat(i)*1e3/a.length;s.style.opacity="1",s.classList.add("active"),s.textContent="";let e=0;n()}if(t.classList.contains("ascii-explosion")&&setTimeout(()=>{const n=t.querySelector(".frame-1"),a=t.querySelector(".frame-2");n&&(n.style.display="none"),a&&(a.style.display="block")},300),t.classList.contains("terminal-chat-section")&&setTimeout(()=>{const n=t.querySelector(".typing-animation-chat");n&&n.classList.add("active")},500),t.classList.contains("chat-interface")){let n=function(){if(o>=i.length){setTimeout(()=>{E()},3e4);return}const e=i[o];e.style.display="block",e.style.opacity="1";const d=t.querySelector(".chat-scroll-container");d&&setTimeout(()=>{d.scrollTo({top:d.scrollHeight,behavior:"smooth"})},100);const v=e.querySelectorAll(".typing-animation-chat:not(.typed)");if(v.length>0)if(v.length>1){let u=function(){if(l<v.length){let g=function(){if(f<y.length){p.textContent+=y[f],window.audioContext&&b();const L=y[f],G=[".",",",":",";","!","?"].includes(L);f++,G&&f<y.length?setTimeout(g,T+300+Math.random()*200):f<y.length?setTimeout(g,T):(l++,setTimeout(u,300))}};const p=v[l],y=p.getAttribute("data-text")||"",C=p.getAttribute("data-duration")||"0.4",T=parseFloat(C)*1e3/y.length;p.style.display==="none"&&(p.style.display="inline"),p.classList.add("active"),p.classList.add("typed"),p.textContent="";let f=0;g()}else h&&clearInterval(h),r&&(r.style.display="none"),o++,setTimeout(n,1500)},l=0;const r=e.querySelector(".chat-cursor");r&&(r.style.display="inline-block");let h=setInterval(()=>{d&&d.scrollTo({top:d.scrollHeight,behavior:"smooth"})},500);u()}else{let u=function(){if(y<r.length){l.textContent+=r[y],window.audioContext&&b();const T=r[y],f=[".",",",":",";","!","?"].includes(T);if(y++,f&&y<r.length)setTimeout(u,g+300+Math.random()*200);else if(y<r.length)setTimeout(u,g);else{C&&clearInterval(C),p&&(p.style.display="none"),o++;const L=e.classList.contains("user-message")?2e3:1500;setTimeout(n,L)}}};const l=v[0],r=l.getAttribute("data-text")||"",h=l.getAttribute("data-duration")||"2",g=parseFloat(h)*1e3/r.length;l.classList.add("active"),l.classList.add("typed"),l.textContent="";const p=e.querySelector(".chat-cursor");p&&(p.style.display="inline-block");let y=0,C=null;d&&(C=setInterval(()=>{d.scrollTo({top:d.scrollHeight,behavior:"smooth"})},500)),u()}else if(e.querySelector(".thinking-indicator"))o++,setTimeout(n,2500);else if(e.classList.contains("agents-joining")){let u=function(){r<l.length?(l[r].style.display="block",l[r].style.opacity="1",r++,setTimeout(u,200)):(o++,setTimeout(n,1500))};const l=e.querySelectorAll(".agent-join-notification");let r=0;u()}else if(e.classList.contains("planning-stages")){let u=function(){if(r<l.length){const h=l[r];h.style.display="block",h.style.opacity="1",d&&d.scrollTo({top:d.scrollHeight,behavior:"smooth"});const g=h.getAttribute("data-stage-delay")||"2500";setTimeout(()=>{const p=h.querySelector(".stage-indicator");p&&(p.textContent="☑",h.classList.add("completed")),r++,r<l.length?u():(o++,setTimeout(n,1e3))},parseInt(g))}else o++,setTimeout(n,1e3)};const l=e.querySelectorAll(".planning-stage-notification");let r=0;u()}else if(e.classList.contains("progress-indicator")){const u=e.querySelector(".progress-dots");if(u){let l=0;setInterval(()=>{l=(l+1)%4,u.textContent=".".repeat(l)},500)}o++,setTimeout(n,5e3)}else o++,setTimeout(n,1e3)};t.classList.add("active");const a=document.querySelector(".terminal-lines");a&&(a.style.transition="opacity 0.3s ease-out",a.style.opacity="0",setTimeout(()=>{a.style.display="none"},300));const i=t.querySelectorAll(".chat-message-line, .agents-joining, .planning-stages");let o=0;i.forEach((e,d)=>{d>0&&(e.style.display="none",e.style.opacity="0")}),setTimeout(n,1500)}},c)})}E()});
