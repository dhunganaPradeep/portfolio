<template>
  <main class="flex flex-col flex-auto lg:flex-row overflow-hidden">

    <div id="mobile-page-title">
      <h2>_projects</h2>
    </div>

    <div id="section-content-title" class="flex lg:hidden">
      <img class="section-arrow" src="/icons/arrow.svg">
      <span class="font-fira_regular text-white text-sm">projects</span>
    </div>

    <div class="flex flex-col w-full overflow-hidden">

      <!-- windows tab -->
      <div class="tab-height w-full hidden lg:flex border-bot items-center">
        <div class="flex items-center border-right h-full">
          <p class="font-fira_regular text-menu-text text-sm px-3">projects</p>
          <p class="font-fira_regular text-white text-sm px-3">all</p>
        </div>
      </div>

      <!-- windows tab mobile -->
      <div id="tab" class="flex lg:hidden items-center">
        <span class="text-white"> // </span>
        <p class="font-fira_regular text-white text-sm px-3">projects</p>
        <span class="text-menu-text"> / </span>
        <p class="font-fira_regular text-menu-text text-sm px-3">all</p>
      </div>

      <!-- projects -->
      <div id="projects-case" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-full h-full overflow-scroll lg:self-center">
        <project-card v-for="(project, index) in projects" :key="index" :index="index" :project="project" />
      </div>
      
      <div id="no-projects" v-if="projects.length === 0" 
        class="flex flex-col font-fira_retina text-menu-text my-5 h-full justify-center items-center">
        <span class="flex justify-center text-4xl pb-3">
          X__X
        </span>
        <span class="text-white flex justify-center text-xl">
          No projects found
        </span>
        <span class="flex justify-center">
          Check back soon for updates
        </span>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DevConfig from '~/developer.json'

const config = ref(DevConfig)
const projects = ref([])

onMounted(() => {
  const projectsArray = Object.values(config.value.projects)
  projects.value = projectsArray.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
})
</script>

<style>
#tab {
  padding: 25px 25px 5px;
  flex-wrap: wrap;
}

#view-button {
  background-color: #1C2B3A;
  transition: background-color 0.3s ease;
}

#view-button:hover {
  background-color: #263B50;
}

#projects-case {
  padding: 20px;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  #projects-case {
    padding: 0px 25px 40px;
  }
}

@media (min-width: 768px) {
  #projects-case {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 50px 50px 40px;
  }
}

@media (min-width: 1350px) {
  #projects-case {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 50px 80px 40px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.project-card) {
  animation: fadeIn 0.5s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes animateToBottom {
  from {
    transform: translate3d(0, -200px, 0);
  }
  to {
    transform: translate3d(0, 10px, 0);
  }
}
</style>