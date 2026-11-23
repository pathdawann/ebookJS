const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// 1. Laboratorios de ejecución en consola + botón de reinicio
const E = {
  hero: 'const nombre = "Patricia";\nconst saludar = (n) => `¡Hola, ${n}!`;\n\nconsole.log(saludar(nombre));\nconsole.log([1, 2, 3].map((n) => n * 2));',
  c1: '// Prueba: cambia el texto o haz una operación\nconsole.log("JavaScript funciona");\nconsole.log(7 * 6);\nconsole.log("Cuenta".length);',
  c2: 'const pais = "Venezuela";\nlet edad = 25;\nedad = edad + 1;\nconsole.log(pais, edad);\nconsole.log(typeof pais, typeof edad);',
  c4: 'function sumar(a, b) {\n  return a + b;\n}\nconst doble = (n) => n * 2;\n\nconsole.log(sumar(3, 4));\nconsole.log(doble(21));',
  c5: 'const frutas = ["manzana", "pera", "uva"];\nfor (const f of frutas) {\n  console.log("Me gusta la " + f);\n}\nconsole.log(frutas.length);',
  c6: 'const persona = {\n  nombre: "Ana",\n  edad: 28,\n  saludar() { return "Hola, soy " + this.nombre; }\n};\nconsole.log(persona.nombre);\nconsole.log(persona.saludar());\nconst { edad } = persona;\nconsole.log(edad);',
  c8: 'console.log("1. inicio");\nsetTimeout(() => console.log("4. después de 1 s"), 1000);\nPromise.resolve().then(() => console.log("3. promesa"));\nconsole.log("2. fin del código normal");',
  c9: 'console.log(0 == "0", 0 === "0");\nconsole.log(null == undefined, null === undefined);\nconsole.log(0.1 + 0.2);'
};

