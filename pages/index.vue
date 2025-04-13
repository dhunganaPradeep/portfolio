<template>
	<main v-if="!loading" id="hello">
	  <div class="css-blurry-gradient-blue"></div>
	  <div class="css-blurry-gradient-green"></div>
  
	  <div class="content-container">
		<section class="hero">
		  <div class="head">
			<span>Hi all, I am</span>
			<h1>{{ config.name }}</h1>
			<span class="diple flex">
			  >&nbsp;
			  <h2 class="line-1 anim-typewriter max-w-fit"> {{ config.role }} </h2>
			</span>
		  </div>
  
		  <div id="info">
			<span :class="{hide: isMobile}">
			  // you can also check my projects on Github
			</span>
			<span :class="{hide: !isMobile}">
			  // find my profile on Github:
			</span>
			<p class="code">
            <span class="identifier">const </span>
            <span class="variable-name">githubLink</span>
            <span class="operator">=</span>
            <a class="string" :href="'https://github.com/' + config.contacts.social.github.user" target="_blank">
              "https://github.com/{{ config.contacts.social.github.user }}"
            </a>
          </p>
          
          <div class="tech-stack">
            <span class="comment">// my tech stack:</span>
            <p class="code stack-code">
              <span class="identifier">const </span>
              <span class="variable-name">frontEnd</span>
              <span class="operator">=</span>
              <span class="array">{{ JSON.stringify(config.tech_stack.frontEnd) }}</span>
            </p>
            <p class="code stack-code">
              <span class="identifier">const </span>
              <span class="variable-name">backEnd</span>
              <span class="operator">=</span>
              <span class="array">{{ JSON.stringify(config.tech_stack.backEnd) }}</span>
            </p>
            <p class="code stack-code">
              <span class="identifier">const </span>
              <span class="variable-name">databases</span>
              <span class="operator">=</span>
              <span class="array">{{ JSON.stringify(config.tech_stack.databases) }}</span>
            </p>
            <p class="code stack-code">
              <span class="identifier">const </span>
              <span class="variable-name">tools</span>
              <span class="operator">=</span>
              <span class="array">{{ JSON.stringify(config.tech_stack.tools) }}</span>
            </p>
          </div>

          <div class="cta-buttons">
            <a href="/about-me" class="cta-button">
              <span class="identifier">view_</span>about_me()
            </a>
            <a href="/projects" class="cta-button">
              <span class="identifier">view_</span>projects()
            </a>
          </div>
        </div>
      </section>

      <section class="terminal-section" v-if="!isMobile">
        <Terminal :config="config" />
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Terminal from '~/components/Terminal.vue'
import DevConfig from '~/developer.json';

const config = ref(DevConfig)

const isMobile = ref(false)
const loading = ref(false)

onMounted(() => {
  if (window.innerWidth <= 1024) isMobile.value = true
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  if (window.innerWidth <= 1024) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
</script>

<style scoped>
#hello {
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  padding-left: 275px;
  overflow: hidden;
  position: relative;
}

.content-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 2rem;
}

.hero {
  width: 50%;
  justify-content: center;
  z-index: 20;
}

.terminal-section {
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

#hello .hero {
  display: flex;
  flex-direction: column;
  margin: 0rem;
}

#hello .head span {
  font-size: 18px;
  line-height: 1;
  color: #E5E9F0;
  font-family: 'Fira Code Retina';
}

#hello .head h1 {
  font-size: 58px;
  line-height: 1;
  color: #E5E9F0;
  font-family: 'Fira Code Regular';
  padding-top: 1rem; 
  padding-bottom: 1rem; 
}

#hello .head h2, #hello .head .diple {
  font-size: 32px;
  line-height: 1;
  color: #4D5BCE;
  font-family: 'Fira Code Retina';
}

.head {
  padding-bottom: 2rem;
}

#info {
  display: flex;
  flex-direction: column;
}

#info > span {
  font-size: 14px;
  line-height: 1;
  color: #8da9c6;
  font-family: 'Fira Code Retina';
  padding-bottom: 1rem; /* 16px */
}

.code {
  font-family: 'Fira Code Medium';
  color: #E5E9F0;
  margin-bottom: 0.5rem;
}

.code .identifier {
  color: #6172ff;
}

