document.addEventListener('DOMContentLoaded', () => {
    let a = null;
    if (typeof Lenis !== 'undefined') {
        a = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 2.5,
            smoothWheel: true
        });
        window.lns = a; //Update version 6.1
    }

    let b = 0;
    if (a) {
        a.on('scroll', (e) => {
            b = e.velocity || 0;
        });
    }

    const ts = document.querySelectorAll('.marqueeTrackSync');
    const b1 = document.querySelector('.marqueeWrapper:not(.invertedWrapper) .middleMarquee');
    const b2 = document.querySelector('.invertedWrapper .middleMarquee');
    const crds = document.querySelectorAll('.scrollSyncCard');
    const bs = document.querySelector('.bentoSection');
    
    const pi = document.querySelectorAll('.scrollInteractive');
    const pp = document.createElement('div');
    pp.className = 'projectPreview';
    document.body.appendChild(pp);
    
    const im = new Map();
    let ca = null;
    
    setTimeout(() => {
        pi.forEach(p => {
            const u = p.getAttribute('data-preview');
            if (u) {
                const i = document.createElement('img');
                i.className = 'previewImage';
                i.src = u;
                i.style.opacity = '0';
                i.style.position = 'absolute';
                i.style.top = '0';
                i.style.left = '0';
                i.style.width = '100%';
                i.style.height = '100%';
                i.style.objectFit = 'cover';
                i.style.transition = 'opacity 0.2s ease';
                pp.appendChild(i);
                im.set(p, i);
            }
        });
    }, 2500);

    const lBtn = document.getElementById('openTreeBtn');
    const cBtn = document.getElementById('closeTreeBtn');
    const pnl = document.getElementById('linkTreePanel');
    
    if (lBtn && cBtn && pnl) {
        lBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            pnl.classList.add('isVisible'); 
        });
        cBtn.addEventListener('click', () => { 
            pnl.classList.remove('isVisible'); 
        });
    }
    
    const ta = ["CREATIVE DEVELOPER,", "AI SYSTEMS ENGINEER,", "FULL STACK DEVELOPER,", "DEVOPS ASSOCIATE,"];
    let tb = 0;
    let tc = ta[0].length;
    let td = true;
    const te = document.getElementById('typewriter');

    function tf() {
        if (!te) return;
        const tg = ta[tb];
        if (td) {
            tc--;
        } else {
            tc++;
        }

        te.innerHTML = tg.substring(0, tc) + '<span class="twCursor"></span>';

        let th = 100;
        if (td) th /= 2;

        if (!td && tc === tg.length) {
            th = 2000;
            td = true;
        } else if (td && tc === 0) {
            td = false;
            tb = (tb + 1) % ta.length;
            th = 500;
        }

        setTimeout(tf, th);
    }

    if (te) {
        setTimeout(tf, 2000);
    }

    const pSec = document.getElementById('pingSection');
    const pFol = document.getElementById('cursorFollower');

    let pMouseX = 0, pMouseY = 0;
    let pCurrX = 0, pCurrY = 0;
    let pInit = false;

    if (pSec && pFol) {
        setTimeout(() => {
            const r = pSec.getBoundingClientRect();
            pCurrX = r.width / 2;
            pCurrY = r.height / 2;
            pMouseX = pCurrX;
            pMouseY = pCurrY;
            pInit = true;
        }, 100);

        window.addEventListener('mousemove', (e) => {
            const r = pSec.getBoundingClientRect();
            let tX = e.clientX - r.left;
            let tY = e.clientY - r.top;

            const w = pFol.offsetWidth || 300;
            const h = pFol.offsetHeight || 170;

            pMouseX = Math.max(w/2, Math.min(tX, r.width - w/2));
            pMouseY = Math.max(h/2, Math.min(tY, r.height - h/2));
        });
    }

    let f = 0;

    function g(h) {
        if (a) a.raf(h);

        f -= 0.02 + ((b || 0) * 0.01);
        if (f <= -50) f += 50;
        if (f > 0) f -= 50;

        const wh = window.innerHeight;
        const isD = window.innerWidth > 991;

        const r1 = b1 ? b1.getBoundingClientRect() : null;
        const r2 = b2 ? b2.getBoundingClientRect() : null;
        const r3 = bs ? bs.getBoundingClientRect() : null;
        
        let cItem = null;
        let mDist = Infinity;

        if (isD) {
            pi.forEach(p => {
                const r = p.getBoundingClientRect();
                const d = Math.abs((r.top + r.height / 2) - wh / 2);
                if (d < mDist) {
                    mDist = d;
                    cItem = p;
                }
            });
        }

        const psRect = (pSec && pFol && pInit) ? pSec.getBoundingClientRect() : null;

        ts.forEach(t => t.style.transform = `translateX(${f}%)`);
        
        if (r1) {
            let p1 = Math.max(0, Math.min(1, (r1.top - 250) / (wh - 250)));
            b1.style.clipPath = `inset(calc(${p1 * 100}% - 2px) -2px -2px -2px round 6px)`;
        }
        
        if (r2) {
            let p2 = Math.max(0, Math.min(1, r2.top / wh));
            b2.style.clipPath = `inset(calc(${p2 * 100}% - 2px) -2px -2px -2px round 6px)`;
        }

        if (r3) {
            let p3 = Math.max(0, Math.min(1, (wh - r3.top + 150) / (wh * 0.8)));
            crds.forEach((crd) => {
                crd.style.clipPath = `polygon(0 0, ${p3 * 100}% 0, ${p3 * 100}% 100%, 0 100%)`;
            });
        }
        
        if (isD) {
            pi.forEach(p => {
                if(p === cItem && mDist < 150) {
                    p.classList.add('isActive');
                    const ti = im.get(p);
                    if (ca !== ti) {
                        if (ca) ca.style.opacity = '0';
                        if (ti) ti.style.opacity = '1';
                        ca = ti;
                    }
                } else {
                    p.classList.remove('isActive');
                }
            });
            
            if (mDist < 150) {
                pp.classList.add('isVisible');
            } else {
                pp.classList.remove('isVisible');
                if (ca) {
                    ca.style.opacity = '0';
                    ca = null;
                }
            }
        }

        if (psRect) {
            pCurrX += (pMouseX - pCurrX) * 0.015;
            pCurrY += (pMouseY - pCurrY) * 0.015;
            pFol.style.transform = `translate(calc(${pCurrX}px - 50%), calc(${pCurrY}px - 50%))`;
        }

        requestAnimationFrame(g);
    }
    requestAnimationFrame(g);

    const ee = document.querySelectorAll('.animTarget');
    const ff = new IntersectionObserver((gg) => {
        gg.forEach((hh) => {
            if (hh.isIntersecting) {
                hh.target.classList.add('isVisible');
            } else {
                hh.target.classList.remove('isVisible');
            }
        });
    }, { threshold: 0.1 });

    ee.forEach((hh) => {
        ff.observe(hh);
    });

    const ii = document.getElementById('clockDisplay');
    function jj() {
        const kk = new Date();
        const ll = kk.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
        if (ii) ii.textContent = ll;
    }
    
    setInterval(jj, 1000);
    jj();

    const mm = document.getElementById('bottomDock');
    window.addEventListener('scroll', () => {
        if (!mm) return;
        if (window.scrollY > 5) {
            mm.classList.add('isVisible');
        } else {
            mm.classList.remove('isVisible');
        }
        
        const fixedFooter = document.querySelector('.footerComponent');
        if (fixedFooter) {
            if (window.scrollY < window.innerHeight * 1.1) {
                fixedFooter.style.opacity = '0';
                fixedFooter.style.visibility = 'hidden';
            } else {
                fixedFooter.style.opacity = '1';
                fixedFooter.style.visibility = 'visible';
            }
        }
    });

    function initAnalytics() {
        const gaId = 'G-4VZZ4PWG3K'; 
        if (gaId && gaId !== 'YOUR_GA_MEASUREMENT_ID') {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            script.async = true;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', gaId);
        }
    }

    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    if (cookieBanner && acceptBtn && declineBtn) {
        const consent = localStorage.getItem('sr_cookie_consent');
        if (!consent) {
            setTimeout(() => {
                cookieBanner.classList.add('isVisible');
            }, 2000);
        } else if (consent === 'accepted') {
            initAnalytics();
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('sr_cookie_consent', 'accepted');
            cookieBanner.classList.remove('isVisible');
            initAnalytics();
        });

        declineBtn.addEventListener('click', () => {
            localStorage.setItem('sr_cookie_consent', 'declined');
            cookieBanner.classList.remove('isVisible');
        });
    }

    const scContainer = document.getElementById('sc');
    const scThumb = document.getElementById('st');
    const scTopContainer = document.getElementById('sc-top');
    const scTopThumb = document.getElementById('st-top');
    const resumeBtn = document.querySelector('.feedbackButton');
    let isDraggingThumb = false;
    let dragStartY = 0;
    let startScrollY = 0;

    if (scContainer && scThumb) {
        const updateThumb = () => {
            const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            const winH = window.innerHeight;
            const maxS = docH - winH;
            
            if (maxS <= 0) return;

            const currS = window.scrollY;
            const pct = currS / maxS;
            
            let thumbH = Math.max(winH * (winH / docH), 40);
            let thumbY = pct * (winH - thumbH);
            
            scThumb.style.height = thumbH + 'px';
            scThumb.style.transform = `translateY(${thumbY}px)`;
            
            if (scTopThumb) {
                scTopThumb.style.height = thumbH + 'px';
                scTopThumb.style.transform = `translateY(${thumbY}px)`;
            }
            
            if (scTopContainer && resumeBtn) {
                const rRect = resumeBtn.getBoundingClientRect();
                scTopContainer.style.clipPath = `inset(${rRect.top}px 0px ${winH - rRect.bottom}px 0px)`;
            }
        };

        window.addEventListener('scroll', updateThumb);
        window.addEventListener('resize', updateThumb);
        if (window.lns) {
            window.lns.on('scroll', updateThumb);
        }
        
        setTimeout(updateThumb, 500);
        updateThumb();

        scThumb.addEventListener('mousedown', (e) => {
            isDraggingThumb = true;
            dragStartY = e.clientY;
            startScrollY = window.scrollY;
            document.body.style.userSelect = 'none';
            scContainer.classList.add('is-dragging');
        });

        window.addEventListener('mouseup', () => {
            isDraggingThumb = false;
            document.body.style.userSelect = '';
            scContainer.classList.remove('is-dragging');
        });

        window.addEventListener('mousemove', (e) => {
            if (isDraggingThumb) {
                const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                const winH = window.innerHeight;
                const maxS = docH - winH;
                const thumbH = scThumb.offsetHeight;
                
                const maxThumbY = winH - thumbH;
                const deltaY = e.clientY - dragStartY;
                
                const pctChange = deltaY / maxThumbY;
                const scrollChange = pctChange * maxS;
                
                window.scrollTo(0, startScrollY + scrollChange);
            }
        });
    }
});

