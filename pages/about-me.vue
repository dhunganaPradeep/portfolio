<template>
  <main v-if="!loading" id="about-me" class="page">
    <div id="mobile-page-title">
      <h2>_about-me</h2>
    </div>

    <div id="page-menu" class="w-full flex">
      <!-- DESKTOP section icons -->
      <div id="sections">
        <div
          id="section-icon"
          v-for="section in config.about.sections"
          :key="section.title"
          :class="{ active: isSectionActive(section.title) }"
        >
          <img
            :id="'section-icon-' + section.title"
            :src="section.icon"
            :alt="section.title + '-section'"
            @click="focusCurrentSection(section)"
          />
        </div>
      </div>

      <!-- focused section content -->
      <div id="section-content" class="hidden lg:block w-full h-full border-right">
        <!-- title -->
        <div id="section-content-title" class="hidden lg:flex items-center min-w-full">
          <img
            id="section-arrow-menu"
            src="/icons/arrow.svg"
            alt=""
            class="section-arrow mx-3 open"
          />
          <p
            v-html="config.about.sections[currentSection]?.title"
            class="font-fira_regular text-white text-sm"
          ></p>
        </div>

        <!-- folders -->
        <div>
          <div
            v-for="(folder, key, index) in config.about.sections[currentSection]?.info"
            :key="key"
            class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text"
            @click="focusCurrentFolder(folder)"
          >
            <div class="flex col-span-2 hover:text-white hover:cursor-pointer">
              <img
                id="diple"
                src="/icons/diple.svg"
                alt=""
                :class="{ open: isOpen(folder.title) }"
              />
              <img
                :src="'/icons/folder' + (index + 1) + '.svg'"
                alt=""
                class="mr-3"
              />
              <p
                :id="folder.title"
                v-html="key"
                :class="{ active: isActive(folder.title) }"
              ></p>
            </div>
            <div v-if="folder.files" class="col-span-2">
              <div
                v-for="(file, fileName) in folder.files"
                :key="fileName"
                class="hover:text-white hover:cursor-pointer flex my-2"
                @click.stop="focusCurrentFile(folder.title, fileName)"
              >
                <img src="/icons/markdown.svg" alt="" class="ml-8 mr-3" />
                <p>{{ fileName }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- contact -->
        <div
          id="section-content-title-contact"
          class="flex items-center min-w-full border-top"
        >
          <img
            id="section-arrow-menu"
            src="/icons/arrow.svg"
            alt=""
            class="section-arrow mx-3 open"
          />
          <p
            v-html="config.contacts.direct.title"
            class="font-fira_regular text-white text-sm"
          ></p>
        </div>
        <div id="contact-sources" class="hidden lg:flex lg:flex-col my-2">
          <div
            v-for="(source, key) in config.contacts.direct.sources"
            :key="key"
            class="flex items-center mb-2"
          >
            <img :src="'/icons/' + key + '.svg'" alt="" class="mx-4" />
            <a
              v-html="source"
              :href="key === 'email' ? 'mailto:' + source : 'tel:' + source"
              class="font-fira_retina text-menu-text hover:text-white"
            ></a>
          </div>
        </div>
      </div>

      <!-- mobile -->
      <div id="section-content" class="lg:hidden w-full font-fira_regular">
        <div v-for="section in config.about.sections" :key="section.title">
          <!-- section title (mobile) -->
          <div
            :key="section.title"
            id="section-content-title"
            class="flex lg:hidden mb-1"
            @click="focusCurrentSection(section)"
          >
            <img
              src="/icons/arrow.svg"
              :id="'section-arrow-' + section.title"
              alt=""
              class="section-arrow"
            />
            <p v-html="section.title" class="text-white text-sm"></p>
          </div>

          <!-- folders -->
          <div :id="'folders-' + section.title" class="hidden">
            <div
              v-for="(folder, key, index) in config.about.sections[section.title]?.info"
              :key="key"
              class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text hover:text-white hover:cursor-pointer"
              @click="focusCurrentFolder(folder)"
            >
              <div class="flex col-span-2">
                <img id="diple" src="/icons/diple.svg" />
                <img
                  :src="'icons/folder' + (index + 1) + '.svg'"
                  alt=""
                  class="mr-3"
                />
                <p
                  :id="folder.title"
                  v-html="key"
                  :class="{ active: isActive(folder.title) }"
                ></p>
              </div>
              <div v-if="folder.files" class="col-span-2">
                <div
                  v-for="(file, fileName) in folder.files"
                  :key="fileName"
                  class="hover:text-white hover:cursor-pointer flex my-2"
                  @click.stop="focusCurrentFile(folder.title, fileName)"
                >
                  <img src="/icons/markdown.svg" alt="" class="ml-8 mr-3" />
                  <p>{{ fileName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- contact -->
        <div
          id="section-content-title"
          class="flex items-center min-w-full"
          @click="showContacts()"
        >
          <img
            src="/icons/arrow.svg"
            alt=""
            id="section-arrow"
            class="section-arrow"
          />
          <p
            v-html="config.contacts.direct.title"
            class="font-fira_regular text-white text-sm"
          ></p>
        </div>
        <div id="contacts" class="hidden">
          <div
            v-for="(source, key) in config.contacts.direct.sources"
            :key="key"
            class="flex items-center my-2"
          >
            <img :src="'/icons/' + key + '.svg'" alt="" />
            <a
              v-html="source"
              :href="key === 'email' ? 'mailto:' + source : 'tel:' + source"
              class="font-fira_retina text-menu-text hover:text-white ml-4"
            ></a>
          </div>
        </div>
      </div>
    </div>
    <!-- MENU END -->

<!-- content -->
<div class="flex flex-col lg:grid lg:grid-cols-2 h-full w-full">
      <div id="left" class="w-full flex flex-col border-right">
        <!-- windows tab desktop -->
        <div class="tab-height w-full hidden lg:flex border-bot items-center">
          <div class="flex items-center border-right h-full">
            <p
              v-html="config.about.sections[currentSection]?.title"
              class="font-fira_regular text-menu-text text-sm px-3"
            ></p>
            <img src="/icons/close.svg" alt="" class="mx-3" />
          </div>
        </div>

        <!-- windows tab mobile -->
        <div id="tab-mobile" class="flex lg:hidden font-fira_retina">
          <span class="text-white">// </span>
          <h3
            v-html="config.about.sections[currentSection]?.title"
            class="text-white px-2"
          ></h3>
          <span class="text-menu-text"> / </span>
          <h3
            v-html="
              currentFile
                ? config.about.sections[currentSection]?.info[folder]?.files?.[
                    currentFile
                  ]?.title
                : config.about.sections[currentSection]?.info[folder]?.title
            "
            class="text-menu-text pl-2"
          ></h3>
        </div>

        <!-- text -->
        <div
          id="commented-text"
          class="flex h-full w-full lg:border-right overflow-hidden"
        >
          <div class="w-full h-full ml-5 mr-10 lg:my-5 overflow-scroll">
            <!-- Education Content -->
            <div
              v-if="
                folder === 'education' &&
                config.about.sections[currentSection]?.info[folder]?.content
              "
              class="education-content"
            >
              <div
                v-for="edu in config.about.sections[currentSection]?.info[folder].content"
                :key="edu.title"
                class="file-content mb-4"
                data-aos="fade-up"
              >
                <h4
                  class="font-fira_bold text-white text-sm mb-2"
                  v-html="edu.title"
                ></h4>
                <p
                  class="font-fira_retina text-menu-text text-xs mb-4"
                  v-html="edu.date"
                ></p>
                <div
                  v-html="edu.points"
                  class="bullet-points text-menu-text"
                ></div>
              </div>
            </div>

            <!-- Resume File Content -->
            <div
              v-else-if="
                currentFile === 'resume' &&
                config.about.sections[currentSection]?.info[folder]?.files?.[
                  currentFile
                ]?.pdfUrl
              "
              class="file-content"
              data-aos="fade-up"
            >
              <h4
                class="font-fira_bold text-white text-sm mb-2"
                v-html="
                  config.about.sections[currentSection]?.info[folder]?.files[
                    currentFile
                  ].title
                "
              ></h4>
              <iframe
                :src="
                  config.about.sections[currentSection]?.info[folder]?.files[
                    currentFile
                  ].pdfUrl
                "
                class="w-full h-full border border-gray-700"
                title="Resume PDF"
              ></iframe>
            </div>

            <!-- Experience File Content -->
            <div
              v-else-if="
                currentFile &&
                config.about.sections[currentSection]?.info[folder]?.files?.[
                  currentFile
                ]
              "
              class="file-content"
              data-aos="fade-up"
            >
              <h4
                class="font-fira_bold text-white text-sm mb-2"
                v-html="
                  config.about.sections[currentSection]?.info[folder]?.files[
                    currentFile
                  ].title
                "
              ></h4>
              <p
                class="font-fira_retina text-menu-text text-xs mb-4"
                v-html="
                  config.about.sections[currentSection]?.info[folder]?.files[
                    currentFile
                  ].date
                "
              ></p>
              <div
                v-html="
                  config.about.sections[currentSection]?.info[folder]?.files[
                    currentFile
                  ].content
                "
                class="bullet-points text-menu-text"
              ></div>

              <!-- Projects Section -->
              <div
                v-if="
                  config.about.sections[currentSection]?.info[folder]?.files[
                    currentFile
                  ].projects
                "
                class="projects-section mt-6"
              >
                <h5 class="font-fira_bold text-white text-sm mb-4">
                  {{
                    currentFile === 'sera-digital-hub.md'
                      ? 'Projects Done in SERA'
                      : 'Related Projects'
                  }}
                </h5>
                <div
                  v-for="project in config.about.sections[currentSection]?.info[
                    folder
                  ]?.files[currentFile].projects"
                  :key="project.title"
                  class="project-box mb-4"
                  data-aos="fade-up"
                >
                  <a :href="project.url" target="_blank" class="block">
                    <h6
                      class="font-fira_regular text-white text-sm mb-2"
                      v-html="project.title"
                    ></h6>
                    <p
                      class="font-fira_retina text-menu-text text-xs"
                      v-html="project.description"
                    ></p>
                  </a>
                </div>
              </div>

              <!-- Profile Link Button -->
              <div
                v-if="
                  config.about.sections[currentSection]?.info[folder]?.files[
                    currentFile
                  ].profileLink
                "
                class="mt-4"
              >
                <a
                  :href="
                    config.about.sections[currentSection]?.info[folder]?.files[
                      currentFile
                    ].profileLink.url
                  "
                  target="_blank"
                  class="profile-button"
                >
                  {{
                    config.about.sections[currentSection]?.info[folder]?.files[
                      currentFile
                    ].profileLink.title
                  }}
                </a>
              </div>
            </div>

            <CommentedText
              v-else
              :text="config.about.sections[currentSection]?.info[folder]?.description"
            />
          </div>

          <!-- scroll bar -->
          <div
            id="scroll-bar"
            class="h-full border-left hidden lg:flex justify-center py-1"
          >
            <div id="scroll"></div>
          </div>
        </div>
      </div>

      <!-- Right side (unchanged) -->
      <div id="right" class="max-w-full flex flex-col">
        <!-- windows tab -->
        <div
          class="tab-height w-full h-full hidden lg:flex border-bot items-center"
        ></div>

        <!-- windows tab mobile -->
        <div
          class="tab-height w-full h-full flex-none lg:hidden items-center"
        ></div>

        <!-- Tech Timeline -->
        <div id="timeline-content" class="flex">
          <div
            id="timeline"
            class="flex flex-col lg:px-6 lg:py-4 w-full overflow-hidden"
          >
            <h3 class="text-white lg:text-menu-text mb-4 text-sm">
              // Tech Timeline:
            </h3>
            <div class="flex flex-col overflow-scroll">
              <TechMilestone
                v-for="(milestone, key) in config.milestones"
                :key="key"
                :milestone="milestone"
              />
            </div>
          </div>
          <div
            id="scroll-bar"
            class="h-full border-left hidden lg:flex justify-center py-1"
          >
            <div id="scroll"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#sections {
  width: 5rem;
  height: 100%;
  display: none;
  border-right: 1px solid #1E2D3D;
}

@media (min-width: 1024px) {
  #sections {
    display: block;
  }
}

