<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['id'],

  methods: {
    ...mapActions({
      fetchEvent: 'events/fetchEvent'
    })
  },

  created() {
    this.fetchEvent(this.id).catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  },
  computed: {
    ...mapGetters({
      event: 'events/event'
    })
  }
}
</script>
