import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource: any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fc6b19',
                '#ff5733',
                '#117a65',
                '#9b59b6'
            ],
        }
    ],
    labels: []
  };
  constructor(private http: HttpClient){

  }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.budget.length; i++) {
        this.dataSource.labels.push(res.budget[i].title);
        this.dataSource.datasets[0].data.push(res.budget[i].budget);
    }
    this.createChart();
    this.created3chart();
    });
  }
  createChart() {
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

  created3chart() {
    const w = 350;
    const h = 300;
    const r = Math.min(w, h) / 2;

    const color = d3.scaleOrdinal()
      .domain(this.dataSource.labels)
      .range(this.dataSource.datasets[0].backgroundColor);

    const svg = d3.select("#d3-container")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${w / 2},${h / 2})`);

    const pie = d3.pie<number>()
      .value(d => d);

    const arc = d3.arc()
      .innerRadius(r - 50)
      .outerRadius(r);

    const arcs = svg.selectAll(".arc")
      .data(pie(this.dataSource.datasets[0].data))
      .enter()
      .append("g")
      .attr("class", "arc");

    /*arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d, i) => this.dataSource.labels[i]);*/

  }


}
