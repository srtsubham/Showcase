document.addEventListener('DOMContentLoaded', () => {
    let a = null;
    if (typeof Lenis !== 'undefined') {
        a = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 2.5,
            smoothWheel: true
        });
    }

    let b = 0;
    if (a) {
        a.on('scroll', (e) => {
            b = e.velocity;
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
    const pim = document.createElement('img');
    pim.className = 'previewImage';
    pim.src = 'assets/avatar.png';
    pp.appendChild(pim);
    document.body.appendChild(pp);

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

        f -= 0.02 + (b * 0.01);
        if (f <= -50) f += 50;
        if (f > 0) f -= 50;
        
        ts.forEach(t => t.style.transform = `translateX(${f}%)`);

        const wh = window.innerHeight;

        if (b1) {
            const r1 = b1.getBoundingClientRect();
            let p1 = (r1.top - 250) / (wh - 250);
            p1 = Math.max(0, Math.min(1, p1));
            b1.style.clipPath = `inset(calc(${p1 * 100}% - 2px) -2px -2px -2px round 6px)`;
        }
        
        if (b2) {
            const r2 = b2.getBoundingClientRect();
            let p2 = r2.top / wh;
            p2 = Math.max(0, Math.min(1, p2));
            b2.style.clipPath = `inset(calc(${p2 * 100}% - 2px) -2px -2px -2px round 6px)`;
        }

        if (bs) {
            const r = bs.getBoundingClientRect();
            let p = (wh - r.top + 150) / (wh * 0.8);
            p = Math.max(0, Math.min(1, p));
            crds.forEach((crd) => {
                crd.style.clipPath = `polygon(0 0, ${p * 100}% 0, ${p * 100}% 100%, 0 100%)`;
            });
        }
        
        if (window.innerWidth > 991) {
            let cItem = null;
            let mDist = Infinity;
            pi.forEach(p => {
                const r = p.getBoundingClientRect();
                const d = Math.abs((r.top + r.height/2) - wh/2);
                if(d < mDist) {
                    mDist = d;
                    cItem = p;
                }
            });
            
            pi.forEach(p => {
                if(p === cItem && mDist < 150) {
                    p.classList.add('isActive');
                    const pLink = p.getAttribute('data-preview');
                    if(pLink) pim.src = pLink;
                } else {
                    p.classList.remove('isActive');
                }
            });
            
            if (mDist < 150) {
                pp.classList.add('isVisible');
            } else {
                pp.classList.remove('isVisible');
            }
        }

        if (pSec && pFol && pInit) {
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
});

const credentialLedger = {
    'cardOne': {
        title: 'SYSTEM ARCHITECTURE',
        certs: [
            { name: 'Java Programming Fundamentals', issuer: 'BY INFOSYS SPRINGBOARD', link: 'https://linkedin.com' },
            { name: 'Core Backend System Logic', issuer: 'BY FREECODECAMP', link: '' }
        ]
    },
    'cardTwo': {
        title: 'MACHINE LEARNING',
        certs: [
            { name: 'Model Context Protocol Engineering', issuer: 'BY ANTHROPIC', link: 'https://linkedin.com' },
            { name: 'Fundamentals of Deep Learning', issuer: 'BY NVIDIA', link: '' }
        ]
    },
    'cardThree': {
        title: 'CLOUD INFRASTRUCTURE',
        certs: [
            { name: 'AWS Cloud Essentials', issuer: 'BY AWS', link: 'https://linkedin.com' }
        ]
    },
    'cardFour': {
        title: 'AI ETHICS & LOGIC',
        certs: [
            { name: 'AI Safety and Alignment', issuer: 'BY ANTHROPIC', link: '' }
        ]
    },
    'cardFive': {
        title: 'SPECIALIZED METRICS',
        certs: [
            { name: 'AI Prediction Model on Extreme Weather', issuer: 'BY IJFMR JOURNAL', link: 'https://linkedin.com' }
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

    document.getElementById('certModal').classList.add('isActive');
};

function deployFooterReveal() {
    const footer = document.querySelector('.footerComponent');
    const finalSection = document.querySelector('.honoursSectionWrapper');
    
    if (footer && finalSection) {
        
        const footerHeight = footer.offsetHeight;
        
        
        finalSection.style.marginBottom = `${footerHeight}px`;
    }
}

window.addEventListener('load', deployFooterReveal);
window.addEventListener('resize', deployFooterReveal);

setTimeout(deployFooterReveal, 500);



window.addEventListener('scroll', () => {
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

const resumeModalTarget = document.getElementById('resumeModal');
const closeResumeTrigger = document.getElementById('closeResumeBtn');
const triggerElements = document.querySelectorAll('.openResumeTrigger');

if (resumeModalTarget && closeResumeTrigger) {
    triggerElements.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModalTarget.classList.add('activeMode');
            document.body.style.overflow = 'hidden'; 
        });
    });

    closeResumeTrigger.addEventListener('click', () => {
        resumeModalTarget.classList.remove('activeMode');
        document.body.style.overflow = 'auto'; 
    });

    resumeModalTarget.addEventListener('click', (e) => {
        if (e.target === resumeModalTarget) {
            resumeModalTarget.classList.remove('activeMode');
            document.body.style.overflow = 'auto';
        }
    });
}