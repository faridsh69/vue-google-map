Vue.component('list-estate', {
    template: `
    <div>
     <div class="row hidden-xs">
        <div class="col-xs-12">
            <h1 class="custome-header text-center">
                لیست خانه های ملکانا
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="card-sort">
                <div class="col-xs-12 col-sm-6">
                    <div>
                        نمایش {{ count }} خانه از {{ totalCount }} خانه جستجو شده
                        <ul class="filter-ul">
                            <li class="filter-li">
                                خرید و فروش
                                <span v-on:click="removeFilter()">
                                    <i class="fa fa-remove width-auto"></i>
                                </span>
                            </li>
                            <li class="filter-li">
                                قیمت بالای 100 میلیون
                                <span v-on:click="removeFilter()">
                                    <i class="fa fa-remove width-auto"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-7 col-sm-4">
                    <div class="half-seperate"></div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <span class="margin-right-left">
                                مرتب سازی بر اساس: 
                            </span>
                        </span>
                        <select class="form-control" v-model="sort" v-on:change="search()">
                            <option v-for="item in sorts" v-bind:value="item.name">
                                {{ item.title }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-xs-5 col-sm-2">
                    <div class="half-seperate"></div>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="کد ملک" v-model="code">
                        <div class="input-group-btn">
                            <button class="btn btn-default" v-on:click="searchCode()">
                                <i class="fa fa-search width-auto"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seperate"></div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3 col-sm-4">
            <div class="card-estate-filter">
                <h4 class="text-center hidden-xs">فیلتر های جستجو</h4>
                <ul class="nav nav-tabs nav-justified">
                    <li class="active"><a data-toggle="tab" href="#sell" v-on:click="filters.deal_type = 0">خرید و فروش</a></li>
                    <li><a data-toggle="tab" href="#price_rent" v-on:click="filters.deal_type = 1">رهن و اجاره</a></li>
                </ul>
                <div class="tab-content">
                    <div class="double-seperate"></div>
                    <button v-on:click="search()" class="btn btn-block btn-warning">
                        اعمال فیلترها
                    </button>
                    <div class="double-seperate"></div>
                    <input type="text" class="form-control" placeholder="نام محله">
                    <div class="double-seperate"></div>
                    <div id="sell" class="tab-pane fade in active">
                        <label class="form-label" id="price">محدوده قیمت به (میلیون تومان)</label>
                        <select class="form-control" for="price" v-model="filters.price">
                            <option value="0,10000">انتخاب نمایید</option>
                            <option v-for="item in options.price" v-bind:value="item.value">
                                {{ item.title }} میلیون
                            </option>
                        </select>
                    </div>
                    <div id="price_rent" class="tab-pane fade">
                        <label class="form-label" id="rahn">رهن به (میلیون تومان)</label>
                        <select class="form-control" for="rahn" v-model="filters.rahn">
                            <option value="0,10000">انتخاب نمایید</option>
                            <option v-for="item in options.rahn" v-bind:value="item.value">
                                {{ item.title }} میلیون
                            </option>
                        </select>
                        <div class="double-seperate"></div>
                        <label class="form-label" id="price_rent">اجاره به (میلیون تومان)</label>
                        <select class="form-control" for="price_rent" v-model="filters.price_rent">
                            <option value="0,10000">انتخاب نمایید</option>
                            <option v-for="item in options.price_rent" v-bind:value="item.value">
                                {{ item.title }} میلیون
                            </option>
                        </select>
                    </div>
                    <div class="double-seperate"></div>
                    <label class="form-label" id="foundation">متراژ به (متر مربع)</label>
                    <select class="form-control" for="foundation" v-model="filters.foundation">
                        <option value="0,10000">انتخاب نمایید</option>
                        <option v-for="item in options.foundation" v-bind:value="item.value">
                            {{ item.title }} متر
                        </option>
                    </select>
                    <div class="double-seperate"></div>
                    <p v-on:click="changeAdvancedSearch()" class="advanced-search">
                        جستجوی پیشرفته
                        <i class="fa fa-caret-down" v-if="!advancedSearch"></i>
                        <i class="fa fa-caret-up" v-if="advancedSearch"></i>
                    </p>
                    <div v-bind:class="advancedSearch ? 'display-block' : 'display-none'">
                        <div class="seperate"></div>
                        <span class="filter-type">سن بنا:</span>
                        <span class="filter-value">  
                            {{ translate(filters.estate_age, 'سال ساخت') }} 
                        </span>
                        <div class="seperate"></div>
                        <div id="ranged-estate-age" class="ltr"></div>
                        <div class="double-seperate"></div>
                        <span class="filter-type">تعداد اتاق:</span>
                        <span class="filter-value">
                            {{ translate(filters.rooms, 'اتاق') }} 
                        </span>
                        <div class="seperate"></div>
                        <div id="ranged-rooms" class="ltr"></div>
                        <div class="double-seperate"></div>
                        <span class="filter-type">طبقه واحد ملک:</span>
                        <span class="filter-value">  
                            {{ translate(filters.estate_floor, 'طبقه ') }} 
                        </span>
                        <div class="seperate"></div>
                        <div id="ranged-estate-floor" class="ltr"></div>
                        <div class="double-seperate"></div>
                        <span class="filter-type">تعداد طبقات ساختمان: </span>
                        <span class="filter-value">  
                            {{ translate(filters.building_floors, 'طبقه') }} 
                        </span>
                        <div class="seperate"></div>
                        <div id="ranged-building-floors" class="ltr"></div>
                        <div class="double-seperate"></div>
                        <span class="filter-type">تعداد واحد هر طبقه: </span>
                        <span class="filter-value">  
                            {{ translate(filters.floor_units, 'واحدی') }} 
                        </span>
                        <div class="seperate"></div>
                        <div id="ranged-floor-units" class="ltr"></div>
                        <div class="double-seperate"></div>
                        
                        <span class="filter-type">وضعیت تور: </span>
                        <span class="filter-value radio-filter">  
                             <label class="radio-inline flex-item">
                                 <input type="radio" v-model="filters.has_tour" name="has_tour" value="1">
                                 <span class="radio-title">دارد</span>
                             </label>
                              <label class="radio-inline flex-item">
                                  <input type="radio" v-model="filters.has_tour" name="has_tour" value="0">
                                  <span class="radio-title">ندارد</span>
                              </label>
                              <label class="radio-inline flex-item">
                                  <input type="radio" v-model="filters.has_tour" name="has_tour" value="2">
                                  <span class="radio-title">هردو</span>
                              </label>
                        </span>
                        
                        
                        <div class="double-seperate"></div>
                        <span class="filter-type">نوع ملک: </span>
                        <span class="filter-value radio-filter">  
                             <label class="radio-inline flex-item">
                                 <input type="radio" v-model="filters.estate_type" name="estate_type" value="0">
                                 <span class="radio-title">آپارتمان</span>
                             </label>
                              <label class="radio-inline flex-item">
                                  <input type="radio" v-model="filters.estate_type" name="estate_type" value="1">
                                  <span class="radio-title">ویلایی</span>
                              </label>
                              <label class="radio-inline flex-item">
                                  <input type="radio" v-model="filters.estate_type" name="estate_type" value="2">
                                  <span class="radio-title">هردو</span>
                              </label>
                        </span>
                        <div class="double-seperate"></div>
                        
                        
                       
                        <span class="filter-type">نوع سند: </span>
                        <span class="filter-value radio-filter">  
                             <label class="radio-inline flex-item">
                                 <input type="radio" v-model="filters.estate_document" name="estate_document" 
                                    value="0">
                                 <span class="radio-title">مسکونی</span>
                             </label>
                              <label class="radio-inline flex-item">
                                  <input type="radio" v-model="filters.estate_document" name="estate_document" 
                                    value="1">
                                  <span class="radio-title">اداری</span>
                              </label>
                              <label class="radio-inline flex-item">
                                  <input type="radio" v-model="filters.estate_document" name="estate_document" 
                                    value="2">
                                  <span class="radio-title">هردو</span>
                              </label>
                        </span>
                        <div class="double-seperate"></div>
                        
                        <p class="filter-type">امکانات: </p>
                        <div class="row">
                            <div class="col-xs-5" v-for="feature in filters.features">
                                <div class="pretty p-image p-plain ltr">
                                    <input type="checkbox" value="true" v-model="feature.status"/>
                                    <div class="state">
                                        <img class="image" src="/images/checkbox2.png">
                                        <label>{{ feature.name }}</label>
                                    </div>
                                </div>
                                <div class="half-seperate"></div>
                            </div>
                        </div>
                    </div>
                    <div class="double-seperate"></div>
                    <button v-on:click="search()" class="btn btn-block btn-warning">
                        اعمال فیلترها
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-9 col-sm-8" v-if="loading">
            <div class="loading"></div>
            در حال بارگزاری...
        </div>
        <div class="col-md-9 col-sm-8" v-if="!loading">
            <div v-if="estates.length == 0">
                <div class="alert alert-danger">
                    ملکی با مشخصات داده شده یافت نشد!
                </div>
            </div>
            <div class="card-estate-list min-height-card" v-for="item in estates">
                <div class="row">
                    <div class="col-xs-3 text-center hidden-xs">
                        <a v-bind:href="'/estate/' + item.code">
                            <img v-bind:src="item.image_url" alt="" class="estate-list-image">
                        </a>
                    </div>
                    <div class="col-xs-7 col-xs-offset-1 col-sm-offset-0 col-sm-6 col-md-6">
                        <a v-bind:href="'/estate/detail/' + item.code">
                            <h4 class="title">{{ item.title }}</h4>
                        </a>
                        <div class="seperate"></div>
                        <p class="description">
                            <i class="fa fa-expand"></i>
                            {{ item.foundation }}
                            متری
                            <span class="margin-right-left"> | </span>
                            <i class="fa fa-bed"></i>
                            {{ item.rooms }}
                            اتاق
                            <span class="margin-right-left"> | </span>
                            <i class="fa fa-calendar-check-o"></i>
                            {{ item.estate_age }}
                            سال ساخت
                        </p>
                        <div class="one-third-seperate-seperate"></div>
                        <p class="features"> {{ item.features }} </p>
                        <div class="one-third-seperate"></div>
                        <p class="code">کد ملک: {{ item.code }} </p>
                    </div>
                    <div class="col-xs-4 col-sm-3 col-md-3">
                        <div v-if="item.price_rent">
                            <span class="price">
                                رهن:
                                {{ item.price | persian_digits }}
                            </span>
                            <span class="toman">
                            تومان
                            </span>
                            <div class="one-third-seperate"></div>
                            <span class="price">
                                اجاره:
                                {{ item.price_rent | persian_digits }}
                            </span>
                            <span class="toman">
                                تومان
                            </span>
                        </div>
                        <div v-if="!item.price_rent">
                            <div class="one-third-seperate"></div>
                            <span class="price">
                                {{ item.price | persian_digits }}
                            </span>
                            <span class="toman">
                                تومان
                            </span>
                        </div>
                        <div class="seperate"></div>
                        <a v-bind:href="'/estate/detail/' + item.code">
                            <i class="fa fa-info-circle width-20"></i>
                            مشاهده
                        </a>
                        <div class="half-seperate"></div>
                        <a v-bind:href="'/estate/' + item.code">
                            <i class="fa fa-camera width-20"></i>
                            تورمجازی
                        </a>
                        <div class="half-seperate"></div>
                        <a v-bind:href="'/estate/comparison/' + item.code">
                            <i class="fa fa-balance-scale width-20"></i>
                            مقایسه
                        </a>
                        <div class="seperate"></div>
                        <a href="tel:02149135 021 " class="btn btn-sm btn-info">
                            <i class="fa fa-phone"></i>
                            <span class="hidden-xs"></span>    
                             49135 021 
                        </a>
                        <div class="half-seperate"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>`,
    props: {},
    data: function () {
        return {
            loading: true,
            loadingMore: false,
            totalCount: 0,
            count: 0,
            estates: [],
            filters: {
                'deal_type':0,
                'price': '0,10000',
                'rahn': '0,10000',
                'price_rent': '0,10000',
                'foundation': '0,10000',
                'estate_age':
                    {
                        'min': 0,
                        'max': 10,
                        'minRange': 0,
                        'maxRange': 40,
                    },
                'rooms':
                    {
                        'min': 1,
                        'max': 3,
                        'minRange': 0,
                        'maxRange': 5,
                    },
                'estate_floor':
                    {
                        'min': 0,
                        'max': 5,
                        'minRange': -1,
                        'maxRange': 10,
                    },
                'building_floors':
                    {
                        'min': 1,
                        'max': 10,
                        'minRange': 1,
                        'maxRange': 20,
                    },
                'floor_units':
                    {
                        'min': 1,
                        'max': 6,
                        'minRange': 1,
                        'maxRange': 10,
                    },
                'has_tour': 2,
                'estate_type': 2,
                'estate_document': 2,
                'features': null,
            },
            sorts: [
                {'title': 'ارزانترین', 'name': 'price,asc'},
                {'title': 'گرانترین', 'name': 'price,desc'},
                {'title': 'قدیمی ترین', 'name': 'id,asc'},
                {'title': 'جدیدترین', 'name': 'id,desc'},
                {'title': 'متراژ بالا', 'name': 'foundation,desc'},
                {'title': 'متراژ پایین', 'name': 'foundation,asc'},
            ],
            options: {
                'price': 
                    [
                        {'value': '0,50', 'title':' زیر 50'},
                        {'value': '50,100', 'title':' 50 الی 100'},
                        {'value': '100,150', 'title':' 100 الی 150'},
                        {'value': '150,200', 'title':' 150 الی 200'},
                        {'value': '200,300', 'title':' 200 الی 300'},
                        {'value': '300,500', 'title':' 300 الی 500'},
                        {'value': '500,1000', 'title':' 500 الی 1000'},
                        {'value': '1000,3000', 'title':' 1000 الی 3000'},
                        {'value': '3000,10000', 'title':' بالای 3000'},
                    ],
                'rahn':
                    [
                        {'value': '0,10', 'title':' زیر 10'},
                        {'value': '10,20', 'title':' 10 الی 20'},
                        {'value': '20,30', 'title':' 20 الی 30'},
                        {'value': '30,50', 'title':' 30 الی 50'},
                        {'value': '50,100', 'title':' 50 الی 100'},
                        {'value': '100,200', 'title':' 100 الی 200'},
                        {'value': '200,500', 'title':' 200 الی 500'},
                        {'value': '500,10000', 'title':' بالای 500'},
                    ],
                'price_rent':
                    [
                        {'value': '0,0.5', 'title':' زیر 0.5'},
                        {'value': '0.5,1', 'title':' 0.5 الی 1'},
                        {'value': '1,1.5', 'title':' 1 الی 1.5'},
                        {'value': '1.5,2', 'title':' 1.5 الی 2'},
                        {'value': '2,3', 'title':' 2 الی 3'},
                        {'value': '3,5', 'title':' 3 الی 5'},
                        {'value': '5,10000', 'title':' بالای 5'},
                    ],
                'foundation':
                    [
                        {'value': '0,50', 'title':' زیر 50'},
                        {'value': '50,75', 'title':' 50 الی 75'},
                        {'value': '75,100', 'title':' 75 الی 100'},
                        {'value': '100,125', 'title':' 100 الی 125'},
                        {'value': '125,150', 'title':' 125 الی 150'},
                        {'value': '150,200', 'title':' 150 الی 200'},
                        {'value': '200,250', 'title':' 200 الی 250'},
                        {'value': '250,300', 'title':' 250 الی 300'},
                        {'value': '300,10000', 'title':' بالای 300'},
                    ],
                },
            sort: 'id,desc',
            code: '',
            advancedSearch: true,
        }
    },
    methods: {
        fetchData: function () {
            this.$http.get('/estate/list/init').then(function (response) {
                if (response.status == 200 && response.data.status == 1) {
                    this.estates = response.data.estates;
                    this.totalCount = response.data.total_count;
                    this.count = response.data.count;
                    this.filters.features = response.data.features;
                    this.loading = false;
                } else {
                    alert('خطایی در سیستم رخ داده است.')
                }
            });
        },
        search: function () {
            this.loading = true;
            this.$http.post('/estate/list/search', {filters: this.filters, sort: this.sort}, {
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            }).then(function (response) {
                if (response.status == 200 && response.data.status == 1) {
                    this.estates = response.data.estates;
                    this.totalCount = response.data.total_count;
                    this.count = response.data.count;
                    this.loading = false;
                } else {
                    alert('خطایی در سیستم رخ داده است.')
                }
                ;
            });
        },
        searchCode: function () {
            window.location.assign("/estate/detail/" + this.code);
        },
        loadMore: function () {
            this.loadingMore = true;
            this.$http.post('/estate/list/load-more', {count: this.estates.length, filters: this.filters}, {
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            }).then(function (response) {
                if (response.status == 200 && response.data.status == 1) {
                    this.estates.push(response.data.estates);
                    this.loadingMore = false;
                } else {
                    alert('خطایی در سیستم رخ داده است.')
                }
                ;
            });
        },
        removeFilter: function () {

        },
        changeAdvancedSearch: function () {
            this.advancedSearch = !this.advancedSearch;
        },
        fillFilters: function () {
            var vueThis = this;
            var rangedEstateAge = $("#ranged-estate-age").freshslider({
                range: true,
                step: 1,
                min: vueThis.filters.estate_age.minRange,
                max: vueThis.filters.estate_age.maxRange,
                value: [vueThis.filters.estate_age.min, vueThis.filters.estate_age.max],
                onchange: function (low, high) {
                    vueThis.filters.estate_age.min = low;
                    vueThis.filters.estate_age.max = high;
                }
            });
            var rangedRooms = $("#ranged-rooms").freshslider({
                range: true,
                step: 1,
                min: vueThis.filters.rooms.minRange,
                max: vueThis.filters.rooms.maxRange,
                value: [vueThis.filters.rooms.min, vueThis.filters.rooms.max],
                onchange: function (low, high) {
                    vueThis.filters.rooms.min = low;
                    vueThis.filters.rooms.max = high;
                }
            });
            var rangedEstateFloor = $("#ranged-estate-floor").freshslider({
                range: true,
                step: 1,
                min: vueThis.filters.estate_floor.minRange,
                max: vueThis.filters.estate_floor.maxRange,
                value: [vueThis.filters.estate_floor.min, vueThis.filters.estate_floor.max],
                onchange: function (low, high) {
                    vueThis.filters.estate_floor.min = low;
                    vueThis.filters.estate_floor.max = high;
                }
            });
            var rangedEstateBuildingFloors = $("#ranged-building-floors").freshslider({
                range: true,
                step: 1,
                min: vueThis.filters.building_floors.minRange,
                max: vueThis.filters.building_floors.maxRange,
                value: [vueThis.filters.building_floors.min, vueThis.filters.building_floors.max],
                onchange: function (low, high) {
                    vueThis.filters.building_floors.min = low;
                    vueThis.filters.building_floors.max = high;
                }
            });
            var rangedEstateFloorUnits = $("#ranged-floor-units").freshslider({
                range: true,
                step: 1,
                min: vueThis.filters.floor_units.minRange,
                max: vueThis.filters.floor_units.maxRange,
                value: [vueThis.filters.floor_units.min, vueThis.filters.floor_units.max],
                onchange: function (low, high) {
                    vueThis.filters.floor_units.min = low;
                    vueThis.filters.floor_units.max = high;
                }
            });
        },
        translate: function(item, word)
        {
            word = ' ' + word;
            var output = '';
            if(word == ' طبقه ')
            {
                var transMin = item.min  == 0 ? 'همکف' : item.min;
                var transMax = item.max  == 0 ? 'همکف' : item.max;
                if(item.min == item.max)
                    output = word + transMin;
                else if(item.min == item.minRange && item.max == item.maxRange)
                    output = 'همه موارد';
                else if(item.min == item.minRange)
                    output = 'پایین تر از ' + word + transMax;
                else if(item.max == item.maxRange)
                    output = 'بالاتر از ' + word + transMin;
                else if(item.min != item.max)
                    output = 'بین ' + word + transMin + ' الی ' + transMax;

                return output;
            }
            if(item.min == item.max)
                output = item.min + word;
            else if(item.min == item.minRange && item.max == item.maxRange)
                output = 'همه موارد';
            else if(item.min == item.minRange)
                output = 'کمتر از ' + item.max + word;
            else if(item.max == item.maxRange)
                output = 'بیشتر از ' + item.min + word;
            else if(item.min != item.max)
                output = 'بین ' + item.min + ' الی ' + item.max + word;

            return output;
        },
    },
    mounted: function () {
        this.fillFilters();
        this.fetchData();

        // dar ebteda nabayad in field napadid shavad 
        // in code be in khater ast ke bad az meghdar dehie range ha display-none shavad 
        this.advancedSearch = false;
    },
    computed: {
    },
});