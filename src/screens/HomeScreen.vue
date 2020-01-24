<template>
  <scroll-view>
    <nb-text class="header-1">Featured Meetups</nb-text>
    
    <MeetupCard v-for="meetup in meetups"
                :key="meetup._id"
                :meetup="meetup" 
                :navigateToDetail="goToMeetupDetail"/>


  </scroll-view>
</template>

<script>
import MeetupCard from '@/components/MeetupCard'

export default {
  components: {
    MeetupCard
  },
  props: {
    navigation: {
      type: Object
    }
  },

  data() {
    return {
      title: "Home Screen!"
    };
  },
  computed: {
    // After mutation we are getting here new data
    todos() {
      return this.$store.state.todos;
    },
    meetups() {
      return this.$store.state.meetups.items;
    }
  },
  created() {
    // 1. dispatching fetchTodos, this will call action fetchTodos
    // this.$store.dispatch("fetchTodos");
    this.$store.dispatch("meetups/fetchMeetups");
  },
  methods: {
    goToScreen1() {
      this.navigation.navigate("ScreenOne");
    },
    goToMeetupDetail (meetupId) {
      this.navigation.navigate('Meetup', {meetupId})
    }
  }
};
</script>


<style>
  .header-1 {
    font-size: 23px;
    padding: 20px;
    font-weight: bold;
    align-self: center;
    color:mediumblue;
  }
</style>