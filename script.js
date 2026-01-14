const cursos = document.querySelectorAll(".curso");
const creditosTexto = document.getElementById("creditos-acumulados");
const porcentajeTexto = document.getElementById("porcentaje-avance");

const totalCursos = cursos.length;
const aprobadosGuardados = JSON.parse(localStorage.getItem("cursosAprobados")) || [];

cursos.forEach(curso => {
  if (aprobadosGuardados.includes(curso.innerText.trim())) {
    curso.classList.add("aprobado");
  }

  curso.addEventListener("click", () => {
    curso.classList.toggle("aprobado");
    guardar();
    actualizar();
  });
});

function guardar() {
  const aprobados = [];
  cursos.forEach(c => {
    if (c.classList.contains("aprobado")) {
      aprobados.push(c.innerText.trim());
    }
  });
  localStorage.setItem("cursosAprobados", JSON.stringify(aprobados));
}

function actualizar() {
  let totalCreditos = 0;
  let aprobados = 0;

  cursos.forEach(c => {
    if (c.classList.contains("aprobado")) {
      aprobados++;
      totalCreditos += parseInt(c.dataset.creditos);
    }
  });

  creditosTexto.innerText = `Créditos acumulados: ${totalCreditos}`;
  porcentajeTexto.innerText = `Avance: ${Math.round((aprobados / totalCursos) * 100)}%`;
}

actualizar();