function fm(v) {
  if (v === undefined) return "undefined";
  if (typeof v === "string") return v;
  if (typeof v === "function") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function run(code, out) {
  out.textContent = "";
  const L = (...a) => {
    out.textContent += a.map(fm).join(" ") + "\n";
  };
  try {
    new Function("console", code)({ log: L, error: L, warn: L, info: L });
  } catch (e) {
    out.textContent += "⚠ " + e.name + ": " + e.message + "\n";
  }
}

$$(".lab").forEach((l) => {
  const key = l.dataset.k;
  const defaultCode = E[key];

  const edWrap = document.createElement("div");
  edWrap.className = "ed-wrap";
  const edHead = document.createElement("div");
  edHead.className = "ed-head";
  edHead.innerHTML = '<span>script.js</span>';
  const resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.className = "mini-btn";
  resetBtn.title = "Restaurar código inicial";
  resetBtn.textContent = "↺ Reiniciar";

  const t = document.createElement("textarea");
  t.value = defaultCode;
  t.spellcheck = false;
  t.setAttribute("aria-label", "Editor de JavaScript");
  resetBtn.addEventListener("click", () => {
    t.value = defaultCode;
    o.textContent = "La salida aparecerá aquí.";
  });
  edHead.append(resetBtn);
  edWrap.append(edHead, t);

  const conWrap = document.createElement("div");
  conWrap.className = "con-wrap";
  const conHead = document.createElement("div");
  conHead.className = "con-head";
  conHead.textContent = "Consola";
  const o = document.createElement("pre");
  o.className = "con";
  o.setAttribute("aria-live", "polite");
  o.textContent = "La salida aparecerá aquí.";
  conWrap.append(conHead, o);

  const r = document.createElement("div");
  r.className = "row";
  r.append(edWrap, conWrap);

  const actions = document.createElement("div");
  actions.className = "lab-actions";
  const b = document.createElement("button");
  b.type = "button";
  b.className = "btn pill-prog";
  b.textContent = "▶ Ejecutar";
  b.addEventListener("click", () => run(t.value, o));
  actions.append(b);

  l.append(r, actions);
});

// 2. Tipos de datos
const V = [
  [42, "42"],
  ["hola", '"hola"'],
  [true, "true"],
  [null, "null"],
  [undefined, "undefined"],
  [[1, 2], "[1, 2]"],
  [{ a: 1 }, "{a: 1}"],
  [NaN, "NaN"],
  [() => 1, "() => 1"]
];

const D = {
  null: "Curiosidad histórica: typeof null da object. Es un error antiguo del lenguaje.",
  object: "Los arrays también son object; usa Array.isArray() para distinguirlos.",
  number: "Enteros y decimales comparten un solo tipo: number. NaN significa not a number, y aun así es number.",
  string: "Texto entre comillas.",
  boolean: "Solo true o false.",
  undefined: "Variable declarada sin valor.",
  function: "Las funciones también son valores."
};

function pt(i) {
  $$("#chips .chip").forEach((c, j) => c.classList.toggle("on", i === j));
  const t = typeof V[i][0];
  $("#ty-n").textContent =
    'typeof ' + V[i][1] + ' → "' + t + '". ' + (D[V[i][1] === "null" ? "null" : t] || "");
}

V.forEach((v, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip";
  b.textContent = v[1];
  b.addEventListener("click", () => pt(i));
  $("#chips").append(b);
});
pt(0);

// 3. Condicionales
function ea() {
  const e = +$("#ea").value;
  $("#ea-n").textContent = e;
  $("#ea-r").textContent = "Salida: " + (e >= 18 ? "Mayor de edad" : e >= 12 ? "Adolescente" : "Niño o niña");
}
$("#ea").addEventListener("input", ea);
ea();

// 4. Métodos de arrays
let A = [3, 1, 4];
let AC = "const numeros = [3, 1, 4];";

function ra() {
  const a = $("#ar");
  a.textContent = "";
  A.forEach((n) => {
    const b = document.createElement("b");
    b.textContent = n;
    a.append(b);
  });
  if (!A.length) a.textContent = "(vacío)";
  $("#ar-c").textContent = AC;
}

const AM = [
  ["push(n)", () => {
    const n = Math.ceil(Math.random() * 9);
    A.push(n);
    AC = "numeros.push(" + n + ");  // añade al final";
  }],
  ["pop()", () => {
    A.pop();
    AC = "numeros.pop();  // quita el último";
  }],
  ["map(n⇒n*2)", () => {
    A = A.map((n) => n * 2);
    AC = "numeros = numeros.map(n => n * 2);  // transforma cada uno";
  }],
  ["filter(n⇒n>3)", () => {
    A = A.filter((n) => n > 3);
    AC = "numeros = numeros.filter(n => n > 3);  // deja los que cumplen";
  }],
  ["sort()", () => {
    A.sort((a, b) => a - b);
    AC = "numeros.sort((a, b) => a - b);  // ordena de menor a mayor";
  }],
  ["reiniciar", () => {
    A = [3, 1, 4];
    AC = "const numeros = [3, 1, 4];";
  }]
];

AM.forEach((m) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "chip";
  b.textContent = m[0];
  b.addEventListener("click", () => {
    m[1]();
    ra();
  });
  $("#am").append(b);
});
ra();

// 5. DOM y eventos: contador y lista de tareas
let n = 0;
$("#mas").addEventListener("click", () => {
  $("#cnt").textContent = ++n;
});
$("#menos").addEventListener("click", () => {
  $("#cnt").textContent = --n;
});

$("#ti").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value.trim()) {
    const li = document.createElement("li");
    const c = document.createElement("span");
    c.textContent = e.target.value.trim();
    li.append(c);
    li.tabIndex = 0;
    const toggleDone = () => li.classList.toggle("dn");
    li.addEventListener("click", toggleDone);
    li.addEventListener("keydown", (k) => {
      if (k.key === "Enter" || k.key === " ") {
        k.preventDefault();
        toggleDone();
      }
    });
    $("#tl").append(li);
    e.target.value = "";
  }
});

// 6. Quiz interactivo con persistencia y reinicio
const Q = [
  ["¿Qué palabra declara una variable que NO cambiará?", ["const", "let", "var"], 0],
  ["¿Qué devuelve typeof 42?", ['"number"', '"integer"', '"digit"'], 0],
  ["¿Qué compara valor Y tipo?", ["==", "===", "="], 1],
  ["¿Qué método transforma cada elemento de un array?", ["map", "push", "pop"], 0],
  ["¿Qué hace addEventListener?", ["Reacciona a un evento como un clic", "Crea una variable", "Cambia el CSS siempre"], 0],
  ["¿Para qué sirve await?", ["Esperar una promesa sin bloquear la página", "Repetir código", "Declarar una función"], 0]
];

