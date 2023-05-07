import Marker from "/js/marker.js";
import Ratings from "/js/ratings.js";
import MDE from "/js/mde.js";
import Pop from "/js/pop.js";

export default {
    components: {
        "vue-markdown": Marker,
        "vue-ratings": Ratings,
        "mde": MDE,
        "pop-vue": Pop,
      },
  template: `
  <div v-show="makeReply" class="mx-2">
            <mde @data="mde = $event" />
            <div class="d-flex">
              <button class="btn btn-sm btn-secondary ms-auto" @click="makeReply = !makeReply"><i class="fa-solid fa-xmark fa-fw me-1"></i>Cancel</button>
              <button class="btn btn-sm btn-primary ms-1" @click="reply()"><i class="fa-solid fa-comment fa-fw me-1"></i>Reply</button>
            </div>
          </div>
          <div v-show="!makeReply" class="d-flex">
            <button class="btn btn-sm btn-primary me-1" @click="makeReply = !makeReply">{{makeReply ? 'Cancel' : 'Reply'}}</button>
            <div class="d-flex align-items-center">
  <a v-if="!show" role="button" class="no-decoration"
        :class="{'text-primary': post.hasVoted, 'text-white-50': !post.hasVoted, 'text-danger': slider < 0 }"
              @click="show = true; flag = false"><i class="fas fa-heart fa-fw me-1"></i><span
              class="text-white-50">{{post.upVotes}}</span></a>
    <a v-if="!show" role="button" class="ms-2 no-decoration text-white-50"
            :class="{'text-primary': flag > 0}"
              @click="show = true; flag = true"><i class="fa-solid fa-flag me-1"></i><span
              class="text-white-50">{{post.downVotes ? post.downVotes : ''}}</span></a>
  <form v-if="show">
      <div class="p-2 d-flex align-items-center text-white-50">

          <button type="button" class="btn btn-sm me-2"
              :class="{'btn-success': !flag, ' btn-danger': flag}"
              @click="vote(post.url)" style="width: 100px;">{{flag ? '-'
              :
              ''}}{{slider / 100}}%</button>

          <button type="button" class="btn btn-secondary me-2"
              @click="show = false"><span
                  class="close text-white">×</span></button>

          <div class="d-flex align-items-center px-3 border rounded"
              style="height: 38px;"
              :class="{'border-success': !flag, 'border-danger': flag}">
              <input type="range" class="form-range mx-auto p-0" step="1"
                  max="10000" v-model="slider">
          </div>

          <div class="ms-auto">
              <p class="me-1 my-0"
                  :class="{'text-success': !flag, 'text-danger': flag}">
                  {{formatNumber(voteval *
                  slider/10000,3, '.', ',')}}
                  <i class="me-1 fab fa-fw fa-hive"></i>
              </p>
          </div>
      </div>
  </form>
</div>
            <pop-vue class="ms-auto" :id="'pop-' + post.author + '-' + post.permlink"
                        title="Post Earnings"
                        :content="(gt(post.total_payout_value, post.pending_payout_value) ? formatNumber(post.total_payout_value + ' ' + post.curator_payout_value, 3, '.',',') + ' HBD' : post.pending_payout_value ? post.pending_payout_value : '')"
                        trigger="hover">
              <button class="btn btn-sm btn-secondary">
                  {{gt(post.total_payout_value, post.pending_payout_value) ?
                  formatNumber(post.total_payout_value + ' ' +
                  post.curator_payout_value, 3, '.',',') :
                  formatNumber(post.pending_payout_value, 3, '.',',')}} HBD
              </button>
              </pop-vue>
          </div>
        `,
    props: {
        post: {
        required: true,
        default: function () {
            return {
            
            };
        },
        },
        account: {
            default: ''
        },
        voteval: 0,
    },
    data() {
    return {
        slider: 10000,
        flag: false,
        show: false,
        warn: false,
        makeReply: false,
    };
    },
    emits: ['vote'],
    methods:{
        vote(url){
            this.$emit('vote', {url:`/@${this.post.author}/${this.post.permlink}`, slider: this.slider, flag:this.flag})
            console.log(this.post)
        },
        formatNumber(t, n, r, e) { // number, decimals, decimal separator, thousands separator
            if (typeof t != "number") {
              const parts = t ? t.split(" ") : []
              var maybe = 0
              for (i = 0; i < parts.length; i++) {
                if (parseFloat(parts[i])>0){
                  maybe += parseFloat(parts[i])
                }
              }
              if (maybe>parseFloat(t)){
                t = maybe
              } else {
                t = parseFloat(t)
              }
            }
            if (isNaN(t)) return "Invalid Number";
            if (!isFinite(t)) return (t < 0 ? "-" : "") + "infinite";
            (r = r || "."), (e = e || "");
            var u = t < 0;
            t = Math.abs(t);
            var a = (null != n && 0 <= n ? t.toFixed(n) : t.toString()).split("."),
              i = a[0],
              o = 1 < a.length ? r + a[1] : "";
            if (e)
              for (var c = /(\d+)(\d{3})/; c.test(i); )
                i = i.replace(c, "$1" + e + "$2");
            return (u ? "-" : "") + i + o;
          },
          gt(a,b){
            return parseFloat(a)>parseFloat(b);
          },
    },
  mounted() {
  },
};

