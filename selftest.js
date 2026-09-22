/* Traditional-rendering self-check. The converter is a character map, so the
   assertion that matters is that nothing Simplified survives a switch to 繁. */
(function () {
  const out = [];
  const ok = (name, cond, extra) => out.push((cond ? "PASS " : "FAIL ") + name + (extra ? " :: " + extra : ""));
  const click = (sel) => document.querySelector(sel).dispatchEvent(new MouseEvent("click", { bubbles: true }));
  /* the language switcher names the languages in their own script: 简 stays 简 */
  const onPage = () => [...document.body.querySelectorAll("*")]
    .filter(el => !el.children.length && !el.dataset.lang).map(el => el.textContent).join(" ");
  const leftovers = () => [...new Set(onPage())].filter(ch => S2T.has(ch)).join("");

  ok("three languages offered", document.querySelectorAll("[data-lang]").length === 3);

  click('[data-lang="tw"]');
  ok("switches to Traditional", document.documentElement.lang === "zh-TW", document.documentElement.lang);
  /* walk every game board and its how-to dialog, not just the one on screen */
  const missed = [];
  document.querySelectorAll("[data-game]").forEach(tab => {
    tab.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    click("#how-button");
    missed.push(...leftovers());
    document.querySelector("#how-dialog").close();
  });
  ok("no Simplified characters survive", missed.length === 0, [...new Set(missed)].join(""));
  ok("board copy converted", onPage().includes("歡聚"));
  ok("every game tab converted", [...document.querySelectorAll(".game-tab strong")].some(el => el.textContent.includes("輪")));

  /* the three words whose Traditional form depends on context */
  ok("context words handled",
     toTW("灯台") === "燈臺" && toTW("农历") === "農曆" && toTW("一只宠物") === "一隻寵物"
     && toTW("只有") === "只有" && toTW("斗底下") === "斗底下" && toTW("一台电脑") === "一台電腦",
     [toTW("灯台"), toTW("农历"), toTW("一只宠物"), toTW("只有"), toTW("斗底下"), toTW("一台电脑")].join(" "));

  /* bingo squares record who you met */
  document.querySelector('[data-game="bingo"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const cell = () => document.querySelector('[data-cell="0"]').closest(".bingo-cell");
  ok("name field hidden until marked", getComputedStyle(cell().querySelector(".bingo-name")).display === "none");
  click('[data-cell="0"]');
  const field = cell().querySelector(".bingo-name");
  ok("marking reveals the name field", getComputedStyle(field).display !== "none");
  ok("name field takes focus", document.activeElement === field);
  field.value = '小美 & "David"';
  field.dispatchEvent(new Event("input", { bubbles: true }));
  document.querySelector('[data-cell="1"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  ok("typed name survives a re-render", cell().querySelector(".bingo-name").value === '小美 & "David"',
     cell().querySelector(".bingo-name").value);
  click('[data-cell="0"]');
  ok("unmarking clears the square", !cell().classList.contains("marked"));

  click('[data-lang="en"]');
  ok("switches back to English", document.documentElement.lang === "en", document.documentElement.lang);
  click('[data-lang="zh"]');
  ok("switches back to Simplified", document.documentElement.lang === "zh-CN", document.documentElement.lang);

  document.title = out.join(" | ");
})();
