<template>
	<Header />
	<Sidebar />
	<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
		<Tags></Tags>
		<div class="content">
			<router-view v-slot="{ Component }">
        <!--内置动画 -->
				<transition name="move" mode="out-in">
          <!--保持组件存活 -->
					<keep-alive :include="tags.nameList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '../store/sidebar';
import { useTagsStore } from '../store/tags';
import Header from '../components/header.vue';
import Sidebar from '../components/sidebar.vue';
import Tags from '../components/tags.vue';

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
