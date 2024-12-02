(() => {
  const MOVEMENT_DURATION = 500;
  const MODAL_ANIMATION_DURATION = 250;
  const INTERVAL = 30;
  const ANIMATION_CUBIC_BEZIER_0 = "cubic-bezier(.03, .8, .3, .95)";
  const ANIMATION_CUBIC_BEZIER_1 = "cubic-bezier(.17, .67, .62, .96)";

  const $ = (q, t = document.body) => t.querySelector(q);
  const $a = (q, t = document.body) => t.querySelectorAll(q);
  const copy = (t) => JSON.parse(JSON.stringify(t));

  // 타이틀 타이핑 애니메이션
  const titleNode = $("#title");
  const title = [
    "<span>안</span>", "<span>녕</span>", "<span>하</span>", "<span>세</span>", "<span>요</span>", "<span>,</span><br>",
    "웹 ", "개", "발", "자", "를 ", "꿈", "꾸", "는<br>",
    "<strong>신</strong>", "<strong>성</strong>", "<strong>욱</strong>", "입", "니", "다", "."
  ];
  const typewrite = (node, contents, interval) => {
    let i = 0;
    const f = () => {
      if (typeof contents[i] === "undefined") {
        node.innerHTML = contents.join("");
      } else {
        node.innerHTML = contents.slice(0, i+1).join("") + "|";
        i++;
        setTimeout(() => f(), interval);
      };
    };
    f();
  };
  typewrite(titleNode, title, 100);

  // 타이틀 스크롤 문구 사라짐
  const scrollAlert = $("#s1 > .deco3");
  document.addEventListener("scroll", () => {
    const offset = window.scrollY / window.innerHeight;
    scrollAlert.style["opacity"] = `${offset * -1 + 0.7}`;
    scrollAlert.style["filter"] = `blur(${offset * 3}px)`;
  });

  // 타이틀 반짝이 애니메이션
  const s1deco2 = $("#s1 > .deco2");
  const s1deco2Colors = [ "crimson", "purple", "green", "gray", "chocolate", "chartreuse", "darkblue", "darkorchid", "black", "deeppink", "indigo", "hotpink" ];
  const s1deco2f = () => {
    setTimeout(() => {
      const d = document.createElement("div");
      d.style["left"] = `${Math.floor(Math.random() * 100)}%`;
      d.style["top"] = `${Math.floor(Math.random() * 100)}%`;
      d.style["background-color"] = s1deco2Colors[Math.floor(Math.random() * s1deco2Colors.length)];
      s1deco2.append(d);
      setTimeout(() => {
        d.style["opacity"] = "0";
        d.style["transform"] = `scale(${Math.floor(Math.random() * 70) + 30})`;
        setTimeout(() => {
          d.remove();
        }, 1000 + INTERVAL);
      }, INTERVAL);
      s1deco2f();
    }, Math.floor(Math.random() * 500) + 500);
  };
  s1deco2f();

  // 네비게이션 표시/숨기기
  const nav = $("nav");
  document.addEventListener("scroll", () => {
    if (window.scrollY !== 0) {
      nav.style["box-shadow"] = "var(--c-nav-shadow)";
      nav.style["transform"] = "translateY(0%)";
    } else {
      nav.style["box-shadow"] = "unset";
      nav.style["transform"] = "translateY(-100%)";
    }
  });

  // 네비게이션 게이지 애니메이션
  const gauge = $("#nav-gauge > div");
  const navRouteName = $("#nav-route-name");
  const routeNames = Array.from($a("section")).map((x) => x.dataset.name);
  const tips = $("#nav-tips");
  tips.innerHTML = "<div></div>".repeat(routeNames.length + 1);
  document.addEventListener("scroll", () => {
    const docRect = document.body.getBoundingClientRect();
    const maxScrollY = docRect.height - window.innerHeight;
    const perc = window.scrollY / maxScrollY * 100;
    gauge.style["transform"] = `scaleX(${perc}%)`;

    const routeNow = Math.floor(perc / (100 / routeNames.length));
    navRouteName.innerText = routeNames[routeNow >= routeNames.length ? routeNames.length - 1 : routeNow];
  });

  // 모달 초기화
  const modals = Array.from($a(".modal")).map((x) => { return { id: x.id, node: x }; });
  for (const modal of modals) {
    modal.node.style["pointer-events"] = "none";
    modal.node.style["opacity"] = "0";
    const modalBody = $(".body", modal.node);
    let lastOffsetX = null;
    let lastOffsetY = null;

    modal.show = (e = null) => {
      modal.node.style["pointer-events"] = "auto";
      modal.node.animate([
        { "opacity": "0" },
        { "opacity": "1" }
      ], {
        duration: MODAL_ANIMATION_DURATION,
        fill: "both",
        easing: ANIMATION_CUBIC_BEZIER_1
      });
      if (e !== null) {
        lastOffsetX = e.clientX - window.innerWidth / 2;
        lastOffsetY = e.clientY - window.innerHeight / 2;
        modalBody.animate([
          {
            "transform": `translate(${lastOffsetX}px, ${lastOffsetY}px) scale(0)`,
            "opacity": "0"
          },
          {
            "transform": "translate(0px, 0px) scale(1)",
            "opacity": "1"
          }
        ], {
          duration: MODAL_ANIMATION_DURATION,
          fill: "both",
          easing: ANIMATION_CUBIC_BEZIER_1
        });
      } else {
        lastOffsetX = null;
        lastOffsetY = null;
        modalBody.animate([
          {
            "transform": "translateY(10px) scale(0.95)",
            "opacity": "0"
          },
          {
            "transform": "translateY(0px) scale(1)",
            "opacity": "1"
          }
        ], {
          duration: MODAL_ANIMATION_DURATION,
          fill: "both",
          easing: ANIMATION_CUBIC_BEZIER_1
        });
      };
    };
    modal.close = () => {
      modal.node.style["pointer-events"] = "none";
      modal.node.animate([
        { "opacity": "1" },
        { "opacity": "0" }
      ], {
        duration: MODAL_ANIMATION_DURATION,
        fill: "both",
        easing: ANIMATION_CUBIC_BEZIER_1
      });
      if (lastOffsetX !== null && lastOffsetY !== null) {
        modalBody.animate([
          {
            "transform": "translate(0px, 0px) scale(1)",
            "opacity": "1"
          },
          {
            "transform": `translate(${lastOffsetX}px, ${lastOffsetY}px) scale(0)`,
            "opacity": "0"
          }
        ], {
          duration: MODAL_ANIMATION_DURATION,
          fill: "both",
          easing: ANIMATION_CUBIC_BEZIER_1
        });
      } else {
        modalBody.animate([
          {
            "transform": "translateY(0px) scale(1)",
            "opacity": "1"
          },
          {
            "transform": "translateY(10px) scale(0.95)",
            "opacity": "0"
          }
        ], {
          duration: MODAL_ANIMATION_DURATION,
          fill: "both",
          easing: ANIMATION_CUBIC_BEZIER_1
        });
      };
    };

    const closeBtn = $("button.close", modal.node);
    if (closeBtn) {
      closeBtn.onclick = () => modal.close();
    };

    const bg = $(".bg", modal.node);
    bg.onclick = () => modal.close();
  };

  // 기술 스택 아이콘 모달 띄우기
  const stackHTML = $("#icon-html");
  const stackCSS = $("#icon-css");
  const stackJS = $("#icon-js");
  const stackTS = $("#icon-ts");
  const stackNODE = $("#icon-node");
  stackHTML.onclick = (e) => modals.find((x) => x.id === "modal-html").show(e);
  stackCSS.onclick = (e) => modals.find((x) => x.id === "modal-css").show(e);
  stackJS.onclick = (e) => modals.find((x) => x.id === "modal-js").show(e);
  stackTS.onclick = (e) => modals.find((x) => x.id === "modal-ts").show(e);
  stackNODE.onclick = (e) => modals.find((x) => x.id === "modal-node").show(e);

  // 프로젝트 모달 띄우기
  const pfItems = $a(".pf-item");
  for (const node of pfItems) {
    node.onclick = (e) => {
      modals.find((x) => x.id === `modal-${node.id}`).show(e);
    };
  };

  // 슬라이드 2 효과
  const s2deco1 = $("#s2 > .deco1");
  const s2deco2 = $("#s2 > .deco2");
  const s2deco3 = $("#s2 > .deco3");
  document.addEventListener("scroll", () => {
    const offset = window.scrollY - window.innerHeight;

    s2deco1.animate([ { "transform": `translateY(${offset / 2}px)` } ], { duration: 0, fill: "both" });
    s2deco2.animate([ { "transform": `translateY(${offset / 4}px)` } ], { duration: 0, fill: "both" });
    s2deco3.animate([ { "transform": `translateY(${offset / 1.5}px)` } ], { duration: 0, fill: "both" });
  });

  // 푸터 클릭시 내용 복사
  const footerItems = $a("#phone, #email");
  for (const node of footerItems) {
    node.onclick = () => {
      window.navigator.clipboard.writeText(node.dataset.value).then(() => {
        const copyAlertSlide = $(".copy-slide", node);
        copyAlertSlide.animate([
          { "opacity": "1" },
          { "opacity": "1" },
          { "opacity": "0" }
        ], {
          duration: 2000,
        });
      });
    };
  };

  // 푸터 효과
  const s4deco1 = $("#s4 > .deco1");
  const s4deco2 = $("#s4 > .deco2");
  const s4deco3 = $("#s4 > .deco3");
  document.addEventListener("scroll", () => {
    const offset = (document.body.getBoundingClientRect().height - window.innerHeight - window.scrollY)*-1;

    s4deco1.animate([ { "transform": `translateY(${offset / 1.5}px)` } ], { duration: 0, fill: "both" });
    s4deco2.animate([ { "transform": `translateY(${offset / 1.5}px)` } ], { duration: 0, fill: "both" });
    s4deco3.animate([ { "transform": `translateY(${offset / 3}px)` } ], { duration: 0, fill: "both" });
  });

  // 맨 위로 버튼
  const btnTop = $("#button-top");
  btnTop.onclick = () => scroll({ top: 0, behavior: "smooth" });
})();