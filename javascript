/* ==================== */
/* ------FE8--UM------- */
/* ==================== */
var urunDuzeniTipi=0; //Urun duzen tipi
var mobilBlokCozunurluk=768; //Mobil dinamikblok
var sliderZoomCozunurluk=768; //mobilOzelSlider
var isHoverCartProduct=false; //Hover da kapatma
var kategoriMenuAcikGetir=true; //Kategorimenu tum kirilim
var urunDetayZoomCozunurluk=1025; //Urun resim slider 
var windowidth = document.documentElement.clientWidth; //window width orani
var urunDetay_varyasyonSecili=true; //varyasyon secme ve secmeme
var sepeteEkleUyariAktif = true; //sepete ekleme popup
//var ShowListProductInCart = false; // Urun Sepette ve sepet adet ibaresi
//Sayfa Yuklenme sahnesi
function CR(){$("link[href*='style.css']").attr('href','/customcss/ticimax/style.css?v='+Math.random()+''); }//entegre sonrası sil
$(document).ready(function () {
  
 
    try {var control = globalModel.member.memberRole.split(',')[2]; if (control == 'ticimax') {$('body').before('<a onclick="CR()" style="position:fixed;right:0;top:50%; background:#040a2b;color:#fff;padding:0 15px;line-height:42px; z-index:12154865746;font-size:13px;text-align:center;font-family:sans-serif;margin-top:-21px;"><p style="margin:0;">Css Yenile</p></a>'); } }
    catch(e) {}//entegre sonrası sil
    //sayfaislemleri
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>');
    if ($('#divSayfalamaUst').length > 0) { KategoriIslemleri(); }
    if (globalModel.pageType == 'productdetail') {UrunDetayIslemleri(); }
    if (globalModel.pageType == 'cart' || globalModel.pageType == 'ordercomplete'|| globalModel.pageType == 'payment'|| globalModel.pageType == 'ordercompleted') { SepetEkrani(); }
    if ($('.pageContainer').length > 0) {$('body').addClass('SayfaIcerik');}
    if ($('.magazalarContent').length > 0) {$('body').addClass('Magazalar');}
    if ($('.userDivRow').length > 0)    {$('body').addClass('UyeGiris');}
    if ($('.uyeOlContainer').length > 0)    {$('body').addClass('UyeOl');}
    GlobalIslemler();
    $('.newHeaderNav .newHeaderNavUl > li').each(function() {
        $(this).find('.menu-list-image-editor').prependTo($(this).find('.menu-list-row'));
    });
    HeaderFixed();
    setTimeout(function() {
        $('.flag-tr').text('TR');
        $('.flag-fr').text('FR');
        $('.flag-en').text('EN');
        $('.flag-de').text('DE');
        $('.flag-ru').text('RU');
        $('.flag-ar').text('AR');
    }, 500)
});
$(window).on('load', function() {//sayfa yuklenmesi
    if ($(".hesabimBolumuTutucu").length > 0) { HesabimTakip(); }
    if ($(".iletisimContent").length > 0) { Iletisimaspx(); }
});
$(window).on("scroll", function() {//sayfa scroll
    SayfaTasarimScrollRun();
    customScrollRun();
    mobilFooter();
});
function GlobalIslemler() {//genel islemler
    if (!pageInitialized && windowidth > 767) {
        $('.welcome').after('<div class="headerButton"></div>');
        $('.mycart').appendTo('.headerButton');
        $('.headerButton').append('<div class="favi"><a href="/Hesabim.aspx#/Favorilerim"><div class="svgIcon"><svg viewBox="0 0 471.701 471.701"> <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"/> </svg></div><span>'+translateIt('Favorilerim_Baslik')+'</span></a></div>');
        $('.welcome').appendTo('.headerButton');
    }
    if ($('.breadcrumb').length > 0) {
        var breadHtml = $('ul.breadcrumb').html();
        $('ul.breadcrumb').after('<div class="breadList" style="display:none;"><div class="mBread"><ul class="breadcrumbList">'+breadHtml+'</ul></div><div class="clbtn"><i class="far fa-times"></i></div></div>');
        var liS = $(".breadcrumbList li");
        $(".breadcrumbList li").each(function(index){if (index > 0){var ul = $("<ul/>"); $(this).appendTo(ul); ul.appendTo(liS[index-1]); } });
        $('body').on('click' ,'.breadcrumb',function(){$('.breadList').addClass('breadActive').show();$(this).addClass('zindex'); });
        $('body').on('click' ,'.clbtn',function(){$('.breadList').removeClass('breadActive').hide();$('.breadcrumb').removeClass('zindex'); });
    }
    SayfaTasarim();
    if (globalModel.pageType == 'homepage') {$('body').addClass('HomeBody');}
}

function sepetBindRefresh(res){//sepet kontrol
    if (typeof res.cart.products != 'undefined') {
        if (res.cart.products.length>0) {$('.mycart').addClass('more');$('.CartProduct').addClass('more'); $('.SepetBlock').addClass('more');$('.headerOrderBtn').text(translateIt('SiparisTamamla_Baslik')); } else {$('.mycart').removeClass('more');$('.CartProduct').removeClass('more'); $('.SepetBlock').removeClass('more'); }
        $('.CartProduct .SProduct li').each(function(){
            if ($(this).find('.sptAdet').length == 0) {$(this).find('a:eq(0) .SepettopAd').after('<div class="sptAdet"></div>'); }
            $(this).find('.SepettopAd span:eq(0)').wrapAll('<div class="urunAd"></div>');
            $(this).find('.SepettopAd span:eq(1)').wrapAll('<div class="varyAd"></div>');
            $(this).find('.SepetTopAdet').appendTo($(this).find('.sptAdet'));
            $(this).find('.sepetTopSatisBirimi').appendTo($(this).find('.sptAdet'));
            $(this).find('.sptAdet').appendTo($(this).find('.SepettopAd'));
        });
    }
    if ($('.welcome .useLogin').length==0 && windowidth > 767 && siteSettings.isAuthenticated == true) {UseLogin();}
    /*if (windowidth>767) {
        if ($('.welcome .svgIcon').length==0) {
            $('.welcome').prepend('<div class="svgIcon"><svg viewBox="0 0 20 22.487"><g transform="translate(-92.3 -72)"><path d="M109.006,266.734a10.792,10.792,0,0,0-13.407,0,9.381,9.381,0,0,0-3.3,7.54.858.858,0,0,0,.855.855h18.289a.858.858,0,0,0,.855-.855A9.361,9.361,0,0,0,109.006,266.734Zm-14.959,6.685a7.573,7.573,0,0,1,2.646-5.371,9.091,9.091,0,0,1,11.219,0,7.561,7.561,0,0,1,2.646,5.371Z" transform="translate(0 -180.643)"></path><path d="M169.246,83.292a5.646,5.646,0,1,0-5.646-5.646A5.653,5.653,0,0,0,169.246,83.292Zm0-9.581a3.935,3.935,0,1,1-3.935,3.935A3.94,3.94,0,0,1,169.246,73.711Z" transform="translate(-66.943)"></path></g></svg></div>');
        }
        if ($('.mycart .svgIcon').length==0) {
            $('.mycart > a').prepend('<div class="svgIcon"><svg viewBox="0 0 16 16"> <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/> </svg></div>');
        }
    }else{
        $('.mycart > a').removeAttr('href');
        if ($('.SepetUst').length==0) {
            $('.CartProduct').prepend('<div class="SepetUst"><div class="seClose"><svg viewBox="0 0 371.23 371.23"> <polygon points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23 185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 "/> </svg></div><span>'+translateIt("GlobalMasterPage_Sepetim")+'</span></div>');
        }
    }*/
    if (windowidth > 767) {
        if ($('.account-item a.account-link.headerButon .svgIcon').length == 0) {
            $('.account-item a.account-link.headerButon').prepend('<div class="svgIcon"><svg xmlns="http://www.w3.org/2000/svg" width="18.611" height="20.787" viewBox="0 0 18.611 20.787"> <g id="Icon_feather-user" data-name="Icon feather-user" transform="translate(-5.4 -3.9)"> <path id="Path_11" data-name="Path 11" d="M23.411,29.029V26.853A4.353,4.353,0,0,0,19.058,22.5H10.353A4.353,4.353,0,0,0,6,26.853v2.176" transform="translate(0 -4.942)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"/> <path id="Path_12" data-name="Path 12" d="M20.705,8.853A4.353,4.353,0,1,1,16.353,4.5,4.353,4.353,0,0,1,20.705,8.853Z" transform="translate(-1.647)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"/> </g></svg></div>');
        }
        if ($('.cart-item a.header-cart-link.headerButon .svgIcon').length == 0) {
            $('.cart-item a.header-cart-link.headerButon').prepend('<div class="svgIcon"><svg xmlns="http://www.w3.org/2000/svg" width="18.828" height="20.787" viewBox="0 0 18.828 20.787"> <g id="Icon_feather-shopping-bag" data-name="Icon feather-shopping-bag" transform="translate(0.6 0.6)"> <path id="Path_5" data-name="Path 5" d="M7.438,3,4.5,6.917V20.628a1.959,1.959,0,0,0,1.959,1.959H20.17a1.959,1.959,0,0,0,1.959-1.959V6.917L19.19,3Z" transform="translate(-4.5 -3)" fill="none" stroke="#040404" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"/> <path id="Path_6" data-name="Path 6" d="M4.5,9H22.128" transform="translate(-4.5 -5.083)" fill="none" stroke="#040404" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"/> <path id="Path_7" data-name="Path 7" d="M19.835,15A3.917,3.917,0,1,1,12,15" transform="translate(-7.103 -7.165)" fill="none" stroke="#040404" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"/> </g></svg></div>');
        }
        if ($('.header-favori-item a.favori-link.headerButon .svgIcon').length == 0) {
            $('.header-favori-item a.favori-link.headerButon').prepend('<div class="svgIcon"><svg xmlns="http://www.w3.org/2000/svg" width="23.588" height="20.79" viewBox="0 0 23.588 20.79"> <path id="Icon_awesome-heart" data-name="Icon awesome-heart" d="M20.212,3.587a5.979,5.979,0,0,0-8.158.595l-.861.888-.861-.888a5.978,5.978,0,0,0-8.158-.595,6.278,6.278,0,0,0-.433,9.09l8.46,8.735a1.371,1.371,0,0,0,1.981,0l8.46-8.735a6.274,6.274,0,0,0-.428-9.09Z" transform="translate(0.602 -1.645)" fill="none" stroke="#000" stroke-width="1.2"/></svg></div>');
        }
    }
}
$(document).on('click','.mycartClick,.sepetUrunSayisi',function () {$('.CartProduct').addClass('animated');$('.breadcrumb').removeClass('zindex');$('.breadList').removeClass('breadActive').hide(); $('.searchContent').removeClass('active'); $('.welcome').removeClass('active'); $('#lang_flag_container').removeClass('selector'); });
$(document).on('click','.seClose',function () {$('.CartProduct').removeClass('animated');$('body').removeClass('overflow transform'); });

