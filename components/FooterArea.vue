<template>
  <v-footer color="grey darken-3" padless class="text-body-1 d-flex align-center justify-center flex-column">
    <v-container>
      <v-row justify="center">
        <v-col v-for="(item, index) in footerItems" :key="index" cols="12" md="3" class="text-center">
          <v-icon size="24" class="footer-icon">{{ item.icon }}</v-icon>
          <p class="mb-1 footer-label">{{ item.label }}</p>
          <p class="mb-1">
            <a :href="item.link" target="_blank" class="footer-link">{{ item.text }}</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-row justify="center" class="text-center">
      <v-col cols="12">
        <h4 class="mb-2">Developed by <span class="developer-name">Zeinab Abdelghafar</span></h4>
        <p class="mb-1">For inquiries or collaborations, feel free to contact me.</p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      footerItems: [
        {
          icon: 'mdi-phone',
          label: 'Phone',
          text: '+201289939695',
          link: 'tel:+201289939695'
        },
        {
          icon: 'mdi-email',
          label: 'Email',
          text: 'zeinanabdo88@gmail.com',
          link: 'mailto:zeinanabdo88@gmail.com'
        },
        {
          icon: 'mdi-linkedin',
          label: 'LinkedIn',
          text: 'Zeinab Abdelghafar',
          link: 'https://www.linkedin.com/in/zeinab-abdelghaffar/'
        },
        {
          icon: 'mdi-github',
          label: 'GitHub',
          text: 'ZeinabAbdelghaffar',
          link: 'https://github.com/ZeinabAbdelghaffar'
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-footer {
  background-color: #1E1E1E;
  padding: 24px; 
  color: white;
  border-top: 10px solid #FF9800; 
  width: 100%;
}

.v-divider {
  margin-top: 20px;
  margin-bottom: 20px; 
}

.text-center {
  text-align: center !important;
}

.align-center {
  align-items: center !important;
}

.footer-icon {
  color: #FF9800; 
}

.footer-label {
  font-weight: bold;
}

.footer-link {
  color: #9E9E9E; 
}

.developer-name {
  color: #FF9800; 
  font-weight: bold;
}
</style>