.code .variable-name {
  color: #43D9AD;
}

.code .operator {
  color: white;
}

.code .string {
  color: #E99287;
  text-decoration-line: underline;
  text-underline-offset: 4px;
}

.code .array {
  color: #E99287;
}

.tech-stack {
  margin-top: 1.5rem;
}

.tech-stack .comment {
  font-size: 14px;
  line-height: 1;
  color: #8da9c6;
  font-family: 'Fira Code Retina';
  margin-bottom: 0.75rem;
  display: block;
}

.stack-code {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.cta-button {
  background-color: rgba(1, 22, 39, 0.84);
  border: 1px solid #1E2D3D;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  color: #E5E9F0;
  font-family: 'Fira Code Medium';
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: rgba(77, 91, 206, 0.1);
  border-color: #4D5BCE;
  transform: translateY(-2px);
}

#info {
  padding-block: 1.5rem;
}

.hide {
  display: none;
}

.css-blurry-gradient-blue {
  position: fixed;
  bottom: 25%;
  right: 5%;
  width: 300px;
  height: 300px;
  border-radius: 0% 0% 50% 50%;
  rotate: 10deg;
  filter: blur(70px);
  background: radial-gradient(circle at 50% 50%,rgba(77, 91, 206, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
}

.css-blurry-gradient-green {
  position: absolute;
  top: 20%;
  right: 30%;
  width: 300px;
  height: 300px;
  border-radius: 0% 50% 0% 50%;
  filter: blur(70px);
  background: radial-gradient(circle at 50% 50%,rgba(67, 217, 173, 1), rgba(76, 0, 255, 0));
  opacity: 0.5;
  z-index: 10;
}

#info {
  font-size: 14px;
}

.line-1 {
  width: 0;
  border-right: 3px solid rgba(255,255,255,.75);
  white-space: nowrap;
  overflow: hidden;
  padding-right: 2px;
}

.anim-typewriter {
  animation: typewriter 3.5s steps(40) 1s 1 normal both,
  blinkTextCursor 800ms steps(40) infinite normal;
}

@keyframes typewriter{
  from{width: 0;}
  to{width: 52%;}
}

@keyframes blinkTextCursor{
  from{border-right-color: rgba(255,255,255,.75);}
  to{border-right-color: transparent;}
}

@media (max-width: 768px) {
  #hello {
    padding-left: 20px;
  }
  @keyframes typewriter{
  from{width: 0;}
  to{width: 76%;}
}
  .content-container {
    flex-direction: column;
    padding-right: 0;
  }

  .hero {
    width: 100%;
  }

  #hello .hero {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1.75rem; 
  }
  
  .cta-buttons {
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2.5rem;
  }

  .head {
    padding-top: 4rem;
  }

  #hello .head h2, #hello .head .diple {
    font-size: 20px;
    color: #43D9AD;
  }
  
  #info .action {
    display: none;
  }
}


@media (min-width: 768px) and (max-width: 1024px) {
  #hello {
    padding-left: 40px;
  }
  @keyframes typewriter{
  from{width: 0;}
  to{width: 45%;}
}
  .content-container {
    flex-direction: column;
    padding-right: 0;
  }

  .hero {
    width: 100%;
  }

  #hello .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1.75rem; 
  }

  .head {
    padding-top: 4rem; 
  }
}

@media (min-width: 1024px) and (max-width: 1320px) {
  #hello {
    padding-left: 135px;
  }

  .content-container {
    padding-right: 1rem;
  }
}

@media (min-width: 1024px) {
  .css-blurry-gradient-blue {
    position: fixed;
    bottom: 10%;
    right: 10%;
    width: 500px;
    height: 500px;
    opacity: 0.7;
    border-radius: 100% 50% 100% 0%;
  }

  .css-blurry-gradient-green {
    position: fixed;
    top: 10%;
    right: 35%;
    filter: blur(100px);
    rotate: 10deg;
    width: 400px;
    height: 400px;
    opacity: 0.5;
    border-radius: 100% 0% 0% 0%;
    rotate: 20deg;
  }
}

@media (min-width: 1920px){
  #hello {
    padding-left: 310px;
  }

  #hello .head h1 {
    font-size: 62px;
  }
}
</style>