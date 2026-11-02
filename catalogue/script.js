(() => {
  "use strict";

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* -------------------------------------------------------------------------- */
  /* Header — glass ribbon only after scroll                                     */
  /* -------------------------------------------------------------------------- */
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    const SCROLL_GLASS_AT = 12;

    const syncHeaderGlass = () => {
      siteHeader.classList.toggle(
        "is-scrolled",
        window.scrollY > SCROLL_GLASS_AT
      );
    };

    syncHeaderGlass();
    window.addEventListener("scroll", syncHeaderGlass, { passive: true });
  }

  /* -------------------------------------------------------------------------- */
  /* Activities — Pulse scroll-locked carousel                                   */
  /* -------------------------------------------------------------------------- */
  const activitiesSection = document.querySelector("[data-pulse-activities]");
  if (activitiesSection) {
    const TEXT_ITEM_HEIGHT = 76;
    const IMAGE_GAP = 16;
    const TEXT_ROW_STRIDE = TEXT_ITEM_HEIGHT;
    const FOCUS_ITEM_VH = 58;

    function getImageItemHeight() {
      return cards[0]?.offsetHeight || Math.round(imagesViewport?.clientWidth * (2 / 3)) || 360;
    }

    const names = Array.from(activitiesSection.querySelectorAll("[data-activity-name]"));
    const cards = Array.from(activitiesSection.querySelectorAll("[data-activity-card]"));
    const nameTitles = names.map((el) => el.querySelector("h3"));
    const overlays = cards.map((el) => el.querySelector("[data-card-overlay]"));
    const namesViewport = activitiesSection.querySelector("[data-names-viewport]");
    const imagesViewport = activitiesSection.querySelector("[data-images-viewport]");
    const namesTrack = activitiesSection.querySelector("[data-names-track]");
    const imagesTrack = activitiesSection.querySelector("[data-images-track]");
    const COUNT = Math.max(names.length, cards.length, 1);
    const steps = Math.max(COUNT - 1, 1);
    const focusSpread = 1.08 / steps;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    function isMobileLayout() {
      return mobileQuery.matches;
    }

    function syncSectionMode() {
      const stackMobile = isMobileLayout();
      activitiesSection.classList.toggle("is-mobile-stack", stackMobile);
      activitiesSection.classList.toggle("is-reduced-motion", reduceMotion && !stackMobile);
      activitiesSection.style.height =
        stackMobile || reduceMotion ? "auto" : `${100 + steps * FOCUS_ITEM_VH}vh`;
    }

    syncSectionMode();

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function interpolate(progress, input, output) {
      const n = input.length;
      if (!n) return 0;
      if (progress <= input[0]) return output[0];
      if (progress >= input[n - 1]) return output[n - 1];
      for (let i = 0; i < n - 1; i += 1) {
        const a = input[i];
        const b = input[i + 1];
        if (progress >= a && progress <= b) {
          const t = b === a ? 0 : (progress - a) / (b - a);
          return output[i] + (output[i + 1] - output[i]) * t;
        }
      }
      return output[n - 1];
    }

    function opacityKeyframes(center, s) {
      return {
        input: [center - s, center - s * 0.82, center - s * 0.48, center + s * 0.48, center + s * 0.82, center + s],
        output: [0.08, 0.18, 1, 1, 0.18, 0.08],
      };
    }

    function cardOpacityKeyframes(center, s) {
      return {
        input: [center - s, center - s * 0.82, center - s * 0.48, center + s * 0.48, center + s * 0.82, center + s],
        output: [0.2, 0.36, 1, 1, 0.36, 0.2],
      };
    }

    function overlayKeyframes(center, s) {
      return {
        input: [center - s, center - s * 0.82, center - s * 0.48, center + s * 0.48, center + s * 0.82, center + s],
        output: [0.72, 0.48, 0, 0, 0.48, 0.72],
      };
    }

    function sectionProgress() {
      const rect = activitiesSection.getBoundingClientRect();
      const total = activitiesSection.offsetHeight - window.innerHeight;
      if (total <= 0) return 0;
      return clamp(-rect.top / total, 0, 1);
    }

    function applyStackedMobile() {
      if (namesTrack) namesTrack.style.transform = "";
      if (imagesTrack) imagesTrack.style.transform = "";

      nameTitles.forEach((title) => {
        if (!title) return;
        title.style.opacity = "";
        title.style.transform = "";
      });
      cards.forEach((card) => {
        card.style.opacity = "";
        card.style.transform = "";
      });
      overlays.forEach((overlay) => {
        if (overlay) overlay.style.opacity = "";
      });
    }

    function applyProgress(progress) {
      const listH = namesViewport?.clientHeight || 0;
      const imageH = imagesViewport?.clientHeight || 0;
      const imageItemH = getImageItemHeight();
      const imageStride = imageItemH + IMAGE_GAP;
      const listStart = listH / 2 - TEXT_ITEM_HEIGHT / 2;
      const listEnd = listH / 2 - (steps * TEXT_ROW_STRIDE + TEXT_ITEM_HEIGHT / 2);
      const imageStart = imageH / 2 - imageItemH / 2;
      const imageEnd = imageH / 2 - (steps * imageStride + imageItemH / 2);

      const listY = listStart + (listEnd - listStart) * progress;
      const imagesY = imageStart + (imageEnd - imageStart) * progress;

      if (namesTrack) namesTrack.style.transform = `translate3d(0, ${listY}px, 0)`;
      if (imagesTrack) imagesTrack.style.transform = `translate3d(0, ${imagesY}px, 0)`;

      for (let index = 0; index < COUNT; index += 1) {
        const center = index / steps;
        const s = focusSpread;
        const nameOpacity = interpolate(progress, opacityKeyframes(center, s).input, opacityKeyframes(center, s).output);
        const nameScale = interpolate(
          progress,
          [center - s, center - s * 0.48, center + s * 0.48, center + s],
          [0.96, 1.02, 1.02, 0.96],
        );
        const nameX = interpolate(
          progress,
          [center - s, center - s * 0.48, center + s * 0.48, center + s],
          [0, 6, 6, 0],
        );
        const cardOpacity = interpolate(
          progress,
          cardOpacityKeyframes(center, s).input,
          cardOpacityKeyframes(center, s).output,
        );
        const cardScale = interpolate(
          progress,
          [center - s, center - s * 0.48, center + s * 0.48, center + s],
          [0.94, 1, 1, 0.94],
        );
        const overlayOpacity = interpolate(
          progress,
          overlayKeyframes(center, s).input,
          overlayKeyframes(center, s).output,
        );

        if (nameTitles[index]) {
          nameTitles[index].style.opacity = String(nameOpacity);
          nameTitles[index].style.transform = `translate3d(${nameX}px, 0, 0) scale(${nameScale})`;
        }
        if (cards[index]) {
          cards[index].style.opacity = String(cardOpacity);
          cards[index].style.transform = `scale(${cardScale})`;
        }
        if (overlays[index]) {
          overlays[index].style.opacity = String(overlayOpacity);
        }
      }
    }

    function applyReducedMotion() {
      const listH = namesViewport?.clientHeight || 0;
      const imageH = imagesViewport?.clientHeight || 0;
      const imageItemH = getImageItemHeight();
      const listY = listH / 2 - TEXT_ITEM_HEIGHT / 2;
      const imageY = imageH / 2 - imageItemH / 2;
      if (namesTrack) namesTrack.style.transform = `translate3d(0, ${listY}px, 0)`;
      if (imagesTrack) imagesTrack.style.transform = `translate3d(0, ${imageY}px, 0)`;

      nameTitles.forEach((title, index) => {
        if (!title) return;
        title.style.opacity = index === 0 ? "1" : "0.18";
        title.style.transform = "none";
      });
      cards.forEach((card, index) => {
        card.style.opacity = index === 0 ? "1" : "0.38";
        card.style.transform = "none";
      });
      overlays.forEach((overlay) => {
        if (overlay) overlay.style.opacity = "1";
      });
    }

    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        syncSectionMode();
        if (isMobileLayout()) applyStackedMobile();
        else if (reduceMotion) applyReducedMotion();
        else applyProgress(sectionProgress());
      });
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", onScrollOrResize);
    } else if (typeof mobileQuery.addListener === "function") {
      mobileQuery.addListener(onScrollOrResize);
    }
    onScrollOrResize();
  }

  /* -------------------------------------------------------------------------- */
  /* Interest modal + form                                                       */
  /* -------------------------------------------------------------------------- */
  const modal = document.getElementById("interest-modal");
  const form = document.getElementById("interest-form");
  if (!modal || !form) return;

  const formView = modal.querySelector("[data-form-view]");
  const successView = modal.querySelector("[data-success-view]");
  const submitBtn = form.querySelector("[data-submit-btn]");
  const openButtons = document.querySelectorAll(".js-open-modal");
  const closeButtons = modal.querySelectorAll("[data-modal-close]");
  const backdrop = modal.querySelector("[data-modal-backdrop]");

  let lastFocus = null;
  let formDirty = false;

  function openModal() {
    lastFocus = document.activeElement;
    formDirty = false;
    resetFormState(true);
    formView.hidden = false;
    successView.hidden = true;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    window.setTimeout(() => {
      form.querySelector("input, select, button")?.focus();
    }, 10);
  }

  function closeModal({ force = false } = {}) {
    if (modal.hidden) return;

    const onForm = !formView.hidden;
    if (!force && onForm && formDirty) {
      const ok = window.confirm("Discard your registration details?");
      if (!ok) return;
    }

    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function resetFormState(clearValues) {
    if (clearValues) form.reset();
    form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    submitBtn.disabled = false;
    submitBtn.textContent = "REGISTER INTEREST";
  }

  openButtons.forEach((btn) => btn.addEventListener("click", openModal));

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal({ force: !successView.hidden });
    });
  });

  backdrop.addEventListener("click", () => {
    closeModal({ force: !successView.hidden });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal({ force: !successView.hidden });
    }
  });

  form.addEventListener("input", () => {
    formDirty = true;
  });
  form.addEventListener("change", () => {
    formDirty = true;
  });

  const mobileInput = form.querySelector("#mobile");
  mobileInput.addEventListener("input", () => {
    mobileInput.value = mobileInput.value.replace(/\D/g, "").slice(0, 10);
  });

  function setInvalid(name, isInvalid) {
    const wrap = form.querySelector(`[data-field="${name}"]`);
    if (!wrap) return;
    wrap.classList.toggle("is-invalid", isInvalid);
  }

  function validate() {
    const parentName = form.parentName.value.trim();
    const mobile = form.mobile.value.trim();
    const studentName = form.studentName.value.trim();
    const studentClass = form.studentClass.value;
    const schoolName =
      form.querySelector("#schoolName")?.value ||
      form.querySelector('input[name="schoolName"]')?.value ||
      "";
    const consent = form.consent.checked;
    const mobileOk = /^[6-9]\d{9}$/.test(mobile);

    setInvalid("parentName", !parentName);
    setInvalid("mobile", !mobileOk);
    setInvalid("studentName", !studentName);
    setInvalid("studentClass", !studentClass);
    setInvalid("consent", !consent);

    return Boolean(parentName && mobileOk && studentName && studentClass && schoolName && consent);
  }

  const SHEETS_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbwzPqgzvxSbhw5hYFsJl1xKQ-XWdbtHdFWmDQiw8Zcspuzx2KtKT6JYx2zRbdEdNfkqcw/exec";

  async function submitInterest(payload) {
    // Form-encoded + no-cors works with Apps Script doPost(e.parameter)
    // without a CORS preflight. Response is opaque; completed send = success.
    const body = new URLSearchParams({
      parentName: payload.parentName,
      mobile: payload.mobile,
      studentName: payload.studentName,
      studentClass: payload.studentClass,
      schoolName: payload.schoolName,
      consent: payload.consent ? "yes" : "no",
      submittedAt: payload.submittedAt,
    });

    await fetch(SHEETS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      body,
    });
    return { ok: true };
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validate()) {
      form
        .querySelector(".is-invalid input, .is-invalid select, .is-invalid [type='checkbox']")
        ?.focus();
      return;
    }

    const payload = {
      parentName: form.parentName.value.trim(),
      mobile: form.mobile.value.trim(),
      studentName: form.studentName.value.trim(),
      studentClass: form.studentClass.value,
      schoolName:
        form.querySelector("#schoolName")?.value ||
        form.querySelector('input[name="schoolName"]')?.value ||
        "",
      consent: form.consent.checked,
      submittedAt: new Date().toISOString(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    try {
      await submitInterest(payload);
      formDirty = false;
      formView.hidden = true;
      successView.hidden = false;
      successView.querySelector("button")?.focus();
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = "REGISTER INTEREST";
      window.alert("Something went wrong. Please try again.");
      console.error(error);
    }
  });
})();
