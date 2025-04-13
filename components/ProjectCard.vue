<template>
  <div id="project" :key="key" class="lg:mx-5">

      <span class="flex text-sm my-3">
          <h3 v-if="index == null" class="text-purplefy font-fira_bold mr-3">Project {{ key + 1 }}</h3>
          <h3 v-else class="text-purplefy font-fira_bold mr-3">Project {{ index + 1 }}</h3>
          <h4 class="font-fira_retina text-menu-text"> // {{ project.title }}</h4>
      </span>

      <div id="project-card" class="flex flex-col">
          <div id="window">
              <div class="absolute flex flex-wrap right-3 top-3 gap-2 max-w-3/4">
                  <span v-for="(tech, techIndex) in project.tech" :key="tech" 
                        :class="['tech-tag', 'text-xs', 'font-fira_regular', 'px-2', 'py-1', 'rounded', getTagColorClass(techIndex)]">
                      {{ tech }}
                  </span>
              </div>
              <img id="showcase" :src="project.img" alt="" class="">
          </div>

          <div class="pb-8 pt-6 px-6 border-top">
              <p class="text-menu-text font-fira_retina text-sm mb-5">
              {{ project.description }}
              </p>
              <a id="view-button" :href="project.url" target="_blank" class="text-white font-fira_retina py-2 px-4 w-fit text-xs rounded-lg">
                  view-project
              </a>
          </div>
      </div>
  </div>
</template>

<script setup>

const props = defineProps(['project', 'key', 'index']);

const getTagColorClass = (index) => {
  const colorClasses = [
      'bg-blue-800 bg-opacity-75 text-blue-200',
      'bg-purple-800 bg-opacity-75 text-purple-200',
      'bg-green-800 bg-opacity-75 text-green-200',
      'bg-red-800 bg-opacity-75 text-red-200',
      'bg-yellow-800 bg-opacity-75 text-yellow-200',
      'bg-pink-800 bg-opacity-75 text-pink-200',
  ];
  
  return colorClasses[index % colorClasses.length];
};
</script>

<style scoped>
#project {
min-width: 400px;
margin-bottom: 5px;
}

#project-card {
border: 1px solid #1E2D3D;
background-color: #011221;
border-radius: 15px;
max-width: 400px;
}

#window {
max-height: 120px;
position: relative;
overflow: hidden;
}

#showcase {
border-top-right-radius: 15px;
border-top-left-radius: 15px;
}

.tech-tag {
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
backdrop-filter: blur(2px);
}

.bg-blue-800 {
background-color: #1e3a8a;
}
.text-blue-200 {
color: #bfdbfe;
}

.bg-purple-800 {
background-color: #5b21b6;
}
.text-purple-200 {
color: #e9d5ff;
}

.bg-green-800 {
background-color: #166534;
}
.text-green-200 {
color: #bbf7d0;
}

.bg-red-800 {
background-color: #991b1b;
}
.text-red-200 {
color: #fecaca;
}

.bg-yellow-800 {
background-color: #854d0e;
}
.text-yellow-200 {
color: #fef08a;
}

.bg-pink-800 {
background-color: #9d174d;
}
.text-pink-200 {
color: #fbcfe8;
}

.bg-opacity-75 {
opacity: 0.75;
}

@media (max-width: 768px) {
#project {
  min-width: 100%;
}
}

@media (min-width: 768px) {
#project {
  width: 100%;
  min-width: 100%;
  padding-inline: 5px;
}
}

@media (min-width: 1350px) {
#project {
  width: 100%;
  min-width: 100%;
  padding-inline: 20px;
}
}
</style>