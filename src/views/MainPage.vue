<template>
	<div>
		<div class="main list-container contents">
			<h1 class="page-header">Today I Learned</h1>
			<LoadingSpinner v-if="isLoading" />
			<ul v-else>
				<PostListItem
					v-for="postItem in postItems"
					:key="postItem._id"
					:postItem="postItem"
				></PostListItem>
			</ul>
		</div>
	</div>
</template>

<script>
import PostListItem from '@/components/posts/PostListItem.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { fetchPosts } from '@/api/index'

export default {
	components: {
		PostListItem,
		LoadingSpinner,
	},
	data() {
		return {
			postItems: [],
			isLoading: false,
		}
	},
	methods: {
		async fetchData() {
			this.isLoading = true
			try {
				const { data } = await fetchPosts()
				this.postItems = data.posts
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},
	},
	created() {
		this.fetchData()
	},
}
</script>

<style></style>
