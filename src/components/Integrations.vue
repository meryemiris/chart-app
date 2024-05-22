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
];
</script>

<template>
	<div
		class="relative top-0 2xl:top-[-58px] 2xl:h-[860px] max-w-screen-sm lg:max-w-screen-lg 2xl:flex-col inline-flex flex-nowrap mx-[33px] 2xl:mx-[90px] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] 2xl:[mask-image:_linear-gradient(to_top,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
	>
		<ul
			class="flex 2xl:flex-col items-center justify-center md:justify-start [&_li]:mx-[18.5px] [&_img]:max-w-none animate-infinite-scroll-x 2xl:animate-infinite-scroll-y"
		>
			<template v-for="logo in logos">
				<li
					class="flex items-center mb-12 justify-center bg-[#F9FAFB] w-[75.03px] h-[74.62px] lg:w-[132.39px] lg:h-[132.66px] rounded-[6.75px]"
				>
					<img
						:src="logo.src"
						:alt="logo.alt"
						class="h-[30.38px] w-[30.38px] lg:w-[54px] lg:h-[54px]"
					/>
				</li>
			</template>
		</ul>
		<ul
			class="flex 2xl:flex-col items-center justify-center md:justify-start [&_li]:mx-[18.5px] [&_img]:max-w-none animate-infinite-scroll-x 2xl:animate-infinite-scroll-y"
		>
			<template v-for="logo in logos">
				<li
					class="flex items-center mb-12 justify-center bg-[#F9FAFB] w-[75.03px] h-[74.62px] lg:w-[132.39px] lg:h-[132.66px] rounded-[6.75px]"
				>
					<img
						:src="logo.src"
						:alt="logo.alt"
						class="h-[30.38px] w-[30.38px] lg:w-[54px] lg:h-[54px]"
					/>
				</li>
			</template>
		</ul>
	</div>
</template>
