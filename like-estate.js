Vue.component('like-estate', {
    template: `
  	<div class="box-like">
        <span v-on:click="like(0)" v-bind:class=" likeStatusData == 2 ? 'dislike-color': 'white-color'">
            <i class="fa fa-big-size fa-thumbs-down"></i>
        </span> 
        <span v-on:click="like(1)" v-bind:class=" likeStatusData == 1 ? 'like-color': 'white-color'">
            <i class="fa fa-big-size fa-thumbs-up  margin-right-5"></i>
        </span> 
	</div>`,
    props: {
        estateId: {
            required: true,
            type: Number
        },
        likeStatus: {
            required: true,
            type: Number
        },
        pointer: null,
    },
    data: function () {
        return {
            loading: true,
            likeStatusData: 0,
        }
    },
    methods: {
        fetchData: function() {
            this.likeStatusData = this.likeStatus;
        },
        like: function (type) {
            if(type == 1){
                this.likeStatusData = 1;
                this.pointer.setIcon({
                    url: "/images/p1.png",
                });
            }else{
                this.likeStatusData = 2;
                this.pointer.setIcon({
                    url: "/images/p2.png",
                });
            }
            this.$http.post('/estate/like', {estate_id: this.estateId, type: type}, {
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            }).then(function (response) {
                // console.log(response);
            });
        },
    },
    mounted: function () {
        this.fetchData();
    },
    computed: {},
});