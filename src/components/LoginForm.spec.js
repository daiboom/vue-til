import { shallowMount } from '@vue/test-utils'
import LoginForm from './LoginForm'

describe('LoginForm.vue', () => {
	test('ID is must email format', () => {
		const wrapper = shallowMount(LoginForm, {
			data() {
				return {
					username: 'test@avc.com',
				}
			},
		})

		const warningText = wrapper.find('.warning')
		expect(warningText.exists()).toBeTruthy()
		// vm -> vue model에 접근
		// element -> html element에 접근
	})

	test('ID와 PW가 입력되지않으면 로그인 버튼이 비활성화된다.', () => {
		const wrapper = shallowMount(LoginForm, {
			data() {
				return {
					username: '',
					password: '',
				}
			},
		})

		const button = wrapper.find('button')

		// button.element.disabled
		expect(button.element.disabled).toBeTruthy()
	})
})
