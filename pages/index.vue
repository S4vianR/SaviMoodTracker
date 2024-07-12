<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
    <Style type="text/css" children="body { background-color: green; }"></Style>
  </Head>
  <div>
    <Nav />
    <main>
      <div>
        <h3>Calendario</h3>
        <div>
          <!-- Menu to choose the month -->
          <select v-model="selectedMonth">
            <option v-for="(daysInMonth, month) in months" :key="month">
              {{ month }}
            </option>
          </select>
        </div>
      </div>
      <div id="today">
        <!-- Escribir cual es el dia de hoy -->
        {{
          `El día de hoy es: ${new Intl.DateTimeFormat("es-MX", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date())}`
        }}
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
              @click="handleDaySelection(i, selectedMonth)"
            >
              {{ i }}
            </div>
          </div>
        </div>
        <aside>
          <form
            v-if="dateSelected"
            @submit.prevent="
              handleMoodFormSubmit(
                selectedDay,
                selectedMonth,
                new Date().getFullYear()
              )
            "
            @reset.prevent="handleMoodFormReset(
              selectedDay,
              selectedMonth,
              new Date().getFullYear()
            )"
          >
            <h4>{{ dateOfDaySelected }}</h4>
            <div>
              <label>¿Cómo te sientes hoy?</label>
              <div>
                <div>
                  <UCheckbox
                    v-model="felizChecked"
                    color="yellow"
                    name="felizCheck"
                    label="Felíz"
                  />
                </div>
                <div>
                  <UCheckbox
                    v-model="tristeChecked"
                    color="blue"
                    name="tristeCheck"
                    label="Triste"
                  />
                </div>
                <div>
                  <UCheckbox
                    v-model="enojadoChecked"
                    color="red"
                    name="enojadoCheck"
                    label="Enojado"
                  />
                </div>
                <div>
                  <UCheckbox
                    v-model="ansiosoChecked"
                    color="orange"
                    name="ansiosoCheck"
                    label="Ansioso"
                  />
                </div>
                <div>
                  <UCheckbox
                    v-model="estresadoChecked"
                    color="violet"
                    name="estresadoCheck"
                    label="Estresado"
                  />
                </div>
                <!-- <div>
                  <URadioGroup
                    v-model="moodStore[idMood]"
                    legend="¿Cómo te sientes hoy?"
                    :options="options"
                    color="amber"
                  />
                </div> -->
              </div>
            </div>
            <div class="formButtons">
              <button type="submit">Guardar</button>
              <button type="reset">Borrar</button>
            </div>
          </form>
          <div v-else class="asideEsperando">
            <p>{{ message }}</p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const title = ref("Savi Mood Tracker | Home");

import Localbase from "localbase";
let db = new Localbase("db");
db.config.debug = false;

// Reactive value to store the selected day
const selectedDay = ref(0);
const dateOfDaySelected = ref("");
const dateSelected = ref(false);

// Variable for the success message
const message = ref("");

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

const monthIndices: { [key: string]: number } = {
  Enero: 0,
  Febrero: 1,
  Marzo: 2,
  Abril: 3,
  Mayo: 4,
  Junio: 5,
  Julio: 6,
  Agosto: 7,
  Septiembre: 8,
  Octubre: 9,
  Noviembre: 10,
  Diciembre: 11,
};

// Reactive variable to store the selected month
const selectedMonth = ref("");

// Variables for emotions
const felizChecked = ref(false);
const tristeChecked = ref(false);
const enojadoChecked = ref(false);
const ansiosoChecked = ref(false);
const estresadoChecked = ref(false);

// Intial selected month is based on the current month
onMounted(() => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  selectedMonth.value = month.charAt(0).toUpperCase() + month.slice(1);
  message.value = "Selecciona un día para registrar tu estado de ánimo.";
});

