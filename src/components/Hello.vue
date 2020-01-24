    <template>
        <view>
            <text class="text-colo-primary">{{message}}</text>
            <button v-bind:title="btnmessage" v-bind:on-press="handleclick" />
            <text class="count-text">You have clicked {{clickcount}} times!</text>
            <text>{{clickmotivation}}</text>
                
        </view>
    </template>

    <script>
    export default {
        data () {
            return {
                message:'Hello Vivek Saroj, Welcome to my Application!!!!!',
                btnmessage:'Click Me',
                clickcount: 0

            }
        },
        computed: {
            clickmotivation () {
                if (this.clickcount<5) {
                    return "Please click me more"
                } else {
                    return "Goodjob, keep clicking...."
                }
            }
        },
        
        methods: {
            handleclick() {
                this.clickcount++
                //alert(`I am clicked!, Click count = ${this.clickcount}`)
            }
        }
    }

    </script>