const credentialLedger = {
    cardOne: {
        title: 'FOUNDATIONAL LOGIC',
        certs: [
            { name: 'Python Backend Developer', issuer: 'BY FREECODECAMP', link: 'https://www.freecodecamp.org/certification/subh_sr/python-v9' },
            { name: 'Relational Database', issuer: 'BY FREECODECAMP', link: 'index.html' },
            { name: 'A2 English for Developers', issuer: 'BY FREECODECAMP', link: 'index.html' },
            { name: 'Responsive Web Design', issuer: 'BY FREECODECAMP', link: 'index.html' },
            { name: 'B1 English for Developers', issuer: 'BY FREECODECAMP', link: 'index.html' },
            { name: 'JavaScript Developer Full Course', issuer: 'BY FREECODECAMP', link: 'index.html' },
            { name: 'Career Essentials in Software Development', issuer: 'BY MICROSOFT AND LINKEDIN', link: 'https://www.linkedin.com/learning/certificates/f5a78db61d38521853f26bd7251d55b1c9b724d0f89484b4acec3aa860927aa4' }
        ]
    },
    cardTwo: {
        title: 'APPLIED AI LOGIC',
        certs: [
            { name: 'Getting Started with AI on Jetson Nano', issuer: 'BY NVIDIA', link: 'index.html' },
            { name: 'Claude with Amazon Bedrock', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Claude Code 101', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Claude 101', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Introduction to Claude Cowork', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Introduction to subagents', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Introduction to agent skills', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'AI Fluency for Nonprofits', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'AI Fluency: AI Capabilities and Limitations', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'AI Fluency for Students', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'AI Fluency: Framework & Foundations', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Claude with Google Vertex AI', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Claude Code in Action', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Model Context Protocol: Advanced Topics', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Introduction to Model Context Protocol', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Building with the Claude API', issuer: 'BY ANTHROPIC', link: 'index.html' },
            { name: 'Introduction to Agent Observability and Evaluations', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Foundation: Monitoring Production Agents', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Quickstart: LangSmith Fleet', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Quickstart: LangSmith Essentials', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Project: Deep Research with LangGraph', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Quickstart: LangGraph Essentials Python', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Foundation: Introduction to LangGraph Python', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Quickstart: LangChain Essentials Python', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Project: Ambient Agents with LangGraph', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Foundation: Building Reliable Agents', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'Projects: Deep Agents', issuer: 'BY LANGCHAIN', link: 'index.html' },
            { name: 'AI Agents Course', issuer: 'BY HUGGING FACE', link: 'index.html' },
            { name: 'Fundamentals of Agents', issuer: 'BY HUGGING FACE', link: 'index.html' }
        ]
    },
    cardThree: {
        title: 'CLOUD INFRASTRUCTURE',
        certs: [
            { name: 'AWS Identity and Access Management Basics', issuer: 'BY AWS', link: 'index.html' },
            { name: 'Getting Started with the AWS Cloud Essentials', issuer: 'BY AWS', link: 'index.html' }
        ]
    },
    cardFour: {
        title: 'ENTERPRISE EXECUTION',
        certs: [
            { name: 'Developing BPM Applications Using RHPAM', issuer: 'BY INFOSYS', link: 'index.html' },
            { name: 'Logistic Regression Using Python', issuer: 'BY INFOSYS', link: 'index.html' },
            { name: 'API Modelling and Design', issuer: 'BY INFOSYS', link: 'index.html' },
            { name: 'JavaScript Specialist Certification', issuer: 'BY INFOSYS', link: 'index.html' },
            { name: 'Java Programming Fundamentals', issuer: 'BY INFOSYS', link: 'index.html' },
            { name: 'Business Etiquette', issuer: 'BY TCS ION', link: 'index.html' },
            { name: 'Generative AI Essentials AI for All', issuer: 'BY TCS ION', link: 'index.html' },
            { name: 'Write Effective Resume and Cover Letter', issuer: 'BY TCS ION', link: 'index.html' },
            { name: 'Lifelong Professional Skills', issuer: 'BY IBM', link: 'index.html' }
        ]
    },
    cardFive: {
        title: 'PROFESSIONAL GROWTH',
        certs: [
            { name: 'AWS and Cloud Computing Intern', issuer: 'BY GRASTECH', link: 'index.html' },
            { name: 'Soft Skill Program', issuer: 'BY LEARNOVATE ENTERPRISES', link: 'index.html' },
            { name: 'Artificial Intelligence and Machine Learning', issuer: 'BY YBI FOUNDATION', link: 'index.html' },
            { name: 'Practical GitHub Code Search', issuer: 'BY LINKEDIN', link: 'index.html' },
            { name: 'Practical GitHub Actions', issuer: 'BY LINKEDIN', link: 'index.html' },
            { name: 'Programming Foundations: Beyond the Fundamentals', issuer: 'BY LINKEDIN', link: 'index.html' },
            { name: 'Introduction to Career Skills in Software Development', issuer: 'BY LINKEDIN', link: 'index.html' },
            { name: 'Programming Foundations: Fundamentals', issuer: 'BY LINKEDIN', link: 'index.html' }
        ]
    }
};

window.openCertModal = function(e, cardId) {
    if (e) e.preventDefault();
    const data = credentialLedger[cardId];
    if (!data) return;

    document.getElementById('certModalTitle').innerText = data.title;
    
    const listContainer = document.getElementById('certModalList');
    listContainer.innerHTML = '';
    
    listContainer.setAttribute('data-lenis-prevent', 'true');

    data.certs.forEach(cert => {
        const li = document.createElement('li');
        li.className = 'certItem';
        
        let linkHtml = cert.link ? `<a href="${cert.link}" target="_blank" class="certLink">VERIFY ↗</a>` : '';

        li.innerHTML = `
            <div class="certDetails">
                <span class="certName">${cert.name}</span>
                <span class="certIssuer">${cert.issuer}</span>
            </div>
            ${linkHtml}
        `;
        listContainer.appendChild(li);
    });

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (window.lns) window.lns.stop();

    document.getElementById('certModal').classList.add('isActive');
};

window.closeCertModal = function() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    
    if (window.lns) window.lns.start();

    const modal = document.getElementById('certModal');
    if (modal) modal.classList.remove('isActive');
};

