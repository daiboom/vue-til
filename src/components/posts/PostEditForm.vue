<template>
	<div class="contents">
		<h1 class="page-header">Edit Post</h1>
		<div class="form-wrapper">
			<form class="form" @submit.prevent="submitForm">
				<div>
					<label for="title">Title:</label>
					<input id="title" type="text" v-model="title" />
				</div>
				<div>
					<label for="contents">Contents:</label>
					<textarea id="contents" type="text" rows="5" v-model="contents" />
					<p
						v-if="!isContentsValid"
						class="validation-text warning isContentTooLong"
					>
						Contents length must be less than 250
					</p>
				</div>
				<button type="submit" class="btn">Edit</button>
			</form>
			<p class="log">
				{{ logMessage }}
			</p>
		</div>
	</div>
</template>

<script>
import { fetchPost, editPost } from '@/api/posts'

export default {
	data() {
		return {
			title: '',
			contents: '',
			logMessage: '',
		}
	},
	methods: {
		async submitForm() {
			try {
				const response = await editPost(this.$route.params.id, {
					title: this.title,
					contents: this.contents,
				})
				this.$router.push({ path: '/main' })
				console.log(response)
			} catch (error) {
				console.log(error.response.data.message)
				this.logMessage = error.response.data.message
			}
		},
	},
	async created() {
		const { id } = this.$route.params
		const { data } = await fetchPost(id)
		const { title, contents } = data
		this.title = title
		this.contents = contents
	},
}
</script>

<style scoped>
.form-wrapper .form {
	width: 100%;
}
.btn {
	color: white;
}
</style>
