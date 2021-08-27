import { shallowMount } from '@vue/test-utils'
import Entry from '../../../../../src/modules/daybook/components/Entry'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Puerbas en Entry Component', () => {
    const mockRouter = {
        push: jest.fn()
    }
    const entry = { ...journalState.entries[0]}
    const wrapper = shallowMount(Entry, {
        props: {
            entry
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })
    test('Debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Debe de redireccionar al hacer click en el entry-container', () => {
        wrapper.find('.entry-container').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: entry.id } })
    })
    test('Pruebas en las propiedades computadas', () => {
        expect(wrapper.vm.day).toBe(17)
        expect(wrapper.vm.month).toBe('Agosto')
        expect(wrapper.vm.yearDay).toBe('2021, Martes')
    })
})