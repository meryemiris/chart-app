<script setup>
import Facebook from "../assets/facebook.svg";
import YouTube from "../assets/youtube.svg";
import Instagram from "../assets/instagram.svg";
import Shopify from "../assets/shopify.svg";
import SnapChat from "../assets/snapchat.svg";
import GoogleAnalytics from "../assets/analytics.svg";
import WordPress from "../assets/wordpress.svg";
import WooCommerce from "../assets/woo.svg";
import LinkedIn from "../assets/linkedin.svg";
import Gmail from "../assets/gmail.svg";

import Google from "../assets/google.svg";
import WhatsApp from "../assets/whatsapp.svg";
import Twitter from "../assets/twitter.svg";

const logos = [
	{ src: GoogleAnalytics, alt: "Google Analytics" },
	{ src: WordPress, alt: "WordPress" },
	{ src: LinkedIn, alt: "LinkedIn" },
	{ src: WooCommerce, alt: "WooCommerce" },
	{ src: Gmail, alt: "Gmail" },
	{ src: Facebook, alt: "Facebook" },
	{ src: YouTube, alt: "YouTube" },
	{ src: Instagram, alt: "Instagram" },
	{ src: Shopify, alt: "Shopify" },
	{ src: SnapChat, alt: "SnapChat" },
	{ src: Google, alt: "Google" },
	{ src: WhatsApp, alt: "WhatsApp" },
	{ src: Twitter, alt: "Twitter" },
];

const { direction } = defineProps({
	direction: String,
});
</script>

<template>
	<div
		class="2xl:h-[891px] overflow-hidden inline-flex flex-nowrap mt-[25px] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] 2xl:[mask-image:_linear-gradient(to_top,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] lg:mt-[60px] 2xl:mt-0"
	>
		<template v-for="count in 2">
			<ul
				class="flex 2xl:flex-col items-center justify-center 2xl:justify-start animate-infinite-scroll-x"
				:class="{
					'2xl:animate-infinite-scroll-y-direct': direction === 'direct',
					'2xl:animate-infinite-scroll-y-reverse': direction === 'reverse',
				}"
				:aria-hidden="count === 2"
			>
				<template v-for="logo in logos">
					<li
						class="flex items-center justify-center bg-[#F9FAFB] w-[75.03px] h-[74.62px] lg:w-[132.39px] lg:h-[132.66px] rounded-[6.75px] mx-[14px] lg:mx-6 2xl:my-6 2xl:mx-0"
					>
						<img
							:src="logo.src"
							:alt="logo.alt"
							class="h-[30.38px] w-[30.38px] lg:w-[54px] lg:h-[54px] max-w-none"
						/>
					</li>
				</template>
			</ul>
		</template>
	</div>
</template>
