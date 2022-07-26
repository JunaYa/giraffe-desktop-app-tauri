<script lang="ts" setup>
import { useNavStore } from '../stores/index'
const nav = useNavStore()

</script>
<template>
	<div class="other" p-12 style="background: rgb(247, 247, 249)">
		<header>
			<div v-if="!nav.canEdit">{{ nav.currentNav.name }}</div>
			<div v-else>
				<div />
				<input :placeholder="nav.nameMap[nav.currentNav.type]"/>
			</div>
		</header>
		<div bg-white p-6 rounded-sm>
			<div frs>
				<input self-start mt-1 type="checkbox" mr-2 class="default:ring-2 ...">
				<div flex-1 fcs>
					<input type="text" placeholder="New To-Do" block outline-none class="default:ring-2 ...">
					<input type="text" placeholder="Notes" block outline-none mb-4 class="default:ring-2 ...">
					<div frb>
						<button>tody</button>
						<div flex flex-row items-center justify-end>
							<button class="icon-btn mx-2 !outline-none">
								<div i="carbon-calendar" />
							</button>
							<button class="icon-btn mx-2 !outline-none">
								<div i="carbon-tag" />
							</button>
							<button class="icon-btn mx-2 !outline-none">
								<div i="carbon-list" />
							</button>
							<button class="icon-btn mx-2 !outline-none">
								<div i="carbon-flag" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>