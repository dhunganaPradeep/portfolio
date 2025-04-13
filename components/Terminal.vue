<template>
  <div class="terminal-container">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <span class="terminal-button red"></span>
        <span class="terminal-button yellow"></span>
        <span class="terminal-button green"></span>
      </div>
      <div class="terminal-title">pradip@dhungana:~</div>
    </div>
    <div class="terminal-body" ref="terminalBody">
      <div class="terminal-history">
        <template v-for="(item, index) in history" :key="index">
          <p><span class="terminal-prompt">{{ getPrompt() }}</span>{{ item.command }}</p>
          <p class="terminal-output" v-html="item.output"></p>
        </template>
      </div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">{{ getPrompt() }}</span>
        <input 
          ref="commandInput"
          v-model="currentCommand" 
          type="text" 
          class="terminal-input"
          @keyup.enter="executeCommand"
          @keyup.up="navigateHistory(-1)"
          @keyup.down="navigateHistory(1)"
          @keyup.tab.prevent="handleTabCompletion"
          autocomplete="off"
          spellcheck="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const commandInput = ref(null);
const terminalBody = ref(null);
const currentCommand = ref('');
const currentDirectory = ref('~');
const history = ref([]);
const commandHistory = ref([]);
const historyIndex = ref(-1);
const isTyping = ref(false);

const banner = `
<span class="terminal-banner">
Welcome to my terminal portfolio!
<span class="welcome-text">Type <span class="command-highlight">help</span> to get started.</span>
</span>
`;

onMounted(async () => {
  history.value.push({
    command: 'banner',
    output: banner
  });
  
  if (commandInput.value) {
    commandInput.value.focus();
  }
  
  await simulateTyping('whoami');
  executeCommand();
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await simulateTyping('tech');
  executeCommand();
});

const availableCommands = computed(() => {
  return {
    help: {
      description: 'Display available commands',
      action: () => {
        return Object.keys(availableCommands.value).map(cmd => {
          return `<span class="command-name">${cmd}</span> - ${availableCommands.value[cmd].description}`;
        }).join('<br>');
      }
    },
    clear: {
      description: 'Clear terminal history',
      action: () => {
        history.value = [];
        return '';
      }
    },
    whoami: {
      description: 'Display user information',
      action: () => {
        return `<span class="highlight-text">${props.config.name}</span> | ${props.config.role}`;
      }
    },
    tech: {
      description: 'Display technical skills',
      action: () => {
        const { tech_stack } = props.config;
        let output = '<span class="tech-header">Technical Stack:</span><br>';
        
        for (const [category, skills] of Object.entries(tech_stack)) {
          const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
          output += `<span class="tech-category">${formattedCategory}:</span> `;
          output += skills.map(skill => `<span class="tech-skill">${skill}</span>`).join(', ');
          output += '<br>';
        }
        
        return output;
      }
    },
    contact: {
      description: 'Display contact information',
      action: () => {
        return `<span class="contact-label">Email:</span> <span class="contact-value">${props.config.contacts.direct.sources.email}</span><br>` +
               `<span class="contact-label">GitHub:</span> <a href="https://github.com/${props.config.contacts.social.github.user}" target="_blank" class="terminal-link">github.com/${props.config.contacts.social.github.user}</a><br>` +
               `<span class="contact-label">LinkedIn:</span> <a href="https://www.linkedin.com/in/${props.config.contacts.find_me_also_in.sources.Linkedin.user}" target="_blank" class="terminal-link">linkedin.com/in/${props.config.contacts.find_me_also_in.sources.Linkedin.user}</a>`;
      }
    },
    projects: {
      description: 'List recent projects',
      action: () => {
        let output = '<span class="projects-header">Recent Projects:</span><br>';
        for (const [key, project] of Object.entries(props.config.projects)) {
          output += `<span class="project-title">${project.title}</span> - ${project.description}<br>` +
                    `<span class="project-tech">Tech:</span> ${project.tech.map(t => `<span class="tech-item">${t}</span>`).join(', ')}<br><br>`;
        }
        return output;
      }
    },
    date: {
      description: 'Display current date and time',
      action: () => {
        return new Date().toLocaleString();
      }
    },
    banner: {
      description: 'Display welcome banner',
      action: () => {
        return banner;
      }
    },
    goto: {
      description: 'Navigate to specific sections',
      action: (args) => {
        if (!args || args.length === 0) {
          return 'Usage: goto [about-me|projects|contact]';
        }
        
        const section = args[0];
        const validSections = ['about-me', 'projects', 'contact'];
        
        if (validSections.includes(section)) {
          router.push(`/${section}`);
          return `Navigating to ${section}...`;
        }
        
        return `Invalid section: ${section}. Available sections: ${validSections.join(', ')}`;
      }
    }
  };
});

function handleTabCompletion() {
  const input = currentCommand.value.trim();
  if (!input) return;
  
  const [partialCmd] = input.split(' ');
  const matchingCommands = Object.keys(availableCommands.value).filter(cmd => 
    cmd.startsWith(partialCmd)
  );
  
  if (matchingCommands.length === 1) {
    currentCommand.value = matchingCommands[0];
  }
}

function getPrompt() {
  return `pradip:${currentDirectory.value}$ `;
}

