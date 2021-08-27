import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import EntryList from '../../../../../src/modules/daybook/components/EntryList'
import { journalState } from '../../../mock-data/test-journal-state'

// const journalMockModule = {
//     namespaced: true,
//     getters: {
//         getEntriesByTerm
//     },
//     state: () => ({
//         isLoading: false,
//         entries: journalState.entries
//     })
// }
// const store = createStore({
//     modules: {
//         journal: {...journalMockModule}
//     }
// })
const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

describe('Pruebas en el EntryList Component', () => {
    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    // TODO: $routerMock
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })
    test('Debe de llamar el getEntriesByTerm sin termino y mostrar 3 entradas', () => {
        // console.log(wrapper.html())
        expect(wrapper.findAll('entry-stub').length).toBe(3)
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Debe de llamar el getEntriesByTerm y filtrar las entrada', async () => {
        const input = wrapper.find('input')
        await input.setValue('Vue.js')
        expect(wrapper.findAll('entry-stub').length).toBe(1)
    })
    test('El boton de nuevo debe de redireccionar a /new', () => {
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: { id: 'new' }})
    })
})