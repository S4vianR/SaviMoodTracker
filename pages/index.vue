<template>
  <Header>
    <title>Savi Mood Tracker | Home</title>
  </Header>
  <div>
    <Nav />
    <main>
      <div>
        <h3>Calendar</h3>
        <div>
          <!-- Menu to choose the month -->
          <select v-model="selectedMonth">
            <option v-for="(daysInMonth, month) in months" :key="month">
              {{ month }}
            </option>
          </select>
        </div>
      </div>
      <div class="calendar">
        <!-- Using a v-if to conditionally render the calendar for the selected month -->
        <div v-if="selectedMonth" class="month">
          <h4>{{ selectedMonth }}</h4>
          <div class="days">
            <div
              v-for="i in months[selectedMonth]"
              :key="i"
              class="day"
              @click="handleClick(i)"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const handleClick = (day: number) => {
  window.alert(`You clicked on day ${day}`);
};
// List of the numbers of days of the months
const months: { [key: string]: number } = {
  Enero: 31,
  Febrero: 27,
  Marzo: 31,
  Abril: 30,
  Mayo: 31,
  Junio: 30,
  Julio: 31,
  Agosto: 31,
  Septiembre: 30,
  Octubre: 31,
  Noviembre: 30,
  Diciembre: 31,
};

// List of the days of the week
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Reactive variable to store the selected month
let selectedMonth = ref("");

// Intial selected month is based on the current month
onMounted(() => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  selectedMonth.value = month.charAt(0).toUpperCase() + month.slice(1);
});
</script>

<style>
select {
  cursor: pointer;
  padding: 0.3rem;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  background-color: #fff;
  color: #333;
  font-family: "Playwrite HU", cursive;
  font-size: 1rem;
  text-transform: capitalize;
}

select:focus {
  outline: none;
}

option {
  background-color: #fff;
  color: #333;
}

.calendar {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}

.month {
  /* border: 1px solid rgba(221, 221, 221,0.2); */
  padding: 1rem;
  background-color: rgba(221, 221, 221, 0.3);
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  place-items: center;
  justify-items: center;
}

.day {
  padding: 0.5rem;
  aspect-ratio: 16/9;
  border-bottom: 1px solid #ddd;
  background-color: lightgrey;
  text-align: center;
  width: 8rem;
  cursor: pointer;
  font-size: 1.2rem;
}

main > div:nth-child(1) {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
}
</style>
