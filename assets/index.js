const box = document.getElementById("cards");
const pathBox = document.getElementById("path");

fetch("data/lessons.json")
  .then(r => r.json())
  .then(list => {
    list.sort((a, b) => a.chapter - b.chapter);

    const byId = {};
    list.forEach(l => { byId[l.id] = l; });

    const done = list.filter(l => l.status === "published").length;
    document.getElementById("progress").textContent =
      `已完成 ${done} / ${list.length} 章`;

    list.forEach(l => {
      const ok = l.status === "published";

      // 先備章節文字
      const pre = (l.prerequisites || [])
        .map(id => byId[id] ? `Ch${byId[id].chapter}` : id)
        .join("、");

      // 學習路徑
      const li = document.createElement("li");
      li.className = ok ? "" : "planned";
      li.innerHTML =
        `<strong>Ch${l.chapter} ${l.title.replace(/^Ch\d+\s*/, "")}</strong>` +
        `<span>${pre ? "先備：" + pre : "無先備知識"}</span>`;
      pathBox.appendChild(li);

      // 卡片
      const el = document.createElement(ok ? "a" : "div");
      if (ok) el.href = l.file;
      el.className = "card" + (ok ? "" : " planned");
      el.innerHTML = `
        <span class="tag">CH ${l.chapter}${ok ? "" : " · 即將推出"}</span>
        <h2>${l.title}</h2>
        <p>${l.summary}</p>
        <small>難度 ${"★".repeat(l.difficulty)}</small>`;
      box.appendChild(el);
    });
  })
  .catch(() => { box.textContent = "無法載入 lessons.json"; });