const certModalElement = document.getElementById('certModal');
if (certModalElement) {
    certModalElement.addEventListener('click', (e) => {
        if (e.target === certModalElement) {
            closeCertModal();
        }
    });

    const closeBtn = certModalElement.querySelector('.modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeCertModal();
        });
    }
}

function deployFooterReveal() {
    const footer = document.querySelector('.footerComponent');
    const finalSection = document.querySelector('.honoursSectionWrapper');
    
    if (footer && finalSection) {
        const footerHeight = footer.offsetHeight;
        finalSection.style.marginBottom = `${footerHeight}px`;
    }
}

window.addEventListener('load', () => {
    deployFooterReveal();
    setTimeout(() => {
        const lw = document.querySelector('.loaderWrapper');
        if (lw) {
            lw.style.opacity = '0';
            setTimeout(() => lw.remove(), 800);
        }
    }, 2000);
});

window.addEventListener('resize', deployFooterReveal);

setTimeout(deployFooterReveal, 500);

const resumeModalTarget = document.getElementById('resumeModal');
const closeResumeTrigger = document.getElementById('closeResumeBtn');
const triggerElements = document.querySelectorAll('.openResumeTrigger');

if (resumeModalTarget && closeResumeTrigger) {
    triggerElements.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModalTarget.classList.add('activeMode');
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden'; 
            if (window.lns) window.lns.stop();
        });
    });

    closeResumeTrigger.addEventListener('click', () => {
        resumeModalTarget.classList.remove('activeMode');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = ''; 
        if (window.lns) window.lns.start();
    });

    resumeModalTarget.addEventListener('click', (e) => {
        if (e.target === resumeModalTarget) {
            resumeModalTarget.classList.remove('activeMode');
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            if (window.lns) window.lns.start();
        }
    });
}