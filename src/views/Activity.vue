<template>
  <div class="activity">
    <div class="container">
      <div
        class="badge"
        @click="activeBadge = 0"
        :class="{'badge--active': activeBadge == 0}"
      >Project completion</div>
      <div
        class="badge"
        @click="activeBadge = 1"
        :class="{'badge--active': activeBadge == 1}"
      >Budget</div>
    </div>

    <div class="page-wrapper">
      <canvas v-show="activeBadge == 0" class="myChart"></canvas>
      <canvas v-show="activeBadge == 1" class="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import * as chart from "chart.js";

export default {
  data() {
    return {
      activeBadge: 0
    };
  },
  mounted() {
    let ctx = document.getElementsByClassName("myChart")[0].getContext("2d");
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            steppedLine: true,
            label: "Percentage of project completion",
            data: [10, 18, 34, 58, 78, 98],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255,99,132,1)"],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 100
              }
            }
          ]
        }
      }
    });


    let ctx2 = document.getElementsByClassName("myChart")[1].getContext("2d");
		var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'Percentage of budget completion',
					backgroundColor: '#664da0',
					borderColor: '#664da0',
					data: [10, 30, 39, 50, 75, 84, 88],
          fill: false,
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
				},
				scales: {
					yAxes: [{
						gridLines: {
							drawBorder: false,
							color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
						},
						ticks: {
							min: 0,
							max: 100,
							stepSize: 10
						}
					}]
				}
			}
    };
    
    let myChart2 = new Chart(ctx2, config);
	
  }
};
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.container
  +flex(1, 1)
  flex-wrap: wrap

.badge
  padding: 0 15px
  line-height: 30px
  height: 30px
  margin: 10px 15px 
  background: white
  border-radius: 10px
  font-weight: bold
  color: $color-purple
  font-size: 14px
  @extend %c-shadow
  @extend %pointer

.badge--active
  color: white
  background: $color-purple

.page-wrapper
  padding: 30px
  height: 80vh

.myChart
  +squared(100%)

</style>
