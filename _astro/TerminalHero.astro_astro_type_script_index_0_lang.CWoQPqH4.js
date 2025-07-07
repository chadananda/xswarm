document.addEventListener("DOMContentLoaded",()=>{function x(t){return t?t.replace(/&/g,"&amp;").replace(/'/g,"&#39;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):""}const E=document.querySelector(".terminal-content"),q=JSON.parse(E.getAttribute("data-scenarios")),S=JSON.parse(E.getAttribute("data-scenario-ids")),k=E.getAttribute("data-current-scenario");let C=S.indexOf(k);C===-1&&(C=0);function D(t){const c=document.querySelector(".terminal-lines"),n=t.phases.find(s=>s.type==="terminal");n&&n.items.forEach(s=>{if(s.type==="command"){const e=document.createElement("div");e.className="terminal-line",e.setAttribute("data-delay",s.delay),e.style.display="none",s.noType?e.innerHTML=`
              <span class="terminal-prompt">${s.prompt}</span>
              <span class="terminal-command">${s.text}</span>
            `:e.innerHTML=`
              <span class="terminal-prompt">${s.prompt}</span>
              <span class="terminal-command">
                <span class="typing-animation" data-text='${x(s.text)}' data-duration='${s.duration}' style="opacity: 0;"></span>
              </span>
            `,c.appendChild(e)}else if(s.type==="loading"){const e=document.createElement("div");e.className="terminal-line loading-line",e.setAttribute("data-delay",s.delay),e.innerHTML=`<span class="terminal-loading">${s.text}</span>`,c.appendChild(e)}else if(s.type==="ascii"){const e=document.createElement("div");e.className="ascii-explosion",e.setAttribute("data-delay",s.delay),s.frames.forEach((l,a)=>{const o=document.createElement("pre");o.className=`explosion-frame frame-${a+1}`,a>0&&(o.style.display="none"),o.textContent=l,e.appendChild(o)}),c.appendChild(e)}else if(s.type==="success"){const e=document.createElement("div");e.className="terminal-line success-line",e.setAttribute("data-delay",s.delay),e.innerHTML=`<span class="terminal-success">${s.text}</span>`,c.appendChild(e)}else if(s.type==="finalPrompt"){const e=document.createElement("div");e.className="terminal-line",e.setAttribute("data-delay",s.delay),e.innerHTML=`
            <span class="terminal-prompt">$</span>
            <span class="terminal-cursor-blink">_</span>
          `,c.appendChild(e)}})}function w(t){const c=document.querySelector(".chat-interface"),n=t.phases.find(a=>a.type==="chat");if(!n)return;const s=`
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
      `;c.innerHTML=s;const e=c.querySelector(".chat-content-area");let l=null;n.messages.forEach((a,o)=>{if(a.type==="agent"){const i=P(a,t.agents[a.agent]);i.style.display="none",l===a.agent&&i.classList.add("same-agent"),l=a.agent,e.appendChild(i)}else if(a.type==="user"){const i=j(a);i.style.display="none",l="user",e.appendChild(i)}else if(a.type==="thinking"){const i=O(a,t.agents[a.agent]);i.style.display="none",e.appendChild(i)}else if(a.type==="agentsJoining"){const i=J(a.agents);i.style.display="none",l=null,e.appendChild(i)}else if(a.type==="multipart"){const i=F(a,t.agents[a.agent]);i.style.display="none",l===a.agent&&i.classList.add("same-agent"),l=a.agent,e.appendChild(i)}else if(a.type==="planningAnnouncement"){const i=R(a,t.agents[a.agent]);i.style.display="none",l=null,e.appendChild(i)}else if(a.type==="planningStages"){const i=G(a.stages);i.style.display="none",l=null,e.appendChild(i)}else if(a.type==="branchCreation"){const i=U(a,t.agents[a.agent]);i.style.display="none",l=null,e.appendChild(i)}else if(a.type==="dashboardLink"){const i=B(a,t.agents[a.agent]);i.style.display="none",l=null,e.appendChild(i)}else if(a.type==="progressIndicator"){const i=W(a,t.agents[a.agent]);i.style.display="none",l=null,e.appendChild(i)}})}function P(t,c){const n=document.createElement("div");return n.className="chat-message-line",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text='${x(t.text)}' data-duration='${t.duration}'></span>
        <span class="chat-cursor" style="display: none;"></span>
      `,n}function j(t){const c=document.createElement("div");return c.className="chat-message-line user-message",c.innerHTML=`
        <span class="chat-user-indicator">[You]</span>
        <span class="chat-text typing-animation-chat user-typing" data-text='${x(t.text)}' data-duration='${t.duration}'></span>
        <span class="chat-cursor user-cursor"></span>
      `,c}function O(t,c){const n=document.createElement("div");return n.className="chat-message-line",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="thinking-indicator">${t.text}</span>
      `,n}function J(t){const c=document.createElement("div");return c.className="agents-joining",t.forEach(n=>{const s=document.createElement("div");s.className="agent-join-notification",s.style.display="none",s.innerHTML=`<span class="join-indicator">→</span> ${n} has joined the conversation`,c.appendChild(s)}),c}function F(t,c){const n=document.createElement("div");return n.className="chat-message-line",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          ${t.parts.map((s,e)=>`<span class="typing-animation-chat" data-text='${x(s.text)}' data-duration='${s.duration}'${e>0?' style="display: none;"':""}></span>`).join("")}
        </span>
        <span class="chat-cursor"></span>
      `,n}function R(t,c){const n=document.createElement("div");return n.className="chat-message-line planning-announcement",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat" data-text='${x(t.text)}' data-duration='${t.duration}'></span>
        <span class="chat-cursor"></span>
      `,n}function G(t){const c=document.createElement("div");return c.className="planning-stages",t.forEach(n=>{const s=document.createElement("div");s.className="planning-stage-notification",s.style.display="none",s.setAttribute("data-stage-delay",n.delay),s.innerHTML=`
          <span class="stage-indicator">☐</span> 
          <span class="stage-text">${n.text}</span>
        `,c.appendChild(s)}),c}function U(t,c){const n=document.createElement("div");return n.className="chat-message-line branch-creation",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">
          <span class="typing-animation-chat" data-text="Creating branch: " data-duration="0.5"></span>
          <span class="typing-animation-chat branch-name" data-text='${x(t.branchName)}' data-duration='0.5'></span>
          <span class="typing-animation-chat" data-text="..." data-duration="0.3"></span>
        </span>
        <span class="chat-cursor"></span>
      `,n}function B(t,c){const n=document.createElement("div");return n.className="chat-message-line dashboard-link",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text typing-animation-chat dashboard-url" data-text='${x(t.url)}' data-duration='${t.duration}'></span>
        <span class="chat-cursor"></span>
      `,n}function W(t,c){const n=document.createElement("div");return n.className="chat-message-line progress-indicator",n.innerHTML=`
        <span class="chat-agent-indicator ${c.class}">[${t.agent}]</span>
        <span class="chat-text">${t.text}<span class="progress-dots"></span></span>
      `,n}function N(t){document.querySelector(".terminal-lines").innerHTML=`
        <div class="terminal-line initial-prompt">
          <span class="terminal-prompt">$</span>
          <span class="initial-cursor"></span>
        </div>
      `,document.querySelector(".chat-interface").innerHTML="";const c=document.querySelector(".terminal-title");c&&(c.textContent=q[t].terminalTitle),D(q[t]),w(q[t])}N(S[C]);const H=document.querySelectorAll("[data-delay]");document.querySelector(".terminal-lines");const T=document.querySelector(".initial-prompt");document.querySelectorAll(".typing-animation, .typing-animation-chat").forEach(t=>{t.textContent=""});let g=null;const X=()=>{g||(g=new(window.AudioContext||window.webkitAudioContext),window.audioContext=g)};function A(){if(!g)return;const t=g.createOscillator(),c=g.createGain();t.connect(c),c.connect(g.destination),t.frequency.value=800+Math.random()*400,c.gain.value=.02,t.start(),t.stop(g.currentTime+.01)}document.addEventListener("click",X,{once:!0});function Y(){H.forEach(l=>{l.style.display="none",l.classList.remove("animate"),l.style.opacity="0";const a=l.querySelector(".typing-animation");a&&(a.classList.remove("active"),a.style.borderRight="2px solid var(--terminal-green)",a.textContent="");const o=l.querySelector(".typing-animation-chat");o&&(o.classList.remove("active"),o.classList.remove("typed"),o.textContent="")});const t=document.querySelector(".explosion-frame.frame-1"),c=document.querySelector(".explosion-frame.frame-2");t&&(t.style.display="block"),c&&(c.style.display="none"),T&&(T.style.display="block",T.style.opacity="1");const n=document.querySelector(".terminal-lines");n&&(n.style.display="block",n.style.opacity="1");const s=document.querySelector(".chat-interface");s&&(s.classList.remove("active"),s.querySelectorAll(".typing-animation-chat").forEach(l=>{l.textContent="",l.classList.remove("typed")}));const e=document.querySelector(".branch-creation-section");if(e){e.style.display="none",e.style.opacity="0";const l=e.querySelector(".branch-status"),a=e.querySelector(".building-animation"),o=e.querySelector(".dashboard-link");l&&(l.style.display="none"),a&&(a.style.display="none"),o&&(o.style.display="none")}}function I(){Y(),H.forEach(t=>{const c=parseInt(t.getAttribute("data-delay")||"0");setTimeout(()=>{c===2e3&&T&&(T.style.display="none"),t.style.display="block",t.style.opacity="1",t.classList.add("animate");const n=t.querySelector(".typing-animation");if(n){let s=function(){if(o<e.length){n.textContent+=e[o],window.audioContext&&A();const i=e[o],u=[".",",",":",";","!","?"].includes(i);o++,u&&o<e.length?setTimeout(s,a+300+Math.random()*200):o<e.length?setTimeout(s,a):setTimeout(()=>{n.style.borderRight="none"},200)}};const e=n.getAttribute("data-text")||"",l=n.getAttribute("data-duration")||"2.5",a=parseFloat(l)*1e3/e.length;n.style.opacity="1",n.classList.add("active"),n.textContent="";let o=0;s()}if(t.classList.contains("ascii-explosion")&&setTimeout(()=>{const s=t.querySelector(".frame-1"),e=t.querySelector(".frame-2");s&&(s.style.display="none"),e&&(e.style.display="block")},300),t.classList.contains("terminal-chat-section")&&setTimeout(()=>{const s=t.querySelector(".typing-animation-chat");s&&s.classList.add("active")},500),t.classList.contains("chat-interface")){t.classList.add("active");const s=document.querySelector(".terminal-lines");s&&(s.style.transition="opacity 0.3s ease-out",s.style.opacity="0",setTimeout(()=>{s.style.display="none"},300)),setTimeout(()=>{const e=t.querySelector(".chat-content-area"),l=e?e.querySelectorAll(".chat-message-line, .agents-joining, .planning-stages"):[];let a=0;console.log("Chat messages found:",l.length,"in",e),l.forEach((i,u)=>{i.style.display="none",i.style.opacity="0"}),setTimeout(()=>{o()},500);function o(){if(a>=l.length){setTimeout(()=>{C=(C+1)%S.length,N(S[C]),I()},3e4);return}const i=l[a];i.style.display="block",i.style.opacity="1";const u=t.querySelector(".chat-scroll-container")||e;u&&setTimeout(()=>{u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},100);const b=i.querySelectorAll(".typing-animation-chat:not(.typed)");if(b.length>0)if(b.length>1){let y=function(){if(r<b.length){let f=function(){if(v<h.length){p.textContent+=h[v],window.audioContext&&A();const M=h[v],_=[".",",",":",";","!","?"].includes(M);v++,_&&v<h.length?setTimeout(f,$+300+Math.random()*200):v<h.length?setTimeout(f,$):(r++,setTimeout(y,300))}};const p=b[r],h=p.getAttribute("data-text")||"",L=p.getAttribute("data-duration")||"0.4",$=parseFloat(L)*1e3/h.length;p.style.display==="none"&&(p.style.display="inline"),p.classList.add("active"),p.classList.add("typed"),p.textContent="";let v=0;f()}else m&&clearInterval(m),d&&(d.style.display="none"),a++,setTimeout(o,1500)},r=0;const d=i.querySelector(".chat-cursor");d&&(d.style.display="inline-block");let m=setInterval(()=>{u&&u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},500);y()}else{let y=function(){if(h<d.length){r.textContent+=d[h],window.audioContext&&A();const $=d[h],v=[".",",",":",";","!","?"].includes($);if(h++,v&&h<d.length)setTimeout(y,f+300+Math.random()*200);else if(h<d.length)setTimeout(y,f);else{L&&clearInterval(L),p&&(p.style.display="none"),a++;const M=i.classList.contains("user-message")?2e3:1500;setTimeout(o,M)}}};const r=b[0],d=r.getAttribute("data-text")||"",m=r.getAttribute("data-duration")||"2",f=parseFloat(m)*1e3/d.length;r.classList.add("active"),r.classList.add("typed"),r.textContent="";const p=i.querySelector(".chat-cursor");p&&(p.style.display="inline-block");let h=0,L=null;u&&(L=setInterval(()=>{u.scrollTo({top:u.scrollHeight,behavior:"smooth"})},500)),y()}else if(i.querySelector(".thinking-indicator"))a++,setTimeout(o,2500);else if(i.classList.contains("agents-joining")){let y=function(){d<r.length?(r[d].style.display="block",r[d].style.opacity="1",d++,setTimeout(y,200)):(a++,setTimeout(o,1500))};const r=i.querySelectorAll(".agent-join-notification");let d=0;y()}else if(i.classList.contains("planning-stages")){let y=function(){if(d<r.length){const m=r[d];m.style.display="block",m.style.opacity="1",u&&u.scrollTo({top:u.scrollHeight,behavior:"smooth"});const f=m.getAttribute("data-stage-delay")||"2500";setTimeout(()=>{const p=m.querySelector(".stage-indicator");p&&(p.textContent="☑",m.classList.add("completed")),d++,d<r.length?y():(a++,setTimeout(o,1e3))},parseInt(f))}else a++,setTimeout(o,1e3)};const r=i.querySelectorAll(".planning-stage-notification");let d=0;y()}else if(i.classList.contains("progress-indicator")){const y=i.querySelector(".progress-dots");if(y){let r=0;setInterval(()=>{r=(r+1)%4,y.textContent=".".repeat(r)},500)}a++,setTimeout(o,5e3)}else a++,setTimeout(o,1e3)}},100)}},c)})}I()});