async function executeCommand() {
  const trimmedCommand = currentCommand.value.trim();
  if (!trimmedCommand) return;
  
  commandHistory.value.push(trimmedCommand);
  historyIndex.value = -1;
  
  const [cmd, ...args] = trimmedCommand.split(' ');
  let output = '';
  
  if (cmd in availableCommands.value) {
    output = availableCommands.value[cmd].action(args);
  } else {
    output = `<span class="error-message">Command not found: ${cmd}. Type 'help' to see available commands.</span>`;
  }
  
  history.value.push({
    command: trimmedCommand,
    output: output
  });
  
  currentCommand.value = '';
  
  await scrollToBottom();
}

async function simulateTyping(text) {
  currentCommand.value = '';
  isTyping.value = true;
  
  for (let i = 0; i < text.length; i++) {
    currentCommand.value += text[i];
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  isTyping.value = false;
}

function navigateHistory(direction) {
  if (commandHistory.value.length === 0) return;
  
  historyIndex.value += direction;
  
  if (historyIndex.value < 0) {
    historyIndex.value = -1;
    currentCommand.value = '';
    return;
  }
  
  if (historyIndex.value >= commandHistory.value.length) {
    historyIndex.value = commandHistory.value.length - 1;
  }
  
  currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value];
}

async function scrollToBottom() {
  await nextTick();
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
  }
}

watch(history, async () => {
  await scrollToBottom();
}, { deep: true });
</script>

<style scoped>
.terminal-container {
  background-color: #011627;
  border-radius: 8px;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid #1E2D3D;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: rgba(30, 45, 61, 0.95);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #1E2D3D;
}

.terminal-buttons {
  display: flex;
  gap: 6px;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.terminal-button:hover {
  transform: scale(1.1);
}

.terminal-button.red {
  background-color: #FF5F56;
}

.terminal-button.yellow {
  background-color: #FFBD2E;
}

.terminal-button.green {
  background-color: #27C93F;
}

.terminal-title {
  margin-left: auto;
  margin-right: auto;
  color: #607B96;
  font-size: 12px;
  font-family: 'Fira Code Retina', monospace;
  letter-spacing: 0.5px;
}

.terminal-body {
  padding: 16px;
  color: #E5E9F0;
  font-family: 'Fira Code Retina', monospace;
  font-size: 14px;
  line-height: 1.5;
  height: 400px;
  overflow-y: auto;
  background-color: rgba(1, 22, 39, 0.95);
  position: relative;
}

.terminal-prompt {
  color: #43D9AD;
  margin-right: 8px;
  user-select: none;
}

.terminal-output {
  color: #E5E9F0;
  margin-bottom: 12px;
  margin-left: 16px;
  opacity: 0.9;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  margin-top: 8px;
  position: relative;
}

.terminal-input {
  background: transparent;
  border: none;
  color: #E5E9F0;
  font-family: 'Fira Code Retina', monospace;
  font-size: 14px;
  width: 100%;
  padding: 0;
  outline: none;
  caret-color: #43D9AD;
}

.command-name {
  color: #43D9AD;
  font-weight: bold;
}

.project-title {
  color: #4D5BCE;
  font-weight: bold;
}

.terminal-link {
  color: #43D9AD;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.terminal-link:hover {
  color: #5AEFE7;
}

.error-message {
  color: #FF5F56;
}

.highlight-text {
  color: #5AEFE7;
  font-weight: bold;
}

.tech-header, .projects-header {
  color: #4D5BCE;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
}

.tech-category {
  color: #E99287;
  font-weight: bold;
}

.tech-skill {
  color: #43D9AD;
}

.contact-label {
  color: #4D5BCE;
  font-weight: bold;
}

.contact-value {
  color: #E5E9F0;
}

.folder {
  color: #4D5BCE;
  margin-right: 12px;
  position: relative;
}

.folder::before {
  content: "📁";
  margin-right: 4px;
}

.file {
  color: #E5E9F0;
  margin-right: 12px;
  position: relative;
}

.file::before {
  content: "📄";
  margin-right: 4px;
}

.json-syntax {
  color: #E99287;
  font-family: 'Fira Code Medium', monospace;
}

.project-tech {
  color: #4D5BCE;
  font-weight: bold;
}

.tech-item {
  color: #43D9AD;
  background-color: rgba(67, 217, 173, 0.1);
  padding: 0 4px;
  border-radius: 4px;
}

.terminal-banner {
  color: #43D9AD;
  font-family: monospace;
  line-height: 1.5;
  margin-bottom: 12px;
  display: block;
}

.welcome-text {
  color: #E5E9F0;
  display: block;
  margin-top: 4px;
}

.command-highlight {
  color: #E99287;
  font-weight: bold;
}

.terminal-body::-webkit-scrollbar {
  width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
  background: rgba(1, 22, 39, 0.5);
}

.terminal-body::-webkit-scrollbar-thumb {
  background-color: #1E2D3D;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
  background-color: #43D9AD;
}

@media (max-width: 768px) {
  .terminal-container {
    max-width: 100%;
  }
  
  .terminal-body {
    height: 320px;
  }
  
  .terminal-banner {
    font-size: 12px;
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>