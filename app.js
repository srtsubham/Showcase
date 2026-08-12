document.addEventListener('DOMContentLoaded', () => {
    if (typeof Lenis !== 'undefined') {
        const c = new Lenis({
            duration: 1.5,
            smooth: true
        });

        function d(e) {
            c.raf(e);
            requestAnimationFrame(d);
        }
        requestAnimationFrame(d);
    }

    const f = document.querySelectorAll('.projectItem, .bentoCard, .animTarget');

    const g = new IntersectionObserver((h) => {
        h.forEach((i) => {
            if (i.isIntersecting) {
                i.target.classList.add('isVisible');
            }
        });
    }, { threshold: 0.1 });

    f.forEach((j) => {
        g.observe(j);
    });

    const k = document.getElementById('clockDisplay');
    function l() {
        const m = new Date();
        const n = m.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
        if (k) {
            k.textContent = n;
        }
    }
    
    setInterval(l, 1000);
    l();

    const o = document.getElementById('bottomDock');
    
    window.addEventListener('scroll', () => {
        if (!o) return;
        if (window.scrollY > 5) {
            o.classList.add('isVisible');
        } else {
            o.classList.remove('isVisible');
        }
    });
});