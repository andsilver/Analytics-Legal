import * as d3 from "d3";

const dataset = {
	"children": [{"Name": "Acc. trabajo y enferm. Prof", "Count":17831},
	{"Name": "Derecho a la vida y la integridad", "Count":18102},
	{"Name": "Libertad de opinión e información", "Count":1002},
	{"Name": "Libertad de Trabajo y su protección", "Count":7148},
	{"Name": "Vida Privada y Honra", "Count":11480},
	{"Name": "Inviolabilidad de la comunicación privada", "Count":804},
	{"Name": "Libertad de creencia", "Count":370},
	{"Name": "Sobre actos de discriminación", "Count":8916},
	{"Name": "Asig. de colación", "Count":1960},
	{"Name": "Asig. de experiencia", "Count":42},
	{"Name": "Asig. de locomoción", "Count":2243},
	{"Name": "Asig. de pérdida de caja", "Count":123},
	{"Name": "Asig. de perfeccionamiento", "Count":54},
	{"Name": "Asig. desgaste de herramientas", "Count":79},
	{"Name": "Asig. familia", "Count":2015},
	{"Name": "Asig. por desempeño en cond. Difíciles", "Count":45},
	{"Name": "Asig. por responsabilidad", "Count":109},
	{"Name": "Asignaciones especiales", "Count":770},
	{"Name": "Bonos", "Count":14934},
	{"Name": "Comisiones", "Count":7647},
	{"Name": "Costas", "Count":302301},
	{"Name": "Cotiz. de Salud", "Count":107685},
	{"Name": "Cotiz. del Seguro de Cesantía", "Count":97939},
	{"Name": "Cotiz. Previsionales", "Count":124500},
	{"Name": "Cuota Sindical", "Count":305},
	{"Name": "Daño moral", "Count":19679},
	{"Name": "Desafuero", "Count":57},
	{"Name": "Descanso compensatorio", "Count":2092},
	{"Name": "Descanso días festivos", "Count":1012},
	{"Name": "Descanso dominical", "Count":1581},
	{"Name": "Despido indirecto", "Count":38435},
	{"Name": "Despido injustificado", "Count":248838},
	{"Name": "Feriado legal", "Count":88351},
	{"Name": "Feriado progresivo", "Count":2660},
	{"Name": "Feriado proporcional", "Count":181563},
	{"Name": "Fuero maternal", "Count":3979},
	{"Name": "Fuero sindical", "Count":584},
	{"Name": "Gratificaciones legales", "Count":14884},
	{"Name": "Horas extras", "Count":31369},
	{"Name": "Indem. adicional", "Count":390},
	{"Name": "Indem. convenciona", "Count":1481},
	{"Name": "Indem. de trabaj. casa particular", "Count":5059},
	{"Name": "Indem.  Estatuto Docente", "Count":1097},
	{"Name": "Indem. por años de servicios", "Count":152763},
	{"Name": "Indem. sustitutiva de aviso previo", "Count":220963},
	{"Name": "Multa", "Count":8044},
	{"Name": "Nulidad del despido", "Count":139812},
	{"Name": "Otras Gratificaciones", "Count":1329},
	{"Name": "Otras Indemnizaciones", "Count":57863},
	{"Name": "Otros (especificándola)", "Count":1},
	{"Name": "Participación", "Count":373},
	{"Name": "Prestaciones", "Count":137060},
	{"Name": "Primas", "Count":407},
	{"Name": "Reajustes e intereses", "Count":277101},
	{"Name": "Recálculo de pensiones", "Count":261},
	{"Name": "Recargos", "Count":116488},
	{"Name": "Regalías", "Count":143},
	{"Name": "Reincorporación", "Count":4410},
	{"Name": "Remuneraciones", "Count":171413},
	{"Name": "Semana corrida", "Count":6472},
	{"Name": "Subterfugio", "Count":2838},
	{"Name": "Sueldo", "Count":4973},
	{"Name": "Trato", "Count":1051},
	{"Name": "Viáticos", "Count":908},
	{"Name": "Reclamo Multa Administrativa", "Count":27752},
	{"Name": "Otros Reclamos", "Count":867},
	{"Name": "Art. 12 C. T", "Count":203},
	{"Name": " Jornada larga", "Count":1},
	{"Name": " Pacto horas extras", "Count":9},
	{"Name": "T. Proceso continuo", "Count":3},
	{"Name": "T. Regalías agrícolas", "Count":3},
	{"Name": "T. Const. Sindicato", "Count":55},
	{"Name": "T. Disolución org. Sindical", "Count":18},
	{"Name": " T. Negociación colectiva", "Count":10},
	{"Name": "Equipos de emergencia", "Count":9},
	{"Name": "Desafuero Maternal", "Count":27288},
	{"Name": "Desafuero Sindical", "Count":3713},
	{"Name": "Otras Materias Sindicales", "Count":5143},
	{"Name": "Art. 485", "Count":13048},
	{"Name": "Igualdad de remuneraciones", "Count":34},
]};

const diameter = 900;
const color = d3.scaleOrdinal(d3.schemeCategory10);

const bubble = d3.pack(dataset)
  .size([diameter, diameter])
  .padding(0.7);

const svg = d3.select("body")
  .append("svg")
	.attr("viewBox", `0, 0, ${diameter}, ${diameter}`)

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

node.append("circle")
  .attr("r", function(d) {
	  return d.r;
  })
  .style("fill", function(d,i) {
	  return color(i);
  })
	.attr("data-toggle", "popover")
	.attr("data-placement", "top")
	.attr("data-trigger", "hover")
	.attr("data-content", (d) => {
		return `${d.data.Name}: ${d.data.Count}`;
	});

node.append("text")
  .attr("dy", "0.5em")
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
