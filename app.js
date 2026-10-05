document.addEventListener('DOMContentLoaded', () => {
    let a = null;
    if (typeof Lenis !== 'undefined') {
        a = new Lenis({
            lerp: 0.05,
            wheelMultiplier: 2.5,
            smoothWheel: true 
        });
        window.lns = a;
    }

    let b = 0;
    if (a) {
        a.on('scroll', (e) => {   //Version 19.1
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

        const r1 = b1 ? b1.getBoundingClientRect() : null;
        const r2 = b2 ? b2.getBoundingClientRect() : null;
        const r3 = bs ? bs.getBoundingClientRect() : null;
        
        let cItem = null;
        let mDist = Infinity;

        pi.forEach(p => {
            const r = p.getBoundingClientRect();
            const d = Math.abs((r.top + r.height / 2) - wh / 2);
            if (d < mDist) {
                mDist = d;
                cItem = p;
            }
        });

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
        const topHeader = document.querySelector('.topHeader');
        
        if (fixedFooter) {
            if (window.scrollY < window.innerHeight * 1.1) {
                fixedFooter.style.opacity = '0';
                fixedFooter.style.visibility = 'hidden';
                if(topHeader) topHeader.classList.remove('isHidden');
            } else {
                fixedFooter.style.opacity = '1';
                fixedFooter.style.visibility = 'visible';
                if(topHeader) topHeader.classList.add('isHidden');
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

        scThumb.addEventListener('touchstart', (e) => {
            isDraggingThumb = true;
            dragStartY = e.touches[0].clientY;
            startScrollY = window.scrollY;
            document.body.style.userSelect = 'none';
            scContainer.classList.add('is-dragging');
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDraggingThumb = false;
            document.body.style.userSelect = '';
            scContainer.classList.remove('is-dragging');
        });

        window.addEventListener('touchmove', (e) => {
            if (isDraggingThumb) {
                if (e.cancelable) e.preventDefault();
                const docH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                const winH = window.innerHeight;
                const maxS = docH - winH;
                const thumbH = scThumb.offsetHeight;
                
                const maxThumbY = winH - thumbH;
                const deltaY = e.touches[0].clientY - dragStartY;
                
                const pctChange = deltaY / maxThumbY;
                const scrollChange = pctChange * maxS;
                
                window.scrollTo(0, startScrollY + scrollChange);
            }
        }, { passive: false });
    }

    const mobileAvatar = document.querySelector('.heroPortrait');
    if (mobileAvatar) {
        mobileAvatar.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                mobileAvatar.classList.toggle('isActiveMobile');
            }
        });
    }
});

const credentialLedger = {
    cardOne: {
        title: 'FOUNDATIONAL LOGIC',
        certs: [
            { name: 'Python Backend Developer', issuer: 'BY FREECODECAMP', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Ffreecodecamp.org%2Fcertification%2Fsubh_sr%2Fpython-v9&urlhash=g024&mt=pyfACUFD4WGBDXV5re869mczvhSfXQOkEf5Fz7_kI1kz5mWjvtaCIDs3aVLtrAqwuRQRkNFEvHqCVBOBlCkGcCmJbctp&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Relational Database', issuer: 'BY FREECODECAMP', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Ffreecodecamp.org%2Fcertification%2Fsubh_sr%2Frelational-databases-v9&urlhash=TkW8&mt=V39defQmwxgGnpgC7C_UvosTugPL5RunMHOZDJttlx8wGk1U13pXL0bx9oVA1pewU69ieU-j9T5X6x9i_1yDuSoOdpcR&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'A2 English for Developers', issuer: 'BY FREECODECAMP', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Ffreecodecamp.org%2Fcertification%2Fsubh_sr%2Fa2-english-for-developers&urlhash=MuNB&mt=9zygjHjjSMYM7mrT_8lOS4FsZU1LCx8OxfQ1EbOtukvykpTM4e_5Gr465rdx_BIia2OcJZMLO9DhVMN448dByiaK1SWF&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Responsive Web Design', issuer: 'BY FREECODECAMP', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Ffreecodecamp.org%2Fcertification%2Fsubh_sr%2Fresponsive-web-design-v9&urlhash=beoA&mt=yfji-tBjCT5ZltvMBhaISoTV_XIHlB-Hz3UCIz5ujDHr_FObXuDAitKRoZXfWOWNCQjet_7GwjXa3T7euKDVMXIXf3E4&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'B1 English for Developers', issuer: 'BY FREECODECAMP', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Ffreecodecamp.org%2Fcertification%2Fsubh_sr%2Fb1-english-for-developers&urlhash=Om8Y&mt=LadxjHzcCjyhaaIKuVp1MRD8hPqrOZLm_s51iG6kqAclB_OX_nZRZs1n8W-2GZsf79AXaap0TgeVEZ_7kMgmjtwwudoY&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'JavaScript Developer', issuer: 'BY FREECODECAMP', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Ffreecodecamp.org%2Fcertification%2Fsubh_sr%2Fjavascript-v9&urlhash=4kva&mt=JSsZpobFd8lKwL_eAO0J77o_QW657e1dpQteQ3QbWGwO0T0H8Rflk8OeJCstFu4ijRp5LHC8l1vaai7oyyHGYnAvOqKk&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Career Essentials in Software Development', issuer: 'BY MICROSOFT AND LINKEDIN', link: 'https://www.linkedin.com/learning/certificates/f5a78db61d38521853f26bd7251d55b1c9b724d0f89484b4acec3aa860927aa4/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' }
        ]
    },
    cardTwo: {
        title: 'APPLIED AI LOGIC',
        certs: [
            
            { name: 'Getting Started with AI on Jetson Nano', issuer: 'BY NVIDIA', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Flearn.Nvidia.com%2Fcertificates%3Fid%3DIzDdHGBPRqak96cdsynsFA&urlhash=pZ3l&mt=19Kfzr1rZ53s0E6fqhncLN6bTd9b5QkGZbRWvYA1OjTHoDObEWwoZUcZBplDQIE5TJKJ6DWiAwmeQkTXCqTVm8YeOsGI&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'AI Agents Course', issuer: 'BY HUGGING FACE', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fhuggingface.co%2Fspaces%2Fsrtsubham%2FFinal_Assignment_Template&urlhash=Nnf6&mt=KGrGjG18-Qg2foNMMINe7vBSVbh4kKBqCzZl4780tNRFdwLtcggOcymc4OvRqaLuMluQJQIqsyIXbznK6FTS9DsHxoH5&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Fundamentals of Agents', issuer: 'BY HUGGING FACE', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fhuggingface.co%2Fspaces%2Fsrtsubham%2FFinal_Assignment_Template&urlhash=Nnf6&mt=r_koVVAY16rmM1VXN_3jBvTpgKdYlf34MdJJfi6Pr7pa8M4o8yr2cDIa5QrEOspl7ab51hXwG-7Mq82hTL14172VhzxW&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Claude with Amazon Bedrock', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2F5batiutw487t&urlhash=3IZm&mt=UyxrOrabal5Rl-mMjHGTzS-zqj33mxlOs8QqQDihpJHAP3JF7RigbxVjfHRsyR7NAyCzIVTpNHRqoGZyMjyOPMhTRE76&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Claude Code 101', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fu4xwdsgmkjvb&urlhash=QHf1&mt=kNbdkH4nqakMS6VABHaDn1TUC4uUhN2sywEJ3T7nlk4S11fzNA3m3iUcz4kQZxnWfq5t2k3thK_3QJKRipsOkTJVYdEi&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Claude 101', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fr55e6vuvzx6c&urlhash=2XLG&mt=akpMaPH1zu0Q32JqF_78vtdP2f3DmUG-0j-DKrVyhcIJQa4b3RC9108Ci-HPwbK9L8bvf3GD7tCK8Pn_eVDP2VfRpG3a&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Introduction to Claude Cowork', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Frvjvdyz3j6e2&urlhash=TSQP&mt=8RMBVqt7F9FmvNnu9Otd9zUzm5pZFEhELV13-RSZ1Y_kYFLVOvhnWohwaEv0uS6Qj2E85xsgdmX6WH6Dq6giqhzqt373&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Introduction to subagents', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fw6okrtko4vdm&urlhash=qZsg&mt=37nZnlT42h65gZ4xewqmaH4WFtCpVQhXc657RDL4k5tZO6F_jjZgn8s-5k2IawcbBfhrtT4AbDYTFKu1yBbDLh_odfeT&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Introduction to agent skills', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fx53zfg9zkzep&urlhash=P8wh&mt=b-uZXIsRl8FOdtALlBu0DrMRgi4wEXQrLjrzTimO1Gn6NdXlw6f2PsD0kjh6QRFh_-0NjTYgzWiJ1KJ_SjzOrkeFp1B8&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'AI Fluency for Nonprofits', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fepfkbyzis3jy&urlhash=dDBs&mt=J7iHF6RmJpBthErN2nI18EI_xcLWONdPHZN_vGwjKHDPNX-w_BpPGMgXLt5qmQJROlbGzQMqH0_wHRBtlntzR0Nvb86D&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'AI Fluency: AI Capabilities and Limitations', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2F6dp36cew8w44&urlhash=N7we&mt=hEXkl2AqKD_Ie--qMdG_h3nn9lGOpd3w3lYv5okcYi3stpPRIKen6ZX-0UZ8G6DOZVSs2uiXmtRQjCAhSdEaw5AcwLr-&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'AI Fluency for Students', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fe9wgydk36qmv&urlhash=_ZO8&mt=s3iXD58vuQOGyfUohwRkHRuWBMmYEw3-RDeLGVtsIBvviIIzLpA-9YwULGiOX4KxbSoBB_yeBiY6m-gcJtuz1WEXRjaL&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'AI Fluency: Framework & Foundations', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fc6z468asw4g3&urlhash=LCKf&mt=VnshZYbae-9Z965u2z-vXdM22Oq_hrhmnAG9VXHcpxEHBHnc2r7oD4msRO5sb8VOnXMbhnYA-CrcdH1uABiC7BXz_1dB&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Claude with Google Vertex AI', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2F8asbbcgtunfe&urlhash=21WR&mt=wbS-RF5A7XtWyCQ0I6l5CWY0Jryz1l50iIps1TuxNq6Ot55VC0zISZaHa-RDk6G3xpy9WVCVvpReCxcb67HyWal08MIO&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Claude Code in Action', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fd25wmxw9n4xr&urlhash=p6xh&mt=4dbDU9vVmZGGEogszJI1ju19ChCZCWS9xUqrsQX443d0lHGL9_zapW48FM7AFLAahZjlunewdz3-PBBknptnle-cmR2f&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Model Context Protocol: Advanced Topics', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fwrrwm5dfczub&urlhash=xQBI&mt=ZnAu1cCDOmBl86lL2D6ar0DmSSMem17wiZRawOjCUwuMp5y7nmDUrAC_gQLkCr5I5wUt6FlKZgFE5qWrFssILW3bRnq0&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Introduction to Model Context Protocol', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2F8e3orbpv2d4a&urlhash=5p_J&mt=8bKcWk3vSFFpwPXIe51rbx4YDxzE9BvahlIdJm_yOZwfaa-R6mr7LkSTNTmQlOSl-OMrb_BanEjP2b5cZD54JKKBlrC0&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Building with the Claude API', issuer: 'BY ANTHROPIC', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.skilljar.com%2Fc%2Fahsgo4otnbup&urlhash=1Lwk&mt=ZoPkgA_dkhW1fe78_mgPzZ2UwtyX-NIyl3RPl0Xp5C8Djm82l8XdUihtHx6RspHO2N_GGgz9MBAWrYsaiBy2v9B22svd&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Introduction to Agent Observability and Evaluations', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Ftrrhidtqsk&urlhash=5HeA&mt=06Bz7BojWg2zu7QtVwP2RSsdIz0Rcct1mtluu7LQW9oR6C4bDxNdXwu64rl23OOelUmLuNLtPazwKPR1O4ZkpzeVFQXr&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Foundation: Monitoring Production Agents', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fatifx3oreg&urlhash=BhSI&mt=ttQNze19OMYknzULLUvquMzt9p69SFseL7IDAhRa8krMWMBafLTeMdojRXRn2SPgeCA-g4OtX4pKX41ZnWjLD7SwixBG&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Quickstart: LangSmith Fleet', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fxqb5vlpxze&urlhash=JWiD&mt=14qLfI_3Zr4ygEBHj3vPRZf8GWHUlaewOSGuMlKVbQAccjih9Xlp7TEfO7I4kM02ieEP0GOS7uAB7cl6jkeJNwg_6aWb&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Quickstart: LangSmith Essentials', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fxu2tblnqkm&urlhash=lBA_&mt=633wCcX0ohkazGl6CbjeOShq2phvfUZWW3lTcsqL88T-2vZMjFqoZ4ayrwRHkb5LdBloCHOhEjN0uyTAuBpLMy4lM79D&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Project: Deep Research with LangGraph', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2F5hhcpcr0ns&urlhash=WMwH&mt=k-FH2zQOIpdJHCqzfkTrxp2_ErhY5Oa1CexXWKxDb4hWPlEQaPv38XGrVVBPvfuuceCWiDhOsyj-7sa_d_eiIBv0hJzZ&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Quickstart: LangGraph Essentials Python', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Ffpw3weanep&urlhash=9adh&mt=-UrCzpQfFt_CkxbTXQWxrJPapQjIsJtu-cUgTcnLqh8BArjDRR0PY5BqkMyEFac6kuNpkaGpTHlaEpw-F800gMGt62P3&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Foundation: Introduction to LangGraph Python', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fyqch9kubrm&urlhash=b7V7&mt=UYSGtks6lIXdmFnmhK6xKyyAwnJDwkVfBadjqMOmfECiTvbTZpmR-XfR_dlIvAnpmOmHG-hbuxUVUAymB3KM57klyN0A&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Quickstart: LangChain Essentials Python', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fajyvqenzdk&urlhash=lzsZ&mt=OLX-eGoK_MT4PUWjXS3EtGWkdEpWTRUM9Ch6sroR2OMXxQF8BBVoE4McPWSPaglt_b8FSNQdzfPEfw3N9ehmzM_gavOm&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Project: Ambient Agents with LangGraph', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fmczgpohndi&urlhash=V27z&mt=xaNQs3R7ZES043dnU6IyANxTsZdmSU9SmMnyatlPzcEBCTebmPDdYtDG_zgCSVLzDg6k7mV7tgvaJl3wFkuN5p9NKRpf&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Foundation: Building Reliable Agents', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dhttps%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fznb3xj2fiv&urlhash=PeUw&mt=BOBvFvdFbVsS3DyAn2KAHTEOMywrqMVAP1sZ8JpRCQtG7E9PlibfF2BVebciql4OSuBDJ9au6p_ruFuJQK_873ncseH_&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Projects: Deep Agents', issuer: 'BY LANGCHAIN', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Facademy.langchain.com%2Fcertificates%2Fqf5sy4j2ql&urlhash=Hnl9&mt=lZbLqK6jVQtuJyVSyw74V6InOmxHP2R5cr7wyvkix_MIHbldKGimHFHKj_-V1UgLTcdKPEzfUThHV_YDIom3kvNt3RDA&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
        ]
    },
    
    cardThree: {
        title: 'CLOUD INFRASTRUCTURE',
        certs: [
            { name: 'Getting Started with the AWS Cloud Essentials', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/464693441/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUEzzH3f4RCeOY91BsSbE3Q%3D%3D' },
            { name: 'AWS Identity and Access Management Basics', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/824800149/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUEzzH3f4RCeOY91BsSbE3Q%3D%3D' },
            { name: 'Amazon EC2 Basics', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921495452/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon EC2 Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921495452/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to Amazon EC2', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921495452/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to AWS Auto Scaling', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921495452/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to EC2 Auto Scaling', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921495452/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon EC2 Auto Scaling Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921495452/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Getting Started with AWS Auto Scaling', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921495452/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to AWS Solutions', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to AWS Trusted Advisor', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Identity and Access Management Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Systems Manager Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS CloudFormation Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS CloudFormation Stacks Troubleshooting', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS CloudTrail Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Advanced CloudFormation Macros', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921765418/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to Amazon CloudWatch', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921979605/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to Amazon CloudWatch Logs', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921979605/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon CloudWatch Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921979605/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon CloudWatch Troubleshooting', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921979605/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Trails for AWS CloudTrail Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921979605/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Config Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921979605/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Monitor Python applications using Amazon CloudWatch', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1921979605/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Networking Basics', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922152107/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to Amazon Virtual Private Cloud VPC', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922152107/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Network Load Balancer NLB Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922152107/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Gateway Load Balancer Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922152107/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Differences Between Security Groups', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922152107/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Protecting Your Instance with Security Groups', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922152107/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to Amazon API Gateway', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'API Gateway Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon API Gateway Troubleshooting', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Lambda Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Lambda Foundations', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Lambda Troubleshooting', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Step Functions Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'How AWS Step Functions Work', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Design Patterns for AWS Step Functions', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Developer Tooling for AWS Step Functions', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Observability for AWS Step Functions', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922283886/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Getting Started with AWS Storage', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to Amazon Simple Storage Service S3', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon Simple Storage Service S3 Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'AWS Block Storage Services Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon EBS Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Deep Dive Architecting with Amazon', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Introduction to Building with AWS', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon Relational Database Service RDS Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon RDS for MySQL Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon RDS for SQL Server Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon DynamoDB Getting Started', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon DynamoDB Service Primer', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon DynamoDB for Serverless Architectures', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon DynamoDB Data Modeling', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' },
              { name: 'Amazon DynamoDB Troubleshooting', issuer: 'BY AWS', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1922454089/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BO1%2FqkDrQTreSle43sItjEA%3D%3D' }
        ]
    },
    cardFour: {
        title: 'ENTERPRISE EXECUTION',
        certs: [
            
            { name: 'Developing BPM Applications Using RHPAM', issuer: 'BY INFOSYS', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.onwingspan.com%2F&urlhash=b5ni&mt=e1TG7SuN13nEsGpcuqu8U51NcL0X2qqBFiFuhwbNLDHzOxOUj7pHMw4X9hPHNHxsdogM6I7TzDz_xqu_WzjIcTq5pD3i&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'Logistic Regression Using Python', issuer: 'BY INFOSYS', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.onwingspan.com%2F&urlhash=b5ni&mt=O5nLKslYx7zMbcvM1loG8x_mNnLPY0aNWCVYJsGRIDXSZDsP83nm-rnBqHfinu7ckzpRDVQhNBk5QGE0S_e1G1zoZh_J&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'API Modelling and Design', issuer: 'BY INFOSYS', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.onwingspan.com%2F&urlhash=b5ni&mt=mDsfScTRw19piyAiEn916RlX-46EKnE78apv7opxg-YMouwHyBY6eYZTzEgv8eS9hun4fGat-PAgZhofw0X1TLUsYNzn&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'JavaScript Specialist Certification', issuer: 'BY INFOSYS', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.onwingspan.com%2F&urlhash=b5ni&mt=fedj_xDizOvCcWwRNTxZpWVmi611UZmjO6Lmx8DsRn07ziRv3camMwNIOY0xDXpr2o6hpxhh3Oh3M-2Tuu3EsAlsO9zw&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'Java Programming Fundamentals', issuer: 'BY INFOSYS', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fverify.onwingspan.com%2F&urlhash=b5ni&mt=arLPaESE4ccBcYsk3PpXab1NS-fAuwefSOWBUxvXlYhtAKs7MyNPRG6rVuzRZJVPMhO9RFknePKP5oVGnkGGOd_yOPS3&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'Generative AI Essentials “AI for All”', issuer: 'BY TCS ION', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1866605977/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' }
            
        ]
    },
    cardFive: {
        title: 'PROFESSIONAL GROWTH',
        certs: [
            { name: 'AWS and Cloud Computing Intern', issuer: 'BY GRASTECH', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1620851000/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Technical Training Program', issuer: 'BY LEARNOVATE ENTERPRISES', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/178660389/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Soft Skill Program', issuer: 'BY LEARNOVATE ENTERPRISES', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/178660389/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Lifelong Professional Skills', issuer: 'BY IBM', link: 'https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fwww.credly.com%2Fbadges%2F45f7e360-8609-4fc5-a3a9-7c3687cd73e1%2Flinked_in_profile&urlhash=BI6d&mt=pkHzEhqP353VAGTrpxipRrlPXcEkdbWtQqLmB1zPzTXWbO51kS6Mln-GaTdalB2VTOysUIVs4RyGYARx8h6DRlYs3IJZ&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'Business Etiquette', issuer: 'BY TCS ION', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1866605977/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'Write Effective Resume and Cover Letter', issuer: 'BY TCS ION', link: 'https://www.linkedin.com/in/srtsubham/overlay/Certifications/1866298020/treasury/?profileId=ACoAAEluIx8BVHjCs1MMW9AcK5uCaw2DIqnwShE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BUgPDro7sRKq0WduatAexQg%3D%3D' },
            { name: 'Artificial Intelligence and Machine Learning Intern', issuer: 'BY YBI FOUNDATION', link: 'https://www.linkedin.com/safety/go/?url=http%3A%2F%2Fwww.ybifoundation.org&urlhash=dzAy&mt=LvoXcfGSRSqgsdRFeHc_kGErOd4w-K2bpKMskpuPasro05Z-rllKGLSxoURW8oWmQ8gMw_xJ0TrNGnFS3UXJumVJwQe_&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Practical GitHub Code Search', issuer: 'BY LINKEDIN', link: 'https://www.linkedin.com/learning/certificates/a68da2bbaacd71d9ce5a68fe5efff359db053546f459a1861c14d1a373c8d1d3/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Practical GitHub Actions', issuer: 'BY LINKEDIN', link: 'https://www.linkedin.com/learning/certificates/1507000cb68ac5fa0ddb8deb10a7c5b6e22ff34cd05d65ec9f53332e532ff1c0/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Programming Foundations: Beyond the Fundamentals', issuer: 'BY LINKEDIN', link: 'https://www.linkedin.com/learning/certificates/72e8f7f5fa36eeca30a428d3ca6bca6db647d6d3f03adcb1c61c78912d2df89f/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Introduction to Career Skills in Software Development', issuer: 'BY LINKEDIN', link: 'https://www.linkedin.com/learning/certificates/fe505a62d3155ce5fddc6f6b36c4ed3663c20dabe875fc6c0f8cda1a1019f385/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' },
            { name: 'Programming Foundations: Fundamentals', issuer: 'BY LINKEDIN', link: 'https://www.linkedin.com/learning/certificates/69272b95837c324a292290d267467509dd39b644fc8c71b7dfca8ec6bacb8d46/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BJjbbtx39TTGC1EVxk6JdSg%3D%3D' }
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