function renderQuiz() {
  const qz = $("#qz");
  qz.innerHTML = "";
  $("#qs").textContent = "";
  const savedAnswers = JSON.parse(localStorage.getItem("js_guide_quiz") || "{}");
  let sc = 0;
  let an = 0;

  const updateScore = () => {
    if (an > 0) $("#qz-reset").hidden = false;
    if (an === Q.length) {
      $("#qs").textContent = "Resultado: " + sc + " de " + Q.length + (sc === Q.length ? " · ¡perfecto!" : "");
    }
  };

  Q.forEach(([q, o, r], qIdx) => {
    const w = document.createElement("div");
    w.className = "mt-16";
    const p = document.createElement("b");
    p.textContent = q;
    w.append(p);

    const applyAnswer = (chosenIdx) => {
      if (w.dataset.d) return;
      w.dataset.d = "1";
      an++;
      const buttons = [...w.querySelectorAll("button")];
      buttons.forEach((btn) => (btn.disabled = true));
      if (chosenIdx === r) {
        sc++;
        buttons[chosenIdx].classList.add("ok");
      } else {
        buttons[chosenIdx].classList.add("no");
        buttons[r].classList.add("ok");
      }
      savedAnswers[qIdx] = chosenIdx;
      localStorage.setItem("js_guide_quiz", JSON.stringify(savedAnswers));
      updateScore();
    };

    o.forEach((t, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.textContent = t;
      b.addEventListener("click", () => applyAnswer(i));
      w.append(b);
    });

    qz.append(w);
    if (savedAnswers[qIdx] !== undefined) {
      applyAnswer(savedAnswers[qIdx]);
    }
  });
}

$("#qz-reset").addEventListener("click", () => {
  localStorage.removeItem("js_guide_quiz");
  $("#qz-reset").hidden = true;
  renderQuiz();
});
renderQuiz();

// 7. Notas resumen ("Recuerda") y enlaces de regreso
const RC = {
  t1: "JavaScript es el lenguaje que da comportamiento a la web.",
  t2: "Usa const por defecto y let cuando el valor cambie.",
  t3: "if, else if y else permiten tomar decisiones.",
  t4: "Una función se escribe una vez y se usa muchas.",
  t5: "map transforma, filter selecciona y for…of recorre.",
  t6: "Un objeto agrupa datos con pares clave: valor.",
  t7: "Selecciona elementos, escucha eventos y modifica el DOM.",
  t8: "Lo asíncrono no bloquea: usa promesas y await.",
  t9: "Prefiere ===, const y nombres claros; lee la consola.",
  t10: "Repasa el capítulo de cada pregunta que fallaste.",
  t11: "Construye proyectos pequeños todos los días."
};

$$(".sheet[id]").forEach((s) => {
  if (s.id === "toc") return;
  const r = RC[s.id];
  if (r) {
    const d = document.createElement("div");
    d.className = "note mt-18";
    d.innerHTML = "<b>Recuerda:</b> ";
    d.append(r);
    s.append(d);
  }
  const a = document.createElement("a");
  a.className = "btn back-toc";
  a.href = "#toc";
  a.textContent = "↑ Volver al contenido";
  s.append(a);
});

// 8. Progreso de lectura y tema oscuro/claro
const LK = $$(".toc a");
function markProgress() {
  let c = 0;
  LK.forEach((a) => {
    const d = document.querySelector(a.hash).getBoundingClientRect().bottom < innerHeight * 0.95;
    a.classList.toggle("done", d);
    if (d) c++;
  });
  $("#toc-n").textContent = c + " de " + LK.length + " capítulos recorridos";
  $("#nav-prog").textContent = c + " / " + LK.length;

  const h = document.documentElement;
  const maxScroll = h.scrollHeight - innerHeight;
  $("#pg").style.width = maxScroll > 0 ? (scrollY / maxScroll) * 100 + "%" : "0%";
}
addEventListener("scroll", markProgress, { passive: true });
markProgress();

const thBtn = $("#th");
function syncThemeLabel() {
  const isDark =
    document.documentElement.dataset.theme === "dark" ||
    (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme:dark)").matches);
  thBtn.textContent = isDark ? "☀️ Claro" : "🌙 Oscuro";
}

const savedTheme = localStorage.getItem("js_guide_theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
syncThemeLabel();

thBtn.addEventListener("click", () => {
  const r = document.documentElement;
  const isDark = r.dataset.theme
    ? r.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme:dark)").matches;
  const next = isDark ? "light" : "dark";
  r.dataset.theme = next;
  localStorage.setItem("js_guide_theme", next);
  syncThemeLabel();
});