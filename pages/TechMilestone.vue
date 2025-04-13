<template>
  <div class="milestone-wrapper">
    <div class="timeline-line"></div>
    <div class="timeline-dot"></div>
    
    <div class="milestone-card" :class="{ 'expanded': isExpanded }">
      <div class="milestone-header" @click="toggleExpand">
        <div class="header-content">
          <h4 class="milestone-title">{{ milestone.title }}</h4>
          <p class="milestone-date">{{ milestone.date }}</p>
        </div>
        <div class="expand-icon" :class="{ 'expanded': isExpanded }">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path class="plus-vertical" d="M6 2V10" stroke="#5e6ef2" stroke-width="2" stroke-linecap="round"/>
            <path class="plus-horizontal" d="M2 6H10" stroke="#5e6ef2" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      
      <div class="milestone-content">
        <p class="milestone-description">{{ milestone.description }}</p>
        
        <div class="tech-decoration top-right"></div>
        <div class="tech-decoration bottom-left"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.milestone-wrapper {
  position: relative;
  padding-left: 30px;
  margin: 1.5rem 0;
}

.timeline-line {
  position: absolute;
  left: 14px;
  top: 0;
  bottom: -20px;
  width: 2px;
  background: linear-gradient(to bottom, 
    #5e6ef2 0%, 
    rgba(30, 45, 61, 1) 40%,
    rgba(30, 45, 61, 1) 100%
  );
  z-index: 1;
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 20px;
  width: 10px;
  height: 10px;
  background: #5e6ef2;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(94, 110, 242, 0.2);
}

.milestone-card {
  background-color: #011221;
  border: 1px solid #1E2D3D;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.milestone-card.expanded {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(94, 110, 242, 0.3);
}

.milestone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  position: relative;
  z-index: 3;
}

.header-content {
  flex-grow: 1;
}

.milestone-title {
  font-family: 'Fira Code', monospace;
  font-weight: bold;
  color: #fff;
  font-size: 0.95rem;
  margin: 0 0 0.25rem 0;
  transition: color 0.3s ease;
}

.milestone-date {
  font-family: 'Fira Code', monospace;
  color: rgba(138, 148, 255, 0.8);
  font-size: 0.8rem;
  margin: 0;
}

.expand-icon {
  width: 24px;
  height: 24px;
  background: rgba(30, 45, 61, 0.8);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.expand-icon:hover {
  background: rgba(94, 110, 242, 0.2);
}

.plus-vertical, .plus-horizontal {
  transition: all 0.3s ease;
}

.expand-icon.expanded .plus-vertical {
  transform: scaleY(0);
}

.milestone-content {
  max-height: 0;
  overflow: hidden;
  padding: 0 1rem;
  opacity: 0;
  transition: max-height 0.4s ease-out, opacity 0.4s ease-out, padding 0.4s ease-out;
  position: relative;
  border-top: 1px solid transparent;
}

.milestone-card.expanded .milestone-content {
  max-height: 500px; /* Adjust based on your content */
  opacity: 1;
  padding: 1rem;
  border-top: 1px solid rgba(30, 45, 61, 0.8);
}

.milestone-description {
  font-family: 'Fira Code', monospace;
  font-weight: normal;
  color: #fff;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
  position: relative;
  z-index: 2;
}

.tech-decoration {
  position: absolute;
  width: 80px;
  height: 80px;
  opacity: 0;
  z-index: 1;
  transition: all 0.5s ease;
  background-size: 100% 100%;
}

.top-right {
  top: -20px;
  right: -20px;
  background-image: radial-gradient(circle at center, rgba(94, 110, 242, 0.1) 0%, transparent 70%),
    linear-gradient(45deg, transparent 65%, rgba(94, 110, 242, 0.1) 65%);
}

.bottom-left {
  bottom: -20px;
  left: -20px;
  background-image: 
    linear-gradient(135deg, transparent 65%, rgba(94, 110, 242, 0.05) 65%),
    repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(94, 110, 242, 0.03) 5px, rgba(94, 110, 242, 0.03) 10px);
}

.milestone-card.expanded .tech-decoration {
  opacity: 1;
}

.milestone-card:hover .milestone-title {
  color: #5e6ef2;
}

.milestone-card:hover {
  border-color: rgba(94, 110, 242, 0.3);
}

@media (max-width: 768px) {
  .milestone-wrapper {
    padding-left: 25px;
  }
  
  .timeline-line {
    left: 12px;
  }
  
  .timeline-dot {
    left: 8px;
  }
}
</style>

<script>
export default {
  name: 'TechMilestone',
  props: {
    milestone: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    toggleExpand() {
      if (this.isExpanded) {
        this.isExpanded = false;
        this.$options.activeMilestone = null;
      } else {
        if (this.$options.activeMilestone) {
          this.$options.activeMilestone.isExpanded = false;
        }
        this.isExpanded = true;
        this.$options.activeMilestone = this;
      }
    }
  },
  static: {
    activeMilestone: null
  }
};
</script>