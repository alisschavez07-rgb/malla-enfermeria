const cursos = document.querySelectorAll(".curso");
const creditosTexto = document.getElementById("creditos-acumulados");
const porcentajeTexto = document.getElementById("porcentaje-avance");

const totalCursos = cursos.length;
const guardados = JSON.parse(localStorage.getItem("cursosAprobados")) || [];

cursos.forEach(curso => {
  if (guardados.includes(curso.innerText.trim())) {
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
  let creditos = 0;
  let aprobados = 0;

  cursos.forEach(c => {
    if (c.classList.contains("aprobado")) {
      aprobados++;
      creditos += parseInt(c.dataset.creditos);
    }
  });

  creditosTexto.innerText = `Créditos acumulados: ${creditos}`;
  porcentajeTexto.innerText = `Avance: ${Math.round((aprobados / totalCursos) * 100)}%`;
}

actualizar();