#section-icon {
  @apply my-6 hover:cursor-pointer flex justify-center;
  opacity: 0.4;
}

#section-icon.active {
  opacity: 1;
}

#section-icon:hover {
  opacity: 1;
}

.tab-height {
  min-height: 35px;
  max-height: 35px;
}

#tab-mobile {
  padding: 25px 20px 0px 25px;
  align-items: flex-end;
}

#scroll-bar {
  width: 20px;
}

#scroll {
  width: 14px;
  height: 7px;
  background-color: #607B96;
}

#diple {
  @apply mx-3 w-2 max-w-fit;
}

.open {
  transform: rotate(90deg);
}

.active {
  color: white;
}

#right,
#left {
  height: 100%;
  overflow: hidden;
}

#timeline-content {
  height: 100%;
  overflow: hidden;
}

@media (max-width: 1024px) {
  #timeline-content {
    height: 100%;
    padding: 0px 25px;
    overflow: hidden;
  }

  #about {
    min-height: stretch;
  }
}

.section-arrow {
  transition: 0.1s;
}

#section-content #contacts {
  padding: 0px 25px;
}

.education-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 1024px) {
  .education-content {
    flex-direction: column;
  }
}

.file-content {
  background: #011627;
  border: 1px solid #1E2D3D;
  border-radius: 8px;
  padding: 1rem;
  flex: 1 1 calc(50% - 0.5rem);
  min-width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1024px) {
  .file-content {
    flex: 1 1 100%;
    height: 100%;
  }
}

