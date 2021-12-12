window.Apex = {
    chart: {
      foreColor: '#ccc',
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: "#535A6C",
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  };
    
  new ApexCharts(document.querySelector("#spark1"), spark1).render();
  new ApexCharts(document.querySelector("#spark2"), spark2).render();
  new ApexCharts(document.querySelector("#spark3"), spark3).render();
  new ApexCharts(document.querySelector("#spark4"), spark4).render();

  new ApexCharts(document.querySelector("#aktienKursGraphJahr"), aktienKursGraphJahr).render();
  //new ApexCharts(document.querySelector("#aktienKursGraphTotal"), aktienKursGraphTotal).render();


  //new ApexCharts(document.querySelector("#radialbarchart"), radialbarchart).render();
  
  
  var chartArea = new ApexCharts(
    document.querySelector("#areachart"),
    optionsArea
  );
  
  chartArea.render();

  var aktienKursGraphTotal = new ApexCharts(
    document.querySelector("#aktienKursGraphTotal"),
    aktienKursGraphTotal
  );

  aktienKursGraphTotal.render();

  var resetCssClasses = function(activeEl) {
    var els = document.querySelectorAll('button')
    Array.prototype.forEach.call(els, function(el) {
      el.classList.remove('status-button')
    })
    activeEl.target.classList.add('status-button')
  }
  
  
  document
    .querySelector('#aktienkurs_six_months')
    .addEventListener('click', function(e) {
      resetCssClasses(e)
  
      aktienKursGraphTotal.zoomX(
        new Date('01 Sep 2020').getTime(),
        new Date('01 Jan 2021').getTime()
      )
    })
  
  document
    .querySelector('#aktienkurs_one_year')
    .addEventListener('click', function(e) {
      resetCssClasses(e)
      aktienKursGraphTotal.zoomX(
        new Date('01 Sep 2018').getTime(),
        new Date('01 Jan 2021').getTime()
      )
    })

    document
    .querySelector('#aktienkurs_five_year')
    .addEventListener('click', function(e) {
      resetCssClasses(e)
      aktienKursGraphTotal.zoomX(
        new Date('01 Sep 2018').getTime(),
        new Date('01 Jan 2021').getTime()
      )
    })
  
  document.querySelector('#aktienkurs_ytd').addEventListener('click', function(e) {
    resetCssClasses(e)
  
    aktienKursGraphTotal.zoomX(
      new Date('01 Sep 2015').getTime(),
      new Date('01 Jan 2021').getTime()
    )
  })
  
  document.querySelector('#aktienkurs_all').addEventListener('click', function(e) {
    resetCssClasses(e)
  
    aktienKursGraphTotal.zoomX(
      new Date('01 Sep 1980').getTime(),
      new Date('01 Jan 2021').getTime()
    )
  })
  