const handleDaySelection = (day: number, month: string) => {
  // Entering the function give the selected day the activeDay class
  const days = document.querySelectorAll(".day");
  days.forEach((day) => day.classList.remove("active-day"));
  days[day - 1].classList.add("active-day");

  // Getting the month index to get the max days in the month
  const monthIndex = monthIndices[selectedMonth.value];
  const year = new Date().getFullYear();
  const maxDaysInMonth = getMaxDaysInMonth(year, monthIndex);

  if (day < 1 || day > maxDaysInMonth) {
    console.error(`Invalid day: ${day} for month ${selectedMonth.value}`);
    return;
  }

  selectedDay.value = day;
  dateOfDaySelected.value = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(year, monthIndex, day));

  // Query the database to see if there is a mood for the selected day
  const idMood = `${day}${month}${new Date().getFullYear()}`;

  // Try to get the mood from the database, if it fails set all the emotions to false
  try {
    db.collection("moods")
      .doc(`${idMood}`)
      .get()
      .then((mood: any) => {
        felizChecked.value = mood?.feliz ?? false;
        tristeChecked.value = mood?.triste ?? false;
        enojadoChecked.value = mood?.enojado ?? false;
        ansiosoChecked.value = mood?.ansioso ?? false;
        estresadoChecked.value = mood?.estresado ?? false;
      });
  } catch (error) {
    felizChecked.value = false;
    tristeChecked.value = false;
    enojadoChecked.value = false;
    ansiosoChecked.value = false;
    estresadoChecked.value = false;
  }

  // Set the reactive variable to show the form
  dateSelected.value = true;
};

const getMaxDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const handleMoodFormSubmit = (day: any, month: any, year: any) => {
  const idMood = `${day}${month}${year}`;
  // window.alert("ID: " + id);
  db.collection("moods").set([
    {
      id: idMood,
      feliz: felizChecked.value,
      triste: tristeChecked.value,
      enojado: enojadoChecked.value,
      ansioso: ansiosoChecked.value,
      estresado: estresadoChecked.value,
      _key: idMood,
    }
  ], { keys: true });
  dateSelected.value = false;
  const days = document.querySelectorAll(".day");
  days.forEach((day) => day.classList.remove("active-day"));
  days[day - 1].classList.remove("active-day");

  // Set the success message for 5 seconds then clear it and set the default message
  message.value = "¡Estado de ánimo guardado!";

  setTimeout(() => {
    message.value = "Selecciona un día para registrar tu estado de ánimo.";
  }, 1500);
};

const handleMoodFormReset = (day: any, month: any, year: any) => {
  const idMood = `${day}${month}${year}`;
  db.collection('moods').doc({ id: idMood }).delete();

  // Set the success message for 5 seconds then clear it and set the default message
  message.value = "¡Estados de ánimos borrados!";

  setTimeout(() => {
    message.value = "Selecciona un día para registrar tu estado de ánimo.";
  }, 1500);
  
  felizChecked.value = false;
  tristeChecked.value = false;
  enojadoChecked.value = false;
  ansiosoChecked.value = false;
  estresadoChecked.value = false;

};
</script>

<style>
select {
  cursor: pointer;
  padding: 0.3rem;
  border: 1px solid rgba(221, 221, 221, 0.3);
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  /* background-color: #fff; */
  background-color: rgba(221, 221, 221, 0.3);
  /* font-family: "Playwrite HU", cursive; */
  font-size: 0.875rem;
  font-weight: 600;
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
  margin: auto;
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 75svw;
  height: fit-content;
}

.calendar > aside {
  padding: 0.5rem;
  background-color: rgba(221, 221, 221, 0.3);
  min-height: 35rem;
  border-radius: 0.875rem;
  display: flex;
  width: 16rem;
}

.calendar > aside form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}

.calendar > aside > .asideEsperando {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

.calendar > aside * {
  font-size: 1.2rem;
}

.calendar > aside > form label {
  font-weight: 500;
}

.calendar > aside > form > .formButtons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.calendar > aside > form button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #e5e4e2;
  border: 1px solid #848884;
  cursor: pointer;
  font-weight: 500;
  color: #333;
  width: 7rem;
}

.calendar > aside > form > button:hover {
  background-color: #c0c0c0;
}

.calendar > aside > form > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.calendar > aside > form > div > div {
  /* Gray background that matches with the dark and light mode */
  background-color: rgba(221, 221, 221, 0.3);
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.5rem;
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
  min-height: 35rem;
  border-radius: 0.875rem;
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
  text-align: center;
  width: 8rem;
  cursor: pointer;
  font-size: 1.2rem;
}

main > div:nth-child(1) {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
}

#today {
  text-align: center;
}

/* Keyframe animation for glowing the active day between #fbbf24 and #f59e0b */
@keyframes glow {
  0% {
    background-color: #fbbf24;
    /* border-radius: 0rem; */
  }
  50% {
    background-color: #f59e0b;
    /* border-radius: 0.875rem; */
  }
  100% {
    background-color: #fbbf24;
    /* border-radius: 0rem; */
  }
}

.active-day {
  color: #333;
  font-weight: 600;
  border: none;
  background-color: #ca8a04;
  opacity: 0.875;
  /* animation: glow 2s ease-in-out infinite; */
}
</style>
