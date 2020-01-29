<template>
  <nb-container>
    <AppHeader root 
               :navigation="navigation" 
               screen="Home" />
       <scroll-view>
         <nb-text class="header-1">Featured Meetups</nb-text>
         <nb-text v-if="user" :style="{paddingLeft: 20}">Welcome {{user.username}}</nb-text>
         <nb-button transparent :on-press="logout">
           <nb-text>Logout</nb-text>
           </nb-button>
           <MeetupCard v-for="meetup in meetups"
                       :key="meetup._id"
                       :meetup="meetup"
                       :navigateToDetail="goToMeetupDetail"/>
        </scroll-view>
  </nb-container>
</template>

<script>
import MeetupCard from "@/components/MeetupCard";
import { AsyncStorage } from "react-native";

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
    meetups() {
      return this.$store.state.meetups.items;
    },
    user() {
      return this.$store.state.auth.user;
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
    goToMeetupDetail(meetupId) {
      this.navigation.navigate("Meetup", { meetupId });
    },
    logout() {
      // Removes user TOKEN, therefore user is not authenticated
      AsyncStorage.removeItem('meetuper-jwt')
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
  color: mediumblue;
}
.header-2 {
  font-weight: bold;
  align-self: center;

}
</style>