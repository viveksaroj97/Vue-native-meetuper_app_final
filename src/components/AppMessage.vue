<template>
   <view :style="{padding: 20, backgroundColor: bgColor}">
       <text class="message-text" >{{message}}</text>
   </view>
    
</template>



<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        msgType: {
            type: String,
            default: 'primary'
        }
    },
    computed: {
        bgColor () {
            switch(this.msgType) {
                case 'primary':
                    return '#4f98ca'
                case 'warning':
                    return '#ffd369'
                case 'danger':
                    return '#ff5d6c'
                default:
                    return 'white'

            }
        }

    }
    
}
</script>


<style>
  .message-text {
      color: black;
      font-size: 16px;
  }

</style>