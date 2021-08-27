import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import journal from '@/modules/daybook/store/journal'
import EntryView from '../../../../../src/modules/daybook/views/EntryView'
import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

jest.mock('sweetalert2' , () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {
    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: journalState.entries[2].id
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })
    test('Debe de sacar al usuario porque el id no existe', () => {
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'Este ID no existe en el store'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
    })
    test('Debe de mostrar la entrada correctamente', () => {
        // console.log(wrapper.html())
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()
    })
    test('Debe de borrar la entrada y salir', async () => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }))
        await wrapper.find('.btn-danger').trigger('click')
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Estas seguro?',
            text: 'Se borrara y lo perderas para siempre, eso es mucho tiempo',
            showDenyButton: true,
            denyButtonText: 'No, aún no',
            icon: 'question',
            confirmButtonText: 'Sin miedo al éxito'
        })
        expect(mockRouter.push).toHaveBeenCalled()
        expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', journalState.entries[2].id)
    })
})