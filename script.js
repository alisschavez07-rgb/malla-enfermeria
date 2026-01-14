// Selecciona todos los cursos
const cursos = document.querySelectorAll(".curso");

// Cargar cursos aprobados guardados
const aprobadosGuardados = JSON.parse(localStorage.getItem("cursosAprobados")) || [];

cursos.forEach(curso => {
  if (aprobadosGuardados.includes(curso.innerText)) {
    curso.classList.add("aprobado");
  }

  curso.addEventListener("click", () => {
    curso.classList.toggle("aprobado");
    guardarEstado();
  });
});

function guardarEstado() {
  const aprobados = [];
  cursos.forEach(curso => {
    if (curso.classList.contains("aprobado")) {
      aprobados.push(curso.innerText);
    }
  });
  localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
}
