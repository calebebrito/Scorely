(() => {
    const STORAGE_KEY = "scorely:v1";

    const TEAMS = [
        "Flamengo",
        "Palmeiras",
        "Cruzeiro",
        "Fluminense",
        "Athletico Paranaense",
        "Bahia",
        "Atlético Mineiro",
        "Red Bull Bragantino",
        "Santos",
        "São Paulo",
        "Coritiba",
        "Botafogo",
        "Vasco",
        "Vitória",
        "Grêmio",
        "Mirassol",
        "Corinthians",
        "Internacional",
        "Remo",
        "Chapecoense",
    ].sort((a, b) => a.localeCompare(b, "pt-BR"));

    const SEED_PLAYERS = [
        ["Kayky", "Internacional"],
        ["Jefferson Savarino", "Fluminense"],
        ["Lucas Silva", "Vitória"],
        ["Neto Moura", "Mirassol"],
        ["Paulinho Paula", "Internacional"],
        ["Marino Hinestroza", "Vasco"],
        ["Osvaldo", "Vitória"],
        ["Alex Telles", "Botafogo"],
        ["Yago Felipe", "Chapecoense"],
        ["David Antunes", "Chapecoense"],
        ["Rubens Tadeu", "Chapecoense"],
        ["Leozinho", "Athletico Paranaense"],
        ["Yago Pikachu", "Remo"],
        ["Gustavinho", "Red Bull Bragantino"],
        ["Davi Gomes", "Red Bull Bragantino"],
        ["Danilo Pereira", "Botafogo"],
        ["Stiven Mendoza", "Athletico Paranaense"],
        ["Tchê Tchê", "Vasco"],
        ["José Aldo", "Mirassol"],
        ["Cristian Pavón", "Grêmio"],
        ["Max", "Chapecoense"],
        ["Matheus Bidu", "Corinthians"],
        ["Phillipe Coutinho", "Santos"],
        ["Jáderson", "Remo"],
        ["Gustavo Scarpa", "Atlético Mineiro"],
        ["Edson Carioca", "Mirassol"],
        ["Eduardo", "Mirassol"],
        ["Alisson Euler", "Fluminense"],
        ["Wesley", "Cruzeiro"],
        ["Diego Tarzia", "Vitória"],
        ["Eduardo Melo", "Remo"],
        ["Lucas Barbosa", "Red Bull Bragantino"],
        ["Denilson Alves", "Mirassol"],
        ["Gabriel Paulista", "Corinthians"],
        ["Marquinhos", "Cruzeiro"],
        ["Johan Rojas", "Vasco"],
        ["Ferreirinha", "São Paulo"],
        ["Wendell", "São Paulo"],
        ["Rollheiser", "Santos"],
        ["Rafael Freitas", "Santos"],
        ["Marcinho", "Chapecoense"],
        ["Shaylon", "Mirassol"],
        ["Lucas Mugni", "Mirassol"],
        ["Gustavo Zago", "Cruzeiro"],
        ["Luiz Araújo", "Flamengo"],
        ["Renato Kayzer", "Vitória"],
        ["Adson Soares", "Vasco"],
        ["Bruno Pacheco", "Chapecoense"],
        ["Christian", "Cruzeiro"],
        ["Erick", "Vitória"],
        ["Gui Negão", "Corinthians"],
        ["Gonzalo Tapia", "São Paulo"],
        ["Tinga", "Coritiba"],
        ["Wanderson", "Cruzeiro"],
        ["Bruno Rodrigues", "Cruzeiro"],
        ["Carlos Eduardo", "Mirassol"],
        ["Alesson", "Mirassol"],
        ["Robert Conceição", "Chapecoense"],
        ["Mamady Cissé", "Atlético Mineiro"],
        ["Vinicinho", "Red Bull Bragantino"],
        ["Bruno Praxedes", "Red Bull Bragantino"],
        ["Eduardo Doma", "Chapecoense"],
        ["Fabri", "Vitória"],
        ["Nathan Fogaça", "Mirassol"],
        ["Henry Mosquera", "Red Bull Bragantino"],
        ["Wallison", "Coritiba"],
        ["Gerson", "Cruzeiro"],
        ["Aitor Cantalapiedra", "Vitória"],
        ["Carlinhos", "Remo"],
        ["Sinisterra", "Cruzeiro"],
        ["Rodrigo Nestor", "Bahia"],
        ["Igor Gomes", "Atlético Mineiro"],
        ["Bruno Tabata", "Internacional"],
        ["Rafael Tolói", "São Paulo"],
        ["Ramón Sosa", "Palmeiras"],
        ["Andreas Pereira", "Palmeiras"],
        ["Felipe Anderson", "Palmeiras"],
        ["Eric Ramires", "Red Bull Bragantino"],
        ["Gabriel Novaes", "Red Bull Bragantino"],
        ["Gustavo", "Coritiba"],
        ["Lucas Paquetá", "Flamengo"],
        ["Francis Amuzu", "Grêmio"],
        ["Emmanuel Martínez", "Vitória"],
        ["Lucas Esquível", "Athletico Paranaense"],
        ["Isaac Rodrigues", "Athletico Paranaense"],
        ["Fágner", "Cruzeiro"],
        ["Kevin Serna", "Fluminense"],
        ["Thiago Maia", "Internacional"],
        ["Montoro", "Botafogo"],
        ["Keno", "Coritiba"],
        ["Léo Pelé", "Athletico Paranaense"],
        ["Lingard", "Corinthians"],
        ["Carrillo", "Corinthians"],
        ["Tchamba", "Remo"],
        ["Thaciano", "Santos"],
        ["Erick Pulga", "Bahia"],
    ];

    const STATUS_KEYS = ["yellow", "suspended", "injured"];

    const els = {
        form: document.getElementById("playerForm"),
        formTitle: document.getElementById("formTitle"),
        name: document.getElementById("nameInput"),
        team: document.getElementById("teamInput"),
        goals: document.getElementById("goalsInput"),
        photoInput: document.getElementById("photoInput"),
        photoPreview: document.getElementById("photoPreview"),
        submit: document.getElementById("submitBtn"),
        cancel: document.getElementById("cancelEdit"),
        ranking: document.getElementById("ranking"),
        empty: document.getElementById("emptyState"),
        search: document.getElementById("searchInput"),
        rankingTeamFilter: document.getElementById("rankingTeamFilter"),
        statPlayers: document.getElementById("statPlayers"),
        statGoals: document.getElementById("statGoals"),
        championship: document.getElementById("championship"),
        exportBtn: document.getElementById("exportBtn"),
        importBtn: document.getElementById("importBtn"),
        importInput: document.getElementById("importInput"),
        backupStatus: document.getElementById("backupStatus"),
        statusPanel: document.querySelector(".status-panel"),
        knownPlayersList: document.getElementById("knownPlayersList"),
    };

    const icons = {
        minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
        plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
        edit: '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/></svg>',
        trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
        close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    };

    const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

    let state = load();
    let pendingPhoto = null;
    let editingId = null;
    let confirmTimer = null;
    let statusTimer = null;

    /* ---------- Persistência ---------- */

    function emptyStatuses() {
        return { yellow: [], suspended: [], injured: [] };
    }

    function normalizeStatuses(raw) {
        const out = emptyStatuses();
        if (!raw || typeof raw !== "object") return out;
        for (const k of STATUS_KEYS) {
            if (Array.isArray(raw[k])) {
                out[k] = raw[k]
                    .filter((item) => item && typeof item.name === "string" && typeof item.team === "string")
                    .map((item) => ({
                        id: typeof item.id === "string" ? item.id : uid(),
                        name: item.name,
                        team: item.team,
                        amount: Number.isFinite(item.amount) ? Math.max(0, Math.min(99, Math.round(item.amount))) : 1,
                    }));
            }
        }
        return out;
    }

    function isValidData(data) {
        return data && Array.isArray(data.players) && data.players.every(
            (p) => p && typeof p.id === "string" && typeof p.name === "string" &&
                   typeof p.team === "string" && Number.isFinite(p.goals)
        );
    }

    function ensureSeedPlayers(data) {
        if (data.seededV1) return false;
        const existing = new Set(
            data.players.map((p) => `${p.name.toLowerCase()}|${p.team.toLowerCase()}`)
        );
        SEED_PLAYERS.forEach(([name, team], idx) => {
            const key = `${name.toLowerCase()}|${team.toLowerCase()}`;
            if (!existing.has(key)) {
                data.players.push({
                    id: `seed-${idx + 1}`,
                    name,
                    team,
                    goals: 1,
                    photo: null,
                });
                existing.add(key);
            }
        });
        data.seededV1 = true;
        return true;
    }

    function load() {
        let data = null;
        try {
            const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (isValidData(parsed)) {
                data = {
                    title: typeof parsed.title === "string" ? parsed.title : "",
                    players: parsed.players,
                    statuses: normalizeStatuses(parsed.statuses),
                    seededV1: Boolean(parsed.seededV1),
                };
            }
        } catch (_) { /* dados corrompidos: recomeça */ }

        if (!data) {
            data = { title: "", players: [], statuses: emptyStatuses(), seededV1: false };
        }

        if (ensureSeedPlayers(data)) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (_) { /* ignora erro inicial */ }
        }
        return data;
    }

    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) {
            alert("Não foi possível salvar. O armazenamento do navegador pode estar cheio (muitas fotos). Exporte um backup.");
        }
    }

    /* ---------- Utilidades ---------- */

    function initials(name) {
        const parts = name.trim().split(/\s+/);
        const first = parts[0]?.[0] || "";
        const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
        return (first + last).toUpperCase();
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
        }[c]));
    }

    // Reduz a foto para um quadrado de 240px para não lotar o localStorage
    function resizeImage(file, size = 240) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                const img = new Image();
                img.onerror = reject;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = canvas.height = size;
                    const ctx = canvas.getContext("2d");
                    const side = Math.min(img.width, img.height);
                    const sx = (img.width - side) / 2;
                    const sy = (img.height - side) / 2;
                    ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);
                    resolve(canvas.toDataURL("image/jpeg", 0.85));
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function sortedPlayers() {
        return [...state.players].sort(
            (a, b) => b.goals - a.goals || a.name.localeCompare(b.name, "pt-BR")
        );
    }

    // Posições únicas: em caso de empate, a ordem alfabética define quem fica na frente
    function withPositions(list) {
        return list.map((p, i) => ({ ...p, pos: i + 1 }));
    }

    /* ---------- Seleção de time ---------- */

    function teamOptionsHtml(placeholder = "Selecione o time", extraTeam = null) {
        const list = [...TEAMS];
        if (extraTeam && !list.includes(extraTeam)) list.push(extraTeam);
        return (
            `<option value="" disabled selected>${escapeHtml(placeholder)}</option>` +
            list.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("")
        );
    }

    function fillTeamSelect(extraTeam = null) {
        els.team.innerHTML = teamOptionsHtml("Selecione o time", extraTeam);
    }

    function fillStatusTeamSelects() {
        document.querySelectorAll(".status-team-select").forEach((sel) => {
            sel.innerHTML = teamOptionsHtml("Time");
        });
        const filterHtml =
            '<option value="">Todos os times</option>' +
            TEAMS.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("");
        if (els.rankingTeamFilter) els.rankingTeamFilter.innerHTML = filterHtml;
        document.querySelectorAll(".status-filter-select").forEach((sel) => {
            sel.innerHTML = filterHtml;
        });
    }

    /* ---------- Renderização ---------- */

    function render(bumpId = null) {
        const before = captureRects();
        const query = els.search.value.trim().toLowerCase();
        const teamFilter = els.rankingTeamFilter ? els.rankingTeamFilter.value : "";
        const ranked = withPositions(sortedPlayers());
        const visible = ranked.filter((p) => {
            if (teamFilter && p.team !== teamFilter) return false;
            if (query && !p.name.toLowerCase().includes(query) && !p.team.toLowerCase().includes(query)) return false;
            return true;
        });

        els.ranking.innerHTML = visible.map(rowTemplate).join("");

        els.empty.hidden = visible.length > 0;
        els.empty.querySelector("p").textContent = state.players.length
            ? "Nenhum resultado para a busca."
            : "Nenhum jogador cadastrado.";
        els.empty.querySelector("span").hidden = state.players.length > 0;

        els.statPlayers.textContent = state.players.length;
        els.statGoals.textContent = state.players.reduce((sum, p) => sum + p.goals, 0);

        // Atualiza sugestões de jogadores conhecidos para o painel direito
        const uniqueNames = [...new Set(state.players.map((p) => p.name))].sort((a, b) =>
            a.localeCompare(b, "pt-BR")
        );
        els.knownPlayersList.innerHTML = uniqueNames
            .map((n) => `<option value="${escapeHtml(n)}">`)
            .join("");

        if (bumpId) {
            const g = els.ranking.querySelector(`[data-id="${bumpId}"] .goals`);
            if (g) {
                g.classList.remove("bump");
                void g.offsetWidth;
                g.classList.add("bump");
            }
        }

        animateMoves(before);
        renderStatuses();
    }

    function rowTemplate(p) {
        const medal = p.goals > 0 ? { 1: "gold", 2: "silver", 3: "bronze" }[p.pos] : null;
        const avatar = p.photo
            ? `<span class="avatar" style="background-image:url('${p.photo}')"></span>`
            : `<span class="avatar">${escapeHtml(initials(p.name))}</span>`;

        return `
            <li class="row${medal ? ` medal ${medal}` : ""}" data-id="${escapeHtml(p.id)}">
                <span class="pos">${p.pos}</span>
                <div class="player">
                    ${avatar}
                    <div class="info">
                        <span class="name">${escapeHtml(p.name)}</span>
                        <span class="team">${escapeHtml(p.team)}</span>
                    </div>
                </div>
                <div class="controls">
                    <button class="icon-btn" data-action="dec" aria-label="Remover gol" ${p.goals === 0 ? "disabled" : ""}>${icons.minus}</button>
                    <span class="goals">${p.goals}</span>
                    <button class="icon-btn plus" data-action="inc" aria-label="Adicionar gol">${icons.plus}</button>
                    <div class="menu">
                        <button class="icon-btn" data-action="edit" aria-label="Editar jogador" title="Editar">${icons.edit}</button>
                        <button class="icon-btn danger" data-action="delete" aria-label="Excluir jogador" title="Excluir">${icons.trash}</button>
                    </div>
                </div>
            </li>`;
    }

    function renderStatuses() {
        const emptyMessages = {
            yellow: "Nenhum jogador amarelado",
            suspended: "Nenhum jogador suspenso",
            injured: "Nenhum jogador lesionado",
        };
        for (const key of STATUS_KEYS) {
            const filterSel = els.statusPanel.querySelector(`[data-filter="${key}"]`);
            const selectedTeam = filterSel ? filterSel.value : "";
            const fullList = [...(state.statuses[key] || [])].sort(
                (a, b) => (b.amount ?? 1) - (a.amount ?? 1) || a.name.localeCompare(b.name, "pt-BR")
            );
            const list = selectedTeam
                ? fullList.filter((item) => item.team === selectedTeam)
                : fullList;

            const ul = els.statusPanel.querySelector(`[data-list="${key}"]`);
            const empty = els.statusPanel.querySelector(`[data-empty="${key}"]`);
            const count = els.statusPanel.querySelector(`[data-count="${key}"]`);

            count.textContent = list.length;
            empty.hidden = list.length > 0;
            empty.textContent = selectedTeam
                ? `${emptyMessages[key]} no ${selectedTeam}.`
                : `${emptyMessages[key]}.`;
            ul.innerHTML = list
                .map((item) => {
                    const amt = item.amount ?? 1;
                    return `
                    <li class="status-item" data-id="${escapeHtml(item.id)}" data-key="${key}">
                        <div class="status-item-info">
                            <span class="status-item-name">${escapeHtml(item.name)}</span>
                            <span class="status-item-team">${escapeHtml(item.team)}</span>
                        </div>
                        <div class="status-controls">
                            <button type="button" class="status-step" data-status-action="dec" aria-label="Diminuir" ${amt === 0 ? "disabled" : ""}>${icons.minus}</button>
                            <span class="status-value">${amt}</span>
                            <button type="button" class="status-step plus" data-status-action="inc" aria-label="Aumentar">${icons.plus}</button>
                            <button type="button" class="status-remove" data-remove="${escapeHtml(item.id)}" aria-label="Remover" title="Remover">${icons.close}</button>
                        </div>
                    </li>`;
                })
                .join("");
        }
    }

    // Animação suave quando os jogadores trocam de posição
    function captureRects() {
        const map = new Map();
        els.ranking.querySelectorAll(".row").forEach((el) => {
            map.set(el.dataset.id, el.getBoundingClientRect().top);
        });
        return map;
    }

    function animateMoves(before) {
        els.ranking.querySelectorAll(".row").forEach((el) => {
            const prev = before.get(el.dataset.id);
            if (prev === undefined) return;
            const delta = prev - el.getBoundingClientRect().top;
            if (!delta) return;
            el.animate(
                [{ transform: `translateY(${delta}px)` }, { transform: "translateY(0)" }],
                { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" }
            );
        });
    }

    /* ---------- Formulário ---------- */

    function setPreview(src) {
        els.photoPreview.style.backgroundImage = src ? `url('${src}')` : "";
        els.photoPreview.classList.toggle("has-photo", Boolean(src));
    }

    function resetForm() {
        els.form.reset();
        fillTeamSelect();
        els.goals.value = 1;
        pendingPhoto = null;
        editingId = null;
        setPreview(null);
        els.formTitle.textContent = "Novo jogador";
        els.submit.textContent = "Adicionar";
        els.cancel.hidden = true;
    }

    function startEdit(id) {
        const p = state.players.find((x) => x.id === id);
        if (!p) return;
        editingId = id;
        pendingPhoto = p.photo || null;
        els.name.value = p.name;
        fillTeamSelect(p.team);
        els.team.value = p.team;
        els.goals.value = p.goals;
        setPreview(pendingPhoto);
        els.formTitle.textContent = "Editar jogador";
        els.submit.textContent = "Salvar";
        els.cancel.hidden = false;
        els.name.focus();
        if (window.innerWidth <= 900) els.form.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    els.photoInput.addEventListener("change", async () => {
        const file = els.photoInput.files[0];
        if (!file) return;
        try {
            pendingPhoto = await resizeImage(file);
            setPreview(pendingPhoto);
        } catch (_) {
            alert("Não foi possível carregar essa imagem.");
        }
        els.photoInput.value = "";
    });

    els.form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = els.name.value.trim();
        const team = els.team.value;
        const goals = Math.max(0, Math.min(999, parseInt(els.goals.value, 10) || 0));
        if (!name || !team) return;

        if (editingId) {
            const p = state.players.find((x) => x.id === editingId);
            if (p) Object.assign(p, { name, team, goals, photo: pendingPhoto });
        } else {
            state.players.push({ id: uid(), name, team, goals, photo: pendingPhoto });
        }

        save();
        resetForm();
        render();
        els.name.focus();
    });

    els.cancel.addEventListener("click", resetForm);

    /* ---------- Ações da lista ---------- */

    els.ranking.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;
        const id = btn.closest(".row").dataset.id;
        const player = state.players.find((p) => p.id === id);
        if (!player) return;

        switch (btn.dataset.action) {
            case "inc":
                player.goals = Math.min(999, player.goals + 1);
                save();
                render(id);
                break;
            case "dec":
                player.goals = Math.max(0, player.goals - 1);
                save();
                render(id);
                break;
            case "edit":
                startEdit(id);
                break;
            case "delete":
                // Primeiro clique arma, segundo confirma
                if (!btn.classList.contains("confirm")) {
                    els.ranking.querySelectorAll(".confirm").forEach((b) => b.classList.remove("confirm"));
                    btn.classList.add("confirm");
                    btn.title = "Clique de novo para excluir";
                    clearTimeout(confirmTimer);
                    confirmTimer = setTimeout(() => btn.classList.remove("confirm"), 2500);
                    return;
                }
                state.players = state.players.filter((p) => p.id !== id);
                if (editingId === id) resetForm();
                save();
                render();
                break;
        }
    });

    els.search.addEventListener("input", () => render());
    if (els.rankingTeamFilter) {
        els.rankingTeamFilter.addEventListener("change", () => render());
    }

    /* ---------- Painel direito: Amarelados, Suspensos e Lesionados ---------- */

    els.statusPanel.addEventListener("change", (e) => {
        if (e.target.matches("[data-filter]")) {
            renderStatuses();
        }
    });

    els.statusPanel.addEventListener("click", (e) => {
        const toggleBtn = e.target.closest("[data-toggle]");
        if (toggleBtn) {
            const key = toggleBtn.dataset.toggle;
            const form = els.statusPanel.querySelector(`[data-form="${key}"]`);
            const filterSel = els.statusPanel.querySelector(`[data-filter="${key}"]`);
            const willOpen = form.hidden;
            form.hidden = !willOpen;
            toggleBtn.textContent = willOpen ? "−" : "+";
            if (willOpen) {
                if (filterSel && filterSel.value && !form.elements.team.value) {
                    form.elements.team.value = filterSel.value;
                }
                form.elements.name.focus();
            }
            return;
        }

        const stepBtn = e.target.closest("[data-status-action]");
        if (stepBtn) {
            const itemEl = stepBtn.closest(".status-item");
            const key = itemEl.dataset.key;
            const id = itemEl.dataset.id;
            const entry = state.statuses[key].find((x) => x.id === id);
            if (!entry) return;
            const current = entry.amount ?? 1;
            entry.amount = stepBtn.dataset.statusAction === "inc"
                ? Math.min(99, current + 1)
                : Math.max(0, current - 1);
            save();
            renderStatuses();
            return;
        }

        const removeBtn = e.target.closest("[data-remove]");
        if (removeBtn) {
            const itemEl = removeBtn.closest(".status-item");
            const key = itemEl.dataset.key;
            const id = removeBtn.dataset.remove;
            state.statuses[key] = state.statuses[key].filter((x) => x.id !== id);
            save();
            renderStatuses();
        }
    });

    // Quando o usuário escolhe um jogador já cadastrado, preenche o time automaticamente
    els.statusPanel.addEventListener("input", (e) => {
        if (e.target.name !== "name") return;
        const form = e.target.closest(".status-form");
        if (!form) return;
        const val = e.target.value.trim().toLowerCase();
        const found = state.players.find((p) => p.name.toLowerCase() === val);
        if (found) {
            form.elements.team.value = found.team;
        }
    });

    els.statusPanel.addEventListener("submit", (e) => {
        const form = e.target.closest(".status-form");
        if (!form) return;
        e.preventDefault();

        const key = form.dataset.form;
        const name = form.elements.name.value.trim();
        const team = form.elements.team.value;
        const rawAmount = parseInt(form.elements.amount.value, 10);
        const amount = Number.isFinite(rawAmount) ? Math.max(0, Math.min(99, rawAmount)) : 1;
        if (!name || !team) return;

        state.statuses[key].push({ id: uid(), name, team, amount });
        save();
        form.reset();
        form.elements.team.selectedIndex = 0;
        form.elements.amount.value = 1;
        form.hidden = true;
        const toggleBtn = els.statusPanel.querySelector(`[data-toggle="${key}"]`);
        if (toggleBtn) toggleBtn.textContent = "+";
        renderStatuses();
    });

    /* ---------- Backup (exportar / importar) ---------- */

    function showStatus(message, isError = false) {
        els.backupStatus.textContent = message;
        els.backupStatus.classList.toggle("error", isError);
        clearTimeout(statusTimer);
        statusTimer = setTimeout(() => (els.backupStatus.textContent = ""), 4000);
    }

    els.exportBtn.addEventListener("click", () => {
        const payload = {
            app: "scorely",
            version: 2,
            exportedAt: new Date().toISOString(),
            title: state.title,
            players: state.players,
            statuses: state.statuses,
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const date = new Date().toISOString().slice(0, 10);
        const a = document.createElement("a");
        a.href = url;
        a.download = `scorely-backup-${date}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showStatus("Backup exportado.");
    });

    els.importBtn.addEventListener("click", () => els.importInput.click());

    els.importInput.addEventListener("change", async () => {
        const file = els.importInput.files[0];
        els.importInput.value = "";
        if (!file) return;

        let data;
        try {
            data = JSON.parse(await file.text());
        } catch (_) {
            showStatus("Arquivo inválido.", true);
            return;
        }

        if (!isValidData(data)) {
            showStatus("Esse arquivo não é um backup do Scorely.", true);
            return;
        }

        if (state.players.length &&
            !confirm(`Importar ${data.players.length} jogador(es)? Os dados atuais serão substituídos.`)) {
            return;
        }

        state = {
            title: typeof data.title === "string" ? data.title : "",
            players: data.players.map((p) => ({
                id: p.id,
                name: p.name,
                team: p.team,
                goals: Math.max(0, Math.round(p.goals)),
                photo: typeof p.photo === "string" ? p.photo : null,
            })),
            statuses: normalizeStatuses(data.statuses),
            seededV1: true,
        };
        save();
        resetForm();
        els.championship.textContent = state.title || "Nome do campeonato";
        render();
        showStatus("Backup importado.");
    });

    /* ---------- Nome do campeonato ---------- */

    if (state.title) els.championship.textContent = state.title;

    els.championship.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            els.championship.blur();
        }
    });

    els.championship.addEventListener("blur", () => {
        const text = els.championship.textContent.trim();
        if (!text) els.championship.textContent = "Nome do campeonato";
        state.title = text;
        save();
    });

    fillTeamSelect();
    fillStatusTeamSelects();
    render();
})();
