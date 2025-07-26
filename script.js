// import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});


function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".boundingelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration: 1,
        delay: -1,
        stagger: .2, /*sab elements show hone mein 0.2 second ka delay aayiga*/
    })

    .from("#herofooter",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

// Jab mouse move ho to circle ko skew kar paye to and ek limit tak he
var timeout;

function circleChaptakaro(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
        this.clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);
        timeout = setTimeout(function(){
            this.document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1, 1)`;
        },100);
    });
}

function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        this.document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleChaptakaro();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;
    const image = elem.querySelector("img");

    elem.addEventListener("mouseleave", function () {
        gsap.to(image, {
            opacity: 0,
            ease: Power3.easeOut,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (details) {
        // Rotation logic
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        // Position relative to .elem
        const relX = details.clientX - elem.getBoundingClientRect().left;
        const relY = details.clientY - elem.getBoundingClientRect().top;

        // Center image around cursor
        const offsetX = image.clientWidth / 2;
        const offsetY = image.clientHeight / 2;

        gsap.to(image, {
            opacity: 1,
            ease: Power3.easeOut,
            duration: 0.4,
            top: relY - offsetY,
            left: relX - offsetX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});


/*el yahan h jis element pr smooth scrolling lage ge
or vo hota h sabse main element jiske andar pura website h
or yahan apna h mai so write #main inside querySelector*/