.bullet-points ul {
  list-style: none;
  padding: 0;
}

.bullet-points li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #85a9ce;
  transition: color 0.3s, transform 0.2s;
}

.bullet-points li::before {
  content: '✔';
  position: absolute;
  left: 0;
  color: #5e6ef2;
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.bullet-points li:hover {
  color: #ffffff;
  transform: translateX(5px);
}

.bullet-points li:hover::before {
  transform: scale(1.2);
}

.bullet-points a {
  color: #ffa657;
  text-decoration: none;
}

.bullet-points a:hover {
  text-decoration: underline;
}

.projects-section {
  border-top: 1px solid #1E2D3D;
  padding-top: 1rem;
}

.project-box {
  background: #011221;
  border: 1px solid #1E2D3D;
  border-radius: 8px;
  padding: 0.75rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.project-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 10px rgba(94, 110, 242, 0.3);
}

.project-box a {
  text-decoration: none;
}

.profile-button {
  display: inline-block;
  background: #5e6ef2;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-family: 'Fira Regular';
  font-size: 0.875rem;
  transition: background 0.3s;
}

.profile-button:hover {
  background: #ffa657;
}
</style>

<script>
import DevConfig from '~/developer.json';
import TechMilestone from './TechMilestone.vue';

export default {
  components: {
    TechMilestone
  },
  data() {
    return {
      currentSection: 'personal-info',
      folder: 'bio',
      currentFile: null,
      loading: true
    };
  },
  setup() {
    return {
      config: DevConfig
    };
  },
  computed: {
    isActive() {
      return (folder) => this.folder === folder;
    },
    isSectionActive() {
      return (section) => this.currentSection === section;
    },
    isOpen() {
      return (folder) => this.folder === folder;
    }
  },
  methods: {
    focusCurrentSection(section) {
      this.currentSection = section.title;
      this.folder = Object.keys(section.info)[0];
      this.currentFile = null;

      const foldersElement = document.getElementById('folders-' + section.title);
      if (foldersElement) {
        foldersElement.classList.toggle('hidden');
      }
      const arrowElement = document.getElementById('section-arrow-' + section.title);
      if (arrowElement) {
        arrowElement.classList.toggle('rotate-90');
      }
    },
    focusCurrentFolder(folder) {
      this.folder = folder.title;
      this.currentFile = null;
    },
    focusCurrentFile(folderTitle, fileName) {
      this.folder = folderTitle;
      this.currentFile = fileName;
    },
    showContacts() {
      document.getElementById('contacts').classList.toggle('hidden');
      document.getElementById('section-arrow').classList.toggle('rotate-90');
    }
  },
  mounted() {
    this.loading = false;
  }
};
</script>