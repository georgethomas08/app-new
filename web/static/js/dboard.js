document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
      tChartLoad();
      hChartLoad();
      pChartLoad();
      rlChartLoad();
      rfChartLoad();
      slChartLoad();
      spChartLoad();
      stChartLoad();
      vxChartLoad();
      vyChartLoad();
      arsChartLoad();
      
  
    });
  
    //setInterval(tChartLoad(), 5000);
    //setInterval(function(){tChartLoad()},3000)
    
  setInterval(function () { 
    tChartLoad();
    hChartLoad();
    pChartLoad();
    rlChartLoad();
    rfChartLoad();
    slChartLoad();
    spChartLoad();
    stChartLoad();
    vxChartLoad();
    vyChartLoad();
    arsChartLoad(); 
  }, 5000)
  
    document.getElementById("tbutton").onclick = function () { tChartLoad() };
    document.getElementById("hbutton").onclick = function () { hChartLoad() };
    document.getElementById("pbutton").onclick = function () { pChartLoad() };
    document.getElementById("rlbutton").onclick = function () { rlChartLoad() };
    document.getElementById("rfbutton").onclick = function () { rfChartLoad() };
    document.getElementById("slbutton").onclick = function () { slChartLoad() };
    document.getElementById("spbutton").onclick = function () { spChartLoad() };
    document.getElementById("stbutton").onclick = function () { stChartLoad() };
    document.getElementById("vxbutton").onclick = function () { vxChartLoad() };
    document.getElementById("vybutton").onclick = function () { vyChartLoad() };
    document.getElementById("arsbutton").onclick = function () { vyChartLoad() };
  
    function arrayMin(arr) {
      var len = arr.length, min = Infinity;
      while (len--) {
        if (arr[len] < min) {
          min = arr[len];
        }
      }
      return min;
    };
  
    function arrayMax(arr) {
      var len = arr.length, max = -Infinity;
      while (len--) {
        if (arr[len] > max) {
          max = arr[len];
        }
      }
      return max;
    };
  
    function arrayAvg(arr) {
      var len = arr.length, avg = 0;
      while (len--) {
        avg += arr[len];
      }
      return (parseFloat((avg / arr.length)).toFixed(2));
    };
  
    function tChartLoad() {
      var getData = $.get('/cudata');
      getData.done(function (currentrecs) {
        console.log(currentrecs);
        var curArr = currentrecs.currentrecs.map(element => element.current);
        console.log(curArr);
        //var tAvg = tempArr.reduce(function(sum, a) { return sum + a },0)/(tempArr.length||1);
        document.getElementById('tTable').rows[1].cells[0].innerHTML = arrayMin(curArr);
        document.getElementById('tTable').rows[1].cells[1].innerHTML = arrayMax(curArr);
        document.getElementById('tTable').rows[1].cells[2].innerHTML = arrayAvg(curArr);
        var tsArr = currentrecs.currentrecs.map(element => element.ts.$date);
        //console.log(tsArr);
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('tChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Current',
              data: curArr,
              borderWidth: 2,
              borderColor: 'brown',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Current time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function hChartLoad() {
      var getData = $.get('/hedata');
      getData.done(function (hexanerecs) {
        //console.log(humrecs);
  
        var hexArr = hexanerecs.hexanerecs.map(element => element.hexane_seal);
        console.log(hexArr);
        //var hAvg = humArr.reduce(function(sum, a) { return sum + a },0)/(humArr.length||1);
        document.getElementById('hTable').rows[1].cells[0].innerHTML = arrayMin(hexArr);
        document.getElementById('hTable').rows[1].cells[1].innerHTML = arrayMax(hexArr);
        document.getElementById('hTable').rows[1].cells[2].innerHTML = arrayAvg(hexArr);
        var tsArr = hexanerecs.hexanerecs.map(element => element.ts.$date);
        //console.log(tsArr);
  
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('hChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Hexane Seal Flow',
              data: hexArr,
              borderWidth: 2,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,255, 0, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Hexane Seal Flow time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function pChartLoad() {
      var getData = $.get('/ledata');
      getData.done(function (levelrecs) {
        //console.log(presrecs);
  
        var levArr = levelrecs.levelrecs.map(element => element.level_control);
        console.log(levArr);
        //var pAvg = presArr.reduce(function(sum, a) { return sum + a },0)/(presArr.length||1);
        document.getElementById('pTable').rows[1].cells[0].innerHTML = arrayMin(levArr);
        document.getElementById('pTable').rows[1].cells[1].innerHTML = arrayMax(levArr);
        document.getElementById('pTable').rows[1].cells[2].innerHTML = arrayAvg(levArr);
        var tsArr = levelrecs.levelrecs.map(element => element.ts.$date);
        //console.log(tsArr);
  
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('pChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Level Control',
              data: levArr,
              borderWidth: 2,
              borderColor: 'green',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Level Control time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function rlChartLoad() {
      var getData = $.get('/rldata');
      getData.done(function (rlrecs) {
        //console.log(presrecs);
  
        var rlArr = rlrecs.rlrecs.map(element => element.reactor_level);
        console.log(rlArr);
        //var pAvg = presArr.reduce(function(sum, a) { return sum + a },0)/(presArr.length||1);
        document.getElementById('rlTable').rows[1].cells[0].innerHTML = arrayMin(rlArr);
        document.getElementById('rlTable').rows[1].cells[1].innerHTML = arrayMax(rlArr);
        document.getElementById('rlTable').rows[1].cells[2].innerHTML = arrayAvg(rlArr);
        var tsArr = rlrecs.rlrecs.map(element => element.ts.$date);
        //console.log(tsArr);
  
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('rlChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Reactor Level',
              data: rlArr,
              borderWidth: 2,
              borderColor: 'brown',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Reactor Level time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
    function rfChartLoad() {
      var getData = $.get('/rfdata');
      getData.done(function (rfrecs) {
        //console.log(humrecs);
  
        var rfArr = rfrecs.rfrecs.map(element => element.recycle_flow);
        console.log(rfArr);
        //var hAvg = humArr.reduce(function(sum, a) { return sum + a },0)/(humArr.length||1);
        document.getElementById('rfTable').rows[1].cells[0].innerHTML = arrayMin(rfArr);
        document.getElementById('rfTable').rows[1].cells[1].innerHTML = arrayMax(rfArr);
        document.getElementById('rfTable').rows[1].cells[2].innerHTML = arrayAvg(rfArr);
        var tsArr = rfrecs.rfrecs.map(element => element.ts.$date);
        //console.log(tsArr);
  
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('rfChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Recycle Flow',
              data: rfArr,
              borderWidth: 2,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,255, 0, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Recycle Flow time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function slChartLoad() {
      var getData = $.get('/sldata');
      getData.done(function (sealrecs) {
        //console.log(presrecs);
  
        var slArr = sealrecs.sealrecs.map(element => element.seal_level);
        console.log(slArr);
        //var pAvg = presArr.reduce(function(sum, a) { return sum + a },0)/(slArr.length||1);
        document.getElementById('slTable').rows[1].cells[0].innerHTML = arrayMin(slArr);
        document.getElementById('slTable').rows[1].cells[1].innerHTML = arrayMax(slArr);
        document.getElementById('slTable').rows[1].cells[2].innerHTML = arrayAvg(slArr);
        var tsArr = sealrecs.sealrecs.map(element => element.ts.$date);
        //console.log(tsArr);
  
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('slChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Seal Level',
              data: slArr,
              borderWidth: 2,
              borderColor: 'green',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Seal Level time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function spChartLoad() {
      var getData = $.get('/spdata');
      getData.done(function (sprecs) {
        console.log(sprecs);
        var spArr = sprecs.sprecs.map(element => element.suction_pressure);
        console.log(spArr);
        //var tAvg = tempArr.reduce(function(sum, a) { return sum + a },0)/(tempArr.length||1);
        document.getElementById('spTable').rows[1].cells[0].innerHTML = arrayMin(spArr);
        document.getElementById('spTable').rows[1].cells[1].innerHTML = arrayMax(spArr);
        document.getElementById('spTable').rows[1].cells[2].innerHTML = arrayAvg(spArr);
        var tsArr = sprecs.sprecs.map(element => element.ts.$date);
        //console.log(tsArr);
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('spChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Suction Pressure',
              data: spArr,
              borderWidth: 2,
              borderColor: 'brown',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Suction Pressure time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function stChartLoad() {
      var getData = $.get('/stdata');
      getData.done(function (strecs) {
        //console.log(humrecs);
  
        var stArr = strecs.strecs.map(element => element.suction_temperature);
        console.log(stArr);
        //var hAvg = humArr.reduce(function(sum, a) { return sum + a },0)/(humArr.length||1);
        document.getElementById('stTable').rows[1].cells[0].innerHTML = arrayMin(stArr);
        document.getElementById('stTable').rows[1].cells[1].innerHTML = arrayMax(stArr);
        document.getElementById('stTable').rows[1].cells[2].innerHTML = arrayAvg(stArr);
        var tsArr = strecs.strecs.map(element => element.ts.$date);
        //console.log(tsArr);
  
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('stChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Suction Temperature',
              data: stArr,
              borderWidth: 2,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,255, 0, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Suction Temperature time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function vxChartLoad() {
      var getData = $.get('/vxdata');
      getData.done(function (xvrecs) {
        //console.log(presrecs);
  
        var vxArr = xvrecs.xvrecs.map(element => element.vibration_x);
        console.log(vxArr);
        //var pAvg = presArr.reduce(function(sum, a) { return sum + a },0)/(presArr.length||1);
        document.getElementById('vxTable').rows[1].cells[0].innerHTML = arrayMin(vxArr);
        document.getElementById('vxTable').rows[1].cells[1].innerHTML = arrayMax(vxArr);
        document.getElementById('vxTable').rows[1].cells[2].innerHTML = arrayAvg(vxArr);
        var tsArr = xvrecs.xvrecs.map(element => element.ts.$date);
        //console.log(tsArr);
  
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('vxChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Vibration X',
              data: vxArr,
              borderWidth: 2,
              borderColor: 'green',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Vibration X time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
  
    function vyChartLoad() {
      var getData = $.get('/vydata');
      getData.done(function (vyrecs) {
        console.log(vyrecs);
        var vyArr = vyrecs.vyrecs.map(element => element.vibration_y);
        console.log(vyArr);
        //var tAvg = tempArr.reduce(function(sum, a) { return sum + a },0)/(tempArr.length||1);
        document.getElementById('vyTable').rows[1].cells[0].innerHTML = arrayMin(vyArr);
        document.getElementById('vyTable').rows[1].cells[1].innerHTML = arrayMax(vyArr);
        document.getElementById('vyTable').rows[1].cells[2].innerHTML = arrayAvg(vyArr);
        var tsArr = vyrecs.vyrecs.map(element => element.ts.$date);
        //console.log(tsArr);
        var cnvTsArr = tsArr.map(function (element) {
          var temp = new Date(parseInt(element))
          element = temp.toISOString().substring(11, 19)
          return element;
        });
        console.log(cnvTsArr);
  
        var ctx = document.getElementById('vyChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: cnvTsArr,
            datasets: [{
              label: 'Vibration Y',
              data: vyArr,
              borderWidth: 2,
              borderColor: 'brown',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fillOpacity: 0.3
            }]
          },
          options: {
            responsive: false,
            title: {
              display: true,
              text: "Vibration Y time series(Last 1 hr)"
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      });
    };
    function arsChartLoad() {
        var getData = $.get('/arsdata');
        getData.done(function (arsrecs) {
          //console.log(presrecs);
    
          var arsArr = arsrecs.arsrecs.map(element => element.asset_running_status);
          console.log(arsArr);
          //var pAvg = presArr.reduce(function(sum, a) { return sum + a },0)/(presArr.length||1);
          document.getElementById('arsTable').rows[1].cells[0].innerHTML = arrayMin(arsArr);
          document.getElementById('arsTable').rows[1].cells[1].innerHTML = arrayMax(arsArr);
          document.getElementById('arsTable').rows[1].cells[2].innerHTML = arrayAvg(arsArr);
          var tsArr = arsrecs.arsrecs.map(element => element.ts.$date);
          //console.log(tsArr);
    
          var cnvTsArr = tsArr.map(function (element) {
            var temp = new Date(parseInt(element))
            element = temp.toISOString().substring(11, 19)
            return element;
          });
          console.log(cnvTsArr);
    
          var ctx = document.getElementById('arsChart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: cnvTsArr,
              datasets: [{
                label: 'Asset Running Status',
                data: arsArr,
                borderWidth: 2,
              borderColor: 'blue',
              backgroundColor: 'rgba(0,255, 0, 0.1)',
              fillOpacity: 0.3
              }]
            },
            options: {
              responsive: false,
              title: {
                display: true,
                text: "Asset Running Status time series(Last 1 hr)"
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
      });
    };
});
