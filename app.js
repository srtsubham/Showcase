document.addEventListener('DOMContentLoaded', () => {
    let a = null;
    if (typeof Lenis !== 'undefined') {
        a = new Lenis({
            duration: 1.5,
            smooth: true
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
    pim.src = 'assets/images/avatar.avif';
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
    
    const twText = ["CREATIVE DEVELOPER,", "AI SYSTEMS ENGINEER,", "FULL STACK DEVELOPER,", "DEVOPS ASSOCIATE,"];
    let twIndex = 0;
    let twCharIndex = 0;
    let twIsDeleting = false;
    const twEl = document.getElementById('typewriter');

    function type() {
        if (!twEl) return;
        const current = twText[twIndex];
        if (twIsDeleting) {
            twCharIndex--;
        } else {
            twCharIndex++;
        }

        twEl.innerHTML = current.substring(0, twCharIndex) + '<span class="twCursor"></span>';

        let typeSpeed = 100;
        if (twIsDeleting) typeSpeed /= 2;

        if (!twIsDeleting && twCharIndex === current.length) {
            typeSpeed = 2000;
            twIsDeleting = true;
        } else if (twIsDeleting && twCharIndex === 0) {
            twIsDeleting = false;
            twIndex = (twIndex + 1) % twText.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (twEl) {
        type();
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
    
    const heroTrackEl = document.querySelector('.heroMarquee .marqueeTrack');
    let heroPos = 0;

    function g(h) {
        if (a) a.raf(h);

        f -= 0.02 + (b * 0.01);
        if (f <= -50) f += 50;
        if (f > 0) f -= 50;
        
        ts.forEach(t => t.style.transform = `translateX(${f}%)`);
        
        if (heroTrackEl) {
            heroPos -= 0.08;
            if (heroPos <= -50) heroPos += 50;
            heroTrackEl.style.transform = `translate3d(${heroPos}%, 0, 0)`;
        }

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
            } else {
                p.classList.remove('isActive');
            }
        });
        
        if (mDist < 150) {
            pp.classList.add('isVisible');
        } else {
            pp.classList.remove('isVisible');
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
});