function SayfaTasarim() {//sayfada yapilacak islemler
    if ($('#mainHolder_divDesign').length>0) {
        urunKartCallBack();
    }
}
function SayfaTasarimScrollRun() {//sadece ozel owl icin. Kullanim yoksa kaldir.
    if ($('#mainHolder_divDesign').length>0) {

    }
}
function customScrollRun() {//sayfada scroll oluncaki islemler
    if ($('#back-to-top a svg').length==0) {
        $('#back-to-top a').html('<svg viewBox="0 0 24 24" > <path d="M8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303C7.17678 10.2374 7.17678 9.76256 7.46967 9.46967L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967L16.5303 9.46967C16.8232 9.76256 16.8232 10.2374 16.5303 10.5303C16.2374 10.8232 15.7626 10.8232 15.4697 10.5303L12.75 7.81066L12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5L11.25 7.81066L8.53033 10.5303Z"/> </svg>');
    }
    if ($('.ebultenGelecek #divNewsLetter').length==0) {
        $('#divNewsLetter').prependTo('.ebultenGelecek');
    }
}
function urunKartCallBack() {//urun kartlarindaki islemler
    $(".productItem").find("video").parent().addClass("Videolu");
    $(".productItem").find(".TukendiIco").parent().addClass("StokYok");
    $(".productPrice").find(".regularPrice").parent().addClass("IndirimVar");
    $(".sliderBannerContainer .productItem").find("video").parent().addClass("Videolu");
    $('.productItem').each(function () {
        $(this).find('.itemCategory').prependTo($(this).find('.productDetail'));
        $(this).find('.productIcon').appendTo($(this).find('.productDetail'));
        $(this).find('.divVideoPlayButton').appendTo($(this));
        if ($(this).find('.productIconEx').length == 0) {
            $(this).append('<div class="productIconEx"></div>');
        }
        $(this).find('.cargoIcon').appendTo($(this).find('.productIconEx'));
        $(this).find('.newIcon').appendTo($(this).find('.productIconEx'));
        $(this).find('.discountIcon').appendTo($(this).find('.productIconEx'));
        $(this).find('.hizliKargoIcon').appendTo($(this).find('.productIconEx'));
        if ($(this).find('.productIconExAlan').length == 0) {
            $(this).append('<div class="productIconExAlan"></div>');
        }
        $(this).find('.ozelAlan1').appendTo($(this).find('.productIconExAlan'));
        $(this).find('.ozelAlan2').appendTo($(this).find('.productIconExAlan'));
        $(this).find('.ozelAlan3').appendTo($(this).find('.productIconExAlan'));
        $(this).find('.ozelAlan4').appendTo($(this).find('.productIconExAlan'));
        $(this).find('.ozelAlan5').appendTo($(this).find('.productIconExAlan'));
    });
}
function KategoriIslemleri() {//kategori ve arama sayfasi
    $("body").addClass("CategoryBody");
    //$('.categoryTitle .categoryTitleText').insertBefore('.leftBlock');
    //$('body').on(clickEvent ,'.leftBlock .category-vertical-filters .panel .panel-heading',function() {$(this).parent().find('.list-group, .FiyatSlider,.panel-search,.FiyatTextBox').slideToggle(); $(this).toggleClass('active'); });
}
function UrunDetayIslemleri() {//urundetay sayfasi
    $("body").addClass("ProductBody");
    if (productDetailModel.totalStockAmount < 1) {$('.RightDetail').addClass('StokYok');}
    if (!pageInitialized) {
        $('.ProductDetail > .categoryTitle').insertBefore('#divIcerik');
        $('.ProductDetailMain').prepend('<div class="TopDet"></div>');
        $('.leftImage').appendTo('.TopDet');
        $('.RightDetail').appendTo('.TopDet');
        //ilk bolum
        $('.RightDetail').prepend('<div class="TopList"></div>');
        $('.PriceList').prependTo('.TopList');
        $('.ProductName').prependTo('.TopList');
        //ikinci bolum
        $('.TopList').after('<div class="MiddleList"></div>');
        $('#divSatinAl').appendTo('.MiddleList');
        $('#divUrunEkSecenek').prependTo('.MiddleList');
        $('#divStokYok').prependTo('.MiddleList');
        //ucuncu bolum
        $('.MiddleList').after('<div class="BottomList"></div>');
        $('.ProductIcon').appendTo('.BottomList');
        $('.ProductIcon2 ').appendTo('.BottomList');
        $('#divEkstraBilgiler').appendTo('.BottomList');
        $('.product_social_icon_wrapper').appendTo('.BottomList');
        //ek acilirlar
        $('.markaresmi').insertBefore('.ProductName');
        $('#divOnyazi').insertAfter('.ProductName');
        $('#divMagazaStok').insertAfter('.ProductName');
        $('#divTahminiTeslimatSuresi').insertAfter('.ProductName');
        $('#divIndirimOrani').prependTo('.PriceList');
        $('#divParaPuan').insertAfter('.ProductName');
        $('#divToplamStokAdedi').insertAfter('.ProductName');
        $('#divUrunStokAdedi').insertAfter('.ProductName');
        $('#divTedarikci').insertAfter('.ProductName');
        $('#divBarkod').insertAfter('.ProductName');
        $('.puanVer').insertAfter('.ProductName');
        $('#divMarka').insertAfter('.ProductName');
        $('#divUrunKodu').insertBefore('.ProductName');
        //alt ekler
        $('#divKombinSatinAl').insertAfter('.basketBtn');
        $('.buyfast').insertAfter('.basketBtn');
        $('#divAdetCombo').insertBefore('.basketBtn');
        $('#divTaksitAciklama').insertAfter('#pnlFiyatlar');
        $('#divAdetCombo .left_line').insertBefore('#divAdetCombo');
        $('.pSatisBirimi').insertBefore('.Basketinp');
        $('#divUrunOzellikAlani').appendTo('.BottomList');
        if ($('RightDetail').find('.productIconExDetay').length == 0) {
            $('.PriceList').after('<div class="productIconExDetay"></div>');
        }
        $('#divOzelAlan1').appendTo('.productIconExDetay');
        $('#divOzelAlan2').appendTo('.productIconExDetay');
        $('#divOzelAlan3').appendTo('.productIconExDetay');
        $('#divOzelAlan4').appendTo('.productIconExDetay');
        $('#divOzelAlan5').appendTo('.productIconExDetay');
        urunDetayIcon();
        $('.puanVer').after('<script>TabGetComments();</script> <a href="#liTabYorumlar" class="yorumlar" data-tab="Commets"><span>' + translateIt("UrunDetay_TabYorumlar") + '</span><span id="divYorumSayisi"></span></a>');
        $('.yorumlar').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 500);
            $(".urunTab >ul >li").removeClass('active');
            $(".urunTab >ul >li#liTabYorumlar").addClass('active');
            $(".urunDetayPanel").hide();
            $(".urunDetayPanel#divTabYorumlar").show();
        });
    }
}
function topMenuCallback() {//menu yuklenme
    
    $(".navUl li").each(function () {if ($(this).find("ul").length > 0) {$(this).addClass("ulVar"); }});
    if (!pageInitialized) {
        $('body').on('mouseenter','.navUl > li.ulVar, .yanResimliMenu .resimliYanMenu .lfMenu .lfMenuUl .lfMenuitem.ulVar',function() {
            //$('#divIcerik').addClass('hoverr');
        });
        $('body').on('mouseleave','.navUl > li.ulVar, .yanResimliMenu .resimliYanMenu .lfMenu .lfMenuUl .lfMenuitem.ulVar',function() {
            //$('#divIcerik').removeClass('hoverr');
        });
        $('.navigation .navUl > li.ulVar').each(function() {if ($(this).find('.altMenuSag img').length>0 || $(this).find('.altMenuSag .altMenuSagEditor *').length>0) {$(this).find('.altMenu').addClass('picTrue'); } });
    }
    mobileMenu();
    bottomHead();

}
function blockCompleteCallback() {//blokyuklenme
    if (globalModel.pageType == 'homepage') {
    }
    if ($('#divSayfalamaUst').length>0) {
    }
    if (globalModel.pageType == 'productdetail') {
        UrunDetayPaylas();
        if (!pageInitialized) {
            $('#linkOncekiSayfa').appendTo('ul.breadcrumb');
            if (windowidth<768) {
                $('#linkOncekiSayfa').appendTo('.leftImage');
            }
        }
        /*detayTabAccordion*/
        if (windowidth<768) {
        }
        var cList = $('.urunTab ul li'); var cDiv = $('.urunDetayPanel'); for (var i = 0; i <= cList.length; i++) {for (var i = 0; i <= cDiv.length; i++) {$(cDiv[i]).appendTo(cList[i]); } } $(".urunDetayPanel").hide() ;
        $(".urunOzellik").removeAttr('class').addClass("urunOzellikTab");
        $('.urunOzellikTab .urunTab >ul>li').attr('onOffTip','false');
        $('.urunOzellikTab .urunTab >ul>li:nth-child(1)').attr('onOffTip','true');
        $('body').on(clickEvent ,'.urunOzellikTab .urunTab >ul>li>a',function () {
            $('.urunOzellikTab .urunTab >ul>li>a').parent().removeClass('active');
            var openTab = $(this); var tabName = openTab.attr('data-tab') || ""; if (tabName === "Commets") {TabGetComments(); } else if (tabName === "recommendations") {TabGetRecommendations();}
            if ($(this).parent().attr('onOffTip') == 'false'){$('.urunOzellikTab .urunTab >ul>li').attr('onOffTip','false'); $(this).parent().attr('onOffTip','true');}
            else{$(this).parent().attr('onOffTip','false'); }
        });
    }
}
function urunListCallback() {//urunyuklenme
        Sepetteindirim();

    if (globalBlokModel == 1) {//Sol ve Orta blok
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.leftBlock').removeClass().addClass('leftBlock LeftMiddle'); $('.centerCount').removeClass().addClass('centerCount LeftMiddle');
    }
    else if (globalBlokModel == 2) {//Sol orta sag
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.leftBlock').removeClass().addClass("leftBlock LeftMiddleRight"); $('.rightBlock').removeClass().addClass("rightBlock LeftMiddleRight"); $('.centerCount').removeClass().addClass("centerCount LeftMiddleRight");
    }
    else if (globalBlokModel == 3) {//Sag orta
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.rightBlock').removeClass().addClass("rightBlock MiddleRight"); $('.centerCount').removeClass().addClass("centerCount MiddleRight");
    }
    else if (globalBlokModel == 4) {//Sadece orta
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.centerCount').removeClass().addClass("centerCount Middle");
    }
    urunDuzeni(urunDuzeniTipi);
    if (globalModel.pageType != 'homepage'){//Anasayfadan farkli bir sayfa ise
        $('.sliderBannerContainer .jCarouselLite ul').owlCarousel({
            autoplay: false,
            loop: false,
            rewind:true,
            lazyLoad:true,
            navClass: ['ProductListprev', 'ProductListnext'],
            margin:20,
            nav: true,
            responsive:{0:{items:2,margin:10},768:{items:3},1025:{items:3},1160:{items: 4}},
            onInitialized: function callback() {
                lazyLoad();
            }
        });
    }
    if ($('#divSayfalamaUst').length>0) {//kategori ve arama sayfasi
        $('body').on(clickEvent , '.blockSelect .sort_hrz',function(){urunDuzeniTipi = 1;urunDuzeni(urunDuzeniTipi); }); $('body').on(clickEvent , '.blockSelect .sort_2',function(){urunDuzeniTipi = 2;urunDuzeni(urunDuzeniTipi); }); $('body').on(clickEvent , '.blockSelect .sort_3',function(){urunDuzeniTipi = 3;urunDuzeni(urunDuzeniTipi); }); $('body').on(clickEvent , '.blockSelect .sort_4',function(){urunDuzeniTipi = 4;urunDuzeni(urunDuzeniTipi); }); $('body').on(clickEvent , '.blockSelect .sort_5',function(){urunDuzeniTipi = 5;urunDuzeni(urunDuzeniTipi);});
    }
    if (globalModel.pageType == 'productdetail') {//urun detay sayfasi
        if($('#divSatinAl').css('display') == 'none'){$('.RightDetail').addClass('StokYok'); }
        $('.detaySliderContainer .jCarouselLite ul').owlCarousel({
            autoplay: false,
            loop: false,
            rewind:true,
            lazyLoad:true,
            navClass: ['ProductListprev', 'ProductListnext'],
            margin:20,
            nav: true,
            responsive:{0:{items:2,margin:10},768:{items:3},1025:{items:3},1160:{items: 4}},
            onInitialized: function callback() {
                lazyLoad();
            }

        });
    }
    InitTimers();
    urunKartCallBack();
    $(window).on('scroll',function () {
        if ($('.jCarouselLite').attr('data-lazy-function') != undefined) {
            if ($('.jCarouselLite').attr('data-lazy-function').length > 0) { lazyLoad(); }
        }
    });
}
function urunDuzeni(tip) {
    if ($('#divSayfalamaUst').length>0) {
        if ($('.blockSelect .sort_5').length==0) {$('.blockSelect .sort_4').after('<a class="btnCatSorting sort_5"><i class="fas fa-th"></i></a>');}
        if ($('.blockSelect .sort_2').length==0) {$('.blockSelect .sort_3').before('<a class="btnCatSorting sort_2"><i class="fas fa-th"></i></a>');}
        if ($('.brandlistselection select').length > 0) {$('#divSayfalamaUst').addClass('Slct');}
        $('.sort_hrz').removeClass("Active"); 
        $('.sort_2').removeClass("Active");
        $('.sort_3').removeClass("Active");
        $('.sort_4').removeClass("Active");
        $('.sort_5').removeClass("Active");
        if (tip == 1) {$('.ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_hrz'); $(".ItemOrj").removeClass().addClass("ItemOrj col-12"); $('.blockSelect .sort_hrz').addClass("Active"); lazyLoad();}
        else if (tip == 2) {$('.ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_2'); $(".ItemOrj").removeClass().addClass("ItemOrj col-6"); $('.blockSelect .sort_2').addClass("Active"); lazyLoad();}
        else if (tip == 3) {$('.ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_3'); $(".ItemOrj").removeClass().addClass("ItemOrj col-4"); $('.blockSelect .sort_3').addClass("Active"); lazyLoad();}
        else if (tip == 4) {$('.ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_4'); $(".ItemOrj").removeClass().addClass("ItemOrj col-3"); $('.blockSelect .sort_4').addClass("Active"); lazyLoad();}
        else if (tip == 5) {$('.ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_5'); $(".ItemOrj").removeClass().addClass("ItemOrj col-5li"); $('.blockSelect .sort_5').addClass("Active"); lazyLoad();}
        else if (tip == 6) {$('.ProductList:not(.markaSlider)').removeClass().addClass('ProductList PlSc_6'); $(".ItemOrj").removeClass().addClass("ItemOrj col-2"); lazyLoad(); }

        if ($('.FiltreUst').length == 0) {
            $('body #divSayfalamaUst .category-vertical-filters.top-filters').wrapInner('<div class="FiltreicerikAlan"></div>');
            $('body #divSayfalamaUst .category-vertical-filters.top-filters .FiltreicerikAlan').after('<div class="filtreUygulaBtn"><span>'+translateIt("Global_ButtonKaydet")+'</span></div>');
            $('body #divSayfalamaUst .category-vertical-filters.top-filters').prepend('<div class="tukgo"><a onclick="sortingClick(1000)" class="filterOrderInStock">'+translateIt("Urunler_Stoktakiler")+'</a></div>');
            $('body #divSayfalamaUst .category-vertical-filters.top-filters').prepend('<div class="FiltreUst"><div class="closeFilt"><i class="fal fa-times"></i></div><span>'+translateIt("UrunFiltreleme_Filtreleme")+'</span><a onclick="clearAllFilters()"><i class="fal fa-trash"></i></a></div>');
            if ($('.moreNum').length==0) {
                $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').find('.panel-heading').append('<div class="moreNum"></div>');
            }
            $('body').on(clickEvent ,'.mobilFilterBtn',function() {
                $('#divSayfalamaUst .filterBlock').addClass('active');
            });
            $('body').on(clickEvent ,'.closeFilt,.filtreUygulaBtn span',function() {
                $('#divSayfalamaUst .filterBlock').removeClass('active');
            });
        }
        $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').each(function(index, el) {
            if ($(this).find('li').hasClass('selected')) {var numlen = $(this).find('li.selected').length; $(this).addClass('more'); $(this).find('.moreNum').html(numlen);}
            else{$(this).removeClass('more'); $(this).find('.moreNum').html(''); }
        });
        $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').each(function(index, el) {
            if ($('#divSayfalamaUst .category-vertical-filters.top-filters .panel').hasClass('more')) {$('.FiltreUst a').addClass('active'); return false; }
            else{$('.FiltreUst a').removeClass('active'); }
        });
        if ($('.sortingContent .filterOrderInStock').hasClass('selected')) {$('.tukgo .filterOrderInStock').addClass('selected');}else{$('.tukgo .filterOrderInStock').removeClass('selected');}
        if ($('.sortingContent .sortingButton').length > 0) {if ($('.sortingContent .sortingButton > a[onclick="sortingClick(1000)"]').hasClass('selected')) {$('.tukgo .filterOrderInStock').addClass('selected'); }else {$('.tukgo .filterOrderInStock').removeClass('selected'); } }
        
        if (windowidth>1042) {
            if ($('.FiltreBtn').length == 0) {
                $('#divSayfalamaUst').prepend('<div class="FiltreBtn"><img src="/Uploads/EditorUploads/images/filtre.svg" alt=""><span>Filtrele</span></div>');
            }
            $('.FiltreBtn').on('click',function () { $(this).toggleClass('acik'); $('.filterBlock').toggleClass('active'); });
        }
    }
    if (globalModel.pageType == 'productdetail') {if ($('#divUrunKodu span').length==0) {$('#divUrunKodu').prepend('<span>'+translateIt("Global_StokKodu")+'</span>'); } }
}
function ekSecenekListesiCallBack(){
    if (globalModel.pageType == 'productdetail') {if ($('#divUrunKodu span').length==0) {$('#divUrunKodu').prepend('<span>'+translateIt("Global_StokKodu")+'</span>'); } }
    FavoriIslemCallback();
}
function mobileMenu() {
    $('.headerContent').prepend('<div class="mobilMenuAcButton"><span>Menu</span><svg viewBox="0 0 384.97 384.97"><path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03 C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/><path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z"/><path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909 c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/></svg></div><div class="searchClick"><svg viewBox="0 0 488.4 488.4"> <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"/> </svg></div><div class="welcomeOpen"><svg viewBox="0 0 20 22.487"><g transform="translate(-92.3 -72)"><path d="M109.006,266.734a10.792,10.792,0,0,0-13.407,0,9.381,9.381,0,0,0-3.3,7.54.858.858,0,0,0,.855.855h18.289a.858.858,0,0,0,.855-.855A9.361,9.361,0,0,0,109.006,266.734Zm-14.959,6.685a7.573,7.573,0,0,1,2.646-5.371,9.091,9.091,0,0,1,11.219,0,7.561,7.561,0,0,1,2.646,5.371Z" transform="translate(0 -180.643)"></path><path d="M169.246,83.292a5.646,5.646,0,1,0-5.646-5.646A5.653,5.653,0,0,0,169.246,83.292Zm0-9.581a3.935,3.935,0,1,1-3.935,3.935A3.94,3.94,0,0,1,169.246,73.711Z" transform="translate(-66.943)"></path></g></svg></div><div class="mycartClick"><svg viewBox="0 0 16 16"> <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/> </svg></div>');
    //resetleme
    $('body').on(clickEvent ,'.searchClick,.welcomeOpen,.mobilMenuAcButton,.CloseBtnMenu',function () {$('body').removeClass('overflow transform'); $('.breadcrumb').removeClass('zindex'); $('.breadList').removeClass('breadActive').hide(); $('.searchContent').removeClass('active'); $('.welcome').removeClass('active'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.CartProduct').removeClass('animated'); $('#lang_flag_container').removeClass('selector');$('body #divSayfalamaUst .filterBlock').removeClass('active'); });
    //ekleme
    $('body').on(clickEvent ,'.searchClick',function () {$('.searchContent').toggleClass('active'); $('#txtbxArama').focus(); });
    $('body').on(clickEvent ,'.welcomeOpen',function () {$('.welcome').toggleClass('active'); });
    $('body').on(clickEvent ,'.menuBack',function(){$('.ResimliMenu1AltUl').removeClass('active'); $('.altMenu').removeClass('active'); $('.navUl > li ul').removeClass('active'); });
    $('body').on(clickEvent ,'.headerCartBtn,.headerOrderBtn',function(){$('body').removeClass('overflow transform'); $('.CartProduct').removeClass('animated'); });
    $('body').on(clickEvent ,'.mobilMenuAcButton',function () {
        if ($('.mobilMenu').length==0) {
            var menuKopya = $(' .navigation').html();
            $('body').prepend('<div class="mobilMenu"><div class="menuUstBolum"><div class="menuBack"><svg viewBox="0 0 384.97 384.97"><path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03 C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/><path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z"/><path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909 c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/></svg><span>Menu</span></div><div class="CloseBtnMenu"><svg viewBox="0 0 371.23 371.23"> <polygon points="371.23,21.213 350.018,0 185.615,164.402 21.213,0 0,21.213 164.402,185.615 0,350.018 21.213,371.23 185.615,206.828 350.018,371.23 371.23,350.018 206.828,185.615 "/> </svg></div></div><div class="menuIcerikAlan">' + menuKopya + '</div></div>');

            if ($('.mobilMenu .ResimliMenu1').length>0) {//Resimli Menu
                $('.mobilMenu .ResimliMenu1 li .altMenu').closest('li').append('<div class="ResimliDown"><svg class="svgbtn right" viewBox="0 0 330 330"><path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"/></svg></div>');
                $('.mobilMenu .ResimliMenu1 li .altmenuSol li ul').closest('li').append('<div class="ResimliDown2"><svg class="svgbtn right" viewBox="0 0 330 330"><path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"/></svg></div>');
                $('.mobilMenu .altMenuMarkalar').parent().parent().addClass('Markalar'); var MarkaName = $('.Markalar').find(' > a').html();
                $('.mobilMenu .altMenuMarkalar').prepend('<span><div class="UpBtn"><svg viewBox="0 0 400.004 400.004"> <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z"/> </svg></div><a>'+MarkaName+'</a></span>');
                $('body').on(clickEvent ,'.ResimliDown',function() {var attrClass = $(this).find('svg').attr('class').split('svgbtn')[1].replace(' ',''); if (attrClass === 'right') {$(this).closest('li').find('.altMenu').addClass('active'); } else {$(this).closest('li').find('.altMenu').removeClass('active'); } });
                $('body').on(clickEvent ,'.ResimliDown2',function() {var attrClass = $(this).find('svg').attr('class').split('svgbtn')[1].replace(' ',''); if (attrClass === 'right') {$(this).closest('li').find('.ResimliMenu1AltUl').addClass('active'); } else {$(this).closest('li').find('.ResimliMenu1AltUl').removeClass('active'); } });
                $('.ResimliDown2').each(function(index, el) {var ClickMeNa = $(this).parent('li').find('>a').text(); $(this).closest('li').find('.ResimliMenu1AltUl').prepend('<span><div class="DownBtn"><svg viewBox="0 0 400.004 400.004"> <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z"/> </svg></div> <a href="">'+ClickMeNa+'</a></span>'); }); 
                $('.mobilMenu .altmenuSol > span').prepend('<div class="UpBtn"><svg viewBox="0 0 400.004 400.004"> <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z"/> </svg></div>');
                $('body').on(clickEvent ,'.DownBtn',function() {$('.mobilMenu .ResimliMenu1AltUl').removeClass('active'); $('.altMenuler').animate({scrollTop:0},100); $('.menuIcerikAlan').animate({scrollTop:0},100); });
                $('body').on(clickEvent ,'.UpBtn',function() {$('.altMenu').removeClass('active'); $('.menuIcerikAlan').animate({scrollTop:0},100); });
            }
            if ($('.HeaderMenu2').length>0) {//Resimsiz Menu
                $('.mobilMenu .HeaderMenu2 > li > ul').closest('li').append('<div class="ResimsizDown"><svg class="svgbtn right" viewBox="0 0 330 330"><path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"/></svg></div>');
                $('.mobilMenu .HeaderMenu2 > li > ul li ul').closest('li').append('<div class="ResimsizDown2"><svg class="svgbtn right" viewBox="0 0 330 330"><path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"/></svg></div>');
                $('body').on(clickEvent ,'.ResimsizDown',function() {var attrClass = $(this).find('svg').attr('class').split('svgbtn')[1].replace(' ',''); if (attrClass === 'right') {$(this).closest('li').find('> ul').addClass('active'); } else {$(this).closest('li').find('> ul').removeClass('active'); } });
                $('body').on(clickEvent ,'.ResimsizDown2',function() {var attrClass = $(this).find('svg').attr('class').split('svgbtn')[1].replace(' ',''); if (attrClass === 'right') {$(this).closest('li').find('> ul').addClass('active'); $(this).closest('ul').addClass('over'); } else {$(this).closest('li').find('> ul').removeClass('active'); $(this).closest('ul').removeClass('over'); } });
                $('.ResimsizDown').each(function(index, el) {var Down1 = $(this).parent('li').find('>a').text(); $(this).closest('li').find('> ul').prepend('<span><div class="NoiBack"><svg viewBox="0 0 400.004 400.004"> <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z"/> </svg></div> <span>'+Down1+'</span></span>'); });
                $('.ResimsizDown2').each(function(index, el) {var Down2 = $(this).parent('li').find('>a').text(); $(this).closest('li').find('> ul').prepend('<span><div class="NoiBack2"><svg viewBox="0 0 400.004 400.004"> <path d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z"/> </svg></div> <span>'+Down2+'</span></span>'); });
                $('body').on(clickEvent ,'.NoiBack2',function() {$(this).parent().parent().removeClass('active'); $(this).closest('.over').removeClass('over'); $('.mobilMenu .navUl > li > ul').animate({scrollTop:0},100); $('.menuIcerikAlan').animate({scrollTop:0},100); });
                $('body').on(clickEvent ,'.NoiBack',function() {$('.mobilMenu .navUl > li > ul').removeClass('active'); $('.menuIcerikAlan').animate({scrollTop:0},100); });
            }
        }
        $('body').addClass('overflow transform');
        setTimeout(function () {
            $('.mobilMenu').addClass('acik');
        },25);
    });
$('#divIcerik').on('touchend',function(){$('.welcome').removeClass('active'); $('.searchContent').removeClass('active');});
}
function bottomHead() {
    if ($('.bottomHead').length==0) {$('body:not(.sepetimBody)').append('<div class="bottomHead"> <ul> <li class="homeC"> <a href="/"><svg viewBox="0 0 486.196 486.196"><path d="M481.708,220.456l-228.8-204.6c-0.4-0.4-0.8-0.7-1.3-1c-5-4.8-13-5-18.3-0.3l-228.8,204.6c-5.6,5-6,13.5-1.1,19.1 c2.7,3,6.4,4.5,10.1,4.5c3.2,0,6.4-1.1,9-3.4l41.2-36.9v7.2v106.8v124.6c0,18.7,15.2,34,34,34c0.3,0,0.5,0,0.8,0s0.5,0,0.8,0h70.6 c17.6,0,31.9-14.3,31.9-31.9v-121.3c0-2.7,2.2-4.9,4.9-4.9h72.9c2.7,0,4.9,2.2,4.9,4.9v121.3c0,17.6,14.3,31.9,31.9,31.9h72.2 c19,0,34-18.7,34-42.6v-111.2v-34v-83.5l41.2,36.9c2.6,2.3,5.8,3.4,9,3.4c3.7,0,7.4-1.5,10.1-4.5 C487.708,233.956,487.208,225.456,481.708,220.456z M395.508,287.156v34v111.1c0,9.7-4.8,15.6-7,15.6h-72.2c-2.7,0-4.9-2.2-4.9-4.9 v-121.1c0-17.6-14.3-31.9-31.9-31.9h-72.9c-17.6,0-31.9,14.3-31.9,31.9v121.3c0,2.7-2.2,4.9-4.9,4.9h-70.6c-0.3,0-0.5,0-0.8,0 s-0.5,0-0.8,0c-3.8,0-7-3.1-7-7v-124.7v-106.8v-31.3l151.8-135.6l153.1,136.9L395.508,287.156L395.508,287.156z"/></svg><span>'+translateIt("GlobalMasterPage_Anasayfa")+'</span></a> </li> <li class="favoC"> <a href="/Hesabim.aspx/#/Favorilerim)"><svg viewBox="0 0 471.701 471.701"> <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"/> </svg><span>'+translateIt("Favorilerim_Baslik")+'</span><div class="favNum"></div></a> </li> <li class="cartC"> <a href="/sepetim.aspx"><svg viewBox="0 0 16 16"> <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/> </svg><span>'+translateIt("GlobalMasterPage_Sepetim")+'</span></a> </li> <li class="welcC"> <a href="javascript:void(0)" onclick="GirisKontrol(0)"><svg viewBox="0 0 20 22.487"><g transform="translate(-92.3 -72)"><path d="M109.006,266.734a10.792,10.792,0,0,0-13.407,0,9.381,9.381,0,0,0-3.3,7.54.858.858,0,0,0,.855.855h18.289a.858.858,0,0,0,.855-.855A9.361,9.361,0,0,0,109.006,266.734Zm-14.959,6.685a7.573,7.573,0,0,1,2.646-5.371,9.091,9.091,0,0,1,11.219,0,7.561,7.561,0,0,1,2.646,5.371Z" transform="translate(0 -180.643)"></path><path d="M169.246,83.292a5.646,5.646,0,1,0-5.646-5.646A5.653,5.653,0,0,0,169.246,83.292Zm0-9.581a3.935,3.935,0,1,1-3.935,3.935A3.94,3.94,0,0,1,169.246,73.711Z" transform="translate(-66.943)"></path></g></svg><span>'+translateIt("GlobalMasterPage_MobilUyeGirisi")+'</span></a> </li> </ul> </div>');}
    if (siteSettings.isAuthenticated == true) {$('.welcC a').attr('href','/hesabim.aspx'); $('.welcC span').html(translateIt("GlobalMasterPage_MobilHesabim")); }
}
var mobFtrScrollCtrl = false;
function mobilFooter(){
    window.blockMenuHeaderScroll = false;$(window).on('touchstart', function(e) {if ($(e.target).closest('.owl-grab').length == 1) {blockMenuHeaderScroll = true;}}); $(window).on('touchend', function() {blockMenuHeaderScroll = false;}); $(window).on('touchmove', function(e) {if (blockMenuHeaderScroll) {e.preventDefault();}}); 
    
    if (!mobFtrScrollCtrl) {
        $('.linkler .blink > ul > li').each(function(){
            if ($(this).find('>ul').length>0) {
                $(this).find('> span').append('<div class="ackapabtn"><svg class="svgbtn plus" viewBox="0 0 309.059 309.059"><path d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338 v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843 c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822 c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"/></svg></div>');

            }
        });
        $('.linkler .blink > ul > li .ackapabtn').click(function(evt) {
            var attrClass = $(this).find('svg').attr('class').split('svgbtn')[1].replace(' ','');
            if (attrClass === 'plus') {
                $('.linkler .blink > ul > li').find('> ul').slideUp('fast');
                $('.linkler .blink > ul > li .ackapabtn').html('<svg class="svgbtn plus" viewBox="0 0 309.059 309.059"><path d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338 v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843 c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822 c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"/></svg>');
                $(this).parent().parent().find('>ul').slideDown('fast');
                $(this).html('<svg class="svgbtn minus" viewBox="0 0 52.161 52.161"><path d="M52.161,26.081c0,3.246-2.63,5.875-5.875,5.875H5.875C2.63,31.956,0,29.327,0,26.081l0,0c0-3.245,2.63-5.875,5.875-5.875 h40.411C49.531,20.206,52.161,22.835,52.161,26.081L52.161,26.081z"/></svg>');
            }else {
                $(this).html('<svg class="svgbtn plus" viewBox="0 0 309.059 309.059"><path d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338 v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843 c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822 c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"/></svg>');
                $(this).parent().parent().find('> ul').slideUp('fast');
            }
        });
        mobFtrScrollCtrl = true;
    }
    if ( /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        var clickableElements = ".Addtobasket";
        jQuery(clickableElements ).attr("style", "cursor: pointer;");
        jQuery(clickableElements ).bind( "touchend", function(e) {
          jQuery(this).trigger(clickEvent);
      });
    }
}
function SepetEkrani() {
    $('.mycart').addClass('more');
    $('.navigation .navUl').wrapAll('<div></div>');
    $('.Mic').insertAfter('.navUl');
    setTimeout(function(){var wle = $('.welcome').html(); $('.welcome').html(''); $('.welcome').append('<div>'+wle+'</div>'); },1500);
}
function HesabimTakip() {
    $('body').addClass('HesabimTakip');
}
function Iletisimaspx() {
    $('body').addClass('Iletisimaspx');
    var uyead = globalModel.member.memberName;
    var uyemail = globalModel.member.memberEMail;
    $('#mainHolder_txtbxAdSoyad').attr('value',uyead);
    $('#mainHolder_txtbxMail').attr('value',uyemail);
    $('.iletisimLeft,.iletisimRight').wrapAll('<div class="AdBan"></div>');
    $('.iletisimForm').insertAfter('.AdBan');
    $('.iletisimLeftAdres').insertAfter('.iletisimLeftFirmaAdi');
}
function UrunDetayPaylas () {
    var title = $(".ProductName h1 span").text();
    var url = window.location.href;
    var image = location.origin + "" + $('.Images #imgUrunResim').attr('src') + "";
    var description = "";
    $("body").on(clickEvent ,'.product_social_icons',function () {
        if ($(this).attr("content") == "facebook") {
            if (isMobileDevice()) {
                window.open("https://m.facebook.com/sharer.php?u=" + url + "");
            } else {
                window.open("https://www.facebook.com/sharer.php?s=100&p[medium]=100&p[title]=" + $.trim(title) + "&p[images][0]=" + image + "&p[url]=" + url + "&p[summary]=" + $.trim(title) + "&t=" + $.trim(title) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
            }
        } else if ($(this).attr("content") == "twitter") {
            window.open("https://twitter.com/intent/tweet?text=" + $.trim(title) + "&url=" + url + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        } else if ($(this).attr("content") == "pinterest") {
            window.open("https://pinterest.com/pin/create/button/?url=" + url + "&media=" + image + "&description=" + $.trim(title) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        }
    });
    $('.UWhatsApp').insertAfter('.product_social_icon_wrapper li:last-child');
}
function UseLogin(){
    $('.welcome').append('<div class="useLogin"> <div class="useName"><span>'+globalModel.member.memberName+'</span></div> <ul> <li class=""><a href="/Hesabim.aspx#/Siparislerim"><svg viewBox="0 0 477.175 477.175"> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "/> </svg><span>'+translateIt("Siparislerim_Baslik")+'</span></a></li> <li class=""><a href="/Hesabim.aspx#/Uyelik-Bilgilerim"><svg viewBox="0 0 477.175 477.175"> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "/> </svg><span>'+translateIt("Hesabim_Baslik")+'</span></a></li> <li class=""><a href="/Hesabim.aspx#/Favorilerim"><svg viewBox="0 0 477.175 477.175"> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "/> </svg><span>'+translateIt("Favorilerim_Baslik")+'</span></a></li> <li class=""><a href="/Hesabim.aspx#/AdresDefterim"><svg viewBox="0 0 477.175 477.175"> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "/> </svg><span>'+translateIt("AdresDefterim_Baslik")+'</span></a></li> <li class=""><a href="/Hesabim.aspx#/IadeTaleplerim"><svg viewBox="0 0 477.175 477.175"> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "/> </svg><span>'+translateIt("IadeTaleplerim_Baslik")+'</span></a></li> <li class=""><a class="kargomNeredeIframe control-item" data-fancybox-type="iframe" href="/kargomnerede.aspx" vspace="500"><svg viewBox="0 0 477.175 477.175"> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "/> </svg><span>'+translateIt("Siparislerim_KargomNerede")+'</span></a></li> <li class="cikisbtn"><a href="/UyeCikis.ashx" onclick="uyeCikisYap()"><svg viewBox="0 0 477.175 477.175"> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z "/> </svg><span>'+translateIt("Global_CikisYap")+'</span></a></li> </ul> </div> <style type="text/css"> .useLogin { display: none; background: #fff; float: left; padding:0; z-index: 99999; position: absolute; top: 100%; right: 0; box-shadow: 0 0 16px -10px #000; opacity: 0; visibility: hidden;margin-left: -100px; -webkit-animation: fadein 0.5s; -moz-animation: fadein 0.5s; -ms-animation: fadein 0.5s; -o-animation: fadein 0.5s; animation: fadein 0.5s; } .welcome:after { position: absolute; left: 0; right: 0; bottom: -15px; height: 15px;} .welcome:hover .useLogin { visibility: visible; opacity: 1; top: 100%;display:block;} .useLogin:before, .useLogin:after { bottom: 100%; right: 10px; border: solid transparent;height: 0; width: 0; position: absolute; pointer-events: none; } .useLogin:before { border-color: transparent; border-bottom-color: #f0f0f0; border-width: 9px; margin-left: -9px; } .useLogin:after { border-color: transparent; border-bottom-color: #fff; border-width: 8px; margin-left: -8px; right: 11px; } .useLogin ul{text-align: left;display: block;float: none;} .useLogin ul li{display: block;padding: 0;white-space: nowrap;} .useLogin ul li a{color: #000;font-size: 12px;line-height: 27px;padding: 0 15px;display: block;} .useLogin ul li a svg{width: 9px;margin-right: 5px;} .useLogin ul li.cikisbtn{background: #e6e6e6;margin-top: 10px;transition: .1s ease-in-out;}.useLogin .useName{display: block;margin-top: 10px;font-size: 12px;line-height: 27px;padding: 0 15px;font-weight:500;text-align: left;cursor: default;color:'+$('.CartProduct .headerOrderBtn').css('background-color')+';} .useLogin ul li a:hover{color:'+$('.CartProduct .headerOrderBtn').css('background-color')+';fill:'+$('.CartProduct .headerOrderBtn').css('background-color')+';} .useLogin ul li.cikisbtn:hover{background:'+$('.CartProduct .headerOrderBtn').css('background-color')+';} .useLogin ul li.cikisbtn a:hover{color: #fff;fill: #fff;} .welcome:after {content: "";} .useLogin:before, .useLogin:after {content:"";} </style>');
    $('a[data-fancybox-type="iframe"]').fancybox();
}
function urunDetayIcon(){
    $('.RightDetail .riSingle a.riDown').html('<svg viewBox="0 0 52.161 52.161"><path d="M52.161,26.081c0,3.246-2.63,5.875-5.875,5.875H5.875C2.63,31.956,0,29.327,0,26.081l0,0c0-3.245,2.63-5.875,5.875-5.875 h40.411C49.531,20.206,52.161,22.835,52.161,26.081L52.161,26.081z"/></svg>');
    $('.RightDetail .riSingle a.riUp').html('<svg viewBox="0 0 309.059 309.059"><path d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338 v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843 c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822 c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"/></svg>');

    $('#divKritikStok .box1').before('<div class="boxIcon"><svg viewBox="0 0 4.996 21.16"><g transform="translate(-37.543 -13.42)"><path d="M42.2,13.42H37.878a.335.335,0,0,0-.335.335V27.941a.335.335,0,0,0,.335.335H42.2a.335.335,0,0,0,.335-.335V13.755A.335.335,0,0,0,42.2,13.42Zm-.335,14.186H38.213V14.09h3.656Z"/><path d="M42.2,61.667H37.878a.335.335,0,0,0-.335.335v4.326a.335.335,0,0,0,.335.335H42.2a.335.335,0,0,0,.335-.335V62A.335.335,0,0,0,42.2,61.667Zm-.335,4.326H38.213V62.337h3.656Z" transform="translate(0 -32.083)"/></g></svg></div>');
    $('.UTelefonlaSiparis .box1').before('<div class="boxIcon"><svg viewBox="0 0 202.592 202.592"><path d="M198.048,160.105l-31.286-31.29c-6.231-6.206-16.552-6.016-23.001,0.433l-15.761,15.761 c-0.995-0.551-2.026-1.124-3.11-1.732c-9.953-5.515-23.577-13.074-37.914-27.421C72.599,101.48,65.03,87.834,59.5,77.874 c-0.587-1.056-1.145-2.072-1.696-3.038l10.579-10.565l5.2-5.207c6.46-6.46,6.639-16.778,0.419-23.001L42.715,4.769 c-6.216-6.216-16.541-6.027-23.001,0.433l-8.818,8.868l0.243,0.24c-2.956,3.772-5.429,8.124-7.265,12.816 c-1.696,4.466-2.752,8.729-3.235,12.998c-4.13,34.25,11.52,65.55,53.994,108.028c58.711,58.707,106.027,54.273,108.067,54.055 c4.449-0.53,8.707-1.593,13.038-3.275c4.652-1.818,9.001-4.284,12.769-7.233l0.193,0.168l8.933-8.747 C204.079,176.661,204.265,166.343,198.048,160.105z M190.683,176.164l-3.937,3.93l-1.568,1.507 c-2.469,2.387-6.743,5.74-12.984,8.181c-3.543,1.364-7.036,2.24-10.59,2.663c-0.447,0.043-44.95,3.84-100.029-51.235 C14.743,94.38,7.238,67.395,10.384,41.259c0.394-3.464,1.263-6.95,2.652-10.593c2.462-6.277,5.812-10.547,8.181-13.02l5.443-5.497 c2.623-2.63,6.714-2.831,9.112-0.433l31.286,31.286c2.394,2.401,2.205,6.492-0.422,9.13L45.507,73.24l1.95,3.282 c1.084,1.829,2.23,3.879,3.454,6.106c5.812,10.482,13.764,24.83,29.121,40.173c15.317,15.325,29.644,23.27,40.094,29.067 c2.258,1.249,4.32,2.398,6.17,3.5l3.289,1.95l21.115-21.122c2.634-2.623,6.739-2.817,9.137-0.426l31.272,31.279 C193.5,169.446,193.31,173.537,190.683,176.164z"/> </svg></div>');
    $('.UFavorilerimeEkle .box1').before('<div class="boxIcon"><svg viewBox="0 -28 512.001 512" ><path d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0"/></svg></div>');
    $('.UIstekListemeEkle .box1').before('<div class="boxIcon"><svg viewBox="0 0 26.193 20.595"><g transform="translate(-33.5 -38.598)"><path d="M42.961,53.273a.637.637,0,0,1-.454-.363.545.545,0,0,1,.454-.545l12.443-1a2.542,2.542,0,0,0,2.089-1.635l2-5.45c0-.091,0-.272-.091-.272H40.054a.454.454,0,1,1,0-.908H59.219a1.451,1.451,0,0,1,1,.454,1.36,1.36,0,0,1,.091,1.181l-2,5.45A3.451,3.451,0,0,1,55.4,52.274l-12.353,1Z" transform="translate(-0.709 -0.459)"/><path d="M45.943,60.886a2.544,2.544,0,1,1,2.543-2.547v0A2.544,2.544,0,0,1,45.943,60.886Zm0-4.178a1.635,1.635,0,1,0,1.635,1.635h0A1.635,1.635,0,0,0,45.943,56.708Z" transform="translate(-0.971 -1.695)"/><path d="M58.443,60.886A2.544,2.544,0,0,1,55.9,58.343,2.635,2.635,0,0,1,58.443,55.8a2.544,2.544,0,0,1,2.543,2.543,2.452,2.452,0,0,1-2.358,2.543Q58.536,60.89,58.443,60.886Zm0-4.178a1.635,1.635,0,1,0,1.635,1.635h0a1.635,1.635,0,0,0-1.635-1.635Z" transform="translate(-2.204 -1.696)"/><path d="M45.051,55.131a3.156,3.156,0,0,1-2.888-1.817v-.182l-.271-.636h0L37.922,39.508H33.951a.454.454,0,0,1,0-.908h4.332a.45.45,0,0,1,.451.272L42.8,52.315h0l.18.545a2.166,2.166,0,0,0,2.076,1.362h11.19a.454.454,0,0,1,0,.908Z"/></g></svg></div>');
    $('.UKarsilastirma .box1').before('<div class="boxIcon"><svg viewBox="0 0 13.262 17.691"><g transform="translate(-391 -905.499)"><path d="M16.333,11.421a.6.6,0,0,0,0,.848l2.8,2.805H8.469a.6.6,0,0,0,0,1.2H19.124l-2.8,2.805a.606.606,0,0,0,0,.848.6.6,0,0,0,.843,0l3.8-3.823h0a.672.672,0,0,0,.124-.189.572.572,0,0,0,.046-.23.6.6,0,0,0-.17-.419l-3.8-3.823A.587.587,0,0,0,16.333,11.421Z" transform="translate(383.125 894.247)"/><path d="M12.687,11.421a.6.6,0,0,1,0,.848L9.9,15.074H20.55a.6.6,0,0,1,0,1.2H9.9l2.8,2.805a.606.606,0,0,1,0,.848.6.6,0,0,1-.843,0L8.052,16.1h0a.673.673,0,0,1-.124-.189.572.572,0,0,1-.046-.23.6.6,0,0,1,.17-.419l3.8-3.823A.587.587,0,0,1,12.687,11.421Z" transform="translate(383.118 903.093)"/></g></svg></div>');
    $('.UindirimliUrun .box1').before('<div class="boxIcon"><svg viewBox="0 0 487.222 487.222"><path d="M486.554,186.811c-1.6-4.9-5.8-8.4-10.9-9.2l-152-21.6l-68.4-137.5c-2.3-4.6-7-7.5-12.1-7.5l0,0c-5.1,0-9.8,2.9-12.1,7.6 l-67.5,137.9l-152,22.6c-5.1,0.8-9.3,4.3-10.9,9.2s-0.2,10.3,3.5,13.8l110.3,106.9l-25.5,151.4c-0.9,5.1,1.2,10.2,5.4,13.2 c2.3,1.7,5.1,2.6,7.9,2.6c2.2,0,4.3-0.5,6.3-1.6l135.7-71.9l136.1,71.1c2,1,4.1,1.5,6.2,1.5l0,0c7.4,0,13.5-6.1,13.5-13.5 c0-1.1-0.1-2.1-0.4-3.1l-26.3-150.5l109.6-107.5C486.854,197.111,488.154,191.711,486.554,186.811z M349.554,293.911 c-3.2,3.1-4.6,7.6-3.8,12l22.9,131.3l-118.2-61.7c-3.9-2.1-8.6-2-12.6,0l-117.8,62.4l22.1-131.5c0.7-4.4-0.7-8.8-3.9-11.9 l-95.6-92.8l131.9-19.6c4.4-0.7,8.2-3.4,10.1-7.4l58.6-119.7l59.4,119.4c2,4,5.8,6.7,10.2,7.4l132,18.8L349.554,293.911z"/> </svg></div>');
    $('.FiyatHaberVer .box1').before('<div class="boxIcon"><svg xmlns="http://www.w3.org/2000/svg" width="17.375" height="17.375" viewBox="0 0 17.375 17.375"> <path id="Icon_ionic-md-alarm" data-name="Icon ionic-md-alarm" d="M20.328,6.316l-4-3.32L15.2,4.333l4,3.319ZM8.035,4.289,6.906,2.953,2.953,6.316,4.082,7.652Zm4.04,3.967h-1.3V13.43L14.9,15.887l.652-1.078-3.475-2.026V8.256ZM11.64,4.807a7.761,7.761,0,1,0,7.819,7.76A7.785,7.785,0,0,0,11.64,4.807Zm0,13.8a6.036,6.036,0,1,1,6.081-6.036A6.076,6.076,0,0,1,11.64,18.6Z" transform="translate(-2.953 -2.953)" fill="#989797"/></svg></div>');
    $('.UrunKargoBedava .box1').before('<div class="boxIcon"><svg viewBox="0 0 27.34 21.359"><g transform="translate(-2 -9)"><path d="M52.971,36.961H51.262a.427.427,0,0,1,0-.854h1.282V29.836l-1.632-2.328a3.845,3.845,0,0,0-3.165-1.653H44.854v10.68a.427.427,0,0,1-.854,0V25.427A.427.427,0,0,1,44.427,25h3.319a4.7,4.7,0,0,1,3.845,2.016L53.3,29.456a.427.427,0,0,1,.1.243v6.835A.427.427,0,0,1,52.971,36.961Z" transform="translate(-24.058 -9.165)"/><path d="M4.136,36.961H2.427A.427.427,0,0,1,2,36.534V25.427a.427.427,0,0,1,.854,0v10.68H4.136a.427.427,0,0,1,0,.854Z" transform="translate(0 -9.165)"/><path d="M31.243,51.854H18.427a.427.427,0,0,1,0-.854H31.243a.427.427,0,0,1,0,.854Z" transform="translate(-9.165 -24.058)"/><path d="M20.369,27.8H9.262a.427.427,0,0,1,0-.854h10.68V9.854H2.854V26.942H4.136a.427.427,0,0,1,0,.854H2.427A.427.427,0,0,1,2,27.369V9.427A.427.427,0,0,1,2.427,9H20.369a.427.427,0,0,1,.427.427V27.369A.427.427,0,0,1,20.369,27.8Z"/><path d="M8.99,50.981a2.99,2.99,0,1,1,2.99-2.99A2.99,2.99,0,0,1,8.99,50.981Zm0-5.126a2.136,2.136,0,1,0,2.136,2.136A2.136,2.136,0,0,0,8.99,45.854Z" transform="translate(-2.291 -20.621)"/><path d="M50.99,50.981a2.99,2.99,0,1,1,2.99-2.99A2.99,2.99,0,0,1,50.99,50.981Zm0-5.126a2.136,2.136,0,1,0,2.136,2.136A2.136,2.136,0,0,0,50.99,45.854Z" transform="translate(-26.349 -20.621)"/><path d="M53.553,35.272H48.427A.427.427,0,0,1,48,34.845V31.427A.427.427,0,0,1,48.427,31h3.417a.427.427,0,0,1,.38.235l1.709,3.417a.427.427,0,0,1-.38.619Zm-4.7-.854h4.007L51.58,31.854H48.854Z" transform="translate(-26.349 -12.602)"/></g></svg></div>');
    setTimeout(function () {
        $('.UGelinceHaberVer .box1').before('<div class="boxIcon"><svg viewBox="0 0 15.863 19.856"><g transform="translate(-6.775 -3.93)"><path d="M18.7,28.336a.643.643,0,0,0-.63.506,1.244,1.244,0,0,1-.248.541.938.938,0,0,1-.8.293.954.954,0,0,1-.8-.293,1.244,1.244,0,0,1-.248-.541.643.643,0,0,0-.63-.506h0a.647.647,0,0,0-.63.789,2.217,2.217,0,0,0,2.308,1.841,2.213,2.213,0,0,0,2.308-1.841.65.65,0,0,0-.63-.789Z" transform="translate(-2.332 -7.18)"/><path d="M22.439,18.635c-.764-1.007-2.268-1.6-2.268-6.109,0-4.63-2.045-6.491-3.95-6.938-.179-.045-.308-.1-.308-.293V5.151A1.217,1.217,0,0,0,14.722,3.93h-.03A1.217,1.217,0,0,0,13.5,5.151V5.3c0,.184-.129.248-.308.293-1.911.452-3.95,2.308-3.95,6.938,0,4.511-1.5,5.1-2.268,6.109a.985.985,0,0,0,.789,1.578h13.9A.986.986,0,0,0,22.439,18.635Zm-1.935.288H8.931a.218.218,0,0,1-.164-.362A6.012,6.012,0,0,0,9.809,16.9a11.246,11.246,0,0,0,.71-4.377,7.611,7.611,0,0,1,1.037-4.308,3.184,3.184,0,0,1,1.921-1.37,1.739,1.739,0,0,0,.923-.521.392.392,0,0,1,.591-.01,1.8,1.8,0,0,0,.933.531,3.184,3.184,0,0,1,1.921,1.37,7.611,7.611,0,0,1,1.037,4.308,11.246,11.246,0,0,0,.71,4.377,6.081,6.081,0,0,0,1.067,1.682A.205.205,0,0,1,20.5,18.923Z"/></g></svg></div>');
    },200);

    $('div.YorumYazbtnContent > a').prepend('<div class="boxIcon"><svg viewBox="0 0 16.994 16.991"><path d="M22.242,6.82a2.606,2.606,0,0,0-3.682,0l-.612.612L7.933,17.446v.01a.253.253,0,0,0-.05.077.052.052,0,0,0,0,.015h0L6.019,22.662a.294.294,0,0,0,.07.307.285.285,0,0,0,.207.079.292.292,0,0,0,.093-.017l5.11-1.839h.015a.253.253,0,0,0,.077-.05h0L21.627,11.107l.614-.616A2.61,2.61,0,0,0,22.242,6.82ZM18.15,8.044l1.221,1.221-9.6,9.6L8.549,17.639ZM7.16,21.225a3.029,3.029,0,0,1,.665.665l-1.051.386Zm1.229.471a3.741,3.741,0,0,0-.456-.58,3.639,3.639,0,0,0-.58-.456l.9-2.481,1.308,1.308L10.87,20.8ZM11.411,20.5l-1.227-1.221,9.6-9.6L21.005,10.9ZM21.826,10.079l-.406.412L19.993,9.063,18.559,7.629l.406-.406a2.021,2.021,0,0,1,2.861,2.855Z" transform="translate(-6.001 -6.058)"/></svg></div>');
    $('div.TavsiyeEtBtnContent > a').prepend('<div class="boxIcon"><svg viewBox="0 0 22.635 20"><g transform="translate(-0.081 -5.859)"><g transform="translate(0.081 5.859)"><g transform="translate(0 0)"><path d="M22.716,15.54a2.781,2.781,0,0,1-.138.424c-.127.249-.279.487-.41.735a.315.315,0,0,0-.05.227,2.244,2.244,0,0,1-.372,2.292.245.245,0,0,0-.052.277,2.2,2.2,0,0,1-.295,2.14.537.537,0,0,0-.107.492,2.4,2.4,0,0,1-.567,2.356,2.079,2.079,0,0,1-1.134.6,6.549,6.549,0,0,1-1.163.125H9.813a2.639,2.639,0,0,1-1.453-.474.544.544,0,0,0-.431-.109,3.1,3.1,0,0,1-.034.415.907.907,0,0,1-.832.814,1.789,1.789,0,0,1-.2,0H1.132a.97.97,0,0,1-1.047-.888c0-.021,0-.041,0-.062V15.939a1.011,1.011,0,0,1,1.061-1.075H7.617a3.625,3.625,0,0,1,.453.086.308.308,0,0,0,.227-.027,7.034,7.034,0,0,0,.66-.737,30.159,30.159,0,0,0,2.353-3.866,1.392,1.392,0,0,0,.17-.723c-.029-.746-.029-1.494-.057-2.24a1.238,1.238,0,0,1,.655-1.179,2.41,2.41,0,0,1,2.623.145,1.5,1.5,0,0,1,.4.6c.279.68.544,1.376.78,2.077a4.491,4.491,0,0,1,.1,2.353c-.118.6-.2,1.2-.306,1.8-.034.2-.027.227.181.227h4.9a2.1,2.1,0,0,1,1.134.27,1.712,1.712,0,0,1,.755,1.079c.018.07.041.138.061.206v.614Zm-8.209-1.224c.177-1.05.356-2.077.519-3.1a4.569,4.569,0,0,0,.1-1.106,9.085,9.085,0,0,0-.884-2.793.68.68,0,0,0-.506-.453,1.533,1.533,0,0,0-1.134.1.406.406,0,0,0-.247.413q.045,1.238.045,2.476a1.684,1.684,0,0,1-.1.578,3.969,3.969,0,0,1-.331.68c-.68,1.113-1.36,2.231-2.059,3.33A4.266,4.266,0,0,1,8.7,15.8c-.322.209-.646.422-.959.642a.307.307,0,0,0-.125.209v6.724c0,.134.057.147.172.161a3.267,3.267,0,0,1,.644.134,1.778,1.778,0,0,1,.4.243,2,2,0,0,0,1.156.347h8.534a3.887,3.887,0,0,0,.506-.029,1.479,1.479,0,0,0,1.047-.605,1.037,1.037,0,0,0,.059-1.274,2.762,2.762,0,0,0-.524-.4.406.406,0,0,1,.145-.156,1.467,1.467,0,0,0,1.057-1.018.918.918,0,0,0-.29-1.054,3.77,3.77,0,0,0-.508-.279.652.652,0,0,1,.2-.195,1.4,1.4,0,0,0,.862-.614,1,1,0,0,0-.453-1.619.2.2,0,0,1-.118-.122.168.168,0,0,1,.145-.188h0a1.41,1.41,0,0,0,1.081-1.217.907.907,0,0,0-.494-1.045,1.661,1.661,0,0,0-.63-.118h-6.1Zm-7.738,1.51c-.073,0-.127-.011-.179-.011H1.221a.156.156,0,0,0-.193.195v8.713a.172.172,0,0,0,.211.213h5.3c.227,0,.227,0,.227-.238V15.835Z" transform="translate(-0.081 -5.859)"/></g></g></g></svg></div>');
    $('.ProductIcon2 > div.hidden-phone > a').prepend('<div class="boxIcon"><svg viewBox="0 0 360 360"><path d="M300,82.5v-50H60v50H0v200h60v45h240v-45h60v-200H300z M80,82.5v-30h200v30v50H80V82.5z M280,282.5v25H80v-25v-50h200 V282.5z M340,262.5h-40v-50H60v50H20v-160h40v50h240v-50h40V262.5z"/> <rect x="220" y="172.5" width="30" height="20"/> <rect x="270" y="172.5" width="30" height="20"/> </svg></div>');

    $('body').on(clickEvent ,'.UGelinceHaberVer',function(){
        setTimeout(function(){
            $('.UGelinceHaberVer .box1').before('<div class="boxIcon"><svg viewBox="0 0 15.863 19.856"><g transform="translate(-6.775 -3.93)"><path d="M18.7,28.336a.643.643,0,0,0-.63.506,1.244,1.244,0,0,1-.248.541.938.938,0,0,1-.8.293.954.954,0,0,1-.8-.293,1.244,1.244,0,0,1-.248-.541.643.643,0,0,0-.63-.506h0a.647.647,0,0,0-.63.789,2.217,2.217,0,0,0,2.308,1.841,2.213,2.213,0,0,0,2.308-1.841.65.65,0,0,0-.63-.789Z" transform="translate(-2.332 -7.18)"/><path d="M22.439,18.635c-.764-1.007-2.268-1.6-2.268-6.109,0-4.63-2.045-6.491-3.95-6.938-.179-.045-.308-.1-.308-.293V5.151A1.217,1.217,0,0,0,14.722,3.93h-.03A1.217,1.217,0,0,0,13.5,5.151V5.3c0,.184-.129.248-.308.293-1.911.452-3.95,2.308-3.95,6.938,0,4.511-1.5,5.1-2.268,6.109a.985.985,0,0,0,.789,1.578h13.9A.986.986,0,0,0,22.439,18.635Zm-1.935.288H8.931a.218.218,0,0,1-.164-.362A6.012,6.012,0,0,0,9.809,16.9a11.246,11.246,0,0,0,.71-4.377,7.611,7.611,0,0,1,1.037-4.308,3.184,3.184,0,0,1,1.921-1.37,1.739,1.739,0,0,0,.923-.521.392.392,0,0,1,.591-.01,1.8,1.8,0,0,0,.933.531,3.184,3.184,0,0,1,1.921,1.37,7.611,7.611,0,0,1,1.037,4.308,11.246,11.246,0,0,0,.71,4.377,6.081,6.081,0,0,0,1.067,1.682A.205.205,0,0,1,20.5,18.923Z"/></g></svg></div>');
        },200);
    });
    FavoriIslemCallback();
}
function FavoriIslemCallback(){
    if (globalModel.pageType == 'productdetail') {
        setTimeout(function(){
            if ($('.UFavorilerimeEkle #aFavoriEkleBtn').length>0) {
                $('.UFavorilerimeEkle .boxIcon').html('<svg xmlns="http://www.w3.org/2000/svg" width="19.357" height="17.113" viewBox="0 0 19.357 17.113"> <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M18.526,5.851a4.62,4.62,0,0,0-6.535,0l-.89.89-.89-.89a4.621,4.621,0,1,0-6.535,6.535l.89.89L11.1,19.811l6.535-6.535.89-.89a4.62,4.62,0,0,0,0-6.535Z" transform="translate(-1.423 -3.597)" fill="none" stroke="#989797" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>');
            }else{
                $('.UFavorilerimeEkle .boxIcon').html('<svg viewBox="0 0 18.439 17.175"><path d="M11.719,20.5l-1.264-1.151C5.965,15.277,3,12.592,3,9.3A4.749,4.749,0,0,1,7.8,4.5a5.221,5.221,0,0,1,3.924,1.822A5.221,5.221,0,0,1,15.643,4.5a4.749,4.749,0,0,1,4.8,4.8c0,3.3-2.965,5.981-7.455,10.062Z" transform="translate(-2.5 -4)"/></svg>');
            }
        },10)
    }
}
function HeaderFixed() {
    var sepetsayfakontrol = $("body").find(".BasketPage").length;
    if (sepetsayfakontrol == 0) {
        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 210){
                $('#headerNew').addClass('fixed');
                $('body').addClass('margin');
            }
            else {
                $('#headerNew').removeClass('fixed');
                $('body').removeClass('margin');
            }
            if ($(this).scrollTop() > 250){
                $('#headerNew').addClass('gectop');
            }
            else {
                $('#headerNew').removeClass('gectop');
            }
        });
    }
}


  window.addEventListener("DOMContentLoaded", () => {
    const phoneNumber = "905551112233";
    const whatsappIconURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png";

    function tryInjectWhatsApp() {
      const headerPhone = document.querySelector(".headerPhone");

      if (headerPhone && !headerPhone.querySelector(".whatsapp-btn")) {
        // headerPhone div'ine flex ver
        headerPhone.style.display = "flex";
        headerPhone.style.alignItems = "center";
        headerPhone.style.gap = "10px";

        const whatsappLink = `https://wa.me/${phoneNumber}`;
        const whatsappBtn = document.createElement("a");
        whatsappBtn.href = whatsappLink;
        whatsappBtn.target = "_blank";
        whatsappBtn.className = "whatsapp-btn";

        const icon = document.createElement("img");
        icon.src = whatsappIconURL;
        icon.alt = "WhatsApp";
        icon.style.width = "30px";
        icon.style.height = "30px";

        whatsappBtn.appendChild(icon);
        headerPhone.insertBefore(whatsappBtn, headerPhone.firstChild);
      }
    }

    const interval = setInterval(() => {
      tryInjectWhatsApp();
      if (document.querySelector(".headerPhone .whatsapp-btn")) {
        clearInterval(interval);
      }
    }, 500);
  });



//////// EKLENEN KISIM SEPETTE İNDİRİM İÇİN ÖZEL ALAN /////////////

function Sepetteindirim() {
    $('.productIcon').find('.ozelAlan1').closest('.productItem').removeClass('FirsatveYeni').addClass('Indirim1')
    $('.productIcon').find('.ozelAlan2').closest('.productItem').removeClass('FirsatveYeni').addClass('Indirim2')
    $('.productIcon').find('.ozelAlan3').closest('.productItem').removeClass('FirsatveYeni').addClass('Indirim3')
    $('.productIcon').find('.ozelAlan4').closest('.productItem').removeClass('FirsatveYeni').addClass('Indirim4')
    $('.productIcon').find('.ozelAlan5').closest('.productItem').removeClass('FirsatveYeni').addClass('Indirim5')

    if (globalModel.languageCode == "en") {
        sepettekiFiyat1 = sepettekiFiyatEn1;
        sepettekiFiyat2 = sepettekiFiyatEn2;
        sepettekiFiyat3 = sepettekiFiyatEn3;
        sepettekiFiyat4 = sepettekiFiyatEn4;
        sepettekiFiyat5 = sepettekiFiyatEn5;
    }


    if (IndirimOrani1 > 0) {
        $('.productItem.Indirim1').each(function (item) {
            var price = $(this).find('.productDetail .productPrice .discountPrice span:first').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { console.log("1-" + price); price = price.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { console.log("2-" + price); price = price.replace(',', ''); }
            else if (globalModel.currency == "eur") { console.log("3-" + price); price = price.replace('.', '').replace(',', '.'); }
            else { price = price.replace(',', '.'); }
            var new_price = globalModel.currencySymbol + (price * IndirimOrani1).toFixed(2).replace('.', ',');
            if ($(this).find('.KatSepetFiyat').length == 0) {
                $(this).find('.productDetail').append('<div class="KatSepetFiyat" style="float:left;"></div>');
            }
            $(this).find('.KatSepetFiyat').html('');
            $(this).find('.KatSepetFiyat').html(sepettekiFiyat1 + '<span>' + new_price + '</span>');
        });
        if ($('#divOzelAlan1').length > 0) {
            var price2 = $('.IndirimliFiyatContent .indirimliFiyat .spanFiyat,#divIndirimsizFiyat .right_line .spanFiyat').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price2 = price2.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price2 = price2.replace(',', ''); }
            else if (globalModel.currency == "eur") { price2 = price2.replace('.', '').replace(',', '.'); }
            else { price2 = price2.replace(',', '.'); }
            var value2 = parseFloat(price2);
            var new_price2 = globalModel.currencySymbol + (value2 * IndirimOrani1).toFixed(2).replace('.', ',');
            if ($('.sPric').length == 0) {
                $('.RightDetail').addClass('SpricV');
                $('#divUrunEkSecenek').addClass('SpricV');
                $('#pnlFiyatlar').after('<div class="sPric"><span>' + sepettekiFiyat1 + '</span>' + new_price2 + '</div>');
            }
        }
    }

    if (IndirimOrani2 > 0) {
        $('.productItem.Indirim2').each(function (item) {
            var price = $(this).find('.productDetail .productPrice .discountPrice span:first').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price = price.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price = price.replace(',', ''); }
            else if (globalModel.currency == "eur") { price = price.replace('.', '').replace(',', '.'); }
            else { price = price.replace(',', '.'); }
            var new_price = globalModel.currencySymbol + (price * IndirimOrani2).toFixed(2).replace('.', ',');
            if ($(this).find('.KatSepetFiyat').length == 0) {
                $(this).find('.productDetail').append('<div class="KatSepetFiyat" style="float:left;"></div>');
            }
            $(this).find('.KatSepetFiyat').html('');
            $(this).find('.KatSepetFiyat').html(sepettekiFiyat2 + '<span>' + new_price + '</span>');
        });
        if ($('#divOzelAlan2').length > 0) {
            var price2 = $('.IndirimliFiyatContent .indirimliFiyat .spanFiyat,#divIndirimsizFiyat .right_line .spanFiyat').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price2 = price2.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price2 = price2.replace(',', ''); }
            else if (globalModel.currency == "eur") { price2 = price2.replace('.', '').replace(',', '.'); }
            else { price2 = price2.replace(',', '.'); }
            var value2 = parseFloat(price2);
            var new_price2 = globalModel.currencySymbol + (value2 * IndirimOrani2).toFixed(2).replace('.', ',');
            if ($('.sPric').length == 0) {
                $('.RightDetail').addClass('SpricV');
                $('#divUrunEkSecenek').addClass('SpricV');
                $('#pnlFiyatlar').after('<div class="sPric"><span>' + sepettekiFiyat2 + '</span>' + new_price2 + '</div>');
            }
        }
    }

    if (IndirimOrani3 > 0) {
        $('.productItem.Indirim3').each(function (item) {
            var price = $(this).find('.productDetail .productPrice .discountPrice span:first').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price = price.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price = price.replace(',', ''); }
            else if (globalModel.currency == "eur") { price = price.replace('.', '').replace(',', '.'); }
            else { price = price.replace(',', '.'); }
            var new_price = globalModel.currencySymbol + (price * IndirimOrani3).toFixed(2).replace('.', ',');
            if ($(this).find('.KatSepetFiyat').length == 0) {
                $(this).find('.productDetail').append('<div class="KatSepetFiyat" style="float:left;"></div>');
            }
            $(this).find('.KatSepetFiyat').html('');
            $(this).find('.KatSepetFiyat').html(sepettekiFiyat3 + '<span>' + new_price + '</span>');
        });
        if ($('#divOzelAlan3').length > 0) {
            var price2 = $('.IndirimliFiyatContent .indirimliFiyat .spanFiyat,#divIndirimsizFiyat .right_line .spanFiyat').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price2 = price2.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price2 = price2.replace(',', ''); }
            else if (globalModel.currency == "eur") { price2 = price2.replace('.', '').replace(',', '.'); }
            else { price2 = price2.replace(',', '.'); }
            var value2 = parseFloat(price2);
            var new_price2 = globalModel.currencySymbol + (value2 * IndirimOrani3).toFixed(2).replace('.', ',');
            if ($('.sPric').length == 0) {
                $('.RightDetail').addClass('SpricV');
                $('#divUrunEkSecenek').addClass('SpricV');
                $('#pnlFiyatlar').after('<div class="sPric"><span>' + sepettekiFiyat3 + '</span>' + new_price2 + '</div>');
            }
        }
    }

    if (IndirimOrani4 > 0) {
        $('.productItem.Indirim4').each(function (item) {
            var price = $(this).find('.productDetail .productPrice .discountPrice span:first').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price = price.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price = price.replace(',', ''); }
            else if (globalModel.currency == "eur") { price = price.replace('.', '').replace(',', '.'); }
            else { price = price.replace(',', '.'); }
            var new_price = globalModel.currencySymbol + (price * IndirimOrani4).toFixed(2).replace('.', ',');
            if ($(this).find('.KatSepetFiyat').length == 0) {
                $(this).find('.productDetail').append('<div class="KatSepetFiyat" style="float:left;"></div>');
            }
            $(this).find('.KatSepetFiyat').html('');
            $(this).find('.KatSepetFiyat').html(sepettekiFiyat4 + '<span>' + new_price + '</span>');
        });
        if ($('#divOzelAlan4').length > 0) {
            var price2 = $('.IndirimliFiyatContent .indirimliFiyat .spanFiyat,#divIndirimsizFiyat .right_line .spanFiyat').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price2 = price2.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price2 = price2.replace(',', ''); }
            else if (globalModel.currency == "eur") { price2 = price2.replace('.', '').replace(',', '.'); }
            else { price2 = price2.replace(',', '.'); }
            var value2 = parseFloat(price2);
            var new_price2 = globalModel.currencySymbol + (value2 * IndirimOrani4).toFixed(2).replace('.', ',');
            if ($('.sPric').length == 0) {
                $('.RightDetail').addClass('SpricV');
                $('#divUrunEkSecenek').addClass('SpricV');
                $('#pnlFiyatlar').after('<div class="sPric"><span>' + sepettekiFiyat4 + '</span>' + new_price2 + '</div>');
            }
        }
    }

    if (IndirimOrani5 > 0) {
        $('.productItem.Indirim5').each(function (item) {
            var price = $(this).find('.productDetail .productPrice .discountPrice span:first').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price = price.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price = price.replace(',', ''); }
            else if (globalModel.currency == "eur") { price = price.replace('.', '').replace(',', '.'); }
            else { price = price.replace(',', '.'); }
            var new_price = globalModel.currencySymbol + (price * IndirimOrani5).toFixed(2).replace('.', ',');
            if ($(this).find('.KatSepetFiyat').length == 0) {
                $(this).find('.productDetail').append('<div class="KatSepetFiyat" style="float:left;"></div>');
            }
            $(this).find('.KatSepetFiyat').html('');
            $(this).find('.KatSepetFiyat').html(sepettekiFiyat5 + '<span>' + new_price + '</span>');
        });
        if ($('#divOzelAlan5').length > 0) {
            var price2 = $('.IndirimliFiyatContent .indirimliFiyat .spanFiyat,#divIndirimsizFiyat .right_line .spanFiyat').text().replace(/^\s+|\s+$/g, '').trim().replace(globalModel.currencySymbol, "");
            if (globalModel.currency == "try") { price2 = price2.replace(/\s/g, '').replace('.', '').replace(',', '.'); }
            else if (globalModel.currency == "usd") { price2 = price2.replace(',', ''); }
            else if (globalModel.currency == "eur") { price2 = price2.replace('.', '').replace(',', '.'); }
            else { price2 = price2.replace(',', '.'); }
            var value2 = parseFloat(price2);
            var new_price2 = globalModel.currencySymbol + (value2 * IndirimOrani5).toFixed(2).replace('.', ',');
            if ($('.sPric').length == 0) {
                $('.RightDetail').addClass('SpricV');
                $('#divUrunEkSecenek').addClass('SpricV');
                $('#pnlFiyatlar').after('<div class="sPric"><span>' + sepettekiFiyat5 + '</span>' + new_price2 + '</div>');
            }
        }
    }
}

function getProductPricesOnPageCallback() {
    Sepetteindirim();
}

//////////////////
