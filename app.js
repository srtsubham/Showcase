document.addEventListener('DOMContentLoaded', () => {
    let a = null;
    if (typeof Lenis !== 'undefined') {
        a = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 2.5,
            smoothWheel: true
        });
        window.lns = a; //verson 5.4
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

    // --- CUSTOM SCROLLBAR ENGINE ---
    const scContainer = document.getElementById('sc');
    const scThumb = document.getElementById('st');
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
            
            scThumb.style.height = thumbH + 'px';
            scThumb.style.transform = `translateY(${pct * (winH - thumbH)}px)`;
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
        });

        window.addEventListener('mouseup', () => {
            isDraggingThumb = false;
            document.body.style.userSelect = '';
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