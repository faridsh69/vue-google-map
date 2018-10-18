googleMapComponent = Vue.component('google-map', {
    template: `
<div>
<div class="top-menu-desktop">
    <div class="row">
        <div class="menu-hover-3noghte" v-on:click="closeMenu('close')"></div>
        <div class="visible-xs col-xs-1 menu-3-noghte">
            <i class="fa fa-ellipsis-v menu-3-noghte-i"></i>
        </div>
        <div class="menu-melkhae-full" v-if="menuMobile">
            <div>
                <ul>
                    <li v-on:click="closeMenu('register')">
                        <i class="fa fa-pencil-square-o"></i>سپردن ملک
                    </li>
                    <li v-on:click="closeMenu('filter')">
                        <i class="fa fa-filter"></i>جستجو
                    </li>
                    <li v-on:click="closeMenu('terms')">
                        <i class="fa fa-book"></i>شرایط و قوانین
                    </li>
                    <li v-on:click="closeMenu('contact_us')">
                        <i class="fa fa-phone"></i>تماس با ما
                    </li>
                    <li v-on:click="getEstatesType('seen_estates')">
                        <i class="fa fa-eye"></i>دیده ام
                    </li>
                    <li v-on:click="getEstatesType('new_estates')">
                        <i class="fa fa-clock-o"></i>جدیدها
                    </li>
                    <li v-on:click="getEstatesType('favorite_estates')">
                        <i class="fa fa-heart"></i>پسندیدم
                    </li>
                    <li>
                        <a href="/calculate/price" target="_blank" class="a-no-decoration">
                            <i class="fa fa-ticket"></i>کارشناسی قیمت
                        </a>
                    </li>
                    <li v-if="userId != 0">
                        <a href="/auth/logout">
                            <i class="fa fa-sign-out"></i>خروج
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-lg-4 col-md-3 col-sm-4 col-xs-8">
            <div class="input-group">
                <input id="pac-input" type="text" class="form-control z-index-max" placeholder="جستجو ناحیه"
                    v-on:focus="focusDistrict()">
                <i class="fa fa-close close-place" v-on:click="clearPlace()" v-if="clearPlaceDisplay == true"></i>
                <div class="input-group-btn">
                    <button class="btn btn-default btn-normal" v-on:click="searchPlace()">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="col-lg-7 col-md-8 col-sm-7 hidden-xs">
            <ul>
                <li v-bind:class="[activeMenu == 'estate_list' ? 'active-color' : '', 'draw']" v-on:click="setAllMarkers()">
                    <div v-on:click="activeMenuListEstate()"><i class="fa fa-list hidden-sm"></i>لیست املاک</div>
                </li>
                <li v-bind:class="[activeMenu == 'filter' ? 'active-color' : '', 'draw']">
                    <div v-on:click="fillFiltersMobile()"><i class="fa fa-filter hidden-sm"></i>جستجو</div>
                </li>
                <li v-bind:class="[activeMenu == 'terms' ? 'active-color' : '', 'draw']">
                    <div v-on:click="activeMenu = 'terms'"><i class="fa fa-book hidden-sm"></i>شرایط و قوانین</div>
                </li>
                <li v-bind:class="[activeMenu == 'about_us' ? 'active-color' : '', 'draw display-none']">
                    <div v-on:click="activeMenu = 'about_us'"><i class="fa fa-info hidden-sm"></i>درباره ما</div>
                </li>
                <li v-bind:class="[activeMenu == 'contact_us' ? 'active-color' : '', 'draw']">
                    <div v-on:click="activeMenu = 'contact_us'"><i class="fa fa-phone hidden-sm"></i>تماس با ما</div>
                </li>
                <li v-bind:class="[activeMenu == 'register' ? 'active-color' : '', 'draw register-important']">
                    <div v-on:click="activeMenu = 'register'"><i class="fa fa-pencil-square-o hidden-sm"></i>سپردن ملک</div>
                </li>


                <li v-bind:class="[activeMenu == 'seen_estates' ? 'active-color' : '', 'draw']" 
                    v-on:click="getEstatesType('seen_estates')">
                    <div>
                        <i class="fa fa-eye"></i>
                        <span class="hidden-sm">دیده ام</span>
                    </div>
                </li>

                <li v-bind:class="[activeMenu == 'new_estates' ? 'active-color' : '', 'draw']" 
                    v-on:click="getEstatesType('new_estates')">
                    <div>
                        <i class="fa fa-clock-o"></i>
                        <span class="hidden-sm">جدیدها</span>
                    </div>
                </li>
                <li v-bind:class="[activeMenu == 'favorite_estates' ? 'active-color' : '', 'draw']" 
                    v-on:click="getEstatesType('favorite_estates')">
                    <div>
                        <i class="fa fa-heart"></i>
                        <span class="hidden-sm">پسندیدم</span>
                    </div>
                </li>
                <li>
                    <div>
                        <i class="fa fa-ticket"></i>
                        <a href="/calculate/price" class="a-no-decoration" target="_blank">
                            <span class="hidden-sm">کارشناسی قیمت</span>
                        </a>
                    </div>
                </li>
                <li class="draw logout-btn" v-if="userId != 0">
                    <a href="/auth/logout">
                        <i class="fa fa-sign-out"></i>
                        <span class="hidden-sm hidden-md">خروج</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-xs-3 col-sm-1 very-small-size-logo-box">
            <div class="logo-menu-mobile">
                <div class="icon-menu-mobile visible-xs">
                    <i class="fa fa-filter" v-on:click="fillFiltersMobile()"></i>
                </div>
                <a href="/">
                    <img src="/images/logo.png" class="logo-navbar">
                </a>
            </div>
        </div>
    </div>
</div>
<div class="right-menu">
    
    <div class="notification-button-menu" v-if="loading || filterItems.length > 0 || showAllClusters">
        <button class="btn btn-primary" v-if="showAllClusters" v-on:click="setAllMarkers()">
            نمایش تمام ملک ها
        </button>
        <div v-for="item in filterItems" class="filter-item">
            <i class="fa fa-close" v-on:click="removeFilter(item.name)"></i> 
            {{ item.description }}
        </div>
        <loading v-if="loading"></loading>
    </div>
    <div v-if="activeMenu != '' || !isMobile " v-bind:class="[activeMenu == '' ? 'right-5px' : '', 'close-button-menu']" v-on:click="changeMenuStatus()">
        <i class="fa fa-caret-left" v-if="activeMenu == ''"></i>
        <i class="fa fa-caret-right" v-else="activeMenu == ''"></i>
    </div>
    <div class="main-menu" v-if="activeMenu != ''" >
        <span class="display-none"> {{computedMapSize}} </span>
        <div class="main-menu-item hidden-xs" id="estate_list" v-if="activeMenu == 'estate_list' || 
            activeMenu == 'favorite_estates' || activeMenu == 'seen_estates' || activeMenu == 'new_estates'" >
            <div class="row">
                <div class="seperate"></div>
                <div class="col-xs-10 col-xs-offset-1">
                    <select class="select-beauty" v-model="filters.sort" v-on:change="searchWithSort()" id="selectSort">
                        <option v-for="item in options.sorts" v-bind:value="item">
                            {{ item.title }}
                        </option>
                    </select>
                </div>
                <p class="page-header text-center big-size bold" v-if="activeMenu == 'favorite_estates'">
                    ملک های مورد علاقه     
                </p>
                <p class="page-header text-center big-size bold" v-if="activeMenu == 'seen_estates'">
                    ملک های دیده شده     
                </p>
                <p class="page-header text-center big-size bold" v-if="activeMenu == 'new_estates'">
                    ملک های جدید     
                </p>
                <div class="col-xs-12" v-for="estate in estateList">
                    <detail-estate :estate="estate" 
                        @pass-tour-code="motherPassTourCode"
                        @pass-comparison-count="motherPassComparisonCount"
                        @pass-message="motherPassMessage"></detail-estate>
                </div>
                <div v-if="loadingMore">
                    <div class="seperate"></div>
                    <div class="seperate"></div>
                    <loading></loading>
                    <div class="seperate"></div>
                    <div class="seperate"></div>
                </div>
            </div>
        </div>
        <div v-bind:class="[activeMenu == 'filter' ? '' : 'display-none', 'main-menu-item']">
            <div class="row">
                <div class="col-xs-12">
                    <div class="card-estate-filter">
                        <h4 class="text-center">
                            فیلتر های جستجو 
                        </h4>
                        <div class="half-seperate"></div>
                        <div class="input-group col-xs-10 col-xs-offset-1">
                            <input type="text" class="form-control ltr" placeholder="کد 6 رقمی ملک" v-model="estateIdSearch" id="searchCodeInput">
                            <div class="input-group-btn">
                                <button class="btn btn-default" type="submit" v-on:click="searchCode()">
                                    <i class="glyphicon glyphicon-search font-size-13"></i>
                                </button>
                            </div>
                        </div>
                        <div class="seperate"></div>
                        <ul class="nav nav-tabs nav-justified">
                            <li class="active"><a data-toggle="tab" href="#sell" v-on:click="filters.deal_type = 0">خرید و فروش</a></li>
                            <li><a data-toggle="tab" href="#price_rent" v-on:click="filters.deal_type = 1">رهن و اجاره</a></li>
                        </ul>
                        <div class="tab-content">
                            <div class="seperate"></div>
                            <button v-on:click="search()" class="btn btn-block btn-info">
                                جستجو
                            </button>
                            <div class="seperate"></div>
                            <div id="sell" class="tab-pane fade in active">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label class="form-label font-weight-normal" for="min_price">حداقل قیمت (تومان)</label>
                                        <input type="text" id="min_price" v-model="filters.price.min" 
                                            class="form-control ltr _separator" v-on:keyup="seperate('price', 'min')">
                                    </div>
                                    <div class="col-xs-6">
                                        <label class="form-label font-weight-normal" for="max_price">حداکثر قیمت (تومان)</label>
                                        <input type="text" id="max_price" v-model="filters.price.max" 
                                            class="form-control ltr _separator" v-on:keyup="seperate('price', 'max')">
                                    </div>
                                </div>
                            </div>
                            <div id="price_rent" class="tab-pane fade">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label class="form-label font-weight-normal" for="min_rahn">حداقل رهن (تومان)</label>
                                        <input type="text" id="min_rahn" v-model="filters.rahn.min" 
                                            class="form-control ltr _separator" v-on:keyup="seperate('rahn', 'min')">
                                    </div>
                                    <div class="col-xs-6">
                                        <label class="form-label font-weight-normal" for="max_rahn">حداکثر رهن (تومان)</label>
                                        <input type="text" id="max_rahn" v-model="filters.rahn.max" 
                                            class="form-control ltr _separator" v-on:keyup="seperate('rahn', 'max')">
                                    </div>
                                </div>
                                <div class="seperate"></div>
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label class="form-label font-weight-normal" for="min_price_rent">حداقل اجاره (تومان)</label>
                                        <input type="text" id="min_price_rent" v-model="filters.price_rent.min" 
                                            class="form-control ltr _separator" v-on:keyup="seperate('price_rent', 'min')">
                                    </div>
                                    <div class="col-xs-6">
                                        <label class="form-label font-weight-normal" for="max_price_rent">حداکثر اجاره (تومان)</label>
                                        <input type="text" id="max_price_rent" v-model="filters.price_rent.max" 
                                            class="form-control ltr _separator" v-on:keyup="seperate('price_rent', 'max')">
                                    </div>
                                </div>
                            </div>
                            <div class="seperate"></div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <label class="form-label font-weight-normal" for="min_foundation">حداقل متراژ (متر)</label>
                                    <input type="number" id="min_foundation" v-model="filters.foundation.min" 
                                        class="form-control ltr" >
                                </div>
                                <div class="col-xs-6">
                                    <label class="form-label font-weight-normal" for="max_foundation">حداکثر متراژ (متر)</label>
                                    <input type="number" id="max_foundation" v-model="filters.foundation.max" 
                                        class="form-control ltr" >
                                </div>
                            </div>
                            <div class="seperate"></div>
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
                                <div class="half-seperate"></div>
                                <div id="ranged-estate-age" class="ltr"></div>
                                <div class="seperate"></div>
                                <span class="filter-type">تعداد اتاق:</span>
                                <span class="filter-value">
                                    {{ translate(filters.rooms, 'اتاق') }} 
                                </span>
                                <div class="half-seperate"></div>
                                <div id="ranged-rooms" class="ltr"></div>
                                <div class="seperate"></div>
                                <span class="filter-type">تعداد طبقات ساختمان: </span>
                                <span class="filter-value">  
                                    {{ translate(filters.building_floors, 'طبقه') }} 
                                </span>
                                <div class="half-seperate"></div>
                                <div id="ranged-building-floors" class="ltr"></div>
                                <div class="seperate"></div>
                                <span class="filter-type">تعداد واحد هر طبقه ساختمان: </span>
                                <span class="filter-value">  
                                    {{ translate(filters.floor_units, 'واحدی') }} 
                                </span>
                                <div class="half-seperate"></div>
                                <div id="ranged-floor-units" class="ltr"></div>                                
                                <div class="seperate"></div>
                                <span class="filter-type">طبقه ملک:</span>
                                <span class="filter-value">  
                                    {{ translate(filters.estate_floor, 'طبقه ') }} 
                                </span>
                                <div class="half-seperate"></div>
                                <div id="ranged-estate-floor" class="ltr"></div>
                                
                                <div class="display-none">
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
                                </div>
                                
                                <div class="seperate"></div>
                                <span class="radio-group-title"> نوع ملک: </span> 
                                <div class="radio-group">
                                    <input type="radio" v-model="filters.estate_type" name="estate_type" value="0" id="option-one">
                                    <label for="option-one">آپارتمان</label>

                                    <input type="radio" v-model="filters.estate_type" name="estate_type" value="1" id="option-two">
                                    <label for="option-two">ویلایی</label>

                                    <input type="radio" v-model="filters.estate_type" name="estate_type" value="2" id="option-three">
                                    <label for="option-three">هردو</label>
                                </div>
                                                                
                                <span class="radio-group-title"> نوع سند: </span> 
                                <div class="radio-group">
                                    <input type="radio" v-model="filters.estate_document" name="estate_document" value="0" id="option-one1">
                                    <label for="option-one1">مسکونی</label>

                                    <input type="radio" v-model="filters.estate_document" name="estate_document" value="1" id="option-two2">
                                    <label for="option-two2">اداری</label>

                                    <input type="radio" v-model="filters.estate_document" name="estate_document" value="2" id="option-three3">
                                    <label for="option-three3">هردو</label>
                                </div>
                                
                                <p class="text-info">امکانات: </p>
                                <div class="row">
                                    <div class="col-xs-6" v-for="feature in filters.features">
                                        <input type="checkbox" v-bind:id="feature.id" value="true" v-model="feature.status"/>
                                        <label  v-bind:for="feature.id">{{ feature.name }}</label>
                                        <div class="half-seperate"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="seperate"></div>
                            <button v-on:click="search()" class="btn btn-block btn-info">
                                جستجو
                            </button>
                            <button class="btn btn-block btn-sm btn-default" v-on:click="shareFilters()">
                                <i class="fa fa-share-alt curser-pointer margin-right-10"></i>
                                اشتراک گذاری فیلتر ها
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="activeMenu == 'register'" class="main-menu-item card">
            <h5 class="bold big-size">فرم سپردن ملک</h5>
            <p>تمامی خدمات ملکانا و عکاسی رایگان می باشد</p>
            <form action="" v-on:submit.prevent="submitRegisterForm()">
                <div class="deal_type">
                    <label class="type-label">
                        <input type="radio" name="type" checked="">
                        <span>فروشی</span>
                    </label>
                    <label class="type-label">
                        <input type="radio" name="type">
                        <span>اجاره ای</span>
                    </label>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-user"></span></span>
                    <input type="text" class="input-with-icon" placeholder="نام و نام خانوادگی" v-model="registerForm.name" required>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-phone"></span></span>
                    <input type="text" class="input-with-icon" placeholder="شماره تماس" v-model="registerForm.tell" required>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-money"></span></span>
                    <input type="text" class="input-with-icon" placeholder="قیمت" v-model="registerForm.price" required>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-road"></span></span>
                    <input type="text" class="input-with-icon" placeholder="متراژ" v-model="registerForm.foundation" required>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-user"></span></span>
                    <input type="text" class="input-with-icon" placeholder="شهر" v-model="registerForm.city" required>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-address-book"></span></span>
                    <input type="text" class="input-with-icon" placeholder="آدرس" v-model="registerForm.address" required>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-user"></span></span>
                    <input type="text" class="input-with-icon" placeholder="سن بنا" v-model="registerForm.estate_age" required>
                </div>

                <div class="input-icon-wrap">
                    <span class="input-icon"><span class="fa fa-user"></span></span>
                    <textarea class="input-with-icon" placeholder="توضیحات تکمیلی" v-model="registerForm.description"></textarea>
                </div>
                <input type="submit" class="btn btn-success btn-block" value="ثبت اطلاعات">
                <div class="seperate"></div>
                <div class="seperate"></div>
            </form>
        </div>
        <div v-if="activeMenu == 'terms'" class="main-menu-item card">
            <terms-us></terms-us>
        </div>
        <div v-if="activeMenu == 'contact_us'" class="main-menu-item card">
            <contact-us></contact-us>
        </div>
        <div v-if="activeMenu == 'about_us'" class="main-menu-item card">
            <about-us></about-us>
        </div>

        <div v-if="activeMenu == 'estate_details'" class="main-menu-item">
            <div v-if="details">
                <a v-on:click="motherPassTourCode(details.code)" href="javascript:void(0)" v-if="details.has_tour == 1">
                    <div class="image_360_viewer" 
                        v-bind:style="{ 'background-position': backPosition + 'px 0px',
                            'background-image': 'url(' + details.image_360 + ')' }">
                        <div class="white-transparency"></div>
                        <a href="javascript::void(0)" class="tour-btn-new">
                            کلیک کنید
                        </a>
                    </div>
                </a>
                <a href="tel:02149135" v-else="details.has_tour">
                    <div class="image_360_viewer" 
                        v-bind:style="{ 'background-position': '-30px 0px',
                            'background-image': 'url(' + details.image_360 + ')' }">
                        <div class="white-transparency"></div>
                    </div>
                </a>
                <div class="card backgroud-blue no-paddding estate-details-important">
                    <div class="seperate"></div>
                    <div class="row">
                        <div class="col-xs-2">
                            <div class="seperate"></div>
                            <div class="seperate"></div>
                            <div v-on:click="share(details)" data-toggle="modal" data-target="#share-modal">
                                <img src="/images/share.png" class="curser-pointer margin-right-10 img-responsive">
                            </div>
                            <div class="seperate"></div>
                            <a v-bind:href="'/estate/detail/' + details.code" class="display-none">
                                <i class="fa fa-info-circle fa-big-size color-white"></i>
                            </a>
                        </div>
                        <div class="col-xs-6 text-right">
                            <div class="code"> کد ملک: {{ details.code }}</div>
                            <div class="one-third-seperate"></div>
                            <div v-if="details.deal_type == 'فروش'" class="color-white">
                                <span> قیمت: {{ details.price }} تومان</span>
                                <div class="seperate"></div>
                                <span> قیمت هرمتر: {{ details.unit_price }} میلیون تومان</span>
                            </div>
                            <div v-else="details.deal_type == 'فروش'">
                                <span> رهن: {{ details.price }} تومان</span>
                                <div class="seperate"></div>
                                <span> اجاره: {{ details.price_rent }} تومان</span>
                            </div>
                        </div> 
                        <div class="col-xs-4">
                            <div class="row">
                                <div class="col-xs-12">
                                    <a class="btn btn-info btn-outline-white" v-bind:href=" '/estate/detail/' + details.code">
                                        <span class="hidden-xs">اطلاعات</span> 
                                    بیشتر</a> 
                                </div>
                                <div class="half-seperate"></div>
                                <div class="seperate"></div>
                                <div class="col-xs-12" v-on:click="checkForLikeLogin()">
                                    <div class="prevent-login" v-if="userId == 0"></div>
                                    <like-estate :estate-id="details.id" :like-status="details.like_status" 
                                    :pointer="selectedMarker" class="color-white"></like-estate>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div class="half-seperate"></div>
                </div>
                <div class="card">
                    <div class="row">
                        <div class="col-xs-12">
                            <a href="tel:02149135 021 " class="btn btn-success btn-block">
                                <i class="fa fa-phone width-auto"></i>
                                شماره تماس:    49135 021
                            </a>
                        </div>
                    </div>
                    <div class="seperate"></div>
                    <div class="seperate"></div>
                    <p class="text-info">مشخصات</p>
                    <div class="pull-left">
                        <price-analyse :price-analyse-id="details.price_analyse" class="margin-left-20"></price-analyse>
                        <div class="seperate"></div>
                        <div class="seperate"></div>
                        <a v-bind:href=" '/estate/comparison/' + details.code" class="comparison-btn" target="_blank">
                            <i class="fa fa-balance-scale width-20"></i>
                            مقایسه
                        </a>
                        <div class="seperate"></div>
                        <a href="/calculate/price" target="_blank" class="btn btn-info btn-xs">
                            کارشناسی
                            <div class="one-third-seperate"></div>
                            
                             قیمت
                        </a>
                        
                    </div>
                    <ul class="list-group-details">
                        <li>
                            <i class="fa fa-bookmark"></i>
                            <span>{{ details.title }}</span>
                        </li>
                        <li>
                            <i class="fa fa-calendar-check-o"></i>
                            <span v-if="details.estate_age != 0">سن بنا: {{ details.estate_age }} سال ساخت</span>
                            <span v-else="details.estate_age != 0">سن بنا: نوساز</span>
                        </li>
                        <li>
                            <i class="fa fa-map-marker"></i>
                            <span>محدوده: {{ details.address }} </span>
                        </li>
                        <li>
                            <i class="fa fa-expand"></i>
                            <span>زیر بنا: {{ details.foundation }} متر</span>
                        </li>
                        <li>
                            <i class="fa fa-bed"></i>
                            <span>تعداد اتاق: {{ details.rooms }} اتاق</span>
                        </li>
                        <li>
                            <i class="fa fa-building-o"></i>
                            <span>تعداد طبقات ساختمان: {{ details.building_floors }} طبقه</span>
                        </li>
                        <li>
                            <i class="fa fa-home"></i>
                            <span>تعداد واحد هر طبقه: {{ details.floor_units }} واحد</span>
                        </li>
                        <li>
                            <i class="fa fa-home"></i>
                            <span>طبقه واحد ملک: طبقه {{ details.estate_floor }}</span>
                        </li>
                        <li>
                            <i class="fa fa-hourglass-start"></i>
                            <span>زمان به روز رسانی: {{ details.be_rooz_resani }}</span>
                        </li>
                    </ul>
                    <hr>
                    <div class="panel">
                        <p class="text-info">امکانات</p>
                        <p>{{ details.features }}</p>
                    </div>
                    <button class="btn btn-default btn-block" v-on:click="share(details)" data-toggle="modal" data-target="#share-modal">
                        اشتراک گذاری ملک
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="touchable-panel">
    <div id="map"></div>
    <div class="mobile-menu-panel visible-xs" id="mobile_content">
        <div class="bottom-menu-mobile" id="handle">
            <div class="container">
                <div class="row">
                    <div v-bind:class="[activeMenu == '' ? 'active-color' : '', 'draw col-xs-4']">
                        <div id="openListMobile"><i class="fa fa-list"></i>لیست املاک</div>
                    </div>
                    <div v-bind:class="[activeMenu == 'register' ? 'active-color' : '', 'draw col-xs-4 register-important']">
                        <div id="openResgister"><i class="fa fa-plus"></i>سپردن ملک</div>
                    </div>
                    <div v-bind:class="[activeMenu == '' ? 'active-color' : '', 'draw col-xs-4 item-melkhae-man']">
                        <div class="menu-melkhae-man-click" id="openMelkaeMan"><i class="fa fa-home"></i>ملک های من</div>
                        <div class="menu-melkhae-man" v-if="melkhaeman == true">
                            <div>
                                <ul>
                                    <li v-on:click="getEstatesType('seen_estates')">
                                        <span>دیده ام</span>
                                        <i class="fa fa-eye"></i>
                                    </li>
                                    <li v-on:click="getEstatesType('new_estates')">
                                        <span>جدیدها</span>
                                        <i class="fa fa-clock-o"></i>
                                    </li>
                                    <li v-on:click="getEstatesType('favorite_estates')">
                                        <span>پسندیدم</span>
                                        <i class="fa fa-heart"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-list-mobile" id="estate_list_mobile">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12" v-if="!loading && estateList.length == 0">
                        <span class="margin-right-left"> ملکی یافت نشد! </span>
                    </div>
                    <p class="page-header text-center big-size bold" v-if="activeMenu == 'favorite_estates'">
                        ملک های مورد علاقه     
                    </p>
                    <p class="page-header text-center big-size bold" v-if="activeMenu == 'seen_estates'">
                        ملک های دیده شده     
                    </p>
                    <p class="page-header text-center big-size bold" v-if="activeMenu == 'new_estates'">
                        ملک های جدید     
                    </p>
                    <div class="col-xs-12" v-for="estate in estateList">
                        <detail-estate :estate="estate" 
                            @pass-tour-code="motherPassTourCode"
                            @pass-comparison-count="motherPassComparisonCount"
                            @pass-message="motherPassMessage"></detail-estate>
                    </div>
                    <div v-if="loadingMore">
                        <div class="seperate"></div>
                        <div class="seperate"></div>
                        <loading></loading>
                        <div class="seperate"></div>
                        <div class="seperate"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="download-app" v-if="downloadAppBox">
    <p class="text-center">
        دانلود اپلیکیشن:
    </p>
    <a href="https://new.sibapp.com/applications/melkana" target="_blank" style="direction: ltr;">
        <img src="https://www.melkana.com/images/sibapp.png" width="120px;">
    </a>
    <a href="https://play.google.com/store/apps/details?id=com.melkana.android" target="_blank" style="direction: ltr;">
        <img src="https://www.melkana.com/images/googleplay.png" width="120px;">
    </a>
    <a href="https://cafebazaar.ir/app/com.melkana.android/?l=fa" target="_blank" style="direction: ltr;">
        <img src="https://www.melkana.com/images/bazzar.png" width="120px;">
    </a>
    <a class="btn btn-danger btn-xs btn-block" href="javascript::void(0)" v-on:click="downloadAppBox = false">
        <i class="fa fa-close"></i>
    </a>
</div>
<div class="modal fade" id="share-modal" role="dialog">
    <div class="modal-dialog margin-top-100 text-center">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">لینک اشتراک ملک:</h4>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control ltr" v-model="shareLink">
                <div class="half-seperate"></div>
                <p>
                    اشتراک گذاری در:
                    <button class="btn btn-default" v-on:click="shareTelegram()">
                        <i class="fa fa-telegram text-primary"></i>
                    </button>
                    <button class="btn btn-default" v-on:click="shareFacebook()">
                        <i class="fa fa-facebook"></i>
                    </button>
                    <button class="btn btn-default" v-on:click="shareTwitter()">
                        <i class="fa fa-twitter"></i>
                    </button>
                </p>
                <div class="seperate"></div>
                <button type="button" class="btn btn-default" data-dismiss="modal">بستن</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="share-filter-modal" role="dialog">
    <div class="modal-dialog margin-top-100 text-center">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">لینک اشتراک نقشه کنونی:</h4>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control ltr" v-model="shortUrl">
                <div class="half-seperate"></div>
                <p>
                    اشتراک گذاری در:
                    <button class="btn btn-default" v-on:click="shareFilterTelegram()">
                        <i class="fa fa-telegram text-primary"></i>
                    </button>
                    <button class="btn btn-default" v-on:click="shareFilterFacebook()">
                        <i class="fa fa-facebook"></i>
                    </button>
                    <button class="btn btn-default" v-on:click="shareFilterTwitter()">
                        <i class="fa fa-twitter"></i>
                    </button>
                </p>
                <div class="seperate"></div>
                <button type="button" class="btn btn-default" data-dismiss="modal">بستن</button>
            </div>
        </div>
    </div>
</div>

<div id="login-modal" class="modal fade" role="dialog">
    <div class="modal-dialog margin-top-200">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">ورود کاربران</h4>
            </div>
            <div class="modal-body">
                <div class="panel-body" v-if="panelState == 'login'"> 
                    <div v-if="message">
                        {{ message }} 
                        <br>
                    </div>
                    <label>شماره همراه:</label>
                    <input type="text" v-model="mobile" class="form-control" min="11" max="11"
                        placeholder="09120000000">
                    <div class="seperate"></div>
                    <button v-on:click="sendActivationCode()" class="btn-block btn btn-primary">ارسال کد فعالسازی</button>
                </div>

                <div class="panel-body" v-if="panelState == 'activationCode'"> 
                    {{ message }} 
                    <a href="javascript:void(0)" v-on:click="panelState = 'login'">تغییر شماره همراه</a>
                    <br>
                    <br>
                    <label>کد فعال سازی:</label>
                    <input type="text" v-model="activationCode" placeholder="xxxx" class="form-control">
                    <div class="seperate"></div>
                    <loading v-if="loading"></loading>
                    <button v-on:click="login()" class="btn-block btn btn-success">ورود</button>
                </div>

                <div class="panel-body" v-if="panelState == 'enteredToSite'"> 
                    {{ message }}
                    <div class="seperate"></div>
                    <button type="button" class="btn btn-default" data-dismiss="modal">بستن</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="comparison-modal" v-if="totalComparisonCount > 0">
    <span class="clear-comparison-list" v-on:click="clearComparisonList()">
        <i class="fa fa-close"></i>
    </span>
    <a href="/estate/comparison" target="_blank">
        <i class="fa fa-balance-scale width-20"></i>
        مقایسه {{ totalComparisonCount }} مورد
    </a>
</div>
<div class="map-my-location-div" v-if="!initLoading">
    <a v-on:click="setGeoLocation()" data-toggle="tooltip" data-placement="top" title="موقعیت شما روی نقشه!">
        <img src="/images/location.png" alt="لوکیشن یاب"/>
    </a>
</div>
<div id="snackbar">{{ totalCount }} ملک یافت شد.</div>
<div id="snackbar2">{{ message }} </div>
</div>
	`,
    props: {
        userIdProp: {
            required: true,
            type: Number,
        },
        code: {
            required: true,
            type: Number
        },
        shareFilterUrl: {
            type: String,
        },
    },
    data: function () {
        return {
            userId: null,

            loading: true,
            loadingMore: false,
            initLoading: true,

            totalCount: null,
            totalCountLoadMore: 1,
            totalComparisonCount: 0,

            downloadAppBox: false,
            filterItems: [],
            estateMap: [],
            estateMapInit: [],
            estateList: [],
            favoriteEstatesMap: [],
            seenEstatesMap: [],
            newEstatesMap: [],

            globalMap: null,
            globalMarker: null,
            globalMarkersInit: null,
            globalMarkerCluster: null,
            globalMarkerTypeEstates: [],
            globalMarkerTypeCluster: null,
            globalOms: null,
            globalMarkersCreated: false,

            clearPlaceDisplay: false,
            details: null,
            listState: '',
            activeMenu: 'estate_list',
            activeMenuOld: '',
            selectedMarker: null,
            mobile: '',
            panelState: 'login',
            activationCode: '',
            message: '',
            listIsNoTour: 0,
            shortUrl: '',
            shareFilterLoading: false,
            boundryLoading: false,
            notificationLoading: false,
            loadListThread: null,
            estateIdSearch: null,
            isSorting: false,
            isSelectingMarker: false,
            advancedSearch: true,
            menuMobile: false,
            isMobile: false,
            melkhaeman: false,
            delayCheckBoundry: 500,
            searchBox: null,
            backPosition: 0,
            shareLink: '',
            shareInfo: '',
            showAllClusters: false,

            options: {
                'prices': [0, 50, 100, 150, 200, 300, 500, 750, 1000, 3000],
                'rahns': [0, 10, 20, 30, 50, 100, 200, 300, 500, 1000],
                'price_rents': [0, 200000, 500000, 700000, 1000000, 1500000, 2500000, 4000000, 6000000, 10000000],
                'foundations': [0, 50, 75, 100, 125, 150, 200, 250, 300, 500, 1000, 3000],
                'sorts': [
                    {'title': 'جدیدترین ها', 'model': 'approve_time', 'order': 'desc'},
                    {'title': 'قدیمی ترین ها', 'model': 'approve_time', 'order': 'asc'},
                    {'title': 'ارزانترین', 'model': 'price', 'order': 'asc'},
                    {'title': 'گرانترین', 'model': 'price', 'order': 'desc'},
                    {'title': 'ارزانترین قیمت متری', 'model': 'unit_price', 'order': 'asc'},
                    {'title': 'گرانترین قیمت متری', 'model': 'unit_price', 'order': 'desc'},
                    {'title': 'بزرگترین', 'model': 'foundation', 'order': 'desc'},
                    {'title': 'کوچکترین', 'model': 'foundation', 'order': 'asc'},
                ],
            },
            filters: {
                'sort': {'title': 'جدیدترین ها', 'model': 'approve_time', 'order': 'desc'},
                'deal_type': 0,
                'has_tour': 2,
                'estate_type': 2,
                'estate_document': 2,
                'features': null,
                'center': null,
                'zoom': null,
                'foundation':
                    {
                        'min': null,
                        'max': null,
                        'minRange': null,
                        'maxRange': null,
                    },
                'price_rent':
                    {
                        'min': null,
                        'max': null,
                        'minRange': null,
                        'maxRange': null,
                    },
                'rahn':
                    {
                        'min': null,
                        'max': null,
                        'minRange': null,
                        'maxRange': null,
                    },
                'price':
                    {
                        'min': null,
                        'max': null,
                        'minRange': null,
                        'maxRange': null,
                    },
                'estate_age':
                    {
                        'min': 0,
                        'max': 40, //10
                        'minRange': 0,
                        'maxRange': 40,
                    },
                'rooms':
                    {
                        'min': 0, //1
                        'max': 5, //3
                        'minRange': 0,
                        'maxRange': 5,
                    },
                'estate_floor':
                    {
                        'min': -1, //0
                        'max': 20, //5
                        'minRange': -1,
                        'maxRange': 20,
                    },
                'building_floors':
                    {
                        'min': 1,
                        'max': 20, //10
                        'minRange': 1,
                        'maxRange': 20,
                    },
                'floor_units':
                    {
                        'min': 1,
                        'max': 10, //6
                        'minRange': 1,
                        'maxRange': 10,
                    },
                'leftBottom': {lat: 35.618897, lng: 51.208672},
                'rightTop': {lat: 51.523463, lng: 35.792511},
                'lastLeftBottom': {lat: 35.618897, lng: 51.208672},
                'lastRightTop': {lat: 51.523463, lng: 35.792511},
            },
            mapOptions: {
                zoom: 12,
                minZoom: 9,
                maxZoom: 16,
                center: new google.maps.LatLng(35.728442, 51.438753),
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                clickableIcons: false,
                fullscreenControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                gestureHandling: "greedy",
            },
            markerClusterOptions: {
                gridSize: 46,
                maxZoom: 15,
                zoomOnClick: true,
                styles: [
                    {
                        textColor: 'white',
                        textSize: '13',
                        url: '/images/cluster1.png',
                        height: 39,
                        width: 39
                    },
                    {
                        textColor: 'white',
                        textSize: '14',
                        url: '/images/cluster2.png',
                        height: 41,
                        width: 41
                    },
                    {
                        textColor: 'white',
                        textSize: '15',
                        url: '/images/cluster3.png',
                        height: 44,
                        width: 44
                    }
                ],
                ignoreHidden: true
            },
            registerForm: {
                'name': '',
                'tell': '',
                'price': '',
                'foundation': '',
                'city': '',
                'address': '',
                'estate_age': '',
                'estate_type': '',
                'description': '',
                'data': '',
            },
        }
    },
    methods: {
        checkMobileFunctions: function () {
            if (document.body.offsetWidth < 576) {
                this.isMobile = true;
                // this.downloadAppBox = true; // bad ke app o zadim in o true konim
                this.touchMobile();
                this.mapOptions.zoom = 11;
                this.mapOptions.center = new google.maps.LatLng(35.688442, 51.403753);
                this.markerClusterOptions.gridSize = 42;
                this.activeMenu = '';
                this.delayCheckBoundry = 700;
            } else {
                this.delayCheckBoundry = 300;
                this.isMobile = false;
            }
        },
        initialMapBase: function () {
            const element = document.getElementById('map');
            this.globalMap = new google.maps.Map(element, this.mapOptions);
        },
        fetchData: function () {
            axios.get('/map/init')
                .then(response => {
                    this.loading = false;
                    if (response.data.status == 'success') {
                        this.estateMap = response.data.estate_map;
                        this.estateList = response.data.estate_list;
                        this.filters.features = response.data.features;
                        this.totalCount = response.data.total_count;
                        this.initMap();
                        this.notification();
                    } else {
                        this.reportError(response.data);
                    }
                })
                .catch(e => {
                    this.reportError(e);
                });
        },
        initMap: function () {
            globalThiss = this;
            // check boundries
            this.globalMap.addListener('bounds_changed', function () {
                globalThiss.loadEstatesListTrigger();
                return;
            });

            // search box
            var input = document.getElementById('pac-input');
            this.searchBox = new google.maps.places.SearchBox(input);

            google.maps.event.addListener(globalThiss.searchBox, 'places_changed', function () {
                globalThis.clearPlaceDisplay = true;
                var places = globalThiss.searchBox.getPlaces();
                if (places.length == 0) {
                    return;
                }
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0, place; place = places[i]; i++) {
                    bounds.extend(place.geometry.location);
                }
                globalThiss.globalMap.fitBounds(bounds);
                boundZoom = globalThiss.globalMap.getZoom();
                if (globalThiss.isMobile) {
                    globalThiss.globalMap.setZoom(boundZoom - 2);
                } else {
                    globalThiss.globalMap.setZoom(boundZoom - 1);
                }
            });

            // package abdolvand
            this.globalOms = new OverlappingMarkerSpiderfier(this.globalMap, {
                markersWontMove: true,
                markersWontHide: true,
                basicFormatEvents: true,
                keepSpiderfie: true,
                nearbyDistance: 70,
                circleFootSeparation: 55,
                spiralLengthFactor: 20,
                legWeight: 0,
                keepSpiderfied: true,
            });

            this.createMarkerCluster();
            this.checkInits();
        },

        createMarkerCluster: function () {
            var globalThis = this;
            // var labels = ['', 'like', 'dislike', 'seen', 'new'];
            if (globalThis.globalMap.getZoom() >= 16) {
                this.globalMarkers = this.estateMap.map(function (item, i) {
                    var marker = new google.maps.Marker({
                        position: item,
                        icon: "/images/p" + item.type + ".png",
                        // title: labels[item.type],
                        code: item.code,
                    });

                    globalThis.globalOms.addMarker(marker);
                    google.maps.event.addListener(marker, 'click', function (evt) {
                        globalThis.details = null;
                        globalThis.loading = true;
                        axios.get('/map/estate/' + item.code)
                            .then(response => {
                                if (response.data.status == 'success') {
                                    globalThis.loading = false;
                                    globalThis.details = response.data.details;
                                    globalThis.selectMarker(marker);
                                } else {
                                    this.reportError(response.data);
                                }
                            });
                    });

                    return marker;
                });
            } else {
                this.globalMarkers = this.estateMap.map(function (item, i) {
                    var marker = new google.maps.Marker({
                        position: item,
                        icon: "/images/p" + item.type + ".png",
                        code: item.code,
                    });

                    google.maps.event.addListener(marker, 'click', function (evt) {
                        globalThis.details = null;
                        globalThis.loading = true;
                        axios.get('/map/estate/' + item.code)
                            .then(response => {
                                if (response.data.status == 'success') {
                                    globalThis.loading = false;
                                    globalThis.details = response.data.details;
                                    globalThis.selectMarker(marker);
                                } else {
                                    this.reportError(response.data);
                                }
                            });
                    });

                    return marker;
                });
                if (!this.globalMarkersInit) {
                    this.globalMarkersInit = this.globalMarkers;
                    this.estateMapInit = this.estateMap;
                }
                this.globalMarkerCluster = new MarkerClusterer(this.globalMap, this.globalMarkers,
                    this.markerClusterOptions);
            }
        },
        selectMarker: function (marker) {
            this.activeMenu = 'estate_details';
            globalThis = this;
            setInterval(function () {
                globalThis.backPosition += 2;
            }, 100);
            if (this.selectedMarker) {
                this.selectedMarker.setIcon({
                    url: "/images/p3.png",
                });
            }

            iconSelected = {
                url: "/images/p-select.png",
            };
            marker.setIcon(iconSelected);
            this.selectedMarker = marker;
            this.isSelectingMarker = true;
            globalThis.globalMap.setCenter(marker.getPosition());
            setTimeout(function () {
                globalThis.isSelectingMarker = false;
            }, 100);
        },
        selectMarkerSearched: function (marker) {
            this.activeMenu = 'estate_details';
            setInterval(function () {
                globalThis.backPosition += 2;
            }, 100);
            if (marker) {
                globalThis.globalMap.setCenter(marker.getPosition());
                globalThis.globalMap.setZoom(16);
                if (this.estateIdSearch) {
                    this.estateMap = this.estateMapInit;
                }
                this.cleareAllMarkers();
                this.createMarkerCluster();

                this.globalMarkers.forEach(function (item, index) {
                    if (parseInt(item.code) == globalThis.details.code) {
                        globalThis.selectedMarkerSearchCode = item;
                        return;
                    }
                });

                if (this.selectedMarkerSearchCode) {
                    this.selectedMarkerSearchCode.setIcon({
                        url: "/images/p3.png",
                    });
                }
                globalThis.selectedMarkerSearchCode.setIcon({
                    url: "/images/p-select.png",
                });
                this.isSelectingMarker = true;
                setTimeout(function () {
                    globalThis.isSelectingMarker = false;
                }, 100);
            }
            else {
            }
        },

        setAllMarkers: function () {
            this.activeMenu = 'estate_list';
            if (this.isMobile) {
                this.activeMenu = '';
            }
            this.listState = '';
            this.showAllClusters = false;
            this.loadEstatesList();
        },
        cleareAllMarkers: function () {
            this.globalMarkerCluster.clearMarkers();
            this.globalOms.clearMarkers();
            if (this.globalMarkerTypeCluster) {
                this.globalMarkerTypeCluster.clearMarkers();
            }
            // if(this.globalMarkerTypeEstates.length != 0)
            // {
            //     for (var i = 0; i < this.globalMarkerTypeEstates.length; i++) {
            //         this.globalMarkerTypeEstates[i].setMap(null);
            //     }
            // }
        },
        setMarkers: function (typeEstatesMap, type) {
            globalThis = this;
            this.cleareAllMarkers();

            if (type == 'favorite_estates') {
                icon = "/images/p1.png";
            } else if (type == 'seen_estates') {
                icon = "/images/p3.png";
            } else if (type == 'new_estates') {
                icon = "/images/p4.png";
            }
            this.globalMarkerTypeEstates = typeEstatesMap.map(function (item, i) {
                var marker = new google.maps.Marker({
                    position: item,
                    icon: icon,
                });
                google.maps.event.addListener(marker, 'click', function (evt) {
                    globalThis.details = null;
                    globalThis.loading = true;
                    axios.get('/map/estate/' + item.code)
                        .then(response => {
                            if (response.data.status == 'success') {
                                globalThis.details = response.data.details;
                                globalThis.loading = false;
                                globalThis.selectMarker(marker);
                            } else {
                                this.reportError(response.data);
                            }
                        });
                });

                return marker;
            });

            for (var i = 0; i < this.globalMarkerTypeEstates.length; i++) {
                this.globalMarkerTypeEstates[i].setMap(this.globalMap);
            }
            this.globalMarkerTypeCluster = new MarkerClusterer(this.globalMap, this.globalMarkerTypeEstates,
                this.markerClusterOptions);
            this.showAllClusters = true;
        },
        loadEstatesListTrigger: function () {
            if (this.isSelectingMarker) {
                return false;
            }
            globalThiss = this;
            clearTimeout(globalThiss.loadListThread);

            globalThiss.loadListThread = setTimeout(function () {
                globalThiss.loadEstatesList();
            }, this.delayCheckBoundry);
        },
        loadEstatesList: function () {
            if (this.initLoading || this.loading) {
                return false;
            }
            this.loading = true;
            this.updateBoundries();
            axios.post('/map/boundries', {
                leftBottom: this.filters.leftBottom,
                rightTop: this.filters.rightTop,
                listState: this.listState,
                filters: this.filters
            })
                .then(response => {
                    if (response.data.status == 'success') {
                        this.estateMap = response.data.estate_map;
                        this.cleareAllMarkers();
                        this.createMarkerCluster();

                        this.totalCount = response.data.total_count;
                        this.notification();
                        this.estateList = response.data.estate_list;
                        this.listIsNoTour = 0;
                        this.loading = false;
                        if (this.estateList.length < 4) {
                            this.loadMore();
                        }
                        if (this.isMobile) {
                            document.getElementById('estate_list_mobile').scrollTop = 0;
                        } else {
                            document.getElementById('estate_list').scrollTop = 0;
                        }
                    } else {
                        this.reportError(response.data);
                    }
                })
                .catch(e => {
                    // this.reportError(e);
                });
        },
        updateBoundries: function () {
            bounds = this.globalMap.getBounds();
            this.filters.leftBottom = {lat: bounds.f.b, lng: bounds.b.b};
            this.filters.rightTop = {lat: bounds.f.f, lng: bounds.b.f};
        },
        getEstatesType: function (type) {
            this.menuMobile = false;
            if (type == 'favorite_estates') {
                if (this.userId == 0) {
                    $("#login-modal").modal();
                    return false;
                }
            }
            this.loading = true;
            if (this.activeMenu != type) {
                this.activeMenu = type;
                this.estateList = [];
                this.listState = type;
                if (type == 'favorite_estates') {
                    this.favoriteEstatesMap = [];
                } else if (type == 'seen_estates') {
                    this.seenEstatesMap = [];
                } else if (type == 'new_estates') {
                    this.newEstatesMap = [];
                }
            }
            if (this.isMobile == true) {
                this.activeMenu = '';
            }
            axios.post('/map/type_estates/' + type, {
                filters: this.filters,
            })
                .then(response => {
                    if (response.data.status == 'success') {
                        this.loading = false;
                        this.estateList = response.data.type_estates_list;
                        this.totalCount = response.data.total_count;
                        this.notification();

                        if (type == 'favorite_estates') {
                            this.favoriteEstatesMap = response.data.type_estates_map;
                        } else if (type == 'seen_estates') {
                            this.seenEstatesMap = response.data.type_estates_map;
                        } else if (type == 'new_estates') {
                            this.newEstatesMap = response.data.type_estates_map;
                        }
                        this.setMarkers(response.data.type_estates_map, type);
                    } else {
                        this.reportError(response.data);
                    }
                });
        },
        searchPlace: function () {
            var places = this.searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
                bounds.extend(place.geometry.location);
            }
            globalThiss.globalMap.fitBounds(bounds);
            boundZoom = globalThiss.globalMap.getZoom();
            if (globalThiss.isMobile) {
                globalThiss.globalMap.setZoom(boundZoom - 2);
            } else {
                globalThiss.globalMap.setZoom(boundZoom - 1);
            }
        },
        checkLoadMore: function () {
            globalThis = this;
            document.addEventListener('scroll', function (event) {
                if (event.target.id == 'estate_list') {
                    height = $('#estate_list')[0].scrollHeight;
                    scroll = $('#estate_list').scrollTop();
                    if (height > 2000) {
                        if (scroll > (height * 0.4)) {
                            globalThis.loadMore();
                        }
                    } else {
                        if (scroll > (height * 0.2)) {
                            globalThis.loadMore();
                        }
                    }
                }
                if (event.target.id == 'estate_list_mobile') {
                    height = $('#estate_list_mobile')[0].scrollHeight;
                    scroll = $('#estate_list_mobile').scrollTop();
                    if (height > 2000) {
                        if (scroll > (height * 0.4)) {
                            globalThis.loadMore();
                        }
                    } else {
                        if (scroll > (height * 0.2)) {
                            globalThis.loadMore();
                        }
                    }
                }
            }, true);
        },
        loadMore: function () {
            if (this.loadingMore) {
                return false;
            }
            this.updateBoundries();

            if (this.filters.lastLeftBottom.lat != this.filters.leftBottom.lat) {
                this.filters.lastLeftBottom = this.filters.leftBottom;
                this.filters.lastRightTop = this.filters.rightTop;
            } else {
                if (this.totalCountLoadMore == 0) {
                    return false;
                }
            }
            this.loadingMore = true;
            if (this.estateList.length > 0) {
                var lastItem = this.estateList[this.estateList.length - 1];
            } else {
                // in bakhsh o bayad rosh fek konim ke age ye bar estatelist khali bashe chikar konim
                var lastItem = {
                    'id': 15000,
                    'price': 200000000,
                    'unit_price': 7,
                    'foundation': 100,
                    'approve_time': '2018-05-03 16:32:32',
                };
            }
            axios.post('/map/load-more', {
                filters: this.filters,
                lastItem: lastItem,
                listState: this.listState,
                list_is_no_tour: this.listIsNoTour
            })
                .then(response => {
                    if (response.data.status == 'success') {
                        this.estateList = this.estateList.concat(response.data.estate_list);
                        this.totalCountLoadMore = response.data.total_count;
                        this.listIsNoTour = response.data.list_is_no_tour;
                    } else {
                        this.reportError(response.data);
                    }
                    this.loadingMore = false;
                })
                .catch(e => {
                    this.reportError(e);
                    globalThis = this;
                    setTimeout(function () {
                        globalThis.loadingMore = false;
                    }, 2000);
                });
        },

        changeMenuStatus: function () {
            if (this.activeMenu != '') {
                this.activeMenuOld = this.activeMenu;
                this.activeMenu = '';
            } else {
                this.activeMenu = this.activeMenuOld;
            }
            if (this.activeMenu == 'filter') {
                this.fillFilters();
            }
            this.changeMapSize();
        },
        changeMapSize: function () {
            if (this.isMobile) {
                return false;
            }
            if (this.activeMenu == '') {
                $("#map").css({right: 0, width: "100%"});
            } else {
                $("#map").css({right: "400px", width: ""});
            }
        },
        fillFiltersMobile: function () {
            this.activeMenu = 'filter';
            this.fillFilters();
        },
        closeMenu: function (item) {
            if (item == 'close') {
                this.menuMobile = !this.menuMobile;
            } else {
                this.menuMobile = false;
                this.activeMenu = item;
                if (item == 'filter') {
                    this.fillFilters();
                }
            }
        },
        clearPlace: function () {
            document.getElementById('pac-input').value = null;
            this.clearPlaceDisplay = false;
        },
        focusDistrict: function () {
            if (!this.isMobile) {
                this.activeMenu = 'filter';
            }
        },
        activeMenuListEstate: function () {
            this.activeMenu = 'estate_list';
            this.listState = '';
        },
        search: function () {
            if (this.loading) {
                return false;
            }
            this.updateBoundries();
            if (!this.isSorting) {
                this.estateMap = [];
                this.cleareAllMarkers();
            }
            this.estateList = [];
            this.loading = true;
            axios.post('/map/search', {filters: this.filters, listState: this.listState})
                .then(response => {
                    if (response.data.status == 'success') {
                        this.estateList = response.data.estate_list;
                        this.totalCount = response.data.total_count;
                        this.totalCountLoadMore = this.totalCount;
                        if (!this.isSorting) {
                            this.estateMap = response.data.estate_map;
                            this.createMarkerCluster();
                            this.notification();
                            if (this.isMobile) {
                                this.activeMenu = '';
                            } else {
                                this.activeMenu = 'estate_list';
                            }
                        }
                        this.filterItems = response.data.filter_items;
                        this.loading = false;
                        this.isSorting = false;
                        if (this.estateList.length < 4) {
                            this.loadMore();
                        }
                        if (this.isMobile) {
                            document.getElementById('estate_list_mobile').scrollTop = 0;
                        } else {
                            document.getElementById('estate_list').scrollTop = 0;
                        }
                        if (this.initLoading) {
                            this.checkUrlCode();
                        }
                    } else {
                        this.reportError(response.data);
                    }
                })
                .catch(e => {
                    this.reportError(e);
                });
        },
        searchWithSort: function () {
            this.isSorting = true;
            this.search();
        },
        motherPassTourCode: function (code) {
            this.filters.center = this.globalMap.getCenter();
            this.filters.zoom = this.globalMap.getZoom();
            var filters_json = JSON.stringify(this.filters);
            var d = new Date();
            d.setTime(d.getTime() + (15 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = 'filters_json' + "=" + filters_json + ";" + expires + ";path=/";
            // document.cookie = "filters_json=filters_json Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
            window.location.assign('/estate/' + code);
        },
        checkInits: function () {
            this.checkShareFilter();
            this.checkCookieInit();
            globalThis = this;
            setTimeout(function () {
                globalThis.initLoading = false;
            }, 1000);
        },
        checkCookieInit: function () {
            var filters = this.getCookie('filters_json');
            if (filters) {
                filters = JSON.parse(filters);
                this.filters = filters;
                this.globalMap.setCenter(filters.center);
                this.globalMap.setZoom(filters.zoom);
                this.search();

                document.cookie = "filters_json=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            } else {
                this.checkUrlCode();
            }
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        checkShareFilter: function () {
            if (this.shareFilterUrl != 'a' && !this.shareFilterLoading) {
                this.shareFilterLoading = true;
                globalThis = this;
                setTimeout(function () {
                    globalThis.getFilterShareItems();
                }, 500);
            }
        },
        getFilterShareItems: function () {
            axios.get('/map/short_url/' + this.shareFilterUrl)
                .then(response => {
                    this.loading = false;
                    if (response.data.status == 'success') {
                        this.filters = response.data.filters;
                        this.globalMap.setCenter(this.filters.center);
                        this.globalMap.setZoom(this.filters.zoom);
                        this.search();
                    } else {
                        this.reportError(response.data);
                    }
                    this.message = response.data.message;
                })
                .catch(e => {
                    this.reportError(e);
                });
        },
        searchCode: function () {
            globalThis = this;
            this.selectedMarkerSearchCode = null;
            this.globalMarkersInit.forEach(function (item, index) {
                if (parseInt(item.code) == globalThis.estateIdSearch) {
                    globalThis.selectedMarkerSearchCode = item;
                    return;
                }
            });
            this.details = null;
            this.loading = true;
            axios.get('/map/estate/' + this.estateIdSearch)
                .then(response => {
                    if (response.data.status == 'success') {
                        this.loading = false;
                        this.details = response.data.details;
                        this.selectMarkerSearched(this.selectedMarkerSearchCode);
                    } else {
                        this.reportError(response.data);
                        this.loading = false;
                    }
                });
        },
        checkUrlCode: function () {
            if (this.code != 0) {
                this.loading = true;
                axios.get('/map/estate/' + this.code)
                    .then(response => {
                        if (response.data.status == 'success') {
                            this.loading = false;
                            this.details = response.data.details;
                            globalThis = this;
                            this.globalMarkers.forEach(function (item, index) {
                                if (parseInt(item.code) == globalThis.details.code) {
                                    globalThis.selectedMarkerSearchCode = item;
                                    return;
                                }
                            });
                            globalThis.globalOms.addMarker(globalThis.selectedMarkerSearchCode);
                            this.selectMarkerSearched(globalThis.selectedMarkerSearchCode);
                        } else {
                            this.reportError(response.data);
                        }
                    });
            }
        },
        setGeoLocation: function () {
            if (navigator.geolocation) {
                globalThis = this;
                navigator.geolocation.getCurrentPosition(function (position) {
                    geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var marker = new google.maps.Marker({
                        position: geolocate,
                        title: 'موقعیت فعلی شما',
                        icon: '/images/mylocation.png'
                    });
                    location_marker = marker;
                    location_marker.setMap(globalThis.globalMap);
                    globalThis.globalMap.setCenter(geolocate);
                    globalThis.globalMap.setZoom(16);
                });
            }
            else {
                alert('خطا در مکان یابی');
            }
        },
        removeFilter: function (filterModel) {
            if (filterModel == 'estate_type') {
                this.filters[filterModel] = 2;
            } else if (filterModel == 'estate_document') {
                this.filters[filterModel] = 2;
            } else if (filterModel == 'feature-1') {
                this.filters['features'][0]['status'] = false;
            } else if (filterModel == 'feature-2') {
                this.filters['features'][1]['status'] = false;
            } else if (filterModel == 'feature-3') {
                this.filters['features'][2]['status'] = false;
            } else if (filterModel == 'feature-4') {
                this.filters['features'][3]['status'] = false;
            } else {
                this.filters[filterModel]['min'] = this.filters[filterModel]['minRange'];
                this.filters[filterModel]['max'] = this.filters[filterModel]['maxRange'];
            }
            this.search();
        },
        changeAdvancedSearch: function () {
            this.advancedSearch = !this.advancedSearch;
        },
        fillFilters: function () {
            var vueThis = this;
            setTimeout(function () {
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
            }, 100);
        },

        translate: function (item, word) {
            word = ' ' + word;
            var output = '';
            if (word == ' طبقه ') {
                var transMin = item.min == 0 ? 'همکف' : item.min;
                var transMax = item.max == 0 ? 'همکف' : item.max;
                if (item.min == item.max)
                    output = word + transMin;
                else if (item.min == item.minRange && item.max == item.maxRange)
                    output = 'همه موارد';
                else if (item.min == item.minRange)
                    output = 'پایین تر از ' + word + transMax;
                else if (item.max == item.maxRange)
                    output = 'بالاتر از ' + word + transMin;
                else if (item.min != item.max)
                    output = 'بین ' + word + transMin + ' الی ' + transMax;

                return output;
            }
            if (item.min == item.max)
                output = item.min + word;
            else if (item.min == item.minRange && item.max == item.maxRange)
                output = 'همه موارد';
            else if (item.min == item.minRange)
                output = 'کمتر از ' + item.max + word;
            else if (item.max == item.maxRange)
                output = 'بیشتر از ' + item.min + word;
            else if (item.min != item.max)
                output = 'بین ' + item.min + ' الی ' + item.max + word;

            return output;
        },

        share: function (details) {
            this.shareLink = 'https://melkana.com/' + details.code;
            this.shareInfo = encodeURI('نوع ملک: ' + details.title + '\n '
                + 'زیربنا: ' + details.foundation + 'متر' + '\n '
                + 'نوع معامله: ' + 'فروشی' + '\n '
                + 'برای مشاهده تور مجازی و اطلاعات بیشتر به لینک بالا مراجعه نمایید');
        },
        shareTelegram: function () {
            window.open('https://telegram.me/share/url?url=' + this.shareLink + '&text=' + this.shareInfo);
        },
        shareFacebook: function () {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + this.shareLink, 'facebook-share-dialog');
        },
        shareTwitter: function () {
            window.open('https://twitter.com/share?url=' + this.shareLink + '&text=' + this.shareInfo);
        },

        shareFilterTelegram: function () {
            window.open('https://telegram.me/share/url?url=' + this.shortUrl);
        },
        shareFilterFacebook: function () {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + this.shortUrl, 'facebook-share-dialog');
        },
        shareFilterTwitter: function () {
            window.open('https://twitter.com/share?url=' + this.shortUrl);
        },
        shareFilters: function () {
            this.filters.center = this.globalMap.getCenter();
            this.filters.zoom = this.globalMap.getZoom();
            axios.post('/map/short_url', {filters: this.filters})
                .then(response => {
                    if (response.data.status == 'success') {
                        this.shortUrl = response.data.short_url;
                        this.showShareModal();
                    } else {
                        this.reportError(response.data);
                    }
                    this.message = response.data.message;
                })
                .catch(e => {
                    this.reportError(e);
                });
        },
        showShareModal: function () {
            $("#share-filter-modal").modal();
        },
        motherPassComparisonCount: function (value) {
            this.totalComparisonCount = value;
        },
        motherPassMessage: function (value) {
            this.reportError(value);
        },
        clearComparisonList: function () {
            axios.get('/map/comparison/empty/all')
                .then(response => {
                    if (response.data.status == 'success') {
                        this.totalComparisonCount = 0;
                    } else {
                        this.reportError(response.data.message);
                    }
                })
                .catch(e => {
                    this.reportError(e);
                });
        },
        reportError: function (data) {
            if (data.message) {
                this.message = data.message;
                if (data.message == 'Network Error') {
                    this.message = 'خطا در اتصال اینترنت';
                }
            } else {
                this.message = 'خطا رخ داده است.';
            }
            this.notificationError();
            this.loading = false;
        },
        notificationError() {
            globalThis = this;
            if (globalThis.notificationLoading == true) {
                return false;
            }
            globalThis.notificationLoading = true;
            var x = document.getElementById("snackbar2");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
                globalThis.notificationLoading = false;
            }, 3000);
        },
        notification() {
            globalThis = this;
            if (this.notificationLoading == true) {
                return false;
            }
            this.notificationLoading = true;
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
                globalThis.notificationLoading = false;
            }, 5000);
        },
        submitRegisterForm: function () {
            this.registerForm.data = this.registerForm.description
                + '\n , ' + 'شهر: ' + this.registerForm.city
                + '\n , ' + 'قیمت: ' + this.registerForm.price
                + '\n , ' + 'متراژ: ' + this.registerForm.foundation
                + '\n , ' + 'آدرس: ' + this.registerForm.address
                + '\n , ' + 'سن بنا: ' + this.registerForm.estate_age
                + '\n , ' + 'نوع قرارداد: ' + this.registerForm.estate_type;
            // encodeURI(
            this.loading = true;
            axios.post('/map/register', {
                name: this.registerForm.name,
                tell: this.registerForm.tell,
                description: this.registerForm.data
            })
                .then(response => {
                    if (response.data.status == 'success') {
                        this.reportError(response.data);
                        this.activeMenu = '';
                        this.registerForm = {
                            'name': '',
                            'tell': '',
                            'price': '',
                            'foundation': '',
                            'city': 'تهران',
                            'address': '',
                            'estate_age': '',
                            'estate_type': '',
                            'description': '',
                            'data': '',
                        };
                    } else {
                        this.reportError(response.data);
                    }
                    this.loading = false;
                })
                .catch(e => {
                    this.reportError(e);
                });

            return false;
        },
        sendActivationCode: function (type) {
            this.loading = true;
            axios.post('/auth/activation-code', {mobile: this.mobile})
                .then(response => {
                    if (response.data.status == 'success') {
                        this.loadActivationForm();
                    } else {
                        this.loadActivationForm();
                        // this.reportError(response.data);
                    }
                    this.message = response.data.message;
                    this.loading = false;
                })
                .catch(e => {
                    // this.reportError(e);
                });
        },
        login: function (type) {
            this.loading = true;
            axios.post('/auth/login', {activation_code: this.activationCode, mobile: this.mobile})
                .then(response => {
                    if (response.data.status == 'success') {
                        this.userId = response.data.user_id;
                        this.loading = false;
                        this.panelState = 'enteredToSite';
                        this.likeSelectedEstate(this.details);
                        this.getEstatesType('favorite_estates');
                    } else {
                        this.loading = false;
                        this.reportError(response.data);
                    }
                    this.message = response.data.message;
                })
                .catch(e => {
                    this.reportError(e);
                });
        },
        loadActivationForm: function () {
            this.panelState = 'activationCode';
        },
        checkForLikeLogin: function () {
            if (this.userId == 0) {
                $("#login-modal").modal();
                return false;
            }
        },
        likeSelectedEstate: function () {
            if (this.details) {
                // todo har ja ke click karde befahmi ke bade login on melk o likesh koni
            }
        },
        touchMobile: function () {
            globalThis = this;
            var handle = document.getElementById('handle'),
                mobileContent = document.getElementById('mobile_content'),
                openResgister = document.getElementById('openResgister'),
                openMelkaeMan = document.getElementById('openMelkaeMan'),
                openListMobile = document.getElementById('openListMobile'),
                mobileContentTop, cursorTouchStart, cursorDistance = 0,
                touchobj = null,
                top_sensitivity = 180,
                bottom_sensitivity = window.innerHeight - 90,
                fixed_bottom_num = 50;

            let calculatedTopMap = $(document).height() - 290 + 'px';
            mobileContent.style.top = calculatedTopMap;
            $("#map").css({height: calculatedTopMap});

            openMelkaeMan.addEventListener('click', function (e) {
                globalThis.melkhaeman = !globalThis.melkhaeman;
            }, false);

            openResgister.addEventListener('click', function (e) {
                globalThis.activeMenu = 'register';
            }, false);

            openListMobile.addEventListener('click', function (e) {
                mobileContent.style.top = '50px';
            }, false);

            handle.addEventListener('touchstart', function (e) {
                touchobj = e.changedTouches[0]; // reference first touch point
                mobileContentTop = parseInt(mobileContent.style.top); // get top position of box
                cursorTouchStart = parseInt(touchobj.clientY);
                cursorDistance = 0;
            }, false);

            handle.addEventListener('touchend', function (e) {
                globalThis.initLoading = true;
                setTimeout(function () {
                    globalThis.initLoading = false;
                }, 800);
                touchobj = e.changedTouches[0];
                var pos = mobileContentTop + cursorDistance;
                if (pos < top_sensitivity) {
                    mobileContent.style.top = '50px';
                } else if (pos > bottom_sensitivity) {
                    mobileContent.style.top = window.innerHeight - fixed_bottom_num + 'px';
                    $("#map").css({height: "100%"});
                } else {
                    let calculatedTopBox = $(document).height() - 290 + 'px';
                    // let calculatedTopMap = $( document ).height() - 130 + 'px';
                    let calculatedTopMap = $(document).height() - 290 + 'px';
                    mobileContent.style.top = calculatedTopBox;
                    $("#map").css({height: calculatedTopMap});
                }
            }, false);

            handle.addEventListener('touchmove', function (e) {
                touchobj = e.changedTouches[0];
                cursorDistance = parseInt(touchobj.clientY) - cursorTouchStart;
                var fixed_bottom = window.innerHeight - fixed_bottom_num;
                mobileContent.style.top = mobileContentTop + cursorDistance + 'px';

                mobileContent.style.top = ((mobileContentTop + cursorDistance > fixed_bottom) ?
                    fixed_bottom : (mobileContentTop + cursorDistance < 30) ? 30 : mobileContentTop + cursorDistance) + 'px';

            }, false);
        },
        initActions: function () {
            this.userId = this.userIdProp;
            this.checkMobileFunctions();
            this.initialMapBase();
            this.fetchData();
        },
        seperate: function (first, second) {
            if (this.filters[first][second]) {
                this.filters[first][second] = this.filters[first][second].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        },
        checkingActions: function () {
            globalThis = this;
            this.checkLoadMore();
            this.fillFilters();
            globalThis = this;
            $('#searchCodeInput').keyup(function (event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    globalThis.searchCode();
                }
            });
        },
    },
    mounted: function () {
        this.initActions();
        this.checkingActions();
    },
    computed: {
        computedMapSize: function () {
            this.changeMapSize();
            return null;
        }
    },
});