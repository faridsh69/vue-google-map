Vue.component('detail-estate', {
    template: `
    <div>
    <div class="row">
        <div class="col-xs-12">
            <div class="card-estate-list min-height-card">
                <div class="row">
                    <div class="col-xs-7">
                        <div class="row">
                            <div class="col-xs-8">
                                <div v-if="estate.deal_type == 1">
                                    <span class="price">
                                        رهن:
                                        {{ estate.price | persian_digits }}
                                    </span>
                                    <span class="toman">
                                    تومان
                                    </span>
                                    <div class="one-third-seperate"></div>
                                    <span class="price">
                                        اجاره:
                                        {{ estate.price_rent | persian_digits }}
                                    </span>
                                    <span class="toman">
                                        تومان
                                    </span>
                                </div>
                                <div v-if="estate.deal_type == 0">
                                    <span class="price">
                                        {{ estate.price | persian_digits }}
                                    </span>
                                    <span class="toman">
                                        تومان
                                    </span>
                                </div>
                                <div class="district">
                                    {{ estate.some_address }}
                                </div>
                                <div class="half-seperate"></div>
                                <div class="seperate"></div>
                                <div class="seperate"></div>
                                <div class="description">
                                    {{ estate.foundation }}
                                    متری
                                    |
                                    {{ estate.rooms }}
                                    اتاق
                                    |
                                    {{ estate.estate_age > 0 ? estate.estate_age + 'سال ساخت' : 'نوساز' }}
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <span class="price-metri" v-if="estate.unit_price"> متری {{ estate.unit_price }} م</span>
                                <div class="one-third-seperate"></div>
                                <price-analyse :price-analyse-id="estate.price_analyse"></price-analyse>
                                <div class="seperate"></div>
                                <div class="half-seperate"></div>
                                <div class="comparison-list">
                                    <input type="checkbox" v-bind:id="'code' +estate.code" v-on:click="comparison(estate)" class="no-margin"
                                        style="margin:0px">
                                    <label v-bind:for="'code' + estate.code" class="font-style-normal">مقایسه</label>
                                </div>
                                <div class="one-third-seperate"></div>
                            </div>
                            <div class="col-xs-12">
                                <div class="one-third-seperate"></div>
                                <div class="code">
                                    کد ملک: {{ estate.code }}
                                    <a class="detail-link" v-bind:href="'/estate/detail/' + estate.code" target="_blank"> 
                                        بیشتر...
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <a v-on:click="goToTour(estate.code)" v-if="estate.has_tour == 1" href="javascript:void(0)">
                            <img v-bind:src="estate.image_url" alt="بازدید مجازی" class="estate-list-image">
                            <span class="btn-tour-on-image">
                                <i class="fa fa-camera width-20"></i>
                                بازدید مجازی
                            </span>
                        </a>

                        <a href="tel:02149135"  v-if="estate.has_tour == 0">
                            <img v-bind:src="estate.image_url" alt="تماس بگیرید با ملکانا" class="estate-list-image">
                            <span class="btn-tour-on-image call-back-black">
                                <i class="fa fa-phone width-20"></i>
                                02149135
                            </span>
                        </a>                       
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        estate: {
            required: true,
            type: Object
        }
    },
    data: function () {
        return {
            comparisonListCode: [],
            comparisonList: [],
            totalComparisonCount: 0,
            loading: false,
            messageComparison: '',
        }
    },
    methods: {
        goToTour: function(code){
            this.$emit('pass-tour-code', code);
        },
        comparison: function(estate) {
            var checkbox = $('#code' + estate.code);
            if(checkbox[0].checked){
                axios.get('/map/comparison/add/' + estate.code)
                .then(response => {
                    if(response.data.status == 'success') {
                        this.$emit('pass-comparison-count', response.data.totalCount);
                    }
                    this.$emit('pass-message', response.data);
                })
                .catch(e => {
                    this.$emit('pass-message', e);
                });
            }else{
                axios.get('/map/comparison/remove/' + estate.code)
                .then(response => {
                    if(response.data.status == 'success') {
                        this.$emit('pass-comparison-count', response.data.totalCount);
                    }
                    this.$emit('pass-message', response.data);
                })
                .catch(e => {
                    this.$emit('pass-message', e);
                });
            }
        },
        // reportError: function(data)
        // {
        //     if(data){
        //         this.messageComparison = data;
        //     }else{
        //         this.messageComparison = 'خطا رخ داده است.';
        //     }
        //     console.log(this.messageComparison);
        // },
    },
    mounted: function () {
        // this.fetchData();
    },
    computed: {
    },
});