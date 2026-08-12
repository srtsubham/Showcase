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
        a.on('scroll', (eventObj) => {
            b = eventObj.velocity;
        });
    }

    const c = document.querySelector('.middleMarquee .marqueeTrackSync');
    const d = document.querySelector('.middleMarquee');
    const e = document.querySelectorAll('.scrollSyncCard');
    const m = document.querySelector('.bentoSection');

    let f = 0;

    function g(h) {
        if (a) a.raf(h);

        f -= 0.04 + (b * 0.015);
        if (f <= -50) f += 50;
        if (f > 0) f -= 50;
        if (c) c.style.transform = `translateX(${f}%)`;

        const i = window.innerHeight;

        if (d) {
            const j = d.getBoundingClientRect();
            let k = (i - j.top + 100) / (j.height + 200);
            k = Math.max(0, Math.min(1, k));
            const l = (1 - k) * 100;
            d.style.clipPath = `inset(${l}% 0 0 0 round 4px)`;
        }

        if (m) {
            const n = m.getBoundingClientRect();
            let o = (i - n.top + 150) / (i * 0.8);
            o = Math.max(0, Math.min(1, o));
            const p = o * 100;
            e.forEach((q) => {
                q.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
            });
        }

        requestAnimationFrame(g);
    }
    requestAnimationFrame(g);

    const w = document.querySelectorAll('.animTarget');
    const x = new IntersectionObserver((y) => {
        y.forEach((z) => {
            if (z.isIntersecting) {
                z.target.classList.add('isVisible');
            } else {
                z.target.classList.remove('isVisible');
            }
        });
    }, { threshold: 0.1 });

    w.forEach((z) => {
        x.observe(z);
    });

    const r = document.getElementById('clockDisplay');
    function s() {
        const t = new Date();
        const u = t.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
        if (r) r.textContent = u;
    }
    
    setInterval(s, 1000);
    s();

    const v = document.getElementById('bottomDock');
    window.addEventListener('scroll', () => {
        if (!v) return;
        if (window.scrollY > 5) {
            v.classList.add('isVisible');
        } else {
            v.classList.remove('isVisible');
        }
    });
});