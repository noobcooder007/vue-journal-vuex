import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue'

describe('Pruebas en el FAB Component', () => {
    test('Debe dew mostrar el icono por defecto', () => {
        const wrapper = shallowMount(Fab)
        expect(wrapper.find('#fa-plus'))
    })
    test('Debe de mostrar el icono por argumento: fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        expect(wrapper.find('#fa-circle'))
    })
    test('Debe de emitir el evento on:click cuando se hace click', () => {
        const wrapper = shallowMount(Fab)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('on:click'))
    })
})