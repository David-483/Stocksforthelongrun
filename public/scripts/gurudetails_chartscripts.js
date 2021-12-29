var aumchart = new ApexCharts(document.querySelector("#aumchart"), options);
aumchart.render();

new ApexCharts(document.querySelector("#guruSectorChart"), guruSectorChart).render();

new ApexCharts(document.querySelector("#guruTopTenHoldingsTreemap"), guruTopTenHoldingsTreemap).render();

new ApexCharts(document.querySelector("#sectorOverTimeChart"), sectorOverTimeChart).render();
