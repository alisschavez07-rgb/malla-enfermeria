const cursos = document.querySelectorAll(".curso");
const creditosTexto = document.getElementById("creditos-acumulados");

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
    const creditos = parseInt(curso.dataset.creditos);
    total += creditos;
  });

  creditosTexto.innerText = `Créditos acumulados: ${total}`;
}

// Calcular al cargar
actualizarCreditos();
