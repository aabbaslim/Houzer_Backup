import 'focus-within-polyfill';

import './global/jquery-migrate';
import './global/jquery.swipebox.min';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';
import CustomScript from './1center-custom/oc-common';
import productSwatches from './1center-custom/product-swatches';
import productListingView from './1center-custom/productListingView';
import headerExtras from './1center-custom/header-custom';
import {compareProducts} from './global/product-comparison';
import customProductCount from "./1center-custom/custom-product-count";
    window.productListingView = productListingView;

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        CustomScript(this.context);
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector();
        headerExtras(true);
        compareProducts(this.context);
        customProductCount(this.context);
        if(this.context.CustomProductSwatch){
            productSwatches(this.context);
        }
    }
}

$('.toggle-title').click(function() {
	var parent_toggle = $(this).closest('.toggle');
	if (parent_toggle.hasClass('current')) {
		$(this).find('i.fa').removeClass('fa-minus').addClass('fa-plus');
		parent_toggle.removeClass('current').children('.toggle-content').slideUp(300);
	} else {
		$(this).find('i.fa').removeClass('fa-plus').addClass('fa-minus');
		parent_toggle.addClass('current').children('.toggle-content').slideDown(300);
	}
	var siblings = parent_toggle.siblings('.toggle');
	siblings.find('i.fa').removeClass('fa-minus').addClass('fa-plus');
	siblings.removeClass('current').children('.toggle-content').slideUp(300);
});

if (jQuery().swipebox) {
	$("a[href$='.jpg'], a[href$='.png'], a[href$='.jpeg'], a[href$='.gif']").swipebox();
	$('.swipebox-video').swipebox();
}

// Open 'Where to Buy' section links in a new tab
$('[data-layout-name="where-to-buy"] a').attr('target','_blank');

// Product page tab title formatting fix
$(document).ready(function () {
    $('.tab-title').each(function () {
        $(this).text(function () {
            return $(this).text().replace('&amp;','&'); 
        });
    })
});

// Anchor scroll
const $navbar = $('header');

$('.sidebar a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const scrollTop = $($(this).attr('href')).offset().top - $navbar.outerHeight();

    $('html, body').animate({ scrollTop });
})
