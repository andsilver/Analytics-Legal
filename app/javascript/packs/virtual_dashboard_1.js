import * as d3 from "d3";

const dataset = {
    "children": [{"Name":"Accidentes del trabajo y enfermedades profesionales ","Count":17831},
   {"Name":"Art. 19 Nº 1 CPR. Derecho a la vida y la integridad ","Count":18102},
   {"Name":"Art. 19 Nº 12 CPR. Libertad de opinión e información ","Count":1002},
   {"Name":"Art. 19 Nº 16 CPR. Libertad de Trabajo y su protección ","Count":7148},
   {"Name":"Art. 19 Nº 4 CPR. Vida Privada y Honra ","Count":11480},
   {"Name":"Art. 19 Nº 5 CPR. Inviolabilidad de la comunicación privada ","Count":804},
   {"Name":"Art. 19 Nº 6 CPR. Libertad de creencia ","Count":370},
   {"Name":"Art. 2 CT. Sobre actos de discriminación ","Count":8916},
   {"Name":"Asignación de colación ","Count":1960},
   {"Name":"Asignación de experiencia ","Count":42},
   {"Name":"Asignación de locomoción ","Count":2243},
   {"Name":"Asignación de pérdida de caja ","Count":123},
   {"Name":"Asignación de perfeccionamiento ","Count":54},
   {"Name":"Asignación desgaste de herramientas ","Count":79},
   {"Name":"Asignación familia ","Count":2015},
   {"Name":"Asignación por desempeño en cond. Difíciles ","Count":45},
   {"Name":"Asignación por responsabilidad ","Count":109},
   {"Name":"Asignaciones especiales ","Count":770},
   {"Name":"Bonos ","Count":14934},
   {"Name":"Comisiones ","Count":7647},
   {"Name":"Costas ","Count":302301},
   {"Name":"Cotizaciones de Salud ","Count":107685},
   {"Name":"Cotizaciones del Seguro de Cesantía ","Count":97939},
   {"Name":"Cotizaciones Previsionales ","Count":124500},
   {"Name":"Cuota Sindical ","Count":305},
   {"Name":"Daño moral ","Count":19679},
   {"Name":"Desafuero ","Count":57},
   {"Name":"Descanso compensatorio ","Count":2092},
   {"Name":"Descanso días festivos ","Count":1012},
   {"Name":"Descanso dominical ","Count":1581},
   {"Name":"Despido indirecto ","Count":38435},
   {"Name":"Despido injustificado ","Count":248838},
   {"Name":"Feriado legal ","Count":88351},
   {"Name":"Feriado progresivo ","Count":2660},
   {"Name":"Feriado proporcional ","Count":181563},
   {"Name":"Fuero maternal ","Count":3979},
   {"Name":"Fuero sindical ","Count":584},
   {"Name":"Gratificaciones legales ","Count":14884},
   {"Name":"Horas extras ","Count":31369},
   {"Name":"Indemnización adicional ","Count":390},
   {"Name":"Indemnización convenciona ","Count":1481},
   {"Name":"Indemnización de trabajadora de casa particular ","Count":5059},
   {"Name":"Indemnización del artículo 87 del Estatuto Docente ","Count":1097},
   {"Name":"Indemnización por años de servicios ","Count":152763},
   {"Name":"Indemnización sustitutiva de aviso previo ","Count":220963},
   {"Name":"Multa ","Count":8044},
   {"Name":"Nulidad del despido ","Count":139812},
   {"Name":"Otras Gratificaciones ","Count":1329},
   {"Name":"Otras Indemnizaciones ","Count":57863},
   {"Name":"Otros (especificándola) ","Count":1},
   {"Name":"Participación ","Count":373},
   {"Name":"Prestaciones ","Count":137060},
   {"Name":"Primas ","Count":407},
   {"Name":"Reajustes e intereses ","Count":277101},
   {"Name":"Recálculo de pensiones ","Count":261},
   {"Name":"Recargos ","Count":116488},
   {"Name":"Regalías ","Count":143},
   {"Name":"Reincorporación ","Count":4410},
   {"Name":"Remuneraciones ","Count":171413},
   {"Name":"Semana corrida ","Count":6472},
   {"Name":"Subterfugio ","Count":2838},
   {"Name":"Sueldo ","Count":4973},
   {"Name":"Trato ","Count":1051},
   {"Name":"Viáticos ","Count":908},
   {"Name":"Reclamo Multa Administrativa ","Count":27738},
   {"Name":"Reclamo Multa Administrativa menos 10 ingresos mínimos ","Count":14},
   {"Name":"Otros Reclamos ","Count":867},
   {"Name":"Art. 12 C. del T.(Ius Variandi) ","Count":203},
   {"Name":"Art. 27 inciso final C. del T. Jornada larga ","Count":1},
   {"Name":"Art. 31 inciso segundo C. del T. Pacto horas extras ","Count":9},
   {"Name":"Art. 34 inciso segundo C. del T. Proceso continuo ","Count":3},
   {"Name":"Art. 91 inciso final C. del T. Regalías agrícolas ","Count":3},
   {"Name":"Art. 223 inciso cuarto C. del T. Const. Sindicato ","Count":55},
   {"Name":"Art. 297 inciso segundo C. del T. Disolución org. Sindical ","Count":18},
   {"Name":"Art. 305 inciso tercero C. del T. Negociación colectiva ","Count":10},
   {"Name":"Art. 380 y 392. Equipos de emergencia ","Count":9},
   {"Name":"Desafuero Maternal ","Count":27288},
   {"Name":"Desafuero Sindical ","Count":3713},
   {"Name":"Otras Materias Sindicales ","Count":5143},
   {"Name":"Art. 485 inciso 3º CT ","Count":13048},
   {"Name":"Art. 62bis. Igualdad de remuneraciones ","Count":34},
]};





const diameter = 1200;
const color = d3.scaleOrdinal(d3.schemeCategory10);

const bubble = d3.pack(dataset)
  .size([diameter, diameter])
  .padding(0.7);

const svg = d3.select("body")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");

const nodes = d3.hierarchy(dataset)
  .sum(function(d) { return d.Count; });

const node = svg.selectAll(".node")
  .data(bubble(nodes).descendants())
  .enter()
  .filter(function(d){
      return  !d.children
  })
  .append("g")
  .attr("class", "node")
  .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
  });

node.append("title")
  .text(function(d) {
      return d.Name + ": " + d.Count;
  });

node.append("circle")
  .attr("r", function(d) {
      return d.r;
  })
  .style("fill", function(d,i) {
      return color(i);
  });

node.append("text")
  .attr("dy", ".2em")
  .style("text-anchor", "middle")
  .text(function(d) {
      return d.data.Name.substring(0, d.r / 3);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", function(d){
      return d.r/5;
  })
  .attr("fill", "white");

node.append("text")
  .attr("dy", "1.3em")
  .style("text-anchor", "middle")
  .text(function(d) {
      return d.data.Count;
  })
  .attr("font-family",  "Gill Sans", "Gill Sans MT")
  .attr("font-size", function(d){
      return d.r/5;
  })
  .attr("fill", "white");

d3.select(self.frameElement)
  .style("height", diameter + "px");