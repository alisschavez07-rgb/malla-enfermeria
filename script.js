const cursos = document.querySelectorAll(".curso");
const creditosTexto = document.getElementById("creditos-acumulados");
const porcentajeTexto = document.getElementById("porcentaje-avance");

// Total de cursos
const totalCursos = cursos.length;

// Cargar cursos aprobados
const aprobadosGuardados = JSON.parse(localStorage.getItem("cursosAprobados")) || [];

cursos.forEach(curso => {
  if (aprobadosGuardados.includes(curso.innerText.trim())) {
    curso.classList.add("aprobado");
  }

  curso.addEventListener("click", () => {
    curso.classList.toggle("aprobado");
    guardarEstado();
    actualizarCreditos();
    actualizarPorcentaje();
  });
});

function guardarEstado() {
  const aprobados = [];
  cursos.forEach(curso => {
    if (curso.classList.contains("aprobado")) {
      aprobados.push(curso.innerText.trim());
    }
  });
  localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
}

function actualizarCreditos() {
  let total = 0;
  document.querySelectorAll(".curso.aprobado").forEach(curso => {
    total += parseInt(curso.dataset.creditos);
  });
  creditosTexto.innerText = `Créditos acumulados: ${total}`;
}

function actualizarPorcentaje() {
  const aprobados = document.querySelectorAll(".curso.aprobado").length;
  const porcentaje = Math.round((aprobados / totalCursos) * 100);
  porcentajeTexto.innerText = `Avance: ${porcentaje}%`;
}

// Inicializar al cargar
actualizarCreditos();
actualizarPorcentaje();
