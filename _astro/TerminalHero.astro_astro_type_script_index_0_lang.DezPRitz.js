document.addEventListener("DOMContentLoaded",()=>{function T(n){return n?n.replace(/&/g,"&amp;").replace(/'/g,"&#39;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}const A=document.querySelector(".terminal-content"),E=JSON.parse(A.getAttribute("data-scenarios")),$=JSON.parse(A.getAttribute("data-scenario-ids")),k=A.getAttribute("data-current-scenario");let b=$.indexOf(k);b===-1&&(b=0);function P(n){const i=document.querySelector(".terminal-lines"),t=n.phases.find(l=>l.type==="terminal");t&&t.items.forEach(l=>{if(l.type==="command"){const a=document.createElement("div");a.className="terminal-line",a.setAttribute("data-delay",l.delay),a.style.display="none",l.noType?a.innerHTML=`
              <span class="terminal-prompt">${l.prompt}</span>
              <span class="terminal-command">${l.text}</span>
            `:a.innerHTML=`
              <span class="terminal-prompt">${l.prompt}</span>
              <span class="terminal-command">
                <span class="typing-animation" data-text='${T(l.text)}' data-duration='${l.duration}' style="opacity: 0;"></span>
              </span>
            `,i.appendChild(a)}else if(l.type==="loading"){const a=document.createElement("div");a.className="terminal-line loading-line",a.setAttribute("data-delay",l.delay),a.innerHTML=`<span class="terminal-loading">${l.text}</span>`,i.appendChild(a)}else if(l.type==="ascii"){const a=document.createElement("div");a.className="ascii-explosion",a.setAttribute("data-delay",l.delay),l.frames.forEach((c,e)=>{const r=document.createElement("pre");r.className=`explosion-frame frame-${e+1}`,e>0&&(r.style.display="none"),r.textContent=c,a.appendChild(r)}),i.appendChild(a)}else if(l.type==="success"){const a=document.createElement("div");a.className="terminal-line success-line",a.setAttribute("data-delay",l.delay),a.innerHTML=`<span class="terminal-success">${l.text}</span>`,i.appendChild(a)}else if(l.type==="finalPrompt"){const a=document.createElement("div");a.className="terminal-line",a.setAttribute("data-delay",l.delay),a.innerHTML=`
            <span class="terminal-prompt">$</span>
            <span class="terminal-cursor-blink">_</span>
          `,i.appendChild(a)}})}function j(n){const i=document.querySelector(".chat-interface"),t=n.phases.find(e=>e.type==="chat");if(!t)return;const l=`
        <div class="chat-stats-header">
          <div class="stats-row">
            <span class="stat-label">PROJECT:</span> <span class="stat-value">${t.stats.project}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FILES:</span> <span class="stat-value">${t.stats.files}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">FUNCTIONS:</span> <span class="stat-value">${t.stats.functions}</span>
          </div>
          <div class="stats-row">
            <span class="stat-label">AGENTS:</span> <span class="stat-value">${t.stats.agents}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">CONTEXT:</span> <span class="stat-value">${t.stats.context}</span>
            <span class="stat-separator">|</span>
            <span class="stat-label">MODE:</span> <span class="stat-value">${t.stats.mode}</span>
          </div>
        </div>
        
        <div class="chat-scroll-container">
          <div class="chat-container">
            <div class="chat-header">
              <span class="chat-title">${t.chatTitle}</span>
              <span class="chat-status">● Connected</span>
            </div>
            <div class="chat-content-area"></div>
          </div>
        </div>
      `;i.innerHTML=l;const a=i.querySelector(".chat-content-area");let c=null;t.messages.forEach((e,r)=>{if(e.type==="agent"){if(r===0&&e.agent==="BA"&&t.welcomeMessages){const s={...e};s.text=t.welcomeMessages[Math.floor(Math.random()*t.welcomeMessages.length)];const p=w(s,n.agents[e.agent]);p.style.display="none",a.appendChild(p)}else{const s=w(e,n.agents[e.agent]);s.style.display="none",c===e.agent&&s.classList.add("same-agent"),a.appendChild(s)}c=e.agent}else if(e.type==="user"){const s=O(e);s.style.display="none",c="user",a.appendChild(s)}else if(e.type==="thinking"){const s=J(e,n.agents[e.agent]);s.style.display="none",a.appendChild(s)}else if(e.type==="agentsJoining"){const s=F(e.agents);s.style.display="none",c=null,a.appendChild(s)}else if(e.type==="multipart"){const s=R(e,n.agents[e.agent]);s.style.display="none",c===e.agent&&s.classList.add("same-agent"),c=e.agent,a.appendChild(s)}else if(e.type==="planningAnnouncement"){const s=B(e,n.agents[e.agent]);s.style.display="none",c=null,a.appendChild(s)}else if(e.type==="planningStages"){const s=G(e.stages);s.style.display="none",c=null,a.appendChild(s)}else if(e.type==="branchCreation"){const s=U(e,n.agents[e.agent]);s.style.display="none",c=null,a.appendChild(s)}else if(e.type==="dashboardLink"){const s=W(e,n.agents[e.agent]);s.style.display="none",c=null,a.appendChild(s)}else if(e.type==="progressIndicator"){const s=X(e,n.agents[e.agent]);s.style.display="none",c=null,a.appendChild(s)}})}function w(n,i){const t=document.createElement("div");return t.className="chat-message-line",t.innerHTML=`
        <span class="chat-agent-indicator ${i.class}">[${n.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text='${T(n.text)}' data-duration='${n.duration}'></span>
        <span class="chat-cursor" style="display: none;"></span>
      `,t}function O(n){const i=document.createElement("div");return i.className="chat-message-line user-message",i.innerHTML=`
        <span class="chat-user-indicator">[You]</span>
        <span class="chat-text typing-animation-chat user-typing" data-text='${T(n.text)}' data-duration='${n.duration}'></span>
        <span class="chat-cursor user-cursor"></span>
      `,i}function J(n,i){const t=document.createElement("div");return t.className="chat-message-line",t.innerHTML=`
        <span class="chat-agent-indicator ${i.class}">[${n.agent}]</span>
        <span class="thinking-indicator">${n.text}</span>
      `,t}function F(n){const i=document.createElement("div");return i.className="agents-joining",n.forEach(t=>{const l=document.createElement("div");l.className="agent-join-notification",l.style.display="none",l.innerHTML=`<span class="join-indicator">→</span> ${t} has joined the conversation`,i.appendChild(l)}),i}function R(n,i){const t=document.createElement("div");return t.className="chat-message-line",t.innerHTML=`
        <span class="chat-agent-indicator ${i.class}">[${n.agent}]</span>
        <span class="chat-text">
          ${n.parts.map((l,a)=>`<span class="typing-animation-chat" data-text='${T(l.text)}' data-duration='${l.duration}'${a>0?' style="display: none;"':""}></span>`).join("")}
        </span>
        <span class="chat-cursor"></span>
      `,t}function B(n,i){const t=document.createElement("div");return t.className="chat-message-line planning-announcement",t.innerHTML=`
        <span class="chat-agent-indicator ${i.class}">[${n.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text='${T(n.text)}' data-duration='${n.duration}'></span>
        <span class="chat-cursor"></span>
      `,t}function G(n){const i=document.createElement("div");return i.className="planning-stages",n.forEach(t=>{const l=document.createElement("div");l.className="planning-stage-notification",l.style.display="none",l.setAttribute("data-stage-delay",t.delay),l.innerHTML=`
          <span class="stage-indicator">☐</span> 
          <span class="stage-text">${t.text}</span>
        `,i.appendChild(l)}),i}function U(n,i){const t=document.createElement("div");return t.className="chat-message-line branch-creation",t.innerHTML=`
        <span class="chat-agent-indicator ${i.class}">[${n.agent}]</span>
        <span class="chat-text">
          <span class="typing-animation-chat" data-text="Creating branch: " data-duration="0.5"></span>
          <span class="typing-animation-chat branch-name" data-text='${T(n.branchName)}' data-duration='0.5'></span>
          <span class="typing-animation-chat" data-text="..." data-duration="0.3"></span>
        </span>
        <span class="chat-cursor"></span>
      `,t}function W(n,i){const t=document.createElement("div");return t.className="chat-message-line dashboard-link",t.innerHTML=`
        <span class="chat-agent-indicator ${i.class}">[${n.agent}]</span>
        <span class="chat-text typing-animation-chat dashboard-url" data-text='${T(n.url)}' data-duration='${n.duration}'></span>
        <span class="chat-cursor"></span>
      `,t}function X(n,i){const t=document.createElement("div");return t.className="chat-message-line progress-indicator",t.innerHTML=`
        <span class="chat-agent-indicator ${i.class}">[${n.agent}]</span>
        <span class="chat-text">${n.text}<span class="progress-dots"></span></span>
      `,t}function D(n){document.querySelector(".terminal-lines").innerHTML=`
        <div class="terminal-line initial-prompt">
          <span class="terminal-prompt">$</span>
          <span class="initial-cursor"></span>
        </div>
      `,document.querySelector(".chat-interface").innerHTML="";const i=document.querySelector(".terminal-title");i&&(i.textContent=E[n].terminalTitle),P(E[n]),j(E[n])}D($[b]);const Y=document.querySelectorAll("[data-delay]");document.querySelector(".terminal-lines");const M=document.querySelector(".initial-prompt");document.querySelectorAll(".typing-animation, .typing-animation-chat").forEach(n=>{n.textContent=""});let v=null;const _=()=>{v||(v=new(window.AudioContext||window.webkitAudioContext),window.audioContext=v)};function N(){if(!v)return;const n=v.createOscillator(),i=v.createGain();n.connect(i),i.connect(v.destination),n.frequency.value=800+Math.random()*400,i.gain.value=.02,n.start(),n.stop(v.currentTime+.01)}document.addEventListener("click",_,{once:!0});function z(){Y.forEach(c=>{c.style.display="none",c.classList.remove("animate"),c.style.opacity="0";const e=c.querySelector(".typing-animation");e&&(e.classList.remove("active"),e.style.borderRight="2px solid var(--terminal-green)",e.textContent="");const r=c.querySelector(".typing-animation-chat");r&&(r.classList.remove("active"),r.classList.remove("typed"),r.textContent="")});const n=document.querySelector(".explosion-frame.frame-1"),i=document.querySelector(".explosion-frame.frame-2");n&&(n.style.display="block"),i&&(i.style.display="none"),M&&(M.style.display="block",M.style.opacity="1");const t=document.querySelector(".terminal-lines");t&&(t.style.display="block",t.style.opacity="1");const l=document.querySelector(".chat-interface");l&&(l.classList.remove("active"),l.querySelectorAll(".typing-animation-chat").forEach(c=>{c.textContent="",c.classList.remove("typed")}));const a=document.querySelector(".branch-creation-section");if(a){a.style.display="none",a.style.opacity="0";const c=a.querySelector(".branch-status"),e=a.querySelector(".building-animation"),r=a.querySelector(".dashboard-link");c&&(c.style.display="none"),e&&(e.style.display="none"),r&&(r.style.display="none")}}function I(){z();const n=document.querySelectorAll("[data-delay]"),i=document.querySelector(".initial-prompt");n.forEach(t=>{const l=parseInt(t.getAttribute("data-delay")||"0");setTimeout(()=>{l===2e3&&i&&(i.style.display="none"),t.style.display="block",t.style.opacity="1",t.classList.add("animate");const a=t.querySelector(".typing-animation");if(a){let c=function(){if(p<e.length){a.textContent+=e[p],window.audioContext&&N();const u=e[p],h=[".",",",":",";","!","?"].includes(u);p++,h&&p<e.length?setTimeout(c,s+300+Math.random()*200):p<e.length?setTimeout(c,s):setTimeout(()=>{a.style.borderRight="none"},200)}};const e=a.getAttribute("data-text")||"",r=a.getAttribute("data-duration")||"2.5",s=parseFloat(r)*1e3/e.length;a.style.opacity="1",a.classList.add("active"),a.textContent="";let p=0;c()}if(t.classList.contains("ascii-explosion")&&setTimeout(()=>{const c=t.querySelector(".frame-1"),e=t.querySelector(".frame-2");c&&(c.style.display="none"),e&&(e.style.display="block")},300),t.classList.contains("terminal-chat-section")&&setTimeout(()=>{const c=t.querySelector(".typing-animation-chat");c&&c.classList.add("active")},500),t.classList.contains("chat-interface")){t.classList.add("active");const c=document.querySelector(".terminal-lines");c&&(c.style.transition="opacity 0.3s ease-out",c.style.opacity="0",setTimeout(()=>{c.style.display="none"},300)),setTimeout(()=>{const e=t.querySelector(".chat-content-area"),r=e?e.querySelectorAll(".chat-message-line, .agents-joining, .planning-stages"):[];let s=0;console.log("Chat messages found:",r.length,"in",e),r.forEach((u,h)=>{u.style.display="none",u.style.opacity="0"}),setTimeout(()=>{p()},500);function p(){if(s>=r.length){setTimeout(()=>{b=(b+1)%$.length,D($[b]),I()},3e4);return}const u=r[s];u.style.display="block",u.style.opacity="1";const h=t.querySelector(".chat-scroll-container")||e;h&&setTimeout(()=>{h.scrollTo({top:h.scrollHeight,behavior:"smooth"})},100);const S=u.querySelectorAll(".typing-animation-chat:not(.typed)");if(S.length>0)if(S.length>1){let m=function(){if(o<S.length){let x=function(){if(C<g.length){y.textContent+=g[C],window.audioContext&&N();const H=g[C],K=[".",",",":",";","!","?"].includes(H);C++,K&&C<g.length?setTimeout(x,q+300+Math.random()*200):C<g.length?setTimeout(x,q):(o++,setTimeout(m,300))}};const y=S[o],g=y.getAttribute("data-text")||"",L=y.getAttribute("data-duration")||"0.4",q=parseFloat(L)*1e3/g.length;y.style.display==="none"&&(y.style.display="inline"),y.classList.add("active"),y.classList.add("typed"),y.textContent="";let C=0;x()}else f&&clearInterval(f),d&&(d.style.display="none"),s++,setTimeout(p,1500)},o=0;const d=u.querySelector(".chat-cursor");d&&(d.style.display="inline-block");let f=setInterval(()=>{h&&h.scrollTo({top:h.scrollHeight,behavior:"smooth"})},500);m()}else{let m=function(){if(g<d.length){o.textContent+=d[g],window.audioContext&&N();const q=d[g],C=[".",",",":",";","!","?"].includes(q);if(g++,C&&g<d.length)setTimeout(m,x+300+Math.random()*200);else if(g<d.length)setTimeout(m,x);else{L&&clearInterval(L),y&&(y.style.display="none"),s++;const H=u.classList.contains("user-message")?2e3:1500;setTimeout(p,H)}}};const o=S[0],d=o.getAttribute("data-text")||"",f=o.getAttribute("data-duration")||"2",x=parseFloat(f)*1e3/d.length;o.classList.add("active"),o.classList.add("typed"),o.textContent="";const y=u.querySelector(".chat-cursor");y&&(y.style.display="inline-block");let g=0,L=null;h&&(L=setInterval(()=>{h.scrollTo({top:h.scrollHeight,behavior:"smooth"})},500)),m()}else if(u.querySelector(".thinking-indicator"))s++,setTimeout(p,2500);else if(u.classList.contains("agents-joining")){let m=function(){d<o.length?(o[d].style.display="block",o[d].style.opacity="1",d++,setTimeout(m,200)):(s++,setTimeout(p,1500))};const o=u.querySelectorAll(".agent-join-notification");let d=0;m()}else if(u.classList.contains("planning-stages")){let m=function(){if(d<o.length){const f=o[d];f.style.display="block",f.style.opacity="1",h&&h.scrollTo({top:h.scrollHeight,behavior:"smooth"});const x=f.getAttribute("data-stage-delay")||"2500";setTimeout(()=>{const y=f.querySelector(".stage-indicator");y&&(y.textContent="☑",f.classList.add("completed")),d++,d<o.length?m():(s++,setTimeout(p,1e3))},parseInt(x))}else s++,setTimeout(p,1e3)};const o=u.querySelectorAll(".planning-stage-notification");let d=0;m()}else if(u.classList.contains("progress-indicator")){const m=u.querySelector(".progress-dots");if(m){let o=0;setInterval(()=>{o=(o+1)%4,m.textContent=".".repeat(o)},500)}s++,setTimeout(p,5e3)}else s++,setTimeout(p,1e3)}},100)}},l)})}